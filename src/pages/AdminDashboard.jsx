import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferences } from '../store/slices/referenceSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { references, status } = useSelector((state) => state.references);
  const [stats, setStats] = useState({
    totalReferences: 0,
    activeReferences: 0,
    inactiveReferences: 0,
    recentReferences: []
  });

  useEffect(() => {
    dispatch(fetchReferences());
  }, [dispatch]);

  useEffect(() => {
    if (references && references.length > 0) {
      const activeRefs = references.filter(ref => ref.active);
      const inactiveRefs = references.filter(ref => !ref.active);
      const recentRefs = [...references].sort((a, b) => {
        return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
      }).slice(0, 5);

      setStats({
        totalReferences: references.length,
        activeReferences: activeRefs.length,
        inactiveReferences: inactiveRefs.length,
        recentReferences: recentRefs
      });
    }
  }, [references]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.dashboard')}</h1>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{t('admin.totalReferences')}</p>
              <h2 className="text-3xl font-bold">{stats.totalReferences}</h2>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{t('admin.activeReferences')}</p>
              <h2 className="text-3xl font-bold">{stats.activeReferences}</h2>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{t('admin.inactiveReferences')}</p>
              <h2 className="text-3xl font-bold">{stats.inactiveReferences}</h2>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{t('admin.quickActions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/references/new" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>{t('admin.addNewReference')}</span>
            </Link>
            <Link to="/admin/references" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>{t('admin.manageReferences')}</span>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{t('admin.systemStatus')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('admin.apiStatus')}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">{t('admin.online')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('admin.lastUpdate')}</span>
              <span className="text-gray-300">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Son Eklenen Referanslar */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('admin.recentReferences')}</h2>
          <Link to="/admin/references" className="text-emerald-500 hover:text-emerald-400 text-sm">
            {t('admin.viewAll')}
          </Link>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : stats.recentReferences.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 font-medium">{t('admin.title')}</th>
                  <th className="pb-3 font-medium">{t('admin.client')}</th>
                  <th className="pb-3 font-medium">{t('admin.status')}</th>
                  <th className="pb-3 font-medium">{t('admin.date')}</th>
                  <th className="pb-3 font-medium">{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {stats.recentReferences.map((reference) => (
                  <tr key={reference.id} className="text-sm">
                    <td className="py-3 pr-4">
                      <div className="flex items-center">
                        {reference.thumbnailUrl && (
                          <img src={reference.thumbnailUrl} alt={reference.title} className="w-10 h-10 rounded object-cover mr-3" />
                        )}
                        <span className="font-medium">{reference.title}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">{reference.clientName || '-'}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${reference.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {reference.active ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-400">
                      {new Date(reference.createdAt || reference.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Link to={`/admin/references/edit/${reference.id}`} className="text-blue-500 hover:text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link to={`/referanslar/${reference.id}`} className="text-emerald-500 hover:text-emerald-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            {t('admin.noReferencesFound')}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 