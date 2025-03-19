import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft } from '@tabler/icons-react';

const AdminHeader = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="mr-4 p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <IconChevronLeft className="h-5 w-5 text-gray-300" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-700 mt-4 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-1/4 rounded-full"></div>
      </div>
    </div>
  );
};

export default AdminHeader; 