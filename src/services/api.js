import axios from 'axios';

// API'nin temel URL'i
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ı
apiClient.interceptors.request.use(
  (config) => {
    // İsteğe header ekleyebiliriz (örn. token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cevap interceptor'ı
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Hata durumunda yapılacak işlemler
    console.error("API İsteği Hatası:", error);
    return Promise.reject(error);
  }
);

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