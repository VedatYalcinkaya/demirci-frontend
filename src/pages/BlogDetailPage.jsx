import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr, de, enUS } from 'date-fns/locale';
import i18next from 'i18next';
import { fetchBlogById, fetchBlogBySlug, fetchActiveBlogs } from '../store/slices/blogSlice';
import BlogCard from '../components/BlogCard';
import DOMPurify from 'dompurify';
// Highlight.js ana modülünü içe aktar
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-dark.css'; // Koyu tema

// Highlight.js dil modüllerini tembel yükleme (sadece gerçekten ihtiyaç duyulduğunda yüklenecek)
const loadLanguage = async (langName) => {
  try {
    const lang = await import(`highlight.js/lib/languages/${langName}`);
    hljs.registerLanguage(langName, lang.default);
  } catch (e) {
    console.warn(`Dil yüklenirken hata: ${langName}`, e);
  }
};

// Gerekli dilleri yalnızca ihtiyaç duyulduğunda yükle
const loadCommonLanguages = async () => {
  const commonLanguages = ['javascript', 'typescript', 'css', 'xml', 'python', 'java', 'csharp', 'bash', 'json', 'sql', 'php'];
  await Promise.all(commonLanguages.map(lang => loadLanguage(lang)));
};

import { IconCalendar, IconUser, IconTag, IconArrowLeft, IconAlertTriangle, IconClipboard, IconCheck } from '@tabler/icons-react';

const getLocale = () => {
  const language = i18next.language;
  if (language === 'tr') return tr;
  if (language === 'de') return de;
  return enUS;
};

