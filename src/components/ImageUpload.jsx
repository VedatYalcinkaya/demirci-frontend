import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ImageUpload = ({ 
  onChange, 
  value, 
  placeholder, 
  accept = "image/*", 
  label, 
  error, 
  multiple = false,
  className = "",
  previewClassName = ""
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = multiple ? e.dataTransfer.files : [e.dataTransfer.files[0]];
      onChange({ target: { files: files } });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e);
    }
  };

  const renderPreview = () => {
    if (!value) return null;
    
    // Tekli resim ise
    if (typeof value === 'string') {
      return (
        <div className={`relative ${previewClassName}`}>
          <img 
            src={value} 
            alt={label || "Preview"} 
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      );
    }
    
    // Çoklu resim ise
    if (Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((img, index) => (
            <div key={index} className={`relative ${previewClassName}`}>
              <img 
                src={img.url || img} 
                alt={`Preview ${index}`} 
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 transition-colors
          ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-600 hover:border-gray-500'}
          ${error ? 'border-red-500 bg-red-500/10' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
        />
        
        <div className="flex flex-col items-center justify-center py-5">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" 
            />
          </svg>
          
          <p className="mt-2 text-sm text-gray-400">
            {placeholder || t('common.dragAndDrop')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t('common.or')} <span className="text-emerald-500">{t('common.browse')}</span>
          </p>
        </div>
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
      
      {renderPreview()}
    </div>
  );
};

export default ImageUpload; 