import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferences, fetchActiveReferences, searchReferencesByTitle, searchReferencesByService, addReference } from '../store/slices/referenceSlice';
import { useTranslation } from 'react-i18next';
import ReferenceCard from '../components/ReferenceCard';

// Test için örnek veriler
const sampleReferences = [
  {
    id: 1,
    title: "E-Ticaret Projesi",
    summary: "Büyük bir e-ticaret platformu için geliştirdiğimiz özel çözüm.",
    description: "Bu projede müşterimiz için kapsamlı bir e-ticaret çözümü geliştirdik. Ürün yönetimi, stok takibi, ödeme entegrasyonu ve müşteri yönetimi gibi birçok özellik içeriyor.",
    thumbnailUrl: "https://picsum.photos/id/1/800/600",
    clientName: "ABC Şirketi",
    clientLogo: "https://ui-avatars.com/api/?name=ABC&background=random",
    projectUrl: "https://example.com",
    completionDate: "2023-05-15T00:00:00.000Z",
    technologies: "React, Node.js, MongoDB",
    active: true
  },
  {
    id: 2,
    title: "Kurumsal Web Sitesi",
    summary: "Uluslararası bir şirket için tasarladığımız modern kurumsal web sitesi.",
    description: "Müşterimizin global marka kimliğini yansıtan, çok dilli ve tamamen duyarlı bir kurumsal web sitesi tasarladık ve geliştirdik.",
    thumbnailUrl: "https://picsum.photos/id/2/800/600",
    clientName: "XYZ Global",
    clientLogo: "https://ui-avatars.com/api/?name=XYZ&background=random",
    projectUrl: "https://example.org",
    completionDate: "2023-08-22T00:00:00.000Z",
    technologies: "Vue.js, Laravel, MySQL",
    active: true
  },
  {
    id: 3,
    title: "Mobil Uygulama",
    summary: "iOS ve Android platformları için geliştirdiğimiz e-ticaret uygulaması.",
    description: "Müşterimizin mevcut e-ticaret sitesini tamamlayan, kullanıcı dostu bir mobil uygulama geliştirdik. Uygulama, bildirimler, konum tabanlı öneriler ve hızlı ödeme gibi özellikler içeriyor.",
    thumbnailUrl: "https://picsum.photos/id/3/800/600",
    clientName: "MobilTech",
    clientLogo: "https://ui-avatars.com/api/?name=MT&background=random",
    projectUrl: "https://example.net",
    completionDate: "2024-01-10T00:00:00.000Z",
    technologies: "React Native, Firebase",
    active: true
  }
];

