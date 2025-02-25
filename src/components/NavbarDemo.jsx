"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import demirciLogo from "../assets/DemirciLogo_3.svg";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-6xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center ml-[-32px] mt-[-24px] mb-[-24px]">
            <a href="/" className="flex items-center">
              <img
                src={demirciLogo}
                alt="Demirci Yazılım Logo"
                className="h-25 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <MenuItem setActive={setActive} active={active} item="Hizmetlerimiz">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-tasarim">Web Tasarım</HoveredLink>
                <HoveredLink href="/grafik-tasarim">Grafik Tasarım</HoveredLink>
                <HoveredLink href="/dijital-pazarlama">Dijital Pazarlama</HoveredLink>
                <HoveredLink href="/e-ticaret">E-Ticaret Çözümleri</HoveredLink>
                <HoveredLink href="/mobil-uygulama">Mobil Uygulama</HoveredLink>
                <HoveredLink href="/yazilim-gelistirme">Yazılım Geliştirme</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Referanslar">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="E-Ticaret Projeleri"
                  href="/referanslar/e-ticaret"
                  src="https://picsum.photos/id/10/800/600"
                  description="Başarıyla tamamladığımız e-ticaret projeleri." />
                <ProductItem
                  title="Kurumsal Web Siteleri"
                  href="/referanslar/kurumsal"
                  src="https://picsum.photos/id/20/800/600"
                  description="Kurumsal müşterilerimiz için geliştirdiğimiz web siteleri." />
                <ProductItem
                  title="Mobil Uygulamalar"
                  href="/referanslar/mobil"
                  src="https://picsum.photos/id/30/800/600"
                  description="iOS ve Android platformları için geliştirdiğimiz uygulamalar." />
                <ProductItem
                  title="Özel Yazılım Projeleri"
                  href="/referanslar/yazilim"
                  src="https://picsum.photos/id/40/800/600"
                  description="Müşterilerimize özel geliştirdiğimiz yazılım çözümleri." />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Hakkımızda">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hakkimizda/biz-kimiz">Biz Kimiz</HoveredLink>
                <HoveredLink href="/hakkimizda/vizyon-misyon">Vizyon & Misyon</HoveredLink>
                <HoveredLink href="/hakkimizda/ekibimiz">Ekibimiz</HoveredLink>
                <HoveredLink href="/hakkimizda/teknolojiler">Kullandığımız Teknolojiler</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="İletişim">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/iletisim/bize-ulasin">Bize Ulaşın</HoveredLink>
                <HoveredLink href="/iletisim/teklif-al">Teklif Alın</HoveredLink>
                <HoveredLink href="/iletisim/kariyer">Kariyer</HoveredLink>
                <HoveredLink href="/iletisim/sikca-sorulan-sorular">S.S.S.</HoveredLink>
              </div>
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
}
