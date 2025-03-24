import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/blogs';

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

// Sayfalama ile blogları getir
export const fetchPaginatedBlogs = createAsyncThunk(
  'blogs/fetchPaginatedBlogs',
  async ({ page = 0, size = 9 }) => {
    try {
      const response = await axios.get(`${API_URL}/paginated`, {
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
      console.error('Bloglar yüklenirken hata oluştu:', error);
      throw error;
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      console.log("blogSlice: Fetching blog by ID:", id);
      const response = await axios.get(`${API_URL}/${id}`);
      console.log('blogSlice: API Response (fetchBlogById):', response.data);
      
      // API yanıtını kontrol et ve uygun şekilde işle
      if (response.data && (response.data.data || response.data.id)) {
        // Önce data içinde mi kontrol et, yoksa direkt response.data'yı al
        const blogData = response.data.data || response.data;
        console.log('blogSlice: Processed blog data:', blogData);
        return blogData;
      } else {
        console.error('blogSlice: Invalid API response structure:', response.data);
        return rejectWithValue('Blog bilgileri alınamadı. Geçersiz API yanıtı.');
      }
    } catch (error) {
      console.error('blogSlice: Blog detayları yüklenirken hata oluştu:', error);
      console.error('blogSlice: Error response:', error.response?.data);
      console.error('blogSlice: Error status:', error.response?.status);
      return rejectWithValue(error.response?.data?.message || error.message || 'Blog detayları yüklenemedi.');
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      console.log("blogSlice: Fetching blog by slug:", slug);
      const response = await axios.get(`${API_URL}/slug/${slug}`);
      console.log('blogSlice: API Response (fetchBlogBySlug):', response.data);
      
      // API yanıtını kontrol et ve uygun şekilde işle
      if (response.data && (response.data.data || response.data.id)) {
        // Önce data içinde mi kontrol et, yoksa direkt response.data'yı al
        const blogData = response.data.data || response.data;
        console.log('blogSlice: Processed blog data:', blogData);
        return blogData;
      } else {
        console.error('blogSlice: Invalid API response structure:', response.data);
        return rejectWithValue('Blog bilgileri alınamadı. Geçersiz API yanıtı.');
      }
    } catch (error) {
      console.error('blogSlice: Blog detayları yüklenirken hata oluştu:', error);
      console.error('blogSlice: Error response:', error.response?.data);
      console.error('blogSlice: Error status:', error.response?.status);
      return rejectWithValue(error.response?.data?.message || error.message || 'Blog detayları yüklenemedi.');
    }
  }
);

export const fetchActiveBlogs = createAsyncThunk(
  'blogs/fetchActiveBlogs',
  async () => {
    const response = await axios.get(`${API_URL}/active`);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const fetchLatestBlogs = createAsyncThunk(
  'blogs/fetchLatestBlogs',
  async (count) => {
    const response = await axios.get(`${API_URL}/latest/${count}`);
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const searchBlogsByTitle = createAsyncThunk(
  'blogs/searchBlogsByTitle',
  async ({ title, page = 0, size = 10, language }) => {
    try {
      console.log('Başlığa göre blog araması yapılıyor:', title, 'page:', page, 'size:', size, 'language:', language);
      
      const params = { 
        title, 
        page, 
        size 
      };
      
      // Dil parametresi varsa ekle
      if (language) {
        params.language = language;
      }
      
      const response = await axios.get(`${API_URL}/search/title`, { params });
      
      console.log('Blog başlık arama sonuçları:', response.data);
      
      // API yanıtı yapısına göre doğru veriyi döndür
      return Array.isArray(response.data) ? response.data : (response.data.data || []);
    } catch (error) {
      console.error('Blog başlık araması sırasında hata:', error);
      throw error;
    }
  }
);

export const searchBlogsByTag = createAsyncThunk(
  'blogs/searchBlogsByTag',
  async ({ tag, page = 0, size = 10, language }) => {
    try {
      console.log('Etikete göre blog araması yapılıyor:', tag, 'page:', page, 'size:', size, 'language:', language);
      
      const params = { 
        tag, 
        page, 
        size 
      };
      
      // Dil parametresi varsa ekle
      if (language) {
        params.language = language;
      }
      
      const response = await axios.get(`${API_URL}/search/tag`, { params });
      
      console.log('Blog etiket arama sonuçları:', response.data);
      
      // API yanıtı yapısına göre doğru veriyi döndür
      return Array.isArray(response.data) ? response.data : (response.data.data || []);
    } catch (error) {
      console.error('Blog etiket araması sırasında hata:', error);
      throw error;
    }
  }
);

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, blog);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Blog eklenirken bir hata oluştu');
    }
  }
);

export const addBlogWithThumbnail = createAsyncThunk(
  'blogs/addBlogWithThumbnail',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('API isteği başlatılıyor (addBlogWithThumbnail):', `${API_URL}/create-with-thumbnail`);
      
      // Alanları sınırlandır
      const title = formData.get('title');
      const trimmedTitle = title && title.length > 95
        ? title.substring(0, 95) + '...'
        : title;
        
      const slug = formData.get('slug');
      const trimmedSlug = slug && slug.length > 95
        ? slug.substring(0, 95) + '...'
        : slug;
        
      const metaDescription = formData.get('metaDescription');
      const trimmedMetaDescription = metaDescription && metaDescription.length > 155 
        ? metaDescription.substring(0, 155) + '...' 
        : metaDescription;
      
      const summary = formData.get('summary');
      const trimmedSummary = summary && summary.length > 495
        ? summary.substring(0, 495) + '...'
        : summary;
      
      const metaKeywords = formData.get('metaKeywords');
      const trimmedMetaKeywords = metaKeywords && metaKeywords.length > 250
        ? metaKeywords.substring(0, 250) + '...'
        : metaKeywords;
        
      const canonicalUrl = formData.get('canonicalUrl');
      const trimmedCanonicalUrl = canonicalUrl && canonicalUrl.length > 250
        ? canonicalUrl.substring(0, 250) + '...'
        : canonicalUrl;

      const metaTitle = formData.get('metaTitle');
      const trimmedMetaTitle = metaTitle && metaTitle.length > 95
        ? metaTitle.substring(0, 95) + '...'
        : metaTitle;

      const blogData = {
        title: trimmedTitle,
        content: formData.get('content'),
        summary: trimmedSummary,
        author: formData.get('author'),
        tags: formData.get('tags'),
        slug: trimmedSlug,
        metaTitle: trimmedMetaTitle,
        metaDescription: trimmedMetaDescription,
        metaKeywords: trimmedMetaKeywords,
        canonicalUrl: trimmedCanonicalUrl,
        active: formData.get('active') === 'true',
        publishDate: formData.get('publishDate')
      };

      // Yeni bir FormData oluştur
      const newFormData = new FormData();
      
      // Blog verilerini JSON string olarak ekle
      newFormData.append('blogData', JSON.stringify(blogData));
      
      // Thumbnail dosyasını ekle
      const thumbnailFile = formData.get('thumbnail');
      if (thumbnailFile instanceof File) {
        newFormData.append('thumbnail', thumbnailFile);
        console.log('Thumbnail dosyası:', thumbnailFile.name, thumbnailFile.type, thumbnailFile.size, 'bytes');
      }

      console.log('Gönderilen blog verisi:', blogData);
      
      const response = await axios.post(`${API_URL}/create-with-thumbnail`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (addBlogWithThumbnail):', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog eklenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Blog eklenirken bir hata oluştu');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${blog.id}`, blog);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Blog güncellenirken bir hata oluştu');
    }
  }
);

export const updateBlogWithThumbnail = createAsyncThunk(
  'blogs/updateBlogWithThumbnail',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const blogId = formData.get('blogId') || formData.id;
      
      if (!blogId) {
        console.error('Blog ID bulunamadı');
        return rejectWithValue('Blog ID bulunamadı. Güncelleme işlemi yapılamaz.');
      }

      // Alanları sınırlandır
      const title = formData.get('title');
      const trimmedTitle = title && title.length > 95
        ? title.substring(0, 95) + '...'
        : title;
        
      const slug = formData.get('slug');
      const trimmedSlug = slug && slug.length > 95
        ? slug.substring(0, 95) + '...'
        : slug;
      
      const metaDescription = formData.get('metaDescription');
      const trimmedMetaDescription = metaDescription && metaDescription.length > 155 
        ? metaDescription.substring(0, 155) + '...' 
        : metaDescription;
        
      const summary = formData.get('summary');
      const trimmedSummary = summary && summary.length > 495
        ? summary.substring(0, 495) + '...'
        : summary;
        
      const metaKeywords = formData.get('metaKeywords');
      const trimmedMetaKeywords = metaKeywords && metaKeywords.length > 250
        ? metaKeywords.substring(0, 250) + '...'
        : metaKeywords;
        
      const canonicalUrl = formData.get('canonicalUrl');
      const trimmedCanonicalUrl = canonicalUrl && canonicalUrl.length > 250
        ? canonicalUrl.substring(0, 250) + '...'
        : canonicalUrl;

      const metaTitle = formData.get('metaTitle');
      const trimmedMetaTitle = metaTitle && metaTitle.length > 95
        ? metaTitle.substring(0, 95) + '...'
        : metaTitle;

      // Blog verilerini formData'dan çıkar
      const blogData = {
        id: blogId,
        title: trimmedTitle,
        content: formData.get('content'),
        summary: trimmedSummary,
        author: formData.get('author'),
        tags: formData.get('tags'),
        slug: trimmedSlug,
        metaTitle: trimmedMetaTitle,
        metaDescription: trimmedMetaDescription,
        metaKeywords: trimmedMetaKeywords,
        canonicalUrl: trimmedCanonicalUrl,
        active: formData.get('active') === 'true',
        publishDate: formData.get('publishDate'),
        thumbnailUrl: formData.get('thumbnailUrl') // Mevcut thumbnail URL'sini ekle
      };

      // Yeni bir FormData oluştur
      const newFormData = new FormData();
      
      // Blog verilerini JSON string olarak ekle
      newFormData.append('blogData', JSON.stringify(blogData));
      
      // Thumbnail dosyasını ekle
      const thumbnailFile = formData.get('thumbnail');
      if (thumbnailFile instanceof File) {
        newFormData.append('thumbnail', thumbnailFile);
        console.log('Yeni thumbnail dosyası:', thumbnailFile.name, thumbnailFile.type, thumbnailFile.size, 'bytes');
      } else if (formData.get('thumbnailUrl')) {
        console.log('Mevcut thumbnail URL kullanılıyor:', formData.get('thumbnailUrl'));
      }

      console.log('Gönderilen blog verisi:', blogData);
      
      const response = await axios.post(`${API_URL}/${blogId}/update-with-thumbnail`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (updateBlogWithThumbnail):', response.data);
      
      if (response.data.data?.id) {
        await dispatch(fetchBlogById(response.data.data.id));
      }
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog güncellenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Blog güncellenirken bir hata oluştu');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Blog silinirken bir hata oluştu');
    }
  }
);

export const activateBlog = createAsyncThunk(
  'blogs/activateBlog',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${API_URL}/activate/${id}`);
      
      // Blog detaylarını yeniden yükle
      await dispatch(fetchBlogById(id));
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog aktifleştirilirken hata oluştu:', error);
      return rejectWithValue(error.response?.data?.message || 'Blog aktifleştirilirken bir hata oluştu');
    }
  }
);

