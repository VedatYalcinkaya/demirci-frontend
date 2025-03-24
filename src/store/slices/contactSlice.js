import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactService } from '../../services/api';

// İletişim formu gönderme async thunk
export const sendContactForm = createAsyncThunk(
  'contact/sendContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await contactService.sendContactForm(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Teklif formu gönderme async thunk
export const sendQuoteForm = createAsyncThunk(
  'contact/sendQuoteForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await contactService.sendQuoteForm(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Başlangıç durumu
const initialState = {
  contactForm: {
    loading: false,
    success: false,
    error: null,
    data: null
  },
  quoteForm: {
    loading: false,
    success: false,
    error: null,
    data: null
  }
};

// Contact Slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactForm: (state) => {
      state.contactForm = initialState.contactForm;
    },
    resetQuoteForm: (state) => {
      state.quoteForm = initialState.quoteForm;
    }
  },
  extraReducers: (builder) => {
    // İletişim formu
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.contactForm.loading = true;
        state.contactForm.success = false;
        state.contactForm.error = null;
      })
      .addCase(sendContactForm.fulfilled, (state, action) => {
        state.contactForm.loading = false;
        state.contactForm.success = true;
        state.contactForm.data = action.payload;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.contactForm.loading = false;
        state.contactForm.error = action.payload;
      });

    // Teklif formu
    builder
      .addCase(sendQuoteForm.pending, (state) => {
        state.quoteForm.loading = true;
        state.quoteForm.success = false;
        state.quoteForm.error = null;
      })
      .addCase(sendQuoteForm.fulfilled, (state, action) => {
        state.quoteForm.loading = false;
        state.quoteForm.success = true;
        state.quoteForm.data = action.payload;
      })
      .addCase(sendQuoteForm.rejected, (state, action) => {
        state.quoteForm.loading = false;
        state.quoteForm.error = action.payload;
      });
  }
});

export const { resetContactForm, resetQuoteForm } = contactSlice.actions;

// Selector'lar
export const selectContactFormState = (state) => state.contact.contactForm;
export const selectQuoteFormState = (state) => state.contact.quoteForm;

export default contactSlice.reducer; 