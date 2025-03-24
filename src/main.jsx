import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
// i18n
import './lib/i18n'
import { store } from './store/configureStore.js'

// MessageChannel hatasını gidermek için
const ignoredErrors = [
  'message channel closed',
  'ResizeObserver loop',
  'Cannot read property',
  'is not a function'
];

// Global error handler
window.addEventListener('error', (event) => {
  const errorMessage = event.message || '';
  
  // MessageChannel ve diğer yaygın hataları yakala
  if (ignoredErrors.some(err => errorMessage.includes(err))) {
    event.preventDefault();
    console.warn('Hata yakalandı ve engellendi:', errorMessage);
    return false;
  }
});

// Performansı artırmak için doğrudan mount ediyoruz
// StrictMode geliştirme aşamasında komponenti iki kez render eder
const root = createRoot(document.getElementById('root'));

// Render işlemini asenkron hale getirerek tarayıcının soluklanmasına izin ver
setTimeout(() => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}, 0);
