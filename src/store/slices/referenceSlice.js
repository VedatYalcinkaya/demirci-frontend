import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api';

// Sadece path tanımla, API URL api.js içinde tanımlı
const API_PATH = '/references';

// Async thunks
export const fetchReferences = createAsyncThunk(
  'references/fetchReferences',
  async () => {
    const response = await apiClient.get(API_PATH);
    console.log('API Response:', response.data);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

// Sayfalama ile referansları getir
export const fetchPaginatedReferences = createAsyncThunk(
  'references/fetchPaginatedReferences',
  async ({ page = 0, size = 9 }) => {
    try {
      const response = await apiClient.get(`${API_PATH}/paginated`, {
        params: { page, size }
      });
      console.log('Paginated API Response:', response.data);
      
      // API yanıtı success, message ve data alanlarını içeriyor
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        // Sayfalama bilgilerini oluştur
        return {
          content: response.data.data,
          totalPages: Math.ceil(response.data.data.length / size),
          totalElements: response.data.data.length,
          number: page,
          size: size
        };
      }
      
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: page,
        size: size
      };
    } catch (error) {
      console.error('Referanslar yüklenirken hata oluştu:', error);
      throw error;
    }
  }
);

export const fetchReferenceById = createAsyncThunk(
  'references/fetchReferenceById',
  async (id) => {
    try {
      // Önce referans verilerini al
      const response = await apiClient.get(`${API_PATH}/${id}`);
      console.log('API Response (fetchReferenceById):', response.data);
      
      // Referans verilerini al
      const referenceData = response.data.data || response.data;
      
      // Sonra referans resimlerini yükle
      const imagesResponse = await apiClient.get(`${API_PATH}/${id}/images`);
      console.log('API Response (fetchReferenceImages):', imagesResponse.data);
      
      // Resimleri referans verisine ekle
      const images = Array.isArray(imagesResponse.data) 
        ? imagesResponse.data 
        : (imagesResponse.data.data || []);
      
      console.log('Yüklenen resimler:', images);
      
      // Resimleri URL'leri ile birlikte döndür
      const processedImages = images.map(img => ({
        ...img,
        url: img.url || img.imageUrl // Backend'den gelen veri yapısına göre uyarla
      }));
      
      return {
        ...referenceData,
        images: processedImages
      };
    } catch (error) {
      console.error('Referans detayları yüklenirken hata oluştu:', error);
      throw error;
    }
  }
);

