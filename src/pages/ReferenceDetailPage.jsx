import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferenceById, fetchReferenceImages } from '../store/slices/referenceSlice';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr, enUS, de } from 'date-fns/locale';

const ReferenceDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentReference, referenceImages, status, error } = useSelector((state) => state.references);
  const { t, i18n } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchReferenceById(id));
      dispatch(fetchReferenceImages(id));
    }
  }, [dispatch, id]);

  // Tarih formatını ve dil ayarını belirle
  const getLocale = () => {
    switch (i18n.language) {
      case 'tr': return tr;
      case 'de': return de;
      default: return enUS;
    }
  };

  // Tamamlanma tarihini formatla
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'PP', { locale: getLocale() });
    } catch (error) {
      console.error('Tarih formatı hatası:', error);
      return dateString;
    }
  };

  // Yükleniyor durumu
  if (status === 'loading' || !currentReference) {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (status === 'failed') {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="bg-red-500/20 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{t('references.error.title')}</h2>
          <p>{error}</p>
          <Link to="/referanslar" className="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
            {t('references.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  // Referans bulunamadı durumu
  if (!currentReference) {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="bg-yellow-500/20 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{t('references.notFound.title')}</h2>
          <p>{t('references.notFound.message')}</p>
          <Link to="/referanslar" className="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
            {t('references.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  // Resim galerisi için resimler
  const images = currentReference.images || referenceImages || [];

  return (
    <div className="container mx-auto mt-15 p-4">
      {/* Üst Kısım - Başlık ve Geri Butonu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">{currentReference.title}</h1>
        <Link to="/referanslar" className="bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors">
          {t('references.backToList')}
        </Link>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Taraf - Resim Galerisi */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 rounded-lg overflow-hidden">
            {/* Ana Resim */}
            <div className="relative aspect-video overflow-hidden">
              {images.length > 0 ? (
                <img 
                  src={images[activeImageIndex]?.imageUrl || currentReference.thumbnailUrl} 
                  alt={images[activeImageIndex]?.caption || currentReference.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={currentReference.thumbnailUrl} 
                  alt={currentReference.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Küçük Resimler */}
            {images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button 
                    key={image.id} 
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${index === activeImageIndex ? 'border-emerald-500' : 'border-transparent'}`}
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.caption || `${currentReference.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Resim Açıklaması */}
            {images[activeImageIndex]?.caption && (
              <div className="p-4 bg-black/30">
                <p className="text-gray-300 text-sm italic">{images[activeImageIndex].caption}</p>
              </div>
            )}
          </div>

          {/* Açıklama */}
          <div className="mt-8 bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">{t('references.description')}</h2>
            <div className="text-gray-300 space-y-4">
              <p className="font-medium text-lg">{currentReference.summary}</p>
              <p>{currentReference.description}</p>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Detaylar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-white">{t('references.details')}</h2>
            
            {/* Müşteri Bilgisi */}
            {currentReference.clientName && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">{t('references.client')}</h3>
                <div className="flex items-center">
                  {currentReference.clientLogo && (
                    <img 
                      src={currentReference.clientLogo} 
                      alt={currentReference.clientName} 
                      className="w-10 h-10 mr-3 rounded-full object-cover bg-white/10 p-1"
                    />
                  )}
                  <span className="text-white font-medium">{currentReference.clientName}</span>
                </div>
              </div>
            )}
            
            {/* Tamamlanma Tarihi */}
            {currentReference.completionDate && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">{t('references.completionDate')}</h3>
                <p className="text-white">{formatDate(currentReference.completionDate)}</p>
              </div>
            )}
            
            {/* Teknolojiler */}
            {currentReference.technologies && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">{t('references.services')}</h3>
                <div className="flex flex-wrap gap-2">
                  {currentReference.technologies.split(',').map((service, index) => (
                    <span 
                      key={index} 
                      className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm"
                    >
                      {service.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Proje URL */}
            {currentReference.projectUrl && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">{t('references.projectUrl')}</h3>
                <a 
                  href={currentReference.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
                >
                  {t('references.visitWebsite')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            
            {/* Oluşturulma ve Güncellenme Tarihleri */}
            <div className="border-t border-white/10 pt-4 mt-6">
              <div className="flex justify-between text-xs text-gray-400">
                <div>
                  <span className="block">{t('references.createdAt')}</span>
                  <span>{formatDate(currentReference.createdAt)}</span>
                </div>
                <div className="text-right">
                  <span className="block">{t('references.updatedAt')}</span>
                  <span>{formatDate(currentReference.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetailPage; 