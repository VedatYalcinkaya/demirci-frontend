import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchReferences, 
  deleteReference, 
  updateReference, 
  activateReference, 
  deactivateReference 
} from '../store/slices/referenceSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { tr, enUS, de } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

const AdminReferencesPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { references, status, error } = useSelector((state) => state.references);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedReferences, setSelectedReferences] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchReferences());
  }, [dispatch]);

  const getLocale = () => {
    switch (i18n.language) {
      case 'tr': return tr;
      case 'de': return de;
      default: return enUS;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSelectReference = (id) => {
    if (selectedReferences.includes(id)) {
      setSelectedReferences(selectedReferences.filter(refId => refId !== id));
    } else {
      setSelectedReferences([...selectedReferences, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReferences(filteredReferences.map(ref => ref.id));
    } else {
      setSelectedReferences([]);
    }
  };

  const handleToggleStatus = (reference) => {
    if (reference.active) {
      // Eğer referans aktifse, pasifleştir
      dispatch(deactivateReference(reference.id))
        .unwrap()
        .then(() => {
          toast.success('Referans başarıyla pasifleştirildi');
          // Referansları yeniden yükle
          dispatch(fetchReferences());
        })
        .catch((error) => {
          toast.error('Referans pasifleştirilirken bir hata oluştu');
          console.error('Hata:', error);
        });
    } else {
      // Eğer referans pasifse, aktifleştir
      dispatch(activateReference(reference.id))
        .unwrap()
        .then(() => {
          toast.success('Referans başarıyla aktifleştirildi');
          // Referansları yeniden yükle
          dispatch(fetchReferences());
        })
        .catch((error) => {
          toast.error('Referans aktifleştirilirken bir hata oluştu');
          console.error('Hata:', error);
        });
    }
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      dispatch(deleteReference(confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(t('admin.confirmBulkDelete'))) {
      selectedReferences.forEach(id => {
        dispatch(deleteReference(id));
      });
      setSelectedReferences([]);
    }
  };

  const handleBulkToggleStatus = async (status) => {
    if (selectedReferences.length === 0) {
      toast.error('Lütfen en az bir referans seçin');
      return;
    }

    const confirmMessage = status === 'active'
      ? 'Seçili referansları aktifleştirmek istediğinize emin misiniz?'
      : 'Seçili referansları pasifleştirmek istediğinize emin misiniz?';

    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        
        // Her bir seçili referans için durumu güncelle
        for (const reference of selectedReferences) {
          if (status === 'active') {
            await dispatch(activateReference(reference.id)).unwrap();
          } else {
            await dispatch(deactivateReference(reference.id)).unwrap();
          }
        }
        
        // İşlem tamamlandıktan sonra seçili referansları temizle
        setSelectedReferences([]);
        
        // Başarı mesajı göster
        toast.success(
          status === 'active'
            ? 'Referanslar başarıyla aktifleştirildi'
            : 'Referanslar başarıyla pasifleştirildi'
        );
        
        // Referansları yeniden yükle
        dispatch(fetchReferences());
      } catch (error) {
        console.error('Toplu durum değiştirme hatası:', error);
        toast.error('Referans durumları güncellenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
  };

  // Filtreleme ve sıralama
  const filteredReferences = references
    ? references.filter(reference => {
        // Arama filtresi
        const searchMatch = reference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (reference.clientName && reference.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Durum filtresi
        const statusMatch = filterStatus === 'all' || 
                           (filterStatus === 'active' && reference.active) || 
                           (filterStatus === 'inactive' && !reference.active);
        
        return searchMatch && statusMatch;
      })
      .sort((a, b) => {
        // Sıralama
        const dateA = new Date(a.createdAt || a.updatedAt);
        const dateB = new Date(b.createdAt || b.updatedAt);
        
        switch (sortBy) {
          case 'newest':
            return dateB - dateA;
          case 'oldest':
            return dateA - dateB;
          case 'title':
            return a.title.localeCompare(b.title);
          case 'client':
            return (a.clientName || '').localeCompare(b.clientName || '');
          default:
            return 0;
        }
      })
    : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('admin.references')}</h1>
        <Link to="/admin/references/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('admin.addNewReference')}
        </Link>
      </div>

      {/* Filtreler ve Arama */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">{t('admin.search')}</label>
            <input
              type="text"
              id="search"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearch}
            />
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
              <option value="client">{t('admin.clientAZ')}</option>
            </select>
          </div>
          <div className="flex items-end">
            {selectedReferences.length > 0 && (
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

      {/* Referans Listesi */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{t('admin.errorLoadingReferences')}</p>
            <button
              onClick={() => dispatch(fetchReferences())}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {t('admin.tryAgain')}
            </button>
          </div>
        ) : filteredReferences.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>{t('admin.noReferencesFound')}</p>
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
                        checked={selectedReferences.length === filteredReferences.length && filteredReferences.length > 0}
                      />
                      <span className="font-medium text-gray-300">{t('admin.title')}</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.client')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.status')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.createdAt')}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredReferences.map((reference) => (
                  <tr key={reference.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                          checked={selectedReferences.includes(reference.id)}
                          onChange={() => handleSelectReference(reference.id)}
                        />
                        <div className="flex items-center">
                          {reference.thumbnailUrl ? (
                            <img src={reference.thumbnailUrl} alt={reference.title} className="w-10 h-10 rounded object-cover mr-3" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-600 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <span className="font-medium">{reference.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{reference.clientName || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${reference.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {reference.active ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {reference.createdAt ? format(new Date(reference.createdAt), 'PPP', { locale: getLocale() }) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(reference)}
                          className={`p-1.5 rounded-lg ${reference.active ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
                          title={reference.active ? t('admin.deactivate') : t('admin.activate')}
                        >
                          {reference.active ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                        <Link
                          to={`/admin/references/edit/${reference.id}`}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
                          title={t('admin.edit')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link
                          to={`/referanslar/${reference.id}`}
                          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                          title={t('admin.view')}
                          target="_blank"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirm(reference.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
                          title={t('admin.delete')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
            <h3 className="text-xl font-bold mb-4">{t('admin.confirmDelete')}</h3>
            <p className="mb-6">{t('admin.deleteWarning')}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {t('admin.cancel')}
              </button>
              <button
                onClick={handleDelete}
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

export default AdminReferencesPage; 