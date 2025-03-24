import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { de, enUS, tr } from 'date-fns/locale';
import { 
  fetchBlogs, 
  deleteBlog, 
  searchBlogsByTitle,
  activateBlog,
  deactivateBlog
} from '../../store/slices/blogSlice';
import { toast } from 'react-hot-toast';
import AdminHeader from '../../components/AdminHeader';
import { 
  IconPlus, 
  IconTrash, 
  IconEdit, 
  IconEye, 
  IconSearch,
  IconEyeOff,
  IconCheck,
  IconX
} from '@tabler/icons-react';

const getLocale = (language) => {
  switch (language) {
    case 'de':
      return de;
    case 'tr':
      return tr;
    default:
      return enUS;
  }
};

const AdminBlogPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector(state => state.blogs.blogs);
  const loading = useSelector(state => state.blogs.status === 'loading');
  const error = useSelector(state => state.blogs.error);
  
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCreateClick = () => {
    navigate('/admin/blogs/new');
  };

  const handleEditClick = (id) => {
    navigate(`/admin/blogs/edit/${id}`);
  };

  const handleViewClick = (blog) => {
    if (blog.slug) {
      navigate(`/blog/${blog.slug}`);
    } else {
      navigate(`/blog/${blog.id}`);
    }
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      dispatch(deleteBlog(confirmDelete))
        .unwrap()
        .then(() => {
          toast.success(t('admin.blogDeleted'));
          setConfirmDelete(null);
        })
        .catch((err) => {
          toast.error(t('admin.errorDeletingBlog'));
          console.error(err);
          setConfirmDelete(null);
        });
    }
  };

  const handleSelectBlog = (id) => {
    if (selectedBlogs.includes(id)) {
      setSelectedBlogs(selectedBlogs.filter(blogId => blogId !== id));
    } else {
      setSelectedBlogs([...selectedBlogs, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBlogs(filteredBlogs.map(blog => blog.id));
    } else {
      setSelectedBlogs([]);
    }
  };

  const handleToggleStatus = (blog) => {
    if (blog.active) {
      dispatch(deactivateBlog(blog.id))
        .unwrap()
        .then(() => {
          toast.success(t('admin.blogDeactivated'));
          dispatch(fetchBlogs());
        })
        .catch((error) => {
          toast.error(t('admin.errorDeactivatingBlog'));
          console.error('Error:', error);
        });
    } else {
      dispatch(activateBlog(blog.id))
        .unwrap()
        .then(() => {
          toast.success(t('admin.blogActivated'));
          dispatch(fetchBlogs());
        })
        .catch((error) => {
          toast.error(t('admin.errorActivatingBlog'));
          console.error('Error:', error);
        });
    }
  };

  const handleBulkDelete = () => {
    if (selectedBlogs.length === 0) {
      toast.info(t('admin.selectBlogsFirst'));
      return;
    }

    setConfirmDelete('bulk');
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      for (const blogId of selectedBlogs) {
        await dispatch(deleteBlog(blogId)).unwrap();
      }
          toast.success(t('admin.blogsDeleted'));
      setSelectedBlogs([]);
      dispatch(fetchBlogs());
      setConfirmDelete(null);
    } catch (err) {
          toast.error(t('admin.errorDeletingBlogs'));
          console.error(err);
      setConfirmDelete(null);
    }
  };

  const handleBulkToggleStatus = async (status) => {
    if (selectedBlogs.length === 0) {
      toast.info(t('admin.selectBlogsFirst'));
      return;
    }

    try {
      for (const blogId of selectedBlogs) {
        if (status === 'active') {
          await dispatch(activateBlog(blogId)).unwrap();
        } else {
          await dispatch(deactivateBlog(blogId)).unwrap();
        }
      }
      
      toast.success(
        status === 'active'
          ? t('admin.blogsActivated')
          : t('admin.blogsDeactivated')
      );
      
      setSelectedBlogs([]);
      dispatch(fetchBlogs());
    } catch (error) {
      console.error('Bulk status change error:', error);
      toast.error(t('admin.errorChangingStatus'));
    }
  };

  // Filtreleme ve sıralama
  const blogsArray = Array.isArray(blogs) ? blogs : [];

  const filteredBlogs = blogsArray.filter(blog => {
    // Arama filtresi
    const searchMatch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Durum filtresi
    const statusMatch = filterStatus === 'all' || 
                       (filterStatus === 'active' && blog.active) || 
                       (filterStatus === 'inactive' && !blog.active);
    
    return searchMatch && statusMatch;
  })
  .sort((a, b) => {
    // Sıralama
    const dateA = new Date(a.publishDate || a.createdAt);
    const dateB = new Date(b.publishDate || b.createdAt);
    
    switch (sortBy) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return (a.author || '').localeCompare(b.author || '');
      default:
        return 0;
    }
  });
  
  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'PPP', { locale: getLocale(i18n.language) });
  };

  return (
    <div>
      <AdminHeader title={t('admin.manageBlogs')} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{t('admin.blogs')}</h1>
        <button 
          onClick={handleCreateClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <IconPlus className="h-5 w-5 mr-2" />
          {t('admin.createBlog')}
        </button>
          </div>

      {/* Filtreler ve Arama */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">{t('admin.search')}</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={t('admin.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <IconSearch className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">{t('admin.filterByStatus')}</label>
            <select
              id="status"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="all">{t('admin.allStatuses')}</option>
              <option value="active">{t('admin.activeOnly')}</option>
              <option value="inactive">{t('admin.inactiveOnly')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-400 mb-1">{t('admin.sortBy')}</label>
            <select
              id="sort"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">{t('admin.newest')}</option>
              <option value="oldest">{t('admin.oldest')}</option>
              <option value="title">{t('admin.titleAZ')}</option>
              <option value="author">{t('admin.authorAZ')}</option>
            </select>
          </div>
          <div className="flex items-end">
            {selectedBlogs.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkToggleStatus('active')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  {t('admin.activate')}
                </button>
                <button
                  onClick={() => handleBulkToggleStatus('inactive')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  {t('admin.deactivate')}
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  {t('admin.delete')}
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

      {/* Blog Listesi */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <IconX className="h-12 w-12 mx-auto mb-4" />
            <p>{error}</p>
            <button
              onClick={() => dispatch(fetchBlogs())}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {t('admin.tryAgain')}
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <IconX className="h-12 w-12 mx-auto mb-4" />
            <p>{t('admin.noBlogsFound')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                        onChange={handleSelectAll}
                        checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                      />
                      <span className="font-medium text-gray-300">{t('admin.title')}</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.author')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.publishDate')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.status')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.tags')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                          checked={selectedBlogs.includes(blog.id)}
                          onChange={() => handleSelectBlog(blog.id)}
                        />
                        <div className="flex items-center">
                          {blog.thumbnailUrl ? (
                            <img src={blog.thumbnailUrl} alt={blog.title} className="w-10 h-10 rounded object-cover mr-3" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-600 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <span className="font-medium text-white">{blog.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{blog.author || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {formatDate(blog.publishDate || blog.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${blog.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                        {blog.active ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags && blog.tags.split(',').map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-md bg-slate-700 text-slate-300">
                            {tag.trim()}
                          </span>
                        )).slice(0, 2)}
                        {blog.tags && blog.tags.split(',').length > 2 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-slate-700 text-slate-300">
                            +{blog.tags.split(',').length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(blog)}
                          className={`p-1.5 rounded-lg ${blog.active ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
                          title={blog.active ? t('admin.deactivate') : t('admin.activate')}
                        >
                          {blog.active ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => handleEditClick(blog.id)}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
                          title={t('admin.edit')}
                        >
                          <IconEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleViewClick(blog)}
                          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                          title={t('admin.view')}
                        >
                          <IconEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(blog.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
                          title={t('admin.delete')}
                        >
                          <IconTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Silme Onay Modalı */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-white">{t('admin.confirmDelete')}</h3>
            <p className="mb-6 text-gray-300">
              {confirmDelete === 'bulk' 
                ? t('admin.confirmBulkDeleteBlogs', { count: selectedBlogs.length })
                : t('admin.deleteWarning')}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {t('admin.cancel')}
              </button>
              <button
                onClick={confirmDelete === 'bulk' ? handleBulkDeleteConfirm : handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                {t('admin.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage; 