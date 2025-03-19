import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr, de, enUS } from 'date-fns/locale';
import i18next from 'i18next';
import { fetchBlogById, fetchBlogBySlug, fetchLatestBlogs } from '../store/slices/blogSlice';
import BlogCard from '../components/BlogCard';
import DOMPurify from 'dompurify';

const getLocale = () => {
  const language = i18next.language;
  if (language === 'tr') return tr;
  if (language === 'de') return de;
  return enUS;
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const currentBlog = useSelector(state => state.blogs.currentBlog);
  const latestBlogs = useSelector(state => state.blogs.latestBlogs);
  const loading = useSelector(state => state.blogs.loading);
  const error = useSelector(state => state.blogs.error);

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  
  // Blog bilgilerini yükle
  useEffect(() => {
    if (slug) {
      // Eğer slug numerik ise ID olarak, değilse slug olarak işle
      if (!isNaN(Number(slug))) {
        dispatch(fetchBlogById(slug));
      } else {
        dispatch(fetchBlogBySlug(slug));
      }
    }
    
    // İlgili son blogları yükle
    dispatch(fetchLatestBlogs(3));
  }, [dispatch, slug]);
  
  // Blog başarıyla yüklendiğinde
  useEffect(() => {
    if (currentBlog) {
      // URL'de slug kullanımı için yönlendirme
      if (!isNaN(Number(slug)) && currentBlog.slug && slug !== currentBlog.slug) {
        navigate(`/blog/${currentBlog.slug}`, { replace: true });
      }
      
      // İlgili blogları filtrele (aynı etiketleri içeren)
      if (latestBlogs && latestBlogs.length > 0 && currentBlog.tags) {
        const currentBlogTags = currentBlog.tags.split(',').map(tag => tag.trim().toLowerCase());
        
        const related = latestBlogs
          .filter(blog => 
            blog.id !== currentBlog.id && 
            blog.tags && 
            currentBlogTags.some(tag => 
              blog.tags.toLowerCase().includes(tag)
            )
          )
          .slice(0, 3);
          
        setRelatedBlogs(related);
      }
    }
  }, [currentBlog, latestBlogs, slug, navigate]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: getLocale() });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('blog.blogNotFound')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link 
            to="/blog" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
          >
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }
  
  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('blog.blogNotFound')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('blog.blogNotFoundDescription')}</p>
          <Link 
            to="/blog" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
          >
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }
  
  // Etiketleri dizi olarak alma
  const tagArray = currentBlog.tags ? currentBlog.tags.split(',').map(tag => tag.trim()) : [];
  
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
    
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <div className="w-full relative">
          {currentBlog.thumbnailUrl ? (
            <div className="h-96 w-full overflow-hidden">
              <div 
                className="w-full h-full bg-center bg-cover"
                style={{ 
                  backgroundImage: `url(${currentBlog.thumbnailUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
                  <div className="text-center px-4 max-w-4xl">
                    <motion.h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentBlog.title}
                    </motion.h1>
                    <motion.div 
                      className="flex justify-center items-center gap-4 text-white/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span>{currentBlog.author}</span>
                      <span>•</span>
                      <span>{formatDate(currentBlog.publishDate || currentBlog.createdAt)}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-primary-600 to-indigo-600 py-20">
              <div className="container mx-auto px-4">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentBlog.title}
                </motion.h1>
                <motion.div 
                  className="flex justify-center items-center gap-4 text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span>{currentBlog.author}</span>
                  <span>•</span>
                  <span>{formatDate(currentBlog.publishDate || currentBlog.createdAt)}</span>
                </motion.div>
              </div>
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6 lg:p-8">
                {/* Summary */}
                <div className="italic text-lg text-gray-700 dark:text-gray-300 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  {currentBlog.summary}
                </div>
                
                {/* Content */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">{t('blog.content')}</h2>
                  <div 
                    className="text-white prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentBlog.content) }}
                  />
                </div>
                
                {/* Tags */}
                {tagArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    {tagArray.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Author info */}
              <motion.div 
                className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.aboutAuthor')}</h3>
                  <div className="flex items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-gray-700 dark:text-gray-300 font-bold">{currentBlog.author ? currentBlog.author.charAt(0) : 'A'}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">{currentBlog.author}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('blog.author')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Related posts */}
              {relatedBlogs.length > 0 && (
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.relatedPosts')}</h3>
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
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}
                            <div className={blog.thumbnailUrl ? "ml-3" : ""}>
                              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition">
                                {blog.title}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(blog.publishDate || blog.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Back to blog */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link 
                  to="/blog" 
                  className="flex items-center text-primary-600 dark:text-primary-400 font-medium"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  {t('blog.backToBlog')}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage; 