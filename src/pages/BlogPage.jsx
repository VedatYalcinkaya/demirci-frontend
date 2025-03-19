import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, fetchActiveBlogs, searchBlogsByTitle, searchBlogsByTag, fetchPaginatedBlogs } from '../store/slices/blogSlice';
import { useTranslation } from 'react-i18next';
import BlogCard from '../components/BlogCard';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, status, error, pagination } = useSelector((state) => state.blogs);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'active', 'title', 'tag'
  
  // Pagination için state'ler
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    // Sayfalanmış blogları getir
    dispatch(fetchPaginatedBlogs({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (filterType === 'title') {
      dispatch(searchBlogsByTitle(searchTerm));
    } else if (filterType === 'tag') {
      dispatch(searchBlogsByTag(searchTerm));
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSearchTerm('');

    if (type === 'all') {
      dispatch(fetchBlogs());
    } else if (type === 'active') {
      dispatch(fetchActiveBlogs());
    }
  };

  // Sayfa değiştirme işlevi
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (status === 'failed') {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="bg-red-500/20 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{t('blog.error.title')}</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Blogları kontrol et
  const blogsList = pagination?.content || blogs || [];
  const hasBlogs = blogsList.length > 0;

  return (
    <div className="container mx-auto mt-15 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{t('blog.title')}</h1>
          <p className="text-gray-400">{t('blog.subtitle')}</p>
        </div>
      </div>
      
      {/* Filtreler ve Arama */}
      <div className="mb-8 bg-white/5 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'all' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {t('blog.filters.all')}
          </button>
          <button 
            onClick={() => handleFilterChange('active')}
            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'active' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {t('blog.filters.active')}
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
            disabled={filterType === 'all' || filterType === 'active'}
          >
            <option value="title">{t('blog.filters.byTitle')}</option>
            <option value="tag">{t('blog.filters.byTag')}</option>
          </select>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('blog.filters.searchPlaceholder')}
            className="flex-1 bg-white/10 text-white border border-white/20 rounded-md px-3 py-2 placeholder-gray-400"
            disabled={filterType === 'all' || filterType === 'active'}
          />
          <button 
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            disabled={filterType === 'all' || filterType === 'active' || !searchTerm.trim()}
          >
            {t('blog.filters.search')}
          </button>
        </form>
      </div>
      
      {!hasBlogs ? (
        <p className="text-white text-center py-8">{t('blog.noBlogs')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogsList.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
              className={`px-3 py-1 rounded-md ${
                currentPage === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              &laquo;
            </button>
            
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`px-3 py-1 rounded-md ${
                currentPage === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              &lt;
            </button>
            
            {/* Sayfa numaraları */}
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
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {page + 1}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return <span key={page} className="px-2 py-1 text-gray-400">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, currentPage + 1))}
              disabled={currentPage === pagination.totalPages - 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === pagination.totalPages - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              &gt;
            </button>
            
            <button
              onClick={() => handlePageChange(pagination.totalPages - 1)}
              disabled={currentPage === pagination.totalPages - 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === pagination.totalPages - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
      
      {/* Sayfa bilgisi */}
      {pagination.totalElements > 0 && (
        <div className="text-center mt-4 text-gray-400 text-sm">
          {t('blog.pagination.showing')} {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, pagination.totalElements)} {t('blog.pagination.of')} {pagination.totalElements} {t('blog.pagination.blogs')}
        </div>
      )}
    </div>
  );
};

export default BlogPage; 