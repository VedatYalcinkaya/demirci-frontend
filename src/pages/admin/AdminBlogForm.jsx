import React, { useEffect, useState, useRef, forwardRef, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
// TinyMCE bileşenini lazy loading ile içe aktar
const Editor = lazy(() => import('@tinymce/tinymce-react').then(module => ({
  default: module.Editor
})));
// Highlight.js temel modülünü içe aktar
import hljs from 'highlight.js/lib/core';
// Yalnızca en yaygın kullanılan dilleri kaydet
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
// Tema stilini import et
import 'highlight.js/styles/atom-one-dark.css';

// Dilleri kaydedelim
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

import { 
  fetchBlogById, 
  addBlogWithThumbnail, 
  updateBlogWithThumbnail, 
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

// TinyMCE için yeni bir bileşen oluşturuyorum
const TinyEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  
  const init = {
    height: 500,
    menubar: true,
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount codesample',
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | codesample code | help',
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true,
    content_style: `
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
      pre[class*="language-"] {
        position: relative;
        padding: 1.5rem !important;
        margin: 1rem 0;
        overflow: auto;
        border-radius: 0.5rem;
        background-color: #282c34 !important;
        border: 1px solid #444;
        padding-top: 2.5rem !important;
      }
      .mce-content-body pre[class*="language-"]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 3px 10px;
        font-size: 12px;
        color: #ccc;
        background-color: #2d2d2d;
        text-align: left;
        font-family: monospace;
        border-bottom: 1px solid #444;
      }
      .mce-content-body pre.language-javascript::before { content: "JavaScript"; }
      .mce-content-body pre.language-css::before { content: "CSS"; }
      .mce-content-body pre.language-html::before, 
      .mce-content-body pre.language-markup::before { content: "HTML"; }
      .mce-content-body pre.language-typescript::before { content: "TypeScript"; }
      .mce-content-body pre.language-python::before { content: "Python"; }
      .mce-content-body pre.language-php::before { content: "PHP"; }
      .mce-content-body pre.language-java::before { content: "Java"; }
      .mce-content-body pre.language-csharp::before { content: "C#"; }
      .mce-content-body pre.language-cpp::before { content: "C++"; }
      .mce-content-body pre.language-c::before { content: "C"; }
      .mce-content-body pre.language-bash::before { content: "Bash"; }
      .mce-content-body pre.language-sql::before { content: "SQL"; }
      .mce-content-body pre.language-json::before { content: "JSON"; }
    `,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'TypeScript', value: 'typescript' },
      { text: 'SQL', value: 'sql' },
      { text: 'Bash', value: 'bash' },
      { text: 'JSON', value: 'json' },
    ],
    language: 'tr',
    language_url: '/tinymce/langs/tr.js',
    codesample_global_prismjs: false, // Prism.js yerine highlight.js kullanacağımız için false
    skin: 'oxide-dark',
    content_css: 'dark',
    // Kod bloğu sonrası boşluk için
    end_container_on_empty_block: true,
    // Kod bloğu sorunu için özel ayarlar ve olay dinleyiciler
    setup: function(editor) {
      editor.on('init', function() {
        editor.getDoc().addEventListener('click', function(e) {
          // Kod bloğuna tıklandığında içerisinde bir kod elemanı yoksa oluştur
          if (e.target.nodeName === 'PRE' && e.target.className.includes('language-') && !e.target.querySelector('code')) {
            const code = editor.getDoc().createElement('code');
            code.className = e.target.className;
            code.innerHTML = e.target.innerHTML;
            e.target.innerHTML = '';
            e.target.appendChild(code);
            console.log('Kod elementi oluşturuldu');
          }
        });
        
        // Düzenleyicideki kod bloklarını highlight.js ile vurgula
        const highlightCodeBlocks = () => {
          try {
            const codeBlocks = editor.getDoc().querySelectorAll('pre code');
            if (codeBlocks.length > 0) {
              codeBlocks.forEach(block => {
                hljs.highlightElement(block);
              });
            }
          } catch (error) {
            console.error('Kod vurgulama hatası:', error);
          }
        };
        
        // İçerik değiştiğinde kod bloklarını vurgula
        editor.on('Change', highlightCodeBlocks);
        
        // Başlangıçta kod bloklarını vurgula
        highlightCodeBlocks();
      });
    }
  };
  
  return (
    <Suspense fallback={<div className="h-96 w-full bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">Editor yükleniyor...</div>}>
      <Editor
        apiKey="eclre3f3dtlvfd3y07ezetcslfyzxyfticytyahe3ebq5e1m"
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={init}
      />
    </Suspense>
  );
};

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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  
  // ReactQuill referansı
  const quillRef = useRef(null);
  
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
      setThumbnailFile(null);
    }
  }, [id, dispatch]);
  
  // Blog verisi geldiğinde form alanlarını doldur
  useEffect(() => {
    if (currentBlog && id) {
      const tags = currentBlog.tags ? 
        (typeof currentBlog.tags === 'string' ? 
          currentBlog.tags.split(',').map(tag => tag.trim()) : 
          currentBlog.tags) : 
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
  
  // İçerik alanını TinyMCE ile değiştiriyorum
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
    if (!event.target.files || event.target.files.length === 0) {
      console.log('Dosya seçilmedi');
      return;
    }
    
    const file = event.target.files[0];
    console.log('Seçilen dosya:', file.name, file.type, file.size, 'bytes');
    
    // Kabul edilen dosya türleri
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!acceptedTypes.includes(file.type)) {
      toast.error(t('admin.invalidImageType') || 'Geçersiz dosya türü. Lütfen JPEG, PNG, WebP veya GIF dosyası seçin.');
      console.error('Geçersiz dosya türü:', file.type);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error(t('admin.imageSizeTooLarge') || 'Dosya boyutu çok büyük (Max: 5MB)');
      console.error('Dosya boyutu büyük:', file.size, 'bytes');
      return;
    }
    
    // Dosya yükleniyor durumunu göster
    setImageUploading(true);
    
    try {
      // Dosyayı kaydet
      setThumbnailFile(file);
      
      // Dosyanın önizlemesini göster
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUploading(false);
      };
      reader.onerror = () => {
        console.error('Dosya önizleme hatası');
        toast.error('Görsel önizleme yüklenemedi');
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
      
      console.log('Görsel yüklendi ve önizleme için hazırlandı');
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      toast.error('Görsel yüklenirken bir hata oluştu');
      setImageUploading(false);
    }
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
      // FormData oluştur
      const blogFormData = new FormData();
      
      // Blog verilerini FormData'ya ekle - API'nin beklediği anahtar adlarını kullanmaya dikkat edin
      blogFormData.append('title', formData.title.trim());
      blogFormData.append('content', formData.content);
      blogFormData.append('summary', formData.summary.trim());
      blogFormData.append('author', formData.author.trim());
      
      // Tags'ı string olarak ekle
      const tagsString = formData.tags.join(',').trim();
      if (tagsString) blogFormData.append('tags', tagsString);
      
      // Boolean değerleri string olarak ekle
      blogFormData.append('active', formData.active ? 'true' : 'false');
      
      // URL ve SEO alanları
      blogFormData.append('slug', formData.slug.trim());
      
      // İsteğe bağlı alanları boş olmadığında ekle
      if (formData.metaTitle?.trim()) blogFormData.append('metaTitle', formData.metaTitle.trim());
      if (formData.metaDescription?.trim()) blogFormData.append('metaDescription', formData.metaDescription.trim());
      if (formData.metaKeywords?.trim()) blogFormData.append('metaKeywords', formData.metaKeywords.trim());
      if (formData.canonicalUrl?.trim()) blogFormData.append('canonicalUrl', formData.canonicalUrl.trim());
      
      // Yayın tarihi
      if (formData.publishDate) {
        const dateString = formData.publishDate instanceof Date 
          ? formData.publishDate.toISOString() 
          : new Date(formData.publishDate).toISOString();
        blogFormData.append('publishDate', dateString);
      }
      
      // Resim dosyası varsa ekle
      if (thumbnailFile && thumbnailFile instanceof File) {
        console.log(`Resim ekleniyor: ${thumbnailFile.name}, ${thumbnailFile.type}, ${thumbnailFile.size} bytes`);
        blogFormData.append('thumbnail', thumbnailFile, thumbnailFile.name);
      } else if (imagePreview && formMode === 'edit' && !thumbnailFile) {
        // Eğer düzenleme modundaysak ve kullanıcı yeni bir görsel seçmediyse 
        // mevcut görsel URL'sini gönderelim
        console.log('Mevcut görsel URL kullanılıyor:', formData.thumbnailUrl);
        blogFormData.append('thumbnailUrl', formData.thumbnailUrl);
      }
      
      // FormData içeriğini debug için konsola yazdır
      console.log('FormData içeriği:');
      for (let [key, value] of blogFormData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name} (${value.type}, ${value.size} bytes)` : value);
      }
      
      let result;
      
      if (formMode === 'create') {
        // Yeni blog oluştur
        console.log('Blog ekleniyor...');
        result = await dispatch(addBlogWithThumbnail(blogFormData)).unwrap();
        console.log('Blog eklendi:', result);
        toast.success(t('admin.blogCreated'));
        navigate('/admin/blogs');
      } else if (formMode === 'edit' && id) {
        // Blog güncelle
        console.log('Blog güncelleniyor (ID:', id, ')');
        blogFormData.append('blogId', id);
        result = await dispatch(updateBlogWithThumbnail(blogFormData)).unwrap();
        console.log('Blog güncellendi:', result);
        toast.success(t('admin.blogUpdated'));
      } else {
        throw new Error('Geçersiz form modu veya ID bulunamadı');
      }
    } catch (error) {
      console.error('Submit error:', error?.message || 'Beklenmeyen bir hata oluştu');
      if (error?.response?.data) {
        console.error('API hatası:', error.response.data);
      }
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
                      Başlık * {formData.title?.length > 0 && `(${formData.title.length}/100)`}
                    </label>
                    <input
                      type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Blog başlığını girin"
                      maxLength="100"
                  />
                    {!formData.title.trim() && (
                      <p className="mt-1 text-sm text-red-500">Başlık gereklidir</p>
                    )}
                </div>
                
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-400 mb-1">
                      Özet * {formData.summary?.length > 0 && `(${formData.summary.length}/500)`}
                    </label>
                    <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Blog özeti girin"
                      maxLength="500"
                    ></textarea>
                    {!formData.summary.trim() && (
                      <p className="mt-1 text-sm text-red-500">Özet gereklidir</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Blogun kısa özeti, ana sayfada gösterilir
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">
                      İçerik *
                    </label>
                    <div className="rounded-lg overflow-hidden">
                      <TinyEditor
                        value={formData.content}
                        onChange={(content) => handleEditorChange(content)}
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
                              setThumbnailFile(null);
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
                    URL Bağlantısı (Slug) * {formData.slug?.length > 0 && `(${formData.slug.length}/100)`}
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
                      maxLength="100"
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
                    Meta Başlık {formData.metaTitle?.length > 0 && `(${formData.metaTitle.length}/100)`}
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="SEO meta başlığı"
                    maxLength="100"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Boş bırakılırsa blog başlığı kullanılır
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="metaDescription" className="block text-gray-400 mb-1">
                    {t('admin.metaDescription')} {formData.metaDescription?.length > 0 && `(${formData.metaDescription.length}/160)`}
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="3"
                    maxLength="160"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('admin.metaDescriptionHelp')}
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-400 mb-1">
                    Meta Anahtar Kelimeler {formData.metaKeywords?.length > 0 && `(${formData.metaKeywords.length}/255)`}
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="SEO anahtar kelimeleri, virgülle ayırın"
                    maxLength="255"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Anahtar kelimeleri virgülle ayırarak yazın
                  </p>
              </div>
              
                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-400 mb-1">
                    Canonical URL {formData.canonicalUrl?.length > 0 && `(${formData.canonicalUrl.length}/255)`}
                  </label>
                  <input
                    type="text"
                    id="canonicalUrl"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://example.com/original-content"
                    maxLength="255"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    İçerik başka bir kaynaktan alındıysa, orijinal URL'i belirtin
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