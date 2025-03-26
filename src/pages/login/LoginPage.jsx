import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { loginUser, selectAuth } from '../../store/slices/authSlice';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  const { user, loading, error } = useSelector(selectAuth);
  
  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa ve yeterli yetkisi varsa admin paneline yönlendir
    if (user && (user.role === 'ADMIN' || user.role === 'EDITOR')) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      toast.error(t('login.fieldsRequired'));
      return;
    }
    
    try {
      const resultAction = await dispatch(loginUser(credentials));
      
      if (loginUser.fulfilled.match(resultAction)) {
        // Debug için token'ları konsola yazdır
        console.log('Access Token:', localStorage.getItem('accessToken'));
        console.log('Refresh Token:', localStorage.getItem('refreshToken'));
        console.log('User:', localStorage.getItem('user'));
        
        toast.success(t('login.success'));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{t('login.title')} | Demirci Yazılım</title>
        <meta name="description" content={t('login.meta')} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Background gradient */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          
          {/* Dot pattern */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgb(51 65 85 / 0.4) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        
        <div className="relative z-10 w-full max-w-md px-6 py-12 lg:py-16">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-8 w-8 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500" />
              <span className="text-2xl font-bold text-white">Demirci Yazılım</span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-6 mb-2">{t('login.title')}</h1>
            <p className="text-gray-400 text-center max-w-xs">{t('login.subtitle')}</p>
          </div>
          
          <div className="relative">
            {/* Card background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl opacity-30 blur-lg"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-gray-900 shadow-xl rounded-xl border border-gray-800 p-8"
            >
              {error && (
                <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6">
                  {t(`login.errors.${error}`, {defaultValue: t('login.errors.default')})}
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">{t('login.username')}</label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">{t('login.password')}</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? t('login.loggingIn') : t('login.loginButton')}
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-emerald-500 hover:text-emerald-400 transition">
              {t('login.backToHome')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage; 