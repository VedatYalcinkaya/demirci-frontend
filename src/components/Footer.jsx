import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ColoredLogo } from './ui/ColoredLogo';

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="relative w-full bg-black/50 border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            {/* <img src={demirciLogo} alt="Demirci Yazılım Logo" className="h-12 w-auto mb-4" /> */}
 
            <Link to="/" className="flex items-center">
              <ColoredLogo className="h-8 md:h-12 w-auto" />
            </Link>

            <p className="text-neutral-400 text-sm mt-4">
              {t('footer.description')}
            </p>

            {/* Dil Seçimi */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => changeLanguage('tr')}
                className={`text-sm ${i18n.language === 'tr' ? 'text-emerald-500' : 'text-neutral-400 hover:text-emerald-500'} transition-colors`}
              >
                Türkçe
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm ${i18n.language === 'en' ? 'text-emerald-500' : 'text-neutral-400 hover:text-emerald-500'} transition-colors`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('de')}
                className={`text-sm ${i18n.language === 'de' ? 'text-emerald-500' : 'text-neutral-400 hover:text-emerald-500'} transition-colors`}
              >
                Deutsch
              </button>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/web-tasarim">{t('navbar.dropdown.services.webDesign')}</FooterLink>
              <FooterLink href="/grafik-tasarim">{t('navbar.dropdown.services.graphicDesign')}</FooterLink>
              <FooterLink href="/sanal-pazaryeri">{t('navbar.dropdown.services.marketplace')}</FooterLink>
              <FooterLink href="/e-ticaret">{t('navbar.dropdown.services.eCommerce')}</FooterLink>
              <FooterLink href="/dijital-reklamcilik">{t('navbar.dropdown.services.digitalAdvertising')}</FooterLink>
              <FooterLink href="/yapay-zeka">{t('navbar.dropdown.services.ai')}</FooterLink>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.corporate')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</FooterLink>
              <FooterLink href="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</FooterLink>
              <FooterLink href="/referanslar">{t('navbar.references')}</FooterLink>
              <FooterLink href="/blog">{t('navbar.blog')}</FooterLink>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <Link to="/iletisim" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('navbar.dropdown.contact.contactUs')}
                </Link>
              </li>
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <Link to="/teklif-al" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {t('navbar.dropdown.contact.getQuote')}
                </Link>
              </li>
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <Link to="/iletisim/sikca-sorulan-sorular" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('navbar.dropdown.contact.faq')}
                </Link>
              </li>
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <a href="tel:+905303785281" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 530 378 52 81
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-neutral-400 text-sm">
          {t('footer.copyright', { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, children }) => (
  <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
    <Link to={href}>{children}</Link>
  </li>
); 