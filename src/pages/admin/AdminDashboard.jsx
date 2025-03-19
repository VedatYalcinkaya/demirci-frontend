import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferences } from '../../store/slices/referenceSlice';
import { fetchBlogs } from '../../store/slices/blogSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  IconBriefcase, 
  IconNews, 
  IconEye, 
  IconEyeOff, 
  IconPlus, 
  IconList, 
  IconChartBar, 
  IconCheck, 
  IconUsers, 
  IconMessageCircle
} from '@tabler/icons-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { references } = useSelector((state) => state.references);
  const { blogs } = useSelector((state) => state.blogs);
  const referencesLoading = useSelector((state) => state.references.status === 'loading');
  const blogsLoading = useSelector((state) => state.blogs.status === 'loading');
  
  const [stats, setStats] = useState({
    totalReferences: 0,
    activeReferences: 0,
    inactiveReferences: 0,
    totalBlogs: 0,
    activeBlogs: 0,
    inactiveBlogs: 0,
    recentReferences: [],
    recentBlogs: []
  });

  useEffect(() => {
    dispatch(fetchReferences());
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    // Referans istatistikleri
    let refStats = {
      totalReferences: 0,
      activeReferences: 0,
      inactiveReferences: 0,
      recentReferences: []
    };
    
    if (references && references.length > 0) {
      const activeRefs = references.filter(ref => ref.active);
      const inactiveRefs = references.filter(ref => !ref.active);
      const recentRefs = [...references].sort((a, b) => {
        return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
      }).slice(0, 3);

      refStats = {
        totalReferences: references.length,
        activeReferences: activeRefs.length,
        inactiveReferences: inactiveRefs.length,
        recentReferences: recentRefs
      };
    }
    
    // Blog istatistikleri
    let blogStats = {
      totalBlogs: 0,
      activeBlogs: 0,
      inactiveBlogs: 0,
      recentBlogs: []
    };
    
    if (blogs && blogs.length > 0) {
      const activeBlogs = blogs.filter(blog => blog.active);
      const inactiveBlogs = blogs.filter(blog => !blog.active);
      const recentBlogs = [...blogs].sort((a, b) => {
        return new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt);
      }).slice(0, 3);

      blogStats = {
        totalBlogs: blogs.length,
        activeBlogs: activeBlogs.length,
        inactiveBlogs: inactiveBlogs.length,
        recentBlogs: recentBlogs
      };
    }
    
    setStats({
      ...refStats,
      ...blogStats
    });
  }, [references, blogs]);

  const isLoading = referencesLoading || blogsLoading;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kontrol Paneli</h1>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Referans İstatistikleri */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 rounded-lg p-6 shadow-lg border border-emerald-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <IconBriefcase className="mr-2 text-emerald-500" />
              Referanslar
            </h2>
            <Link to="/admin/references" className="text-emerald-400 text-sm hover:text-emerald-300">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-white">{stats.totalReferences}</p>
              <p className="text-xs text-gray-400">Toplam</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-emerald-400">{stats.activeReferences}</p>
              <p className="text-xs text-gray-400">Aktif</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-400">{stats.inactiveReferences}</p>
              <p className="text-xs text-gray-400">Pasif</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Link to="/admin/references/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center">
              <IconPlus className="mr-1" size={16} />
              Yeni Referans Ekle
            </Link>
          </div>
        </div>
        
        {/* Blog İstatistikleri */}
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 rounded-lg p-6 shadow-lg border border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <IconNews className="mr-2 text-blue-500" />
              Blog Yazıları
            </h2>
            <Link to="/admin/blogs" className="text-blue-400 text-sm hover:text-blue-300">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-white">{stats.totalBlogs}</p>
              <p className="text-xs text-gray-400">Toplam</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-emerald-400">{stats.activeBlogs}</p>
              <p className="text-xs text-gray-400">Aktif</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-400">{stats.inactiveBlogs}</p>
              <p className="text-xs text-gray-400">Pasif</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Link to="/admin/blogs/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center">
              <IconPlus className="mr-1" size={16} />
              Yeni Blog Ekle
            </Link>
          </div>
        </div>
        
        {/* Sistem Durumu */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/20 rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <IconChartBar className="mr-2 text-purple-500" />
            Sistem Durumu
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">API Durumu</span>
              <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-500 flex items-center">
                <IconCheck size={14} className="mr-1" />
                Çevrimiçi
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Son Güncelleme</span>
              <span className="text-gray-300">{new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Tüm Modüller</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-gray-300">Referanslar</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-gray-300">Blog</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                <span className="text-gray-400">Kullanıcılar</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                <span className="text-gray-400">Mesajlar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/admin/references/new" className="bg-gradient-to-br from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
            <IconBriefcase className="h-8 w-8 mb-2" />
            <span>Yeni Referans</span>
          </Link>
          
          <Link to="/admin/blogs/new" className="bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
            <IconNews className="h-8 w-8 mb-2" />
            <span>Yeni Blog</span>
          </Link>
          
          <Link to="/admin/users" className="bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors opacity-70">
            <IconUsers className="h-8 w-8 mb-2" />
            <span>Kullanıcılar</span>
          </Link>
          
          <Link to="/admin/messages" className="bg-gradient-to-br from-orange-700 to-orange-900 hover:from-orange-600 hover:to-orange-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors opacity-70">
            <IconMessageCircle className="h-8 w-8 mb-2" />
            <span>Mesajlar</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Son Eklenen Referanslar */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <IconBriefcase className="mr-2 text-emerald-500" size={20} />
              Son Referanslar
            </h2>
            <Link to="/admin/references" className="text-emerald-500 hover:text-emerald-400 text-sm">
              Tümünü Gör
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : stats.recentReferences.length > 0 ? (
            <div className="space-y-3">
              {stats.recentReferences.map((reference) => (
                <div key={reference.id} className="bg-gray-700/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {reference.thumbnailUrl ? (
                      <img src={reference.thumbnailUrl} alt={reference.title} className="w-10 h-10 rounded object-cover mr-3" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center mr-3">
                        <IconBriefcase className="text-gray-400" size={20} />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">{reference.title}</div>
                      <div className="text-gray-400 text-xs">{reference.clientName || '-'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-3 px-2 py-1 rounded-full text-xs ${reference.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'} flex items-center`}>
                      {reference.active ? <IconEye size={14} className="mr-1" /> : <IconEyeOff size={14} className="mr-1" />}
                      {reference.active ? 'Aktif' : 'Pasif'}
                    </span>
                    <Link to={`/admin/references/edit/${reference.id}`} className="text-blue-400 hover:text-blue-300">
                      <IconList size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Henüz referans bulunmuyor
            </div>
          )}
        </div>

        {/* Son Eklenen Bloglar */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <IconNews className="mr-2 text-blue-500" size={20} />
              Son Blog Yazıları
            </h2>
            <Link to="/admin/blogs" className="text-blue-500 hover:text-blue-400 text-sm">
              Tümünü Gör
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : stats.recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBlogs.map((blog) => (
                <div key={blog.id} className="bg-gray-700/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {blog.thumbnailUrl ? (
                      <img src={blog.thumbnailUrl} alt={blog.title} className="w-10 h-10 rounded object-cover mr-3" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center mr-3">
                        <IconNews className="text-gray-400" size={20} />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">{blog.title}</div>
                      <div className="text-gray-400 text-xs">{blog.author || '-'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-3 px-2 py-1 rounded-full text-xs ${blog.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'} flex items-center`}>
                      {blog.active ? <IconEye size={14} className="mr-1" /> : <IconEyeOff size={14} className="mr-1" />}
                      {blog.active ? 'Aktif' : 'Pasif'}
                    </span>
                    <Link to={`/admin/blogs/edit/${blog.id}`} className="text-blue-400 hover:text-blue-300">
                      <IconList size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Henüz blog yazısı bulunmuyor
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 