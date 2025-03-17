import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr, enUS, de } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const ReferenceCard = ({ reference }) => {
  const { t, i18n } = useTranslation();

  // reference prop'unun geçerli olduğundan emin olalım
  if (!reference || typeof reference !== 'object') {
    return null;
  }

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

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <Link to={`/referanslar/${reference.id}`}>
        {reference.thumbnailUrl && (
          <img 
            src={reference.thumbnailUrl} 
            alt={reference.title || 'Referans'} 
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">{reference.title || 'İsimsiz Referans'}</h2>
          <p className="text-gray-300 mb-2">{reference.summary || ''}</p>
          
          {reference.clientName && (
            <div className="flex items-center mb-2">
              {reference.clientLogo && (
                <img 
                  src={reference.clientLogo} 
                  alt={reference.clientName} 
                  className="w-6 h-6 mr-2 rounded-full object-cover"
                />
              )}
              <span className="text-gray-300">{reference.clientName}</span>
            </div>
          )}
          
          {reference.completionDate && (
            <p className="text-sm text-gray-400 mb-2">
              {t('references.completionDate')}: {formatDate(reference.completionDate)}
            </p>
          )}
          
          {reference.technologies && (
            <div className="mb-2">
              <span className="text-sm bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                {reference.technologies}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      {reference.projectUrl && (
        <div className="px-4 pb-4">
          <a 
            href={reference.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {t('references.visitWebsite')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default ReferenceCard; 