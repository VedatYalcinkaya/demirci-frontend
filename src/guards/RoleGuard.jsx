import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser, selectIsAuthenticated, getCurrentUser } from '../store/slices/authSlice';

// Belirli rollere sahip kullanıcıların erişebileceği route'ları koruyan bileşen
const RoleGuard = ({ children, allowedRoles }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Eğer user null ama token varsa kullanıcı bilgisini almaya çalış
  useEffect(() => {
    if (!user && localStorage.getItem('accessToken')) {
      dispatch(getCurrentUser());
    }
  }, [user, dispatch]);
  
  // Debug için rolleri ve token'ları konsola yazdır
  console.log('RoleGuard - Current path:', location.pathname);
  console.log('RoleGuard - User:', user);
  console.log('RoleGuard - Is Authenticated:', isAuthenticated);
  console.log('RoleGuard - Access Token exists:', !!localStorage.getItem('accessToken'));
  console.log('RoleGuard - Refresh Token exists:', !!localStorage.getItem('refreshToken'));
  console.log('RoleGuard - Allowed Roles:', allowedRoles);
  
  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!isAuthenticated && !localStorage.getItem('accessToken')) {
    console.log('RoleGuard - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Kullanıcı bilgisi henüz yüklenmediyse bekle
  if (!user && localStorage.getItem('accessToken')) {
    console.log('RoleGuard - User loading, access token exists');
    return <div>Yükleniyor...</div>; // Ya da bir loading göstergesi
  }
  
  // Eğer kullanıcı var ama gerekli rollere sahip değilse ana sayfaya yönlendir
  if (user) {
    // Not: Frontend'de roller ROLE_ prefix'i olmadan saklanıyor
    // Veritabanında roller de ADMIN, EDITOR şeklinde ise direkt karşılaştırabiliriz
    const userRole = user.role; // "ADMIN" veya "EDITOR"
    
    console.log('RoleGuard - User Role:', userRole);
    console.log('RoleGuard - Checking against allowed roles:', allowedRoles);
    
    const hasPermission = allowedRoles.includes(userRole);
    
    if (!hasPermission) {
      console.warn('RoleGuard - Permission denied, user role:', userRole);
      return <Navigate to="/" replace />;
    }
  }
  
  console.log('RoleGuard - Access granted');
  return <>{children}</>;
};

export default RoleGuard; 