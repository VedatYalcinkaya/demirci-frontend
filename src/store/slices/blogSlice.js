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
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log('API Response (fetchBlogById):', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog detayları yüklenirken hata oluştu:', error);
      throw error;
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug) => {
    try {
      const response = await axios.get(`${API_URL}/slug/${slug}`);
      console.log('API Response (fetchBlogBySlug):', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Blog detayları yüklenirken hata oluştu:', error);
      throw error;
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
  async (title) => {
    const response = await axios.get(`${API_URL}/search/title`, { params: { title } });
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  }
);

export const searchBlogsByTag = createAsyncThunk(
  'blogs/searchBlogsByTag',
  async (tag) => {
    const response = await axios.get(`${API_URL}/search/tag`, { params: { tag } });
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
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
      const response = await axios.post(`${API_URL}/create-with-thumbnail`, formData, {
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
      // FormData'daki blog ID'sini al veya doğrudan blog ID'sini kullan
      const blogId = formData.get('blogId') || formData.id;

      const response = await axios.post(`${API_URL}/${blogId}/update-with-thumbnail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('API Yanıtı (updateBlogWithThumbnail):', response.data);
      
      // Güncellemeden sonra blog detaylarını yeniden yükle
      const updatedData = response.data.data || response.data;
      
      // Blog detaylarını yeniden yükle
      if (updatedData.id) {
        await dispatch(fetchBlogById(updatedData.id));
      }
      
      return updatedData;
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
      .addCase(searchBlogsByTitle.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      // Search blogs by tag
      .addCase(searchBlogsByTag.fulfilled, (state, action) => {
        state.blogs = action.payload;
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