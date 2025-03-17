import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-emerald-500">
              Demirci Yazılım Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-300 hover:text-white transition-colors" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <div className="relative">
              <button className="flex items-center space-x-1 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="font-medium">A</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              <NavLink 
                to="" 
                end
                className={({isActive}) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('admin.dashboard')}
              </NavLink>
              
              <NavLink 
                to="references" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {t('admin.references')}
              </NavLink>
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
                {t('admin.quickLinks')}
              </div>
              <nav className="space-y-2">
                <NavLink 
                  to="references/new" 
                  className={({isActive}) => 
                    `flex items-center px-4 py-2 rounded-lg transition-colors text-sm ${
                      isActive 
                        ? 'bg-emerald-600/20 text-emerald-500' 
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('admin.addNewReference')}
                </NavLink>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage; 