export const deactivateBlog = createAsyncThunk(
  'blogs/deactivateBlog',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${API_URL}/deactivate/${id}`);
      
      // Blog detaylarını yeniden yükle
      await dispatch(fetchBlogById(id));
      
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog pasifleştirilirken hata oluştu:', error);
      return rejectWithValue(error.response?.data?.message || 'Blog pasifleştirilirken bir hata oluştu');
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
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

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch paginated blogs
      .addCase(fetchPaginatedBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaginatedBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagination = {
          content: action.payload.content || [],
          totalPages: action.payload.totalPages || 0,
          totalElements: action.payload.totalElements || 0,
          currentPage: action.payload.number || 0,
          pageSize: action.payload.size || 9
        };
        // Ayrıca blogs dizisini de güncelle
        state.blogs = action.payload.content || [];
      })
      .addCase(fetchPaginatedBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch blog by id
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = action.payload;
        
        // Eğer bu blog blogs dizisinde varsa, onu da güncelle
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch blog by slug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch active blogs
      .addCase(fetchActiveBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      // Fetch latest blogs
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      // Search blogs by title
      .addCase(searchBlogsByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBlogsByTitle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
        
        // Pagination verilerini de güncelle
        state.pagination = {
          content: action.payload,
          totalPages: Math.ceil(action.payload.length / state.pagination.pageSize),
          totalElements: action.payload.length,
          currentPage: state.pagination.currentPage || 0,
          pageSize: state.pagination.pageSize || 9
        };
      })
      .addCase(searchBlogsByTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Search blogs by tag
      .addCase(searchBlogsByTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBlogsByTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
        
        // Pagination verilerini de güncelle
        state.pagination = {
          content: action.payload,
          totalPages: Math.ceil(action.payload.length / state.pagination.pageSize),
          totalElements: action.payload.length,
          currentPage: state.pagination.currentPage || 0,
          pageSize: state.pagination.pageSize || 9
        };
      })
      .addCase(searchBlogsByTag.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add blog
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      // Add blog with thumbnail
      .addCase(addBlogWithThumbnail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBlogWithThumbnail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(addBlogWithThumbnail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Blog eklenirken bir hata oluştu';
      })
      // Update blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        
        // Eğer currentBlog bu blog ise, onu da güncelle
        if (state.currentBlog && state.currentBlog.id === action.payload.id) {
          state.currentBlog = action.payload;
        }
      })
      // Update blog with thumbnail
      .addCase(updateBlogWithThumbnail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlogWithThumbnail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        
        // Eğer currentBlog bu blog ise, onu da güncelle
        if (state.currentBlog && state.currentBlog.id === action.payload.id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(updateBlogWithThumbnail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Blog güncellenirken bir hata oluştu';
      })
      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      })
      // Activate blog
      .addCase(activateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(activateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Blogu bul ve aktif durumunu güncelle
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id || blog.id === action.meta.arg);
        if (index !== -1) {
          // Eğer API'den tam blog verisi dönüyorsa, onu kullan
          if (action.payload.id) {
            state.blogs[index] = action.payload;
          } else {
            // Sadece aktif durumunu güncelle
            state.blogs[index].active = true;
          }
        }
        
        // Eğer currentBlog bu blog ise, onu da güncelle
        if (state.currentBlog && (state.currentBlog.id === action.payload.id || state.currentBlog.id === action.meta.arg)) {
          if (action.payload.id) {
            state.currentBlog = action.payload;
          } else {
            state.currentBlog.active = true;
          }
        }
      })
      .addCase(activateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Blog aktifleştirilirken bir hata oluştu';
      })
      // Deactivate blog
      .addCase(deactivateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deactivateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Blogu bul ve aktif durumunu güncelle
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id || blog.id === action.meta.arg);
        if (index !== -1) {
          // Eğer API'den tam blog verisi dönüyorsa, onu kullan
          if (action.payload.id) {
            state.blogs[index] = action.payload;
          } else {
            // Sadece aktif durumunu güncelle
            state.blogs[index].active = false;
          }
        }
        
        // Eğer currentBlog bu blog ise, onu da güncelle
        if (state.currentBlog && (state.currentBlog.id === action.payload.id || state.currentBlog.id === action.meta.arg)) {
          if (action.payload.id) {
            state.currentBlog = action.payload;
          } else {
            state.currentBlog.active = false;
          }
        }
      })
      .addCase(deactivateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Blog pasifleştirilirken bir hata oluştu';
      });
  }
});

export default blogSlice.reducer; 