import axios from 'axios';

// API'nin temel URL'i
const API_URL = import.meta.env.VITE_API_URL;

// Token işlemleri
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// İstek interceptor'ı
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log(`Request to ${config.url} with token: ${token.substring(0, 10)}...`);
    } else {
      console.warn(`Request to ${config.url} without token!`);
    }
    
    // Dosya yükleme işlemleri için Content-Type header'ını değiştirmeyelim
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']; // Axios otomatik boundary ekleyecek
      console.log(`FormData request to ${config.url}, removing Content-Type header`);
    }
    
    // Debug için tüm headers'ı logla
    console.log('Request headers:', config.headers);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cevap interceptor'ı
apiClient.interceptors.response.use(
  (response) => {
    // Başarılı yanıt - sadece API yanıtlarını logla
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  async (error) => {
    // Hata detaylarını logla
    console.error(`Error in request to ${error.config?.url}:`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    
    const originalRequest = error.config;
    
    // 401 hatası ve token yenileme girişimi yapılmamışsa
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('401 error detected, attempting to refresh token');
      
      if (isRefreshing) {
        console.log('Token refresh already in progress, queuing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then(token => {
          console.log('Retrying request with new token');
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch(err => {
          console.error('Failed to retry request after token refresh:', err);
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.log('Starting token refresh process');

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          console.error('No refresh token found, cannot refresh');
          throw new Error('Refresh token bulunamadı');
        }

        console.log('Attempting to refresh token with:', refreshToken.substring(0, 10) + '...');
        
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        console.log('Refresh token response:', response.status, response.data);
        
        if (!response.data.success) {
          console.error('Token refresh failed:', response.data.message);
          throw new Error(response.data.message || 'Token yenileme başarısız');
        }
        
        const data = response.data.data;
        const accessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        
        console.log('Token refresh successful, new tokens received');
        
        setTokens(accessToken, newRefreshToken);
        console.log('New tokens saved to localStorage');
        
        // Tüm API isteklerine otomatik olarak token ekle
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        console.log('Processing queued requests with new token');
        processQueue(null, accessToken);
        
        console.log('Retrying original request');
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        removeTokens();
        
        console.log('Redirecting to login page after token refresh failure');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        console.log('Token refresh process completed');
      }
    }
    
    // 401 dışındaki hatalar veya token yenileme başarısız olursa
    return Promise.reject(error);
  }
);

// Authentication servisi
export const authService = {
  login: async (credentials) => {
    try {
      console.log('Attempting login with username:', credentials.username);
      
      const response = await apiClient.post('/auth/login', credentials);
      console.log('Login API response status:', response.status);
      console.log('Login API response data:', response.data);
      
      // API yanıtı inceleme
      if (!response.data || !response.data.success) {
        console.error('Login failed:', response.data?.message);
        throw new Error(response.data?.message || 'Giriş başarısız');
      }
      
      // API yapısına göre data içindeki token ve kullanıcı bilgilerini al
      const data = response.data.data;
      
      // Token bilgilerini al
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      
      if (!accessToken) {
        console.error('No access token in response:', data);
        throw new Error('Erişim token\'ı bulunamadı');
      }
      
      // Kullanıcı bilgilerini al - role değerini özellikle kontrol et
      // Spring Security'de roller ROLE_ prefix'i ile gelir, ancak veritabanında farklı olabilir
      // Elimizdeki rolü normalize edelim
      let role = data.role;
      
      // Frontend'de her zaman ROLE_ prefix'i olmadan saklayalım
      if (role && role.startsWith('ROLE_')) {
        role = role.substring(5); // "ROLE_" prefix'ini kaldır
      }
      
      console.log('User role from API:', data.role);
      console.log('Normalized role for frontend:', role);
      
      const user = {
        id: data.userId,
        username: data.username,
        email: data.email,
        role: role // Normalize edilmiş rol
      };
      
      console.log('Extracted user data:', user);
      
      // Token bilgilerini kaydet
      setTokens(accessToken, refreshToken);
      
      // LocalStorage'a kaydedilen değerleri kontrol et
      console.log('Saved tokens:', {
        accessToken: localStorage.getItem('accessToken')?.substring(0, 15) + '...',
        refreshToken: localStorage.getItem('refreshToken')?.substring(0, 10) + '...'
      });
      
      // Default header'a token'ı ekle
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('Set default Authorization header for future requests');
      
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error('Auth service login error:', error);
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const refreshToken = getRefreshToken();
      console.log('Logging out with refresh token:', refreshToken?.substring(0, 10) + '...');
      
      if (refreshToken) {
        const response = await apiClient.post('/auth/logout', { refreshToken });
        console.log('Logout response:', response.status, response.data);
      } else {
        console.warn('Logout: No refresh token found');
      }
      
      // API çağrısından bağımsız olarak her zaman tokenleri temizle
      removeTokens();
      console.log('Tokens removed from localStorage');
      
      // Auth header'ını temizle
      delete apiClient.defaults.headers.common['Authorization'];
      console.log('Cleared Authorization header');
    } catch (error) {
      console.error('Logout error:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      // Hata olsa bile tokenleri temizle
      removeTokens();
      delete apiClient.defaults.headers.common['Authorization'];
      console.log('Tokens and headers cleared despite error');
      
      throw error;
    }
  },
  
  refreshToken: async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('Refresh token bulunamadı');
      }
      
      console.log('Refreshing token with:', refreshToken);
      
      const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
      console.log('Refresh token response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Token yenileme başarısız');
      }
      
      const data = response.data.data;
      const accessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;
      
      console.log('New tokens:', { accessToken, newRefreshToken });
      
      setTokens(accessToken, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        console.error('getCurrentUser: No access token found');
        throw new Error('Access token bulunamadı');
      }
      
      console.log('Getting current user with token:', token.substring(0, 15) + '...');
      
      const response = await apiClient.get('/auth/validate');
      console.log('Validate response status:', response.status);
      console.log('Validate response data:', response.data);
      
      if (!response.data.success) {
        console.error('Validate failed:', response.data.message);
        throw new Error(response.data.message || 'Token doğrulama başarısız');
      }
      
      const userData = response.data.data;
      
      // Role değerini normalize et - Spring Security rol formatını frontend formatına dönüştür
      if (userData.role && userData.role.startsWith('ROLE_')) {
        userData.role = userData.role.substring(5);
      }
      
      console.log('User role from API:', response.data.data.role);
      console.log('Normalized user data with role:', userData.role);
      
      return userData;
    } catch (error) {
      console.error('Get current user error:', error);
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  }
};

// İletişim formu gönderme servisi
export const contactService = {
  sendContactForm: async (formData) => {
    try {
      const response = await apiClient.post('/contact/send-message', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  sendQuoteForm: async (formData) => {
    try {
      const response = await apiClient.post('/contact/send-quote', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient; 