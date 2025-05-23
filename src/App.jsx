import './App.css';
import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/slices/authSlice';

// Dashboard bileşenini lazy loading ile yükle - gecikme olmadan
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Sayfa değişimlerinde scroll pozisyonunu sıfırlayan bileşen
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Daha performanslı yükleme bileşeni
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="text-emerald-500 text-xl">Yükleniyor...</div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  
  // Uygulama yüklenme durumunu izle
  const [isReady, setIsReady] = useState(false);
  
  // Access Token varsa kullanıcı bilgisini getir
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log('App: Found access token, fetching user info');
      dispatch(getCurrentUser())
        .unwrap()
        .then(userData => {
          console.log('App: User info fetched successfully', userData);
        })
        .catch(error => {
          console.error('App: Error fetching user info', error);
          // Token sorunluysa temizle
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        });
    } else {
      console.log('App: No access token found');
    }
  }, [dispatch]);
  
  // Tüm kaynaklar yüklendikten sonra ready durumuna geç - basitleştirilmiş
  useEffect(() => {
    // Sayfa zaten yüklendiyse hemen göster
    if (document.readyState === 'complete') {
      setIsReady(true);
    } else {
      // Hızlı bir şekilde hazır ol
      window.addEventListener('load', () => setIsReady(true), { once: true });
      // Yine de belirli bir süre sonra hazır ol
      const timer = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          {isReady && <Dashboard />}
        </Suspense>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </Router>
    </HelmetProvider>
  );
}

export default App;