const ReferencePage = () => {
  const dispatch = useDispatch();
  const { references, status, error } = useSelector((state) => state.references);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'active', 'title', 'technology'
  const [useSampleData, setUseSampleData] = useState(false); // API bağlantısı yoksa örnek veri kullanmak için
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReference, setNewReference] = useState({
    title: '',
    summary: '',
    description: '',
    thumbnailUrl: '',
    clientName: '',
    clientLogo: '',
    projectUrl: '',
    completionDate: '',
    technologies: '',
    active: true
  });

  useEffect(() => {
    if (status === 'idle') {
      // Varsayılan olarak sadece aktif referansları getir
      dispatch(fetchActiveReferences());
      setFilterType('active');
    }
  }, [status, dispatch]);

  // API'den gelen veriyi konsola yazdıralım
  useEffect(() => {
    console.log('References data:', references);
    // Eğer API'den veri gelmezse ve hata varsa, örnek veriyi kullanmayı aktifleştirelim
    if (status === 'failed' || (Array.isArray(references) && references.length === 0)) {
      setUseSampleData(true);
    }
  }, [references, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (filterType === 'title') {
      dispatch(searchReferencesByTitle(searchTerm));
    } else if (filterType === 'technology') {
      dispatch(searchReferencesByService(searchTerm));
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSearchTerm('');

    if (type === 'all') {
      dispatch(fetchReferences());
    } else if (type === 'active') {
      dispatch(fetchActiveReferences());
    }
  };

  // Örnek veri kullanımını açıp kapatmak için
  const toggleSampleData = () => {
    setUseSampleData(!useSampleData);
  };

  // Form alanlarını güncelle
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReference({
      ...newReference,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Yeni referans ekle
  const handleAddReference = (e) => {
    e.preventDefault();
    dispatch(addReference(newReference))
      .unwrap()
      .then(() => {
        // Başarılı olursa formu sıfırla ve modalı kapat
        setNewReference({
          title: '',
          summary: '',
          description: '',
          thumbnailUrl: '',
          clientName: '',
          clientLogo: '',
          projectUrl: '',
          completionDate: '',
          technologies: '',
          active: true
        });
        setIsModalOpen(false);
        // Referansları yeniden yükle
        dispatch(fetchReferences());
      })
      .catch((error) => {
        console.error('Referans eklenirken hata oluştu:', error);
      });
  };

  if (status === 'loading' && !useSampleData) {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  // references'ın bir dizi olup olmadığını kontrol edelim
  // Eğer örnek veri kullanılıyorsa, sampleReferences'ı kullan
  const referencesList = useSampleData ? sampleReferences : (Array.isArray(references) ? references : []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{t('references.title')}</h1>
          <p className="text-gray-400">{t('references.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          disabled={useSampleData}
        >
          {t('references.addNew')}
        </button>
      </div>
      
      {/* Test modu butonu */}
      <div className="mb-4">
        <button 
          onClick={toggleSampleData}
          className={`px-4 py-2 rounded-md transition-colors ${useSampleData ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
        >
          {useSampleData ? 'Test Modu: Açık (Örnek Veri)' : 'Test Modu: Kapalı (API Verisi)'}
        </button>
        {status === 'failed' && !useSampleData && (
          <p className="text-red-400 mt-2">{t('references.error', { error })}</p>
        )}
      </div>
      
      {/* Filtreler ve Arama */}
      <div className="mb-8 bg-white/5 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'all' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            disabled={useSampleData}
          >
            {t('references.filters.all')}
          </button>
          <button 
            onClick={() => handleFilterChange('active')}
            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'active' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            disabled={useSampleData}
          >
            {t('references.filters.active')}
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
            disabled={filterType === 'all' || filterType === 'active' || useSampleData}
          >
            <option value="title">{t('references.filters.byTitle')}</option>
            <option value="technology">{t('references.filters.byService')}</option>
          </select>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('references.filters.searchPlaceholder')}
            className="flex-1 bg-white/10 text-white border border-white/20 rounded-md px-3 py-2 placeholder-gray-400"
            disabled={filterType === 'all' || filterType === 'active' || useSampleData}
          />
          <button 
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            disabled={filterType === 'all' || filterType === 'active' || !searchTerm.trim() || useSampleData}
          >
            {t('references.filters.search')}
          </button>
        </form>
      </div>
      
      {referencesList.length === 0 ? (
        <p className="text-white text-center py-8">{t('references.noReferences')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referencesList.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      )}

      {/* Referans Ekleme Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{t('references.addNew')}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddReference} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.title')}*
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReference.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.summary')}*
                </label>
                <input
                  type="text"
                  name="summary"
                  value={newReference.summary}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.description')}
                </label>
                <textarea
                  name="description"
                  value={newReference.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.thumbnailUrl')}
                </label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  value={newReference.thumbnailUrl}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('references.form.clientName')}
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={newReference.clientName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('references.form.clientLogo')}
                  </label>
                  <input
                    type="url"
                    name="clientLogo"
                    value={newReference.clientLogo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.projectUrl')}
                </label>
                <input
                  type="url"
                  name="projectUrl"
                  value={newReference.projectUrl}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.completionDate')}
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={newReference.completionDate ? new Date(newReference.completionDate).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('references.form.services')}
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={newReference.technologies}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={newReference.active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 rounded border-gray-600 bg-gray-700 focus:ring-emerald-500"
                />
                <label className="ml-2 text-sm text-gray-300">
                  {t('references.form.active')}
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  {t('references.form.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  {t('references.form.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencePage; 