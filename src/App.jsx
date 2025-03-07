import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sayfa değişimlerinde scroll pozisyonunu sıfırlayan bileşen
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Dashboard />
    </Router>
  );
}

export default App;
