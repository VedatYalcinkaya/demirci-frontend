import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr, de, enUS } from 'date-fns/locale';
import i18next from 'i18next';
import { IconCalendar, IconUser, IconArrowRight } from '@tabler/icons-react';

const getLocale = () => {
  const language = i18next.language;
  if (language === 'tr') return tr;
  if (language === 'de') return de;
  return enUS;
};

const BlogCard = ({ blog }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl overflow-hidden h-full flex flex-col relative border border-gray-700 bg-gray-800/60 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] group"
    >
      {/* Border Corners */}
      <div className="absolute h-2 w-2 border-t-2 border-l-2 border-emerald-500 top-0 left-0" />
      <div className="absolute h-2 w-2 border-t-2 border-r-2 border-emerald-500 top-0 right-0" />
      <div className="absolute h-2 w-2 border-b-2 border-l-2 border-emerald-500 bottom-0 left-0" />
      <div className="absolute h-2 w-2 border-b-2 border-r-2 border-emerald-500 bottom-0 right-0" />
      
      <Link to={blogUrl} className="block overflow-hidden h-48 relative">
        <div className="absolute inset-0 bg-emerald-500/20 opacity-0 hover:opacity-100 transition-opacity z-10"></div>
        <img 
          src={thumbnailUrl || 'https://via.placeholder.com/400x250'} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-20">
          <div className="flex gap-2 flex-wrap">
            {tagArray.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs font-medium text-emerald-400 bg-emerald-600/20 px-3 py-1 rounded-full border border-emerald-500/30"
              >
                #{tag}
              </span>
            ))}
            {tagArray.length > 3 && (
              <span className="text-xs font-medium text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600">
                +{tagArray.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
          {author && (
            <span className="flex items-center">
              <IconUser size={16} className="mr-1 text-emerald-500" />
              {author}
            </span>
          )}
          <span className="flex items-center">
            <IconCalendar size={16} className="mr-1 text-emerald-500" />
            {displayDate}
          </span>
        </div>
        
        <Link to={blogUrl} className="block">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition duration-300">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-300 mb-4 flex-grow line-clamp-3">
          {summary}
        </p>
        
        <Link 
          to={blogUrl}
          className="inline-flex items-center font-medium text-emerald-400 hover:text-emerald-300 transition-colors mt-auto"
        >
          {t('blog.readMore')} 
          <IconArrowRight className={`ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} size={18} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 