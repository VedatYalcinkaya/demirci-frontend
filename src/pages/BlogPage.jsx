import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, searchBlogsByTitle, searchBlogsByTag, fetchPaginatedBlogs } from '../store/slices/blogSlice';
import { useTranslation } from 'react-i18next';
import BlogCard from '../components/BlogCard';
import { motion } from 'framer-motion';
import { IconSearch, IconChevronRight, IconChevronLeft, IconListSearch, IconX } from '@tabler/icons-react';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, status, error, pagination } = useSelector((state) => state.blogs);
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('title'); // 'title', 'tag'
  const [isSearching, setIsSearching] = useState(false);
  
  // Pagination için state'ler
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    // Arama yapmıyorsak, normal sayfalanmış blogları getir
    if (!isSearching) {
      console.log("Sayfalanmış bloglar getiriliyor:", currentPage, pageSize);
      dispatch(fetchPaginatedBlogs({ page: currentPage, size: pageSize }));
    }
  }, [dispatch, currentPage, pageSize, isSearching]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    console.log("Arama yapılıyor:", searchTerm, "filtre:", filterType, "dil:", i18n.language);
    
    try {
      if (filterType === 'title') {
        await dispatch(searchBlogsByTitle({
          title: searchTerm,
          page: currentPage,
          size: pageSize,
          language: i18n.language
        })).unwrap();
      } else if (filterType === 'tag') {
        await dispatch(searchBlogsByTag({
          tag: searchTerm,
          page: currentPage,
          size: pageSize,
          language: i18n.language
        })).unwrap();
      }
    } catch (error) {
      console.error("Blog araması sırasında hata:", error);
    }
  };

  // Sayfa değiştirme işlevi
  const handlePageChange = (newPage) => {
    console.log("Sayfa değiştirildi:", newPage);
    setCurrentPage(newPage);
    
    // Arama durumunda sayfayı değiştirirken de arama yap
    if (isSearching && searchTerm) {
      if (filterType === 'title') {
        dispatch(searchBlogsByTitle({
          title: searchTerm,
          page: newPage,
          size: pageSize,
          language: i18n.language
        }));
      } else if (filterType === 'tag') {
        dispatch(searchBlogsByTag({
          tag: searchTerm,
          page: newPage,
          size: pageSize,
          language: i18n.language
        }));
      }
    }
  };

  // Aramayı temizle
  const clearSearch = () => {
    setIsSearching(false);
    setSearchTerm('');
    setCurrentPage(0);
    dispatch(fetchPaginatedBlogs({ page: 0, size: pageSize }));
  };

  if (status === 'loading' && !isSearching) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Hata durumu
  if (status === 'failed') {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
          <h2 className="text-xl font-bold mb-2 text-white">{t('blog.error.title')}</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  // Blogları kontrol et
  const blogsList = pagination?.content || blogs || [];
  const hasBlogs = blogsList.length > 0;

  return (
    <div className="container mx-auto px-4 py-12 mt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('blog.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('blog.subtitle')}</p>
      </motion.div>
      
      {/* Arama */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
      >
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <select 
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setIsSearching(false); // Filtre değişince arama durumunu sıfırla
            }}
            className="bg-gray-700/50 text-gray-300 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={t('blog.filters.searchType')}
          >
            <option value="title">{t('blog.filters.byTitle')}</option>
            <option value="tag">{t('blog.filters.byTag')}</option>
          </select>
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('blog.filters.searchPlaceholder')}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg pl-4 pr-10 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={t('blog.filters.searchInput')}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button 
            type="submit"
            className={`bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center ${(!searchTerm.trim() || status === 'loading') ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!searchTerm.trim() || status === 'loading'}
            aria-label={t('blog.filters.search')}
          >
            {status === 'loading' && isSearching ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {t('common.searching')}
              </div>
            ) : (
              <>
                <IconListSearch size={18} className="mr-2" />
                {t('blog.filters.search')}
              </>
            )}
          </button>
        </form>
        
        {/* Arama sonuç bilgisi */}
        {isSearching && (
          <div className="mt-2 flex justify-between items-center text-sm">
            <p className="text-gray-300">
              {t('blog.searchResults', { 
                term: searchTerm, 
                count: blogsList.length, 
                type: filterType === 'title' 
                  ? t('blog.filters.byTitle').toLowerCase() 
                  : t('blog.filters.byTag').toLowerCase() 
              })}
            </p>
            <button 
              onClick={clearSearch}
              className="text-emerald-400 hover:text-emerald-300 flex items-center"
              aria-label={t('blog.clearSearch')}
            >
              <IconX size={16} className="mr-1" />
              {t('blog.clearSearch')}
            </button>
          </div>
        )}
      </motion.div>
      
      {!hasBlogs ? (
        <div className="bg-gray-800/60 backdrop-blur-sm p-12 rounded-2xl border border-gray-700 text-center">
          <p className="text-white text-xl">
            {isSearching ? t('blog.noSearchResults') : t('blog.noBlogs')}
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogsList.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index % 3) }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                currentPage === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600/80 text-white hover:bg-emerald-600'
              }`}
              aria-label={t('blog.pagination.firstPage')}
            >
              <span className="sr-only">{t('blog.pagination.firstPage')}</span>
              <IconChevronLeft size={18} />
              <IconChevronLeft size={18} className="-ml-3" />
            </button>
            
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                currentPage === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600/80 text-white hover:bg-emerald-600'
              }`}
              aria-label={t('blog.pagination.previousPage')}
            >
              <span className="sr-only">{t('blog.pagination.previousPage')}</span>
              <IconChevronLeft size={18} />
            </button>
            
            {/* Sayfa numaraları */}
            <div className="flex space-x-2">
              {[...Array(pagination.totalPages).keys()].map((page) => {
                // Çok fazla sayfa varsa, sadece mevcut sayfanın etrafındaki sayfaları göster
                if (
                  page === 0 ||
                  page === pagination.totalPages - 1 ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-700/50 text-white hover:bg-gray-700'
                      }`}
                      aria-label={t('blog.pagination.goToPage', { page: page + 1 })}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page + 1}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, currentPage + 1))}
              disabled={currentPage === pagination.totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                currentPage === pagination.totalPages - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600/80 text-white hover:bg-emerald-600'
              }`}
              aria-label={t('blog.pagination.nextPage')}
            >
              <span className="sr-only">{t('blog.pagination.nextPage')}</span>
              <IconChevronRight size={18} />
            </button>
            
            <button
              onClick={() => handlePageChange(pagination.totalPages - 1)}
              disabled={currentPage === pagination.totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                currentPage === pagination.totalPages - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600/80 text-white hover:bg-emerald-600'
              }`}
              aria-label={t('blog.pagination.lastPage')}
            >
              <span className="sr-only">{t('blog.pagination.lastPage')}</span>
              <IconChevronRight size={18} />
              <IconChevronRight size={18} className="-ml-3" />
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Sayfa bilgisi */}
      {pagination.totalElements > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-4 text-gray-400 text-sm"
        >
          {t('blog.pagination.showing')} {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, pagination.totalElements)} {t('blog.pagination.of')} {pagination.totalElements} {t('blog.pagination.blogs')}
        </motion.div>
      )}
    </div>
  );
};

export default BlogPage; 