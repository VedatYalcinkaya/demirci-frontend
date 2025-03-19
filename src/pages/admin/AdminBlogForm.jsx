import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { 
  fetchBlogById, 
  addBlog, 
  updateBlog, 
  deleteBlog, 
  activateBlog, 
  deactivateBlog 
} from '../../store/slices/blogSlice';
import AdminHeader from '../../components/AdminHeader';
import { 
  IconPhoto, 
  IconX, 
  IconCheck, 
  IconTrash, 
  IconDeviceFloppy, 
  IconEye, 
  IconEyeOff,
  IconArrowLeft,
  IconEyeShare,
  IconExclamationCircle
} from '@tabler/icons-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const currentBlog = useSelector((state) => state.blogs.currentBlog);
  const loading = useSelector((state) => state.blogs.status === 'loading');
  const error = useSelector((state) => state.blogs.error);
  
  const [formMode, setFormMode] = useState(id ? 'edit' : 'create');
  const [previewMode, setPreviewMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [slugChanged, setSlugChanged] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    author: '',
    thumbnailUrl: '',
    tags: [],
    publishDate: new Date(),
    active: true,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
  });

  // File input ref
  const fileInputRef = useRef(null);
  
  // Resim yükleme durumu
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  // Form başlangıcında ve ID değiştiğinde blog verisini çek
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    } else {
      // Yeni blog oluşturma durumunda form verilerini sıfırla
      setFormData({
        title: '',
        content: '',
        summary: '',
        author: '',
        thumbnailUrl: '',
        tags: [],
        publishDate: new Date(),
        active: true,
        slug: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
      });
    }
  }, [id, dispatch]);
  
  // Blog verisi geldiğinde form alanlarını doldur
  useEffect(() => {
    if (currentBlog && id) {
      const tags = currentBlog.tags ? 
        currentBlog.tags.split(',').map(tag => tag.trim()) : 
        [];
      
      setFormData({
        title: currentBlog.title || '',
        content: currentBlog.content || '',
        summary: currentBlog.summary || '',
        author: currentBlog.author || '',
        thumbnailUrl: currentBlog.thumbnailUrl || '',
        tags: tags,
        publishDate: currentBlog.publishDate ? new Date(currentBlog.publishDate) : new Date(),
        active: currentBlog.active ?? true,
        slug: currentBlog.slug || '',
        metaTitle: currentBlog.metaTitle || '',
        metaDescription: currentBlog.metaDescription || '',
        metaKeywords: currentBlog.metaKeywords || '',
        canonicalUrl: currentBlog.canonicalUrl || '',
      });
      
      setImagePreview(currentBlog.thumbnailUrl || '');
    }
  }, [currentBlog, id]);
  
  // Başlık değiştiğinde ve henüz slug manuel değiştirilmediyse otomatik slug oluştur
  useEffect(() => {
    if (!slugChanged && formData.title && formMode === 'create') {
      const generatedSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, slugChanged, formMode]);
  
  // Input değişikliklerini yakala
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Checkbox için checked değerini, diğer inputlar için value değerini kullan
    const inputValue = type === 'checkbox' ? checked : value;
    
    // Slug değişimini izle
    if (name === 'slug') {
      setSlugChanged(true);
    }
    
    // Form verilerini güncelle
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Başlık ve açıklama değiştiğinde, SEO meta bilgilerini otomatik doldur (sadece boşsa)
    if (name === 'title' && !formData.metaTitle) {
      setFormData(prev => ({ ...prev, metaTitle: value }));
    }
    
    if (name === 'summary' && !formData.metaDescription) {
      setFormData(prev => ({ ...prev, metaDescription: value }));
    }
  };
  
  // RichText editörü değişiklikleri
  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  // Tags değişimini izle
  const handleTagsChange = (e) => {
    const tagsValue = e.target.value;
    // Virgülle ayrılmış etiketleri diziye dönüştür
    const tagsArray = tagsValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };
  
  // Resim yükleme işlemi
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Kabul edilen dosya türleri
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!acceptedTypes.includes(file.type)) {
      toast.error(t('admin.invalidImageType'));
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error(t('admin.imageSizeTooLarge'));
      return;
    }
    
    // Dosya yükleniyor...
    setImageUploading(true);
    
    // Dosyanın önizlemesini göster
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    
    // API'ye dosya yükleme işlemi burada olacak
    // Gerçek uygulamada bu işlem API'ye dosya yükleme endpoint'ini kullanacak
    // Burada basitçe URL olarak kaydediyoruz
    
    // Simüle edilmiş yükleme işlemi
    setTimeout(() => {
      // Yükleme tamamlandı
      setImageUploading(false);
      
      // Dosya yükleme işlemi başarılı olduğunda form verilerini güncelle
      // Gerçek uygulamada burada API'den dönen URL kullanılacak
      setFormData(prev => ({
        ...prev,
        thumbnailUrl: imagePreview // Gerçek uygulamada API'den dönen URL kullanılacak
      }));
      
      toast.success(t('admin.imageUploaded'));
    }, 1500);
  };
  
  // Form doğrulama
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error(t('admin.titleRequired'));
      return false;
    }
    
    if (!formData.content.trim()) {
      toast.error(t('admin.contentRequired'));
      return false;
    }
    
    if (!formData.summary.trim()) {
      toast.error(t('admin.summaryRequired'));
      return false;
    }
    
    if (!formData.author.trim()) {
      toast.error(t('admin.authorRequired'));
      return false;
    }
    
    if (!formData.slug.trim()) {
      toast.error(t('admin.slugRequired'));
      return false;
    }
    
    return true;
  };
  
  // Form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormSubmitting(true);
    
    try {
      // Tagları string formatına çevir
      const tagsString = formData.tags.join(', ');
      
      // API'ye gönderilecek veri
      const blogData = {
        ...formData,
        tags: tagsString
      };
      
      if (formMode === 'create') {
        await dispatch(addBlog(blogData)).unwrap();
        toast.success(t('admin.blogCreated'));
        navigate('/admin/blogs');
      } else {
        await dispatch(updateBlog({ id, blogData })).unwrap();
        toast.success(t('admin.blogUpdated'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(formMode === 'create' ? t('admin.errorCreatingBlog') : t('admin.errorUpdatingBlog'));
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Blog silme işlemi
  const handleDelete = () => {
    if (!id) return;
    
    setFormSubmitting(true);
    
    dispatch(deleteBlog(id))
      .unwrap()
      .then(() => {
        toast.success(t('admin.blogDeleted'));
        navigate('/admin/blogs');
      })
      .catch((error) => {
        console.error('Delete error:', error);
        toast.error(t('admin.errorDeletingBlog'));
      })
      .finally(() => {
        setConfirmDelete(false);
        setFormSubmitting(false);
      });
  };
  
  // Blog durumunu değiştirme
  const handleToggleStatus = async () => {
    if (!id) return;
    
    setFormSubmitting(true);
    
    try {
      if (formData.active) {
        await dispatch(deactivateBlog(id)).unwrap();
        setFormData(prev => ({ ...prev, active: false }));
        toast.success(t('admin.blogDeactivated'));
      } else {
        await dispatch(activateBlog(id)).unwrap();
        setFormData(prev => ({ ...prev, active: true }));
        toast.success(t('admin.blogActivated'));
      }
    } catch (error) {
      console.error('Status toggle error:', error);
      toast.error(t('admin.errorChangingStatus'));
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Blog önizleme
  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  // Blog önizleme içeriği
  const renderPreview = () => {
    return (
      <div className="blog-preview bg-gray-800 p-6 rounded-lg text-white">
        <div className="mb-6">
          {imagePreview && (
            <img 
              src={imagePreview}
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
          <div className="text-gray-400 mb-2">
            {formData.author} • {formData.publishDate && new Date(formData.publishDate).toLocaleDateString()}
          </div>
          <div className="flex gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 text-emerald-400 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-300">{formData.summary}</p>
        </div>
        <div 
          className="blog-content text-gray-300"
          dangerouslySetInnerHTML={{ __html: formData.content }}
        />
      </div>
    );
  };
  
  // Slug oluşturma yardımcı fonksiyonu
  const generateSlug = (text) => {
    if (!text) return '';
    
    return text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };
  
  // Loading durumu
  if (loading && !formSubmitting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  // Hata durumu
  if (error && !formSubmitting) {
    return (
      <div className="text-center p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <IconExclamationCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold text-red-500">{t('admin.error')}</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/admin/blogs')} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
          >
            <IconArrowLeft className="mr-2" />
            {t('admin.goBack')}
          </button>
        </div>
      </div>
    );
  }

  const tabButtonClass = (tabName) => 
    `px-4 py-2 rounded-t-lg ${activeTab === tabName 
      ? 'bg-gray-800 text-emerald-400 border-t border-l border-r border-gray-700' 
      : 'bg-gray-900 text-gray-400 hover:text-white'}`;
  
  return (
    <div className="admin-blog-form">
      <AdminHeader 
        title={formMode === 'create' ? t('admin.createBlog') : t('admin.editBlog')} 
        backButton={true}
        backTo="/admin/blogs"
      />
      
      {previewMode ? (
        <div className="mb-4">
          <button 
            onClick={handlePreview} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors mb-4 flex items-center"
          >
            <IconArrowLeft className="mr-2" />
            {t('admin.backToEdit')}
          </button>
          {renderPreview()}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              className={tabButtonClass('general')}
              onClick={() => setActiveTab('general')}
            >
              Genel Bilgiler
            </button>
            <button 
              className={tabButtonClass('seo')}
              onClick={() => setActiveTab('seo')}
            >
              SEO
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sol kolon - Ana içerik */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                      Başlık *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Blog başlığını girin"
                    />
                    {!formData.title.trim() && (
                      <p className="mt-1 text-sm text-red-500">Başlık gereklidir</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-400 mb-1">
                      Özet *
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Blog özetini girin"
                    ></textarea>
                    {!formData.summary.trim() && (
                      <p className="mt-1 text-sm text-red-500">Özet gereklidir</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">
                      İçerik *
                    </label>
                    <div className="rounded-lg overflow-hidden">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                      />
                    </div>
                    {!formData.content.trim() && (
                      <p className="mt-1 text-sm text-red-500">İçerik gereklidir</p>
                    )}
                  </div>
                </div>
                
                {/* Sağ kolon - Meta veriler */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Durum
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-emerald-500 rounded border-gray-700 bg-gray-700 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-white">Aktif</span>
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        Bu blog yayınlandığında görünür olacak
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Blog Görseli
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      {imagePreview ? (
                        <div className="mb-3">
                          <img 
                            src={imagePreview} 
                            alt="Önizleme" 
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-gray-700 rounded-lg flex justify-center items-center mb-3">
                          <IconPhoto className="h-12 w-12 text-gray-500" />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleThumbnailChange}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          disabled={imageUploading}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                          {imageUploading ? 
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div> : 
                            <IconPhoto className="mr-2 h-5 w-5" />
                          }
                          {imageUploading ? 'Yükleniyor...' : 'Görsel Seç'}
                        </button>
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview('');
                              setFormData(prev => ({ ...prev, thumbnailUrl: '' }));
                            }}
                            className="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <IconTrash className="mr-2 h-5 w-5" />
                            Görseli Kaldır
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Önerilen boyut: 1200x630 piksel, maksimum 5MB
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-400 mb-1">
                      Yazar *
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Yazar adını girin"
                    />
                    {!formData.author.trim() && (
                      <p className="mt-1 text-sm text-red-500">Yazar gereklidir</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-1">
                      Etiketler
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={handleTagsChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Etiketleri virgülle ayırın"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Etiketleri virgülle ayırın (örn: react, javascript, web)
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium text-gray-400 mb-1">
                      Yayın Tarihi
                    </label>
                    <input
                      type="date"
                      id="publishDate"
                      name="publishDate"
                      value={formData.publishDate ? new Date(formData.publishDate).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-400 mb-1">
                    URL Bağlantısı (Slug) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-700 bg-gray-700 text-gray-400">
                      /blog/
                    </span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-r-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="blog-basligi"
                    />
                  </div>
                  {!formData.slug.trim() && (
                    <p className="mt-1 text-sm text-red-500">URL bağlantısı gereklidir</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Başlıktan otomatik oluşturulur, SEO için önemlidir
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-400 mb-1">
                    Meta Başlık
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="SEO meta başlığı"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Boş bırakılırsa blog başlığı kullanılır
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-400 mb-1">
                    Meta Açıklama
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="SEO meta açıklaması"
                  ></textarea>
                  <p className="text-xs text-gray-400 mt-1">
                    Boş bırakılırsa blog özeti kullanılır
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-400 mb-1">
                    Meta Anahtar Kelimeler
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="SEO anahtar kelimeleri, virgülle ayırın"
                  />
                </div>
                
                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-400 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    id="canonicalUrl"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://example.com/blog/orjinal-icerik"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    İçerik başka bir sayfanın kopyasıysa, orijinal sayfanın URL'si
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/admin/blogs')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <IconArrowLeft className="mr-2" />
                  Geri Dön
                </button>
                
                <button
                  type="button"
                  onClick={handlePreview}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <IconEyeShare className="mr-2" />
                  Önizle
                </button>
                
                {formMode === 'edit' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <IconTrash className="mr-2" />
                      Sil
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleToggleStatus}
                      className={`${formData.active ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg transition-colors flex items-center`}
                    >
                      {formData.active ? <IconEyeOff className="mr-2" /> : <IconEye className="mr-2" />}
                      {formData.active ? 'Pasifleştir' : 'Aktifleştir'}
                    </button>
                  </>
                )}
              </div>
              
              <button
                type="submit"
                disabled={formSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                {formSubmitting && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>}
                <IconDeviceFloppy className="mr-2" />
                {formMode === 'create' ? 'Oluştur' : 'Güncelle'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Silme Onay Modalı */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-white">Blogu Sil</h3>
            <p className="mb-6 text-gray-300">
              Bu blog yazısını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
              >
                <IconX className="mr-2" />
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
              >
                <IconTrash className="mr-2" />
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogForm;