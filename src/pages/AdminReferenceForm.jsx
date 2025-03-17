import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  fetchReferenceById, 
  addReference, 
  updateReference, 
  uploadReferenceImage, 
  deleteReferenceImage,
  activateReference,
  deactivateReference
} from '../store/slices/referenceSlice';
import { toast } from 'react-hot-toast';

const AdminReferenceForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { currentReference, status, error } = useSelector((state) => state.references);
  
  const [formData, setFormData] = useState({
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

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [clientLogoFile, setClientLogoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  const [imageDisplayOrder, setImageDisplayOrder] = useState(0);

  // Referans detaylarını yükle (düzenleme modu için)
  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchReferenceById(id));
    }
  }, [dispatch, id, isEditMode]);

  // Referans verilerini forma doldur
  useEffect(() => {
    if (isEditMode && currentReference) {
      setFormData({
        title: currentReference.title || '',
        summary: currentReference.summary || '',
        description: currentReference.description || '',
        thumbnailUrl: currentReference.thumbnailUrl || '',
        clientName: currentReference.clientName || '',
        clientLogo: currentReference.clientLogo || '',
        projectUrl: currentReference.projectUrl || '',
        completionDate: currentReference.completionDate ? new Date(currentReference.completionDate).toISOString().split('T')[0] : '',
        technologies: Array.isArray(currentReference.technologies) ? currentReference.technologies.join(', ') : currentReference.technologies || '',
        active: currentReference.active !== undefined ? currentReference.active : true
      });

      // Referans resimlerini yükle
      if (currentReference.images && Array.isArray(currentReference.images)) {
        // Her resim için URL'i doğru şekilde ayarla
        const processedImages = currentReference.images.map(img => ({
          ...img,
          url: img.url || img.imageUrl // Backend'den gelen veri yapısına göre uyarla
        }));
        console.log('Yüklenen resimler:', processedImages);
        setImages(processedImages);
      }
    }
  }, [currentReference, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setFormData({
        ...formData,
        thumbnailUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleClientLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClientLogoFile(file);
      setFormData({
        ...formData,
        clientLogo: URL.createObjectURL(file)
      });
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Yeni resimleri önizleme için ekle
    const newImagePreviews = files.map(file => ({
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      file: file,
      isNew: true,
      caption: '',
      displayOrder: newImages.length + images.length // Mevcut resimlerin sayısına göre sıralama
    }));
    
    setNewImages([...newImages, ...newImagePreviews]);
  };

  const handleRemoveImage = (image) => {
    if (image.isNew) {
      // Yeni eklenen resmi kaldır
      setNewImages(newImages.filter(img => img.id !== image.id));
    } else {
      // Mevcut resmi kaldırılacaklar listesine ekle
      setRemovedImages([...removedImages, image.id]);
      setImages(images.filter(img => img.id !== image.id));
    }
  };

  const handleImageClick = (params) => {
    console.log('Image clicked:', params);
    const { index, isNew } = params;
    setSelectedImageIndex({ index, isNew });
    
    if (isNew) {
      setImageCaption(newImages[index].caption || '');
      setImageDisplayOrder(newImages[index].displayOrder || 0);
    } else {
      setImageCaption(images[index].caption || '');
      setImageDisplayOrder(images[index].displayOrder || 0);
    }
  };

  const handleImageCaptionChange = (e) => {
    setImageCaption(e.target.value);
    if (selectedImageIndex !== null) {
      const { index, isNew } = selectedImageIndex;
      if (isNew) {
        const updatedImages = [...newImages];
        updatedImages[index].caption = e.target.value;
        setNewImages(updatedImages);
      } else {
        const updatedImages = [...images];
        updatedImages[index].caption = e.target.value;
        setImages(updatedImages);
      }
    }
  };

  const handleImageDisplayOrderChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setImageDisplayOrder(value);
    if (selectedImageIndex !== null) {
      const { index, isNew } = selectedImageIndex;
      if (isNew) {
        const updatedImages = [...newImages];
        updatedImages[index].displayOrder = value;
        setNewImages(updatedImages);
      } else {
        const updatedImages = [...images];
        updatedImages[index].displayOrder = value;
        setImages(updatedImages);
      }
    }
  };

  const saveImageDetails = () => {
    if (selectedImageIndex !== null) {
      const { index, isNew } = selectedImageIndex;
      if (isNew) {
        const updatedImages = [...newImages];
        updatedImages[index].caption = imageCaption;
        updatedImages[index].displayOrder = imageDisplayOrder;
        setNewImages(updatedImages);
      } else {
        const updatedImages = [...images];
        updatedImages[index].caption = imageCaption;
        updatedImages[index].displayOrder = imageDisplayOrder;
        setImages(updatedImages);
      }
      setSelectedImageIndex(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = t('admin.titleRequired');
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = t('admin.summaryRequired');
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t('admin.descriptionRequired');
    }
    
    if (!isEditMode && !thumbnailFile && !formData.thumbnailUrl) {
      newErrors.thumbnailUrl = t('admin.thumbnailRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Teknolojileri diziye dönüştür
      const technologiesArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');
      
      // Referans verilerini hazırla
      const referenceData = {
        ...formData,
        // Backend'in beklediği formatta technologies alanını gönder (string olarak)
        technologies: technologiesArray.join(','),
        completionDate: formData.completionDate ? new Date(formData.completionDate).toISOString() : null
      };
      
      // Dosyaları ekle
      if (thumbnailFile) {
        referenceData.thumbnailFile = thumbnailFile;
      }
      
      if (clientLogoFile) {
        referenceData.clientLogoFile = clientLogoFile;
      }
      
      console.log('Form verileri:', referenceData);
      
      let result;
      
      if (isEditMode) {
        // Referansı güncelle
        result = await dispatch(updateReference({
          ...referenceData,
          id
        })).unwrap();
        
        // Güncelleme sonrası referans detaylarını yeniden yükleme işlemini kaldırdık
        // Bu işlem eski resimlerin kaybolmasına neden olabilir
      } else {
        // Yeni referans ekle
        result = await dispatch(addReference(referenceData)).unwrap();
      }
      
      console.log('API yanıtı:', result);
      
      if (!result || !result.id) {
        throw new Error(t('admin.invalidApiResponse'));
      }
      
      // Referans ID'sini al
      const referenceId = result.id;
      
      // Kaldırılacak resimleri sil
      if (isEditMode && removedImages.length > 0) {
        for (const imageId of removedImages) {
          try {
            console.log('Resim siliniyor:', imageId);
            await dispatch(deleteReferenceImage(imageId)).unwrap();
          } catch (error) {
            console.error('Resim silinirken hata oluştu:', error);
          }
        }
      }
      
      // Yeni ek resimleri yükle
      if (newImages.length > 0) {
        for (const image of newImages) {
          try {
            const imageFormData = new FormData();
            // Swagger dokümanına göre parametreler
            imageFormData.append('file', image.file);
            imageFormData.append('referenceId', referenceId);
            imageFormData.append('caption', image.caption || '');
            imageFormData.append('displayOrder', image.displayOrder || 0);
            
            console.log('Ek resim yükleniyor:', image.file.name);
            await dispatch(uploadReferenceImage(imageFormData)).unwrap();
          } catch (imageError) {
            console.error('Ek resim yüklenirken hata oluştu:', imageError);
            // Bir resim yüklenemese bile diğerlerini yüklemeye devam et
          }
        }
        
        // Tüm resimler yüklendikten sonra referans detaylarını yeniden yükleme işlemini kaldırdık
        // Bu işlem eski resimlerin kaybolmasına neden olabilir
      }
      
      // Başarılı mesajı göster ve referanslar sayfasına yönlendir
      alert(isEditMode ? t('admin.referenceUpdated') : t('admin.referenceAdded'));
      navigate('/admin/references');
    } catch (error) {
      console.error('Error saving reference:', error);
      setErrors({
        ...errors,
        submit: error.message || t('admin.errorSavingReference')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? t('admin.editReference') : t('admin.addNewReference')}
        </h1>
        <button
          onClick={() => navigate('/admin/references')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('admin.back')}
        </button>
      </div>

      {status === 'loading' && isEditMode ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-6">
          <p>{error}</p>
          <button
            onClick={() => isEditMode && dispatch(fetchReferenceById(id))}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {t('admin.tryAgain')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="bg-red-500/20 text-red-500 p-4 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temel Bilgiler */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">{t('admin.basicInformation')}</h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.title')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.summary')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full bg-gray-700 border ${errors.summary ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                ></textarea>
                {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full bg-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              
              <div>
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.technologies')}
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder={t('admin.technologiesPlaceholder')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="mt-1 text-xs text-gray-400">{t('admin.technologiesHelp')}</p>
              </div>
              
              <div>
                <label htmlFor="completionDate" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.completionDate')}
                </label>
                <input
                  type="date"
                  id="completionDate"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 mr-2"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-300">
                  {t('admin.active')}
                </label>
              </div>
            </div>
            
            {/* Müşteri Bilgileri ve Görseller */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">{t('admin.clientInformation')}</h2>
                
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('admin.clientName')}
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('admin.projectUrl')}
                  </label>
                  <input
                    type="url"
                    id="projectUrl"
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientLogo" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('admin.clientLogo')}
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.clientLogo && (
                      <div className="relative w-16 h-16">
                        <img
                          src={formData.clientLogo}
                          alt={t('admin.clientLogo')}
                          className="w-16 h-16 object-contain bg-gray-700 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setClientLogoFile(null);
                            setFormData({
                              ...formData,
                              clientLogo: ''
                            });
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      id="clientLogo"
                      onChange={handleClientLogoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="clientLogo"
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formData.clientLogo ? t('admin.changeLogo') : t('admin.uploadLogo')}
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">{t('admin.images')}</h2>
                
                <div>
                  <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('admin.thumbnail')} {!isEditMode && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.thumbnailUrl && (
                      <div className="relative w-24 h-24">
                        <img
                          src={formData.thumbnailUrl}
                          alt={t('admin.thumbnail')}
                          className="w-24 h-24 object-cover bg-gray-700 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailFile(null);
                            setFormData({
                              ...formData,
                              thumbnailUrl: ''
                            });
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      id="thumbnailUrl"
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnailUrl"
                      className={`bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center ${errors.thumbnailUrl ? 'border border-red-500' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formData.thumbnailUrl ? t('admin.changeThumbnail') : t('admin.uploadThumbnail')}
                    </label>
                  </div>
                  {errors.thumbnailUrl && <p className="mt-1 text-sm text-red-500">{errors.thumbnailUrl}</p>}
                </div>
                
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('admin.additionalImages')}
                  </label>
                  <input
                    type="file"
                    id="images"
                    onChange={handleImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center w-fit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {t('admin.addImages')}
                  </label>
                  
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mevcut resimler */}
                    {images.filter(img => !removedImages.includes(img.id)).map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url || image.imageUrl}
                          alt=""
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                          onClick={() => handleImageClick({index, isNew: false})}
                        />
                        {image.caption && (
                          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded truncate">
                            {image.caption}
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-blue-600 text-xs px-2 py-1 rounded-full">
                          {image.displayOrder || 0}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="absolute top-2 right-2 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {/* Yeni eklenen resimler */}
                    {newImages.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt=""
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                          onClick={() => handleImageClick({index, isNew: true})}
                        />
                        {image.caption && (
                          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded truncate">
                            {image.caption}
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-emerald-600 text-xs px-2 py-1 rounded-full">
                          {image.displayOrder || 0}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="absolute top-2 right-2 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/references')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {t('admin.cancel')}
            </button>
            
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  if (formData.active) {
                    dispatch(deactivateReference(id))
                      .unwrap()
                      .then(() => {
                        setFormData({
                          ...formData,
                          active: false
                        });
                        toast.success('Referans başarıyla pasifleştirildi');
                      })
                      .catch((error) => {
                        toast.error('Referans pasifleştirilirken bir hata oluştu');
                        console.error('Hata:', error);
                      });
                  } else {
                    dispatch(activateReference(id))
                      .unwrap()
                      .then(() => {
                        setFormData({
                          ...formData,
                          active: true
                        });
                        toast.success('Referans başarıyla aktifleştirildi');
                      })
                      .catch((error) => {
                        toast.error('Referans aktifleştirilirken bir hata oluştu');
                        console.error('Hata:', error);
                      });
                  }
                }}
                className={`px-6 py-3 ${formData.active ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors flex items-center`}
              >
                {formData.active ? t('admin.deactivate') : t('admin.activate')}
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isEditMode ? t('admin.updateReference') : t('admin.saveReference')}
            </button>
          </div>
        </form>
      )}

      {/* Resim Detayları Modalı */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('admin.imageDetails')}</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="imageCaption" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.imageCaption')}
                </label>
                <input
                  type="text"
                  id="imageCaption"
                  value={imageCaption}
                  onChange={handleImageCaptionChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label htmlFor="imageDisplayOrder" className="block text-sm font-medium text-gray-400 mb-1">
                  {t('admin.displayOrder')}
                </label>
                <input
                  type="number"
                  id="imageDisplayOrder"
                  value={imageDisplayOrder}
                  onChange={handleImageDisplayOrderChange}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {t('admin.cancel')}
              </button>
              <button
                onClick={saveImageDetails}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                {t('admin.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReferenceForm; 