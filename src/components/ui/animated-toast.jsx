import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Bildirim türlerine göre renkler ve ikonlar
const toastConfig = {
  success: {
    bgColor: 'bg-green-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  error: {
    bgColor: 'bg-red-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  },
  warning: {
    bgColor: 'bg-yellow-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  info: {
    bgColor: 'bg-blue-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
};

// Toast animasyon varyantları
const toastVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

/**
 * Animasyonlu bildirim bileşeni
 * @param {Object} props
 * @param {string} props.type - Bildirim türü ('success', 'error', 'warning', 'info')
 * @param {string} props.message - Bildirim mesajı
 * @param {boolean} props.isVisible - Bildirimin görünür olup olmadığı
 * @param {function} props.onClose - Bildirim kapandığında çağrılacak fonksiyon
 * @param {number} props.duration - Bildirimin ekranda kalma süresi (ms)
 * @param {string} props.position - Bildirimin konumu ('top-right', 'top-left', 'bottom-right', 'bottom-left')
 */
export const AnimatedToast = ({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  duration = 5000,
  position = 'top-right'
}) => {
  const { t } = useTranslation();
  
  // Pozisyon sınıflarını belirle
  const positionClasses = {
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2'
  };
  
  // Otomatik kapanma süresi
  useEffect(() => {
    if (isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);
  
  // Toast içeriği
  const toastContent = (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed ${positionClasses[position]} z-[9999] p-4 rounded-md shadow-lg ${toastConfig[type]?.bgColor || 'bg-gray-700'} text-white max-w-md`}
    >
      <div className="flex items-center">
        {toastConfig[type]?.icon}
        <span>{message || t(`notifications.${type}`)}</span>
      </div>
    </motion.div>
  );
  
  return (
    <AnimatePresence>
      {isVisible && toastContent}
    </AnimatePresence>
  );
};

/**
 * ToastContainer bileşeni - Birden fazla bildirimi yönetmek için kullanılır
 */
export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <AnimatedToast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            isVisible={true}
            onClose={() => onClose(toast.id)}
            duration={toast.duration || 5000}
            position={toast.position || 'top-right'}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedToast; 