import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Ülke kodları
const countryCodes = [
  { code: '+90', country: 'TR' },
  { code: '+1', country: 'US' },
  { code: '+44', country: 'GB' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+39', country: 'IT' },
  { code: '+34', country: 'ES' },
  { code: '+31', country: 'NL' },
  { code: '+7', country: 'RU' },
  { code: '+86', country: 'CN' },
  { code: '+91', country: 'IN' },
  { code: '+81', country: 'JP' },
  { code: '+82', country: 'KR' },
  { code: '+61', country: 'AU' },
  { code: '+55', country: 'BR' },
  { code: '+52', country: 'MX' },
  { code: '+971', country: 'AE' },
  { code: '+966', country: 'SA' },
  { code: '+20', country: 'EG' },
  { code: '+27', country: 'ZA' },
];

const Contact = () => {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+90');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [customSubject, setCustomSubject] = useState('');

  // Form validasyon şeması
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, t('form.validation.fullName.min'))
      .required(t('form.validation.fullName.required')),
    email: Yup.string()
      .email(t('form.validation.email.invalid'))
      .required(t('form.validation.email.required')),
    phone: Yup.string()
      .min(10, t('form.validation.phone.min'))
      .max(11, t('form.validation.phone.max'))
      .required(t('form.validation.phone.required')),
    message: Yup.string()
      .min(10, t('form.validation.message.min'))
      .max(500, t('form.validation.message.max')),
    subject: Yup.string()
      .required('Lütfen bir konu seçiniz'),
    customSubject: Yup.string()
      .when('subject', {
        is: 'other',
        then: (schema) => schema.required('Lütfen konunuzu yazınız'),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  // Formik form yönetimi
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      subject: '',
      customSubject: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Eğer "Diğer" seçilmişse, özel konuyu kullan
      const finalValues = {
        ...values,
        countryCode,
        finalSubject: values.subject === 'other' ? values.customSubject : values.subject
      };
      console.log(finalValues);
      // Form gönderme işlemi burada yapılacak
      alert('Form gönderildi!');
    },
  });

  // Hizmet seçenekleri
  const serviceOptions = [
    { value: 'webDesign', label: t('navbar.dropdown.services.webDesign') },
    { value: 'graphicDesign', label: t('navbar.dropdown.services.graphicDesign') },
    { value: 'marketplace', label: t('navbar.dropdown.services.marketplace') },
    { value: 'eCommerce', label: t('navbar.dropdown.services.eCommerce') },
    { value: 'digitalAdvertising', label: t('navbar.dropdown.services.digitalAdvertising') },
    { value: 'ai', label: t('navbar.dropdown.services.ai') },
  ];

  // Konu seçenekleri
  const subjectOptions = [
    { value: 'getService', label: 'Hizmet almak istiyorum' },
    { value: 'getMeeting', label: 'Görüşme talep ediyorum' },
    { value: 'getQuote', label: 'Fiyat teklifi almak istiyorum' },
    { value: 'getInfo', label: 'Bilgi almak istiyorum' },
    { value: 'other', label: 'Diğer' },
  ];

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contactPage.title')}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
            {t('contactPage.subtitle')}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            {t('contactPage.description')}
          </p>
        </div>
      </motion.div>

      {/* İletişim Bilgileri ve Form */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/10">
          <div className="flex flex-col md:flex-row">
            {/* İletişim Bilgileri */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3 bg-gradient-to-br from-emerald-500/20 to-teal-700/20 p-8 text-white border-r border-white/10"
            >
              <h3 className="text-2xl font-bold mb-8">{t('contactPage.info.title')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.address.title')}</p>
                    <p className="mt-1">{t('contactPage.info.address.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.phone.title')}</p>
                    <p className="mt-1">{t('contactPage.info.phone.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.email.title')}</p>
                    <p className="mt-1">{t('contactPage.info.email.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaClock className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.workHours.title')}</p>
                    <p className="mt-1">{t('contactPage.info.workHours.value')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* İletişim Formu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-2/3 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('contactPage.form.title')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('contactPage.form.subtitle')}
              </p>
              
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                    {t('form.fullName')}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className={`mt-1 block w-full rounded-md bg-white/10 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                      formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : ''
                    }`}
                    placeholder={t('form.placeholders.fullName')}
                    {...formik.getFieldProps('fullName')}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.fullName}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      {t('form.email')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`mt-1 block w-full rounded-md bg-white/10 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder={t('form.placeholders.email')}
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                      {t('form.phone')}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative inline-block text-left">
                        <div>
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-l-md border border-gray-600 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          >
                            {countryCode}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        {isCountryDropdownOpen && (
                          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="py-1 max-h-60 overflow-y-auto">
                              {countryCodes.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  className="text-white block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                                  onClick={() => {
                                    setCountryCode(country.code);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                >
                                  {country.code} ({country.country})
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className={`flex-1 min-w-0 block w-full rounded-none rounded-r-md bg-white/10 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                          formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
                        }`}
                        placeholder={t('form.placeholders.phone')}
                        {...formik.getFieldProps('phone')}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Konu
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className={`mt-1 block w-full rounded-md bg-white/10 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                      formik.touched.subject && formik.errors.subject ? 'border-red-500' : ''
                    }`}
                    {...formik.getFieldProps('subject')}
                  >
                    <option value="" disabled className="bg-gray-800 text-white">Konu seçiniz</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.subject}</p>
                  )}
                  
                  {formik.values.subject === 'other' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        id="customSubject"
                        name="customSubject"
                        className={`block w-full rounded-md bg-white/10 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                          formik.touched.customSubject && formik.errors.customSubject ? 'border-red-500' : ''
                        }`}
                        placeholder="Konunuzu yazınız"
                        {...formik.getFieldProps('customSubject')}
                      />
                      {formik.touched.customSubject && formik.errors.customSubject && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors.customSubject}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`mt-1 block w-full rounded-md bg-white/10 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 ${
                      formik.touched.message && formik.errors.message ? 'border-red-500' : ''
                    }`}
                    placeholder={t('form.placeholders.message')}
                    {...formik.getFieldProps('message')}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.message}</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    {t('form.submit')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Harita */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            {t('contactPage.map.title')}
          </h2>
        </div>
        
        <div className="h-96 bg-black/30 backdrop-blur-md rounded-lg overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900490384!2d29.099705376486276!3d40.99008592012693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8a8000e0001%3A0x3f3f3f3f3f3f3f3f!2zQXRhxZ9laGlyLCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1615000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Demirci Yazılım Ofis Konumu"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact; 