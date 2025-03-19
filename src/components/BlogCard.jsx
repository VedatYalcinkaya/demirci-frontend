import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr, de, enUS } from 'date-fns/locale';
import i18next from 'i18next';

const getLocale = () => {
  const language = i18next.language;
  if (language === 'tr') return tr;
  if (language === 'de') return de;
  return enUS;
};

const BlogCard = ({ blog }) => {
  const { t } = useTranslation();
  
  // Blog prop'unu kontrol et
  if (!blog) return null;
  
  const { id, title, summary, thumbnailUrl, author, tags, publishDate, slug, createdAt, active } = blog;
  
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
  
  // Etiketleri dizi olarak alma
  const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
  // Kullanılacak URL - slug varsa slug, yoksa id kullan
  const blogUrl = `/blog/${slug || id}`;
  
  // Kullanılacak tarih - publishDate varsa onu, yoksa createdAt kullan
  const displayDate = formatDate(publishDate || createdAt);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 bg-white dark:bg-gray-800 h-full flex flex-col"
    >
      <Link to={blogUrl} className="block overflow-hidden h-48 relative">
        <img 
          src={thumbnailUrl || 'https://via.placeholder.com/400x250'} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex gap-2 flex-wrap">
            {tagArray.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs font-medium text-white bg-primary-500 dark:bg-primary-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tagArray.length > 3 && (
              <span className="text-xs font-medium text-white bg-gray-500 px-2 py-1 rounded-full">
                +{tagArray.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{author}</span>
          <span>{displayDate}</span>
        </div>
        <Link to={blogUrl} className="block">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-500 dark:hover:text-primary-400 transition duration-300">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {summary && summary.length > 120 ? `${summary.substring(0, 120)}...` : summary}
        </p>
        <Link 
          to={blogUrl}
          className="inline-flex items-center font-medium text-primary-600 dark:text-primary-400 hover:underline mt-auto"
        >
          {t('blog.readMore')} 
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard; 