export const fetchActiveReferences = createAsyncThunk(
  'references/fetchActiveReferences',
  async () => {
    const response = await apiClient.get(`${API_PATH}/active`);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const fetchLatestReferences = createAsyncThunk(
  'references/fetchLatestReferences',
  async (count) => {
    const response = await apiClient.get(`${API_PATH}/latest/${count}`);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const searchReferencesByTitle = createAsyncThunk(
  'references/searchReferencesByTitle',
  async ({ title, page = 0, size = 10 }) => {
    try {
      console.log('Başlığa göre arama yapılıyor:', title, 'page:', page, 'size:', size);
      
      const response = await apiClient.get(`${API_PATH}/search/title`, {
        params: { 
          title, 
          page, 
          size 
        }
      });
      
      console.log('Başlık arama sonuçları:', response.data);
      
      // API yanıtı yapısına göre doğru veriyi döndür
      return Array.isArray(response.data) ? response.data : (response.data.data || []);
    } catch (error) {
      console.error('Başlık araması sırasında hata:', error);
      throw error;
    }
  }
);

export const searchReferencesByService = createAsyncThunk(
  'references/searchReferencesByService',
  async ({ technology, page = 0, size = 10 }) => {
    try {
      console.log('Teknoloji/servise göre arama yapılıyor:', technology, 'page:', page, 'size:', size);
      
      const response = await apiClient.get(`${API_PATH}/search/technology`, {
        params: { 
          technology, 
          page, 
          size 
        }
      });
      
      console.log('Teknoloji arama sonuçları:', response.data);
      
      // API yanıtı yapısına göre doğru veriyi döndür
      return Array.isArray(response.data) ? response.data : (response.data.data || []);
    } catch (error) {
      console.error('Teknoloji araması sırasında hata:', error);
      throw error;
    }
  }
);

export const fetchReferenceImages = createAsyncThunk(
  'references/fetchReferenceImages',
  async (referenceId) => {
    const response = await apiClient.get(`${API_PATH}/${referenceId}/images`);
    console.log('API Response (fetchReferenceImages):', response.data);
    // API yanıtı success, message ve data alanlarını içeriyorsa, data alanını döndür
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const addReference = createAsyncThunk(
  'references/addReference',
  async (reference, { rejectWithValue }) => {
    try {
      // Referans verilerini JSON formatına dönüştür
      const referenceData = {
        title: reference.title,
        summary: reference.summary,
        description: reference.description,
        clientName: reference.clientName,
        projectUrl: reference.projectUrl,
        completionDate: reference.completionDate,
        technologies: Array.isArray(reference.technologies) ? reference.technologies.join(',') : reference.technologies,
        active: reference.active !== undefined ? reference.active : true
      };
      
      // FormData oluştur
      const formData = new FormData();
      
      // Referans verilerini JSON olarak ekle
      formData.append('referenceData', JSON.stringify(referenceData));
      
      // Thumbnail dosyasını ekle
      if (reference.thumbnailFile) {
        formData.append('thumbnail', reference.thumbnailFile);
      } else {
        return rejectWithValue('Thumbnail dosyası gereklidir');
      }
      
      // Client logo dosyasını ekle (varsa)
      if (reference.clientLogoFile) {
        formData.append('clientLogo', reference.clientLogoFile);
      }
      
      console.log('Gönderilen referans verisi:', referenceData);
      console.log('Thumbnail dosyası:', reference.thumbnailFile);
      console.log('Client logo dosyası:', reference.clientLogoFile);
      
      // API çağrısı
      const response = await apiClient.post(`${API_PATH}/create-with-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (addReference):', response.data);
      
      // API yanıtı success, message ve data alanlarını içeriyorsa, data alanını döndür
      return response.data.data || response.data;
    } catch (error) {
      console.error('Referans eklenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Referans eklenirken bir hata oluştu');
    }
  }
);

export const addReferenceImage = createAsyncThunk(
  'references/addReferenceImage',
  async ({referenceId, image}) => {
    const response = await apiClient.post(`${API_PATH}/${referenceId}/images`, image);
    return response.data;
  }
);

export const updateReference = createAsyncThunk(
  'references/updateReference',
  async (reference, { rejectWithValue, dispatch }) => {
    try {
      // Referans verilerini JSON formatına dönüştür
      const referenceData = {
        id: reference.id,
        title: reference.title,
        summary: reference.summary,
        description: reference.description,
        clientName: reference.clientName,
        projectUrl: reference.projectUrl,
        completionDate: reference.completionDate,
        technologies: Array.isArray(reference.technologies) ? reference.technologies.join(',') : reference.technologies,
        active: reference.active
      };
      
      // Eğer dosya değişmemişse, mevcut URL'leri ekle
      if (reference.thumbnailUrl && !reference.thumbnailFile) {
        referenceData.thumbnailUrl = reference.thumbnailUrl;
      }
      
      if (reference.clientLogo && !reference.clientLogoFile) {
        referenceData.clientLogo = reference.clientLogo;
      }
      
      // FormData oluştur
      const formData = new FormData();
      
      // Referans verilerini JSON olarak ekle
      formData.append('referenceData', JSON.stringify(referenceData));
      
      // Thumbnail dosyasını ekle (varsa)
      if (reference.thumbnailFile) {
        formData.append('thumbnail', reference.thumbnailFile);
      }
      
      // Client logo dosyasını ekle (varsa)
      if (reference.clientLogoFile) {
        formData.append('clientLogo', reference.clientLogoFile);
      }
      
      console.log('Güncellenen referans verisi:', referenceData);
      
      // API çağrısı
      const response = await apiClient.post(`${API_PATH}/update-with-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (updateReference):', response.data);
      
      // Güncellemeden sonra referans detaylarını yeniden yükle
      const updatedData = response.data.data || response.data;
      
      // Referans detaylarını yeniden yükle
      await dispatch(fetchReferenceById(updatedData.id));
      
      return updatedData;
    } catch (error) {
      console.error('Referans güncellenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Referans güncellenirken bir hata oluştu');
    }
  }
);

export const deleteReference = createAsyncThunk(
  'references/deleteReference',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${API_PATH}/${id}`);
      return id;
    } catch (error) {
      console.error('Referans silme hatası:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Referans silinirken bir hata oluştu');
    }
  }
);

export const deleteReferenceImage = createAsyncThunk(
  'references/deleteReferenceImage',
  async (imageId, { rejectWithValue, dispatch, getState }) => {
    try {
      // Önce mevcut referans ID'sini al
      const { currentReference } = getState().references;
      const referenceId = currentReference?.id;
      
      // Resmi sil
      await apiClient.delete(`${API_PATH}/images/${imageId}`);
      
      // Eğer referans ID'si varsa, referans detaylarını yeniden yükle
      if (referenceId) {
        await dispatch(fetchReferenceById(referenceId));
      }
      
      return imageId;
    } catch (error) {
      console.error('Resim silinirken hata oluştu:', error);
      return rejectWithValue(error.response?.data?.message || 'Resim silinirken bir hata oluştu');
    }
  }
);

export const activateReference = createAsyncThunk(
  'references/activateReference',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.patch(`${API_PATH}/activate/${id}`);
      
      // Referans detaylarını yeniden yükle
      await dispatch(fetchReferenceById(id));
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Referans aktifleştirilirken hata oluştu:', error);
      return rejectWithValue(error.response?.data?.message || 'Referans aktifleştirilirken bir hata oluştu');
    }
  }
);

export const deactivateReference = createAsyncThunk(
  'references/deactivateReference',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.patch(`${API_PATH}/deactivate/${id}`);
      
      // Referans detaylarını yeniden yükle
      await dispatch(fetchReferenceById(id));
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Referans pasifleştirilirken hata oluştu:', error);
      return rejectWithValue(error.response?.data?.message || 'Referans pasifleştirilirken bir hata oluştu');
    }
  }
);

// Referans resmi yükleme
export const uploadReferenceImage = createAsyncThunk(
  'references/uploadReferenceImage',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      console.log('Resim yükleme formData:', Object.fromEntries(formData.entries()));
      
      // Referans ID'sini al
      const referenceId = formData.get('referenceId');
      
      // API çağrısı - Swagger dokümanına göre endpoint ve parametreler
      const response = await apiClient.post(`${API_PATH}/${referenceId}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (uploadReferenceImage):', response.data);
      
      // Resim yüklendikten sonra referans detaylarını yeniden yükle
      // Bu sayede tüm resimler (eski ve yeni) güncel olarak alınacak
      await dispatch(fetchReferenceById(referenceId));
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Resim yüklenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Resim yüklenirken bir hata oluştu');
    }
  }
);

const initialState = {
  references: [],
  currentReference: null,
  referenceImages: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: 9
  }
};

const referenceSlice = createSlice({
  name: 'references',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch references
      .addCase(fetchReferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.references = action.payload;
      })
      .addCase(fetchReferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch paginated references
      .addCase(fetchPaginatedReferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaginatedReferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagination = {
          content: action.payload.content || [],
          totalPages: action.payload.totalPages || 0,
          totalElements: action.payload.totalElements || 0,
          currentPage: action.payload.number || 0,
          pageSize: action.payload.size || 9
        };
        // Ayrıca references dizisini de güncelle
        state.references = action.payload.content || [];
      })
      .addCase(fetchPaginatedReferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch reference by id
      .addCase(fetchReferenceById.fulfilled, (state, action) => {
        console.log('fetchReferenceById.fulfilled:', action.payload);
        // Referans detaylarını güncelle
        state.currentReference = action.payload;
        
        // Eğer bu referans references dizisinde varsa, onu da güncelle
        const index = state.references.findIndex(ref => ref.id === action.payload.id);
        if (index !== -1) {
          state.references[index] = action.payload;
        }
      })
      // Fetch active references
      .addCase(fetchActiveReferences.fulfilled, (state, action) => {
        state.references = action.payload;
      })
      // Fetch latest references
      .addCase(fetchLatestReferences.fulfilled, (state, action) => {
        state.references = action.payload;
      })
      // Search references by title
      .addCase(searchReferencesByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchReferencesByTitle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.references = action.payload;
        
        // Pagination verilerini de güncelle
        state.pagination = {
          content: action.payload,
          totalPages: Math.ceil(action.payload.length / state.pagination.pageSize),
          totalElements: action.payload.length,
          currentPage: state.pagination.currentPage || 0,
          pageSize: state.pagination.pageSize || 9
        };
      })
      .addCase(searchReferencesByTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Search references by service
      .addCase(searchReferencesByService.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchReferencesByService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.references = action.payload;
        
        // Pagination verilerini de güncelle
        state.pagination = {
          content: action.payload,
          totalPages: Math.ceil(action.payload.length / state.pagination.pageSize),
          totalElements: action.payload.length,
          currentPage: state.pagination.currentPage || 0,
          pageSize: state.pagination.pageSize || 9
        };
      })
      .addCase(searchReferencesByService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch reference images
      .addCase(fetchReferenceImages.fulfilled, (state, action) => {
        state.referenceImages = action.payload;
      })
      // Add reference
      .addCase(addReference.fulfilled, (state, action) => {
        state.references.push(action.payload);
      })
      // Add reference image
      .addCase(addReferenceImage.fulfilled, (state, action) => {
        state.referenceImages.push(action.payload);
      })
      // Update reference
      .addCase(updateReference.fulfilled, (state, action) => {
        const index = state.references.findIndex(ref => ref.id === action.payload.id);
        if (index !== -1) {
          // Mevcut resimleri koru
          const existingImages = state.references[index].images || [];
          
          // Güncellenen referansta images yoksa, mevcut resimleri koru
          state.references[index] = {
            ...action.payload,
            images: action.payload.images || existingImages
          };
          
          // Eğer currentReference bu referans ise, onu da güncelle
          if (state.currentReference && state.currentReference.id === action.payload.id) {
            const currentImages = state.currentReference.images || [];
            state.currentReference = {
              ...action.payload,
              images: action.payload.images || currentImages
            };
          }
        }
      })
      // Delete reference
      .addCase(deleteReference.fulfilled, (state, action) => {
        state.references = state.references.filter(ref => ref.id !== action.payload);
      })
      // Delete reference image
      .addCase(deleteReferenceImage.fulfilled, (state, action) => {
        state.referenceImages = state.referenceImages.filter(img => img.id !== action.payload);
      })
      // Activate reference
      .addCase(activateReference.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(activateReference.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Referansı bul ve aktif durumunu güncelle
        const index = state.references.findIndex(ref => ref.id === action.payload.id || ref.id === action.meta.arg);
        if (index !== -1) {
          // Eğer API'den tam referans verisi dönüyorsa, onu kullan
          if (action.payload.id) {
            state.references[index] = action.payload;
          } else {
            // Sadece aktif durumunu güncelle
            state.references[index].active = true;
          }
        }
        
        // Eğer currentReference bu referans ise, onu da güncelle
        if (state.currentReference && (state.currentReference.id === action.payload.id || state.currentReference.id === action.meta.arg)) {
          if (action.payload.id) {
            state.currentReference = action.payload;
          } else {
            state.currentReference.active = true;
          }
        }
      })
      .addCase(activateReference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Referans aktifleştirilirken bir hata oluştu';
      })
      // Deactivate reference
      .addCase(deactivateReference.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deactivateReference.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Referansı bul ve aktif durumunu güncelle
        const index = state.references.findIndex(ref => ref.id === action.payload.id || ref.id === action.meta.arg);
        if (index !== -1) {
          // Eğer API'den tam referans verisi dönüyorsa, onu kullan
          if (action.payload.id) {
            state.references[index] = action.payload;
          } else {
            // Sadece aktif durumunu güncelle
            state.references[index].active = false;
          }
        }
        
        // Eğer currentReference bu referans ise, onu da güncelle
        if (state.currentReference && (state.currentReference.id === action.payload.id || state.currentReference.id === action.meta.arg)) {
          if (action.payload.id) {
            state.currentReference = action.payload;
          } else {
            state.currentReference.active = false;
          }
        }
      })
      .addCase(deactivateReference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Referans pasifleştirilirken bir hata oluştu';
      })
      // Upload reference image
      .addCase(uploadReferenceImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadReferenceImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Eğer thumbnail veya logo yüklendiyse, currentReference'ı güncelle
        if (state.currentReference && action.payload) {
          if (action.payload.isThumbnail) {
            state.currentReference.thumbnailUrl = action.payload.url;
          } else if (action.payload.isClientLogo) {
            state.currentReference.clientLogo = action.payload.url;
          } else if (action.payload.referenceId === state.currentReference.id) {
            // Yeni bir resim eklendiyse, images dizisine ekle
            if (!state.currentReference.images) {
              state.currentReference.images = [];
            }
            // Mevcut resimleri koru ve yeni resmi ekle
            state.currentReference.images = [
              ...state.currentReference.images,
              action.payload
            ];
          }
        }
      })
      .addCase(uploadReferenceImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Resim yüklenirken bir hata oluştu';
      });
  }
});

export default referenceSlice.reducer; 