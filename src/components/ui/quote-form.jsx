import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ModalBody, ModalContent, useModal } from './animated-modal';
import { motion } from 'framer-motion';

export const QuoteForm = ({ isStandalone = false }) => {
  const { t } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const countryCodeRef = useRef(null);
  
  // ModalProvider içinde değilse bir dummy setOpen fonksiyonu kullan
  const modalContext = isStandalone ? { setOpen: () => {} } : useModal();
  const { setOpen } = modalContext;

  const services = [
    { value: 'web-design', label: t('services.webDesign.title') },
    { value: 'graphic-design', label: t('services.graphicDesign.title') },
    { value: 'marketplace', label: t('services.marketplace.title') },
    { value: 'e-commerce', label: t('services.eCommerce.title') },
    { value: 'digital-advertising', label: t('services.digitalAdvertising.title') },
    { value: 'ai', label: t('services.ai.title') }
  ];

  const countryCodes = [
    { code: '+90', country: 'Türkiye' },
    { code: '+1', country: 'ABD' },
    { code: '+44', country: 'Birleşik Krallık' },
    { code: '+49', country: 'Almanya' },
    { code: '+33', country: 'Fransa' },
    { code: '+39', country: 'İtalya' },
    { code: '+34', country: 'İspanya' },
    { code: '+31', country: 'Hollanda' },
    { code: '+7', country: 'Rusya' },
    { code: '+86', country: 'Çin' }
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, t('form.validation.fullName.min'))
      .required(t('form.validation.fullName.required')),
    email: Yup.string()
      .email(t('form.validation.email.invalid'))
      .required(t('form.validation.email.required')),
    countryCode: Yup.string()
      .required(t('form.validation.countryCode.required')),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t('form.validation.phone.invalid'))
      .min(10, t('form.validation.phone.min'))
      .max(11, t('form.validation.phone.max'))
      .required(t('form.validation.phone.required')),
    selectedServices: Yup.array()
      .min(1, t('form.validation.services.min'))
      .required(t('form.validation.services.required')),
    message: Yup.string()
      .min(10, t('form.validation.message.min'))
      .max(500, t('form.validation.message.max'))
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      countryCode: '+90',
      phone: '',
      selectedServices: [],
      message: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Burada form verilerini API'ye gönderebilirsiniz
      setOpen(false); // Form gönderildikten sonra modalı kapat
    }
  });

  // Dropdown dışına tıklandığında kapanması için
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (countryCodeRef.current && !countryCodeRef.current.contains(event.target)) {
        setIsCountryCodeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Seçilen hizmetlerin etiketlerini göstermek için
  const getSelectedServiceLabels = () => {
    return formik.values.selectedServices.map(value => 
      services.find(service => service.value === value)?.label
    ).join(', ');
  };

  // Hizmet seçme/kaldırma işlevi
  const toggleService = (value) => {
    const currentServices = [...formik.values.selectedServices];
    const index = currentServices.indexOf(value);
    
    if (index === -1) {
      currentServices.push(value);
    } else {
      currentServices.splice(index, 1);
    }
    
    formik.setFieldValue('selectedServices', currentServices);
  };

  // Standalone modunda ModalBody içine sarma, sadece içeriği render et
  if (isStandalone) {
    return (
      <div className="max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {t('form.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {t('form.subtitle')}
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* İsim Soyisim */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.fullName')}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.fullName')}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          {/* E-posta */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.phone')}
            </label>
            <div className="flex">
              {/* Ülke Kodu Dropdown */}
              <div className="relative" ref={countryCodeRef}>
                <button
                  type="button"
                  className="flex items-center justify-between w-20 md:w-24 px-2 md:px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                >
                  <span>{formik.values.countryCode}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCountryCodeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-48 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 max-h-60 overflow-auto"
                  >
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          formik.setFieldValue('countryCode', country.code);
                          setIsCountryCodeOpen(false);
                        }}
                      >
                        <span className="font-medium">{country.code}</span> {country.country}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              {/* Telefon Numarası Input */}
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('form.placeholders.phone')}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          {/* Hizmetler Dropdown */}
          <div className="relative" ref={servicesRef}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.services')}
            </label>
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <span className="truncate">
                {formik.values.selectedServices.length > 0 
                  ? getSelectedServiceLabels() 
                  : t('form.selectService')}
              </span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1"
              >
                {services.map((service) => (
                  <div 
                    key={service.value} 
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleService(service.value)}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={formik.values.selectedServices.includes(service.value)}
                      onChange={() => {}}
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                      {service.label}
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
            {formik.touched.selectedServices && formik.errors.selectedServices && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.selectedServices}</div>
            )}
          </div>

          {/* Mesaj */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.message')}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
            )}
          </div>
          
          {/* Form Butonları */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-end mt-6">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="w-full sm:w-auto ml-0 sm:ml-3 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('form.submit')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Modal içinde ise normal modda render et
  return (
    <ModalBody>
      <ModalContent className="max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {t('form.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {t('form.subtitle')}
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* İsim Soyisim */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.fullName')}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.fullName')}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          {/* E-posta */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.phone')}
            </label>
            <div className="flex">
              {/* Ülke Kodu Dropdown */}
              <div className="relative" ref={countryCodeRef}>
                <button
                  type="button"
                  className="flex items-center justify-between w-20 md:w-24 px-2 md:px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                >
                  <span>{formik.values.countryCode}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCountryCodeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-48 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 max-h-60 overflow-auto"
                  >
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          formik.setFieldValue('countryCode', country.code);
                          setIsCountryCodeOpen(false);
                        }}
                      >
                        <span className="font-medium">{country.code}</span> {country.country}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              {/* Telefon Numarası Input */}
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('form.placeholders.phone')}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          {/* Hizmetler Dropdown */}
          <div className="relative" ref={servicesRef}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.services')}
            </label>
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <span className="truncate">
                {formik.values.selectedServices.length > 0 
                  ? getSelectedServiceLabels() 
                  : t('form.selectService')}
              </span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1"
              >
                {services.map((service) => (
                  <div 
                    key={service.value} 
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleService(service.value)}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={formik.values.selectedServices.includes(service.value)}
                      onChange={() => {}}
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                      {service.label}
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
            {formik.touched.selectedServices && formik.errors.selectedServices && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.selectedServices}</div>
            )}
          </div>

          {/* Mesaj */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('form.placeholders.message')}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
            )}
          </div>
          
          {/* Modal için butonlar */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-end mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              {t('form.cancel')}
            </button>
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="w-full sm:w-auto ml-0 sm:ml-3 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('form.submit')}
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalBody>
  );
};