const BlogDetailPage = () => {
  // URL parametrelerini kontrol et
  const params = useParams();
  const { id, slug } = params; // Hem id hem de slug parametrelerini al
  
  // Gerçekte hangi parametreyi kullanacağımızı belirle
  const blogIdentifier = slug || id || params.slug || '';
  
  console.log('BlogDetailPage başlatıldı');
  console.log('URL parametreleri:', params);
  console.log('Kullanılacak identifier:', blogIdentifier);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [languagesLoaded, setLanguagesLoaded] = useState(false);
  
  const { currentBlog, status, error } = useSelector(state => state.blogs);
  const loading = status === 'loading';
  const blogs = useSelector(state => state.blogs.blogs);

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  
  // Sayfa yüklendiğinde dil modüllerini yükle
  useEffect(() => {
    loadCommonLanguages().then(() => {
      setLanguagesLoaded(true);
    });
  }, []);
  
  // Blog bilgilerini yükle
  useEffect(() => {
    console.log("Blog yükleme useEffect çalıştı");
    console.log("Blog identifier:", blogIdentifier);
    
    if (!blogIdentifier) {
      console.error("Blog id veya slug bulunamadı");
      setFetchError("Blog bulunamadı: URL parametresi eksik");
      return;
    }
    
    const fetchBlog = async () => {
      try {
        console.log("Blog verisi yükleniyor...");
        
        let result;
        // ID olarak sayısal değer mi, yoksa slug olarak string mi kontrol et
        if (!isNaN(Number(blogIdentifier))) {
          console.log("Numerik ID kullanılıyor:", blogIdentifier);
          result = await dispatch(fetchBlogById(blogIdentifier)).unwrap();
        } else {
          console.log("String slug kullanılıyor:", blogIdentifier);
          result = await dispatch(fetchBlogBySlug(blogIdentifier)).unwrap();
        }
        
        console.log("Blog yükleme sonucu:", result);
        
        if (result) {
          console.log("Blog başarıyla yüklendi:", result);
          setBlogLoaded(true);
          setFetchError(null);
        } else {
          console.error("Blog yüklendi ancak veri boş");
          setFetchError("Blog verisi alınamadı");
        }
      } catch (err) {
        console.error("Blog yüklenirken hata:", err);
        setFetchError(err.message || "Blog yüklenirken bir hata oluştu");
      }
    };
    
    fetchBlog();
    
    // İlgili blogları yükle
    dispatch(fetchActiveBlogs())
      .then(action => {
        console.log("Aktif bloglar yüklendi:", action.payload);
      })
      .catch(err => {
        console.error("Aktif bloglar yüklenirken hata:", err);
      });
  }, [dispatch, blogIdentifier]);
  
  // İlgili blogları hazırla
  useEffect(() => {
    console.log("İlgili blogları hazırlama useEffect çalıştı");
    console.log("Current blog:", currentBlog);
    console.log("Blogs:", blogs?.length || 0);
    
    if (blogs?.length > 0 && currentBlog?.tags) {
      console.log("İlgili bloglar hazırlanıyor");
      // İlgili blogları filtrele (aynı etiketleri içeren bloglar)
      const currentBlogTags = currentBlog.tags.split(',').map(tag => tag.trim().toLowerCase());
      
      const related = blogs
        .filter(blog => 
          blog.id !== currentBlog.id && 
          blog.active &&
          blog.tags && 
          currentBlogTags.some(tag => 
            blog.tags.toLowerCase().includes(tag)
          )
        )
        .slice(0, 3);
        
      console.log("İlgili bloglar hazırlandı:", related);
      setRelatedBlogs(related);
    } else {
      console.log("İlgili bloglar hazırlanamadı, veri eksik:", {
        hasBlogs: Boolean(blogs?.length > 0),
        hasCurrentBlog: Boolean(currentBlog),
        hasCurrentBlogTags: Boolean(currentBlog?.tags)
      });
    }
  }, [currentBlog, blogs]);
  
  // İçerik yüklendiğinde kod bloklarını vurgula
  useEffect(() => {
    if (currentBlog?.content && languagesLoaded) {
      // DOMPurify ayarları
      DOMPurify.addHook('afterSanitizeAttributes', function(node) {
        if (node.nodeName === 'PRE' || node.nodeName === 'CODE') {
          const classes = node.getAttribute('class');
          if (classes && classes.includes('language-')) {
            node.setAttribute('class', classes);
          }
        }
      });

      // Kod bloklarını renklendirme
      setTimeout(() => {
        try {
          // Kod bloklarını kontrol et ve düzelt
          document.querySelectorAll('pre > code').forEach(element => {
            // Pre elementinin class'ını code elementine aktarma
            if (element.parentNode.className.includes('language-') && !element.className.includes('language-')) {
              const languageClass = element.parentNode.className.match(/language-(\w+)/);
              if (languageClass) {
                element.className = languageClass[0];
              }
            }
            
            // Highlight.js ile kodları renklendir
            hljs.highlightElement(element);
          });
          
          // Kod bloklarına kopyalama butonu ekleme
          document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
            // Eğer daha önce kopyalama butonu eklenmediyse
            if (!pre.querySelector('.copy-button')) {
              const copyButton = document.createElement('button');
              copyButton.className = 'copy-button';
              copyButton.textContent = 'Kopyala';
              copyButton.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: #2d2d2d;
                border: none;
                color: #ccc;
                padding: 4px 8px;
                cursor: pointer;
                border-radius: 4px;
                font-size: 12px;
                z-index: 10;
              `;
              
              // Kopyalama işlevi
              copyButton.addEventListener('click', () => {
                const code = pre.querySelector('code')?.textContent;
                if (code) {
                  navigator.clipboard.writeText(code).then(() => {
                    copyButton.textContent = 'Kopyalandı!';
                    setTimeout(() => {
                      copyButton.textContent = 'Kopyala';
                    }, 2000);
                  }).catch(err => {
                    console.error('Kopyalama hatası:', err);
                    copyButton.textContent = 'Hata!';
                    setTimeout(() => {
                      copyButton.textContent = 'Kopyala';
                    }, 2000);
                  });
                }
              });
              
              // PRE etiketinin pozisyonunu ayarlama
              pre.style.position = 'relative';
              pre.appendChild(copyButton);
              
              // Dil etiketi ekleme
              const langClass = Array.from(pre.classList).find(cls => cls.startsWith('language-'));
              if (langClass) {
                const language = langClass.replace('language-', '');
                const langLabel = document.createElement('div');
                langLabel.textContent = language;
                langLabel.className = 'language-label';
                langLabel.style.cssText = `
                  position: absolute;
                  top: 5px;
                  left: 5px;
                  background: #2d2d2d;
                  color: #ccc;
                  padding: 2px 8px;
                  font-size: 12px;
                  border-radius: 4px;
                  z-index: 10;
                `;
                pre.appendChild(langLabel);
              }
            }
          });
        } catch (error) {
          console.error('Kod işleme hatası:', error);
        }
      }, 100);
    }
  }, [currentBlog, languagesLoaded]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: getLocale() });
    } catch (error) {
      console.error('Tarih formatlanırken hata:', error);
      return '';
    }
  };
  
  // Etiketleri dizi olarak alma
  const tagArray = currentBlog?.tags ? currentBlog.tags.split(',').map(tag => tag.trim()) : [];
  
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  if (fetchError || error) {
    return (
      <div className="container mx-auto mt-24 p-6">
        <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center max-w-md mx-auto border border-gray-700">
          <div className="flex justify-center mb-4">
            <IconAlertTriangle size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t('blog.blogNotFound')}</h2>
          <p className="text-gray-300 mb-6">{fetchError || error || t('blog.blogNotFoundDescription')}</p>
          <Link 
            to="/blog" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }
  
  if (!currentBlog) {
    return (
      <div className="container mx-auto mt-24 p-6">
        <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center max-w-md mx-auto border border-gray-700">
          <div className="flex justify-center mb-4">
            <IconAlertTriangle size={48} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t('blog.blogNotFound')}</h2>
          <p className="text-gray-300 mb-6">{t('blog.blogNotFoundDescription')}</p>
          <Link 
            to="/blog" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {currentBlog && (
        <Helmet>
          <title>{currentBlog.metaTitle || currentBlog.title}</title>
          <meta name="description" content={currentBlog.metaDescription || currentBlog.summary} />
          {currentBlog.metaKeywords && <meta name="keywords" content={currentBlog.metaKeywords} />}
          {currentBlog.canonicalUrl && <link rel="canonical" href={currentBlog.canonicalUrl} />}
        </Helmet>
      )}
    
      <div className="container mx-auto px-4 py-12 mt-12">
        {/* Hero Section */}
        <div className="w-full mb-10">
          <div className="relative">
            {currentBlog.thumbnailUrl ? (
              <div className="relative h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden">
                <img 
                  src={currentBlog.thumbnailUrl} 
                  alt={currentBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex items-end">
                  <div className="p-6 md:p-10 w-full">
                    <motion.h1 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentBlog.title}
                    </motion.h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-10 border border-gray-700">
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentBlog.title}
                </motion.h1>
              </div>
            )}
          </div>
          
          {/* Blog Meta */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentBlog.author && (
              <div className="flex items-center">
                <IconUser size={18} className="mr-2 text-emerald-500" />
                <span>{currentBlog.author}</span>
              </div>
            )}
            <div className="flex items-center">
              <IconCalendar size={18} className="mr-2 text-emerald-500" />
              <span>{formatDate(currentBlog.publishDate || currentBlog.createdAt)}</span>
            </div>
            {tagArray.length > 0 && (
              <div className="flex items-center">
                <IconTag size={18} className="mr-2 text-emerald-500" />
                <span>{tagArray[0]}{tagArray.length > 1 ? ` +${tagArray.length - 1}` : ''}</span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Summary */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700">
              <p className="italic text-lg text-gray-300 leading-relaxed">
                {currentBlog.summary}
              </p>
            </div>
            
            {/* Content */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700">
              <div 
                className="prose prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400 prose-strong:text-white prose-img:rounded-xl prism-enabled tinymce-content"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(currentBlog.content, {
                    ADD_ATTR: ['class', 'target', 'rel', 'data-language', 'style'],
                    ADD_TAGS: ['iframe', 'video', 'audio', 'source'],
                    ALLOWED_TAGS: [
                      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
                      'img', 'video', 'audio', 'source', 'span', 'figure', 'figcaption'
                    ],
                    ALLOWED_ATTR: [
                      'href', 'name', 'target', 'src', 'class', 'id', 'style', 'alt', 'title',
                      'width', 'height', 'controls', 'rel', 'data-language', 'data-*'
                    ]
                  }) 
                }}
              />
            </div>
            
            {/* Tags */}
            {tagArray.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tagArray.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-800/60 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Author info */}
            {currentBlog.author && (
              <motion.div 
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{t('blog.aboutAuthor')}</h3>
                <div className="flex items-center">
                  <div className="bg-emerald-600/20 text-emerald-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="font-bold">{currentBlog.author.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-white">{currentBlog.author}</h4>
                    <p className="text-sm text-gray-400">{t('blog.author')}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Related posts */}
            {relatedBlogs.length > 0 && (
              <motion.div 
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{t('blog.relatedPosts')}</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((blog) => (
                    <Link 
                      key={blog.id} 
                      to={`/blog/${blog.slug || blog.id}`}
                      className="block group"
                    >
                      <div className="flex items-start">
                        {blog.thumbnailUrl && (
                          <img 
                            src={blog.thumbnailUrl} 
                            alt={blog.title} 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className={blog.thumbnailUrl ? "ml-3" : ""}>
                          <h4 className="font-medium text-white group-hover:text-emerald-400 transition">
                            {blog.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {formatDate(blog.publishDate || blog.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Back to blog */}
            <motion.div 
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                to="/blog" 
                className="flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
              >
                <IconArrowLeft className="mr-2" />
                {t('blog.backToBlog')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage; 