import { configureStore } from '@reduxjs/toolkit';
import referenceReducer from './slices/referenceSlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
  reducer: {
    references: referenceReducer,
    blogs: blogReducer,
    // Diğer reducer'lar buraya eklenecek
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Serileştirme kontrolünü devre dışı bırakıyoruz
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 