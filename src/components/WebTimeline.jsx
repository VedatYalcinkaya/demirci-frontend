import React from 'react';
import { Timeline } from './ui/timeline';

const timelineData = [
  {
    title: "01",
    content: (
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Analiz ve Planlama</h3>
        <p className="text-neutral-200 text-base mb-6">
          İhtiyaçlarınızı analiz ediyor, hedeflerinize uygun bir strateji belirliyoruz.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">Hedef Analizi</h4>
            <p className="text-neutral-300 text-sm">Projenizin amaçlarını ve hedef kitlenizi belirliyoruz.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">İçerik Stratejisi</h4>
            <p className="text-neutral-300 text-sm">Web sitenizin içerik yapısını ve stratejisini oluşturuyoruz.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "02",
    content: (
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Tasarım</h3>
        <p className="text-neutral-200 text-base mb-6">
          Modern trendlere uygun, markanızı yansıtan özgün tasarımlar oluşturuyoruz.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">UI/UX Tasarım</h4>
            <p className="text-neutral-300 text-sm">Kullanıcı deneyimini ön planda tutan arayüz tasarımları.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">Responsive Tasarım</h4>
            <p className="text-neutral-300 text-sm">Tüm cihazlarda mükemmel görünen tasarımlar.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "03",
    content: (
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Geliştirme</h3>
        <p className="text-neutral-200 text-base mb-6">
          En son teknolojilerle güvenli ve performanslı web siteleri geliştiriyoruz.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">Modern Teknolojiler</h4>
            <p className="text-neutral-300 text-sm">React, Next.js gibi modern framework'ler kullanıyoruz.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">SEO Optimizasyonu</h4>
            <p className="text-neutral-300 text-sm">Arama motorları için optimize edilmiş kodlama.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "04",
    content: (
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Test ve Yayın</h3>
        <p className="text-neutral-200 text-base mb-6">
          Kapsamlı testlerden sonra sitenizi yayına alıyor ve destek sağlıyoruz.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">Kalite Kontrol</h4>
            <p className="text-neutral-300 text-sm">Detaylı test süreçleri ve hata ayıklama.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-emerald-500 font-semibold mb-2">Sürekli Destek</h4>
            <p className="text-neutral-300 text-sm">Yayın sonrası teknik destek ve bakım hizmetleri.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export function WebTimeline() {
  return (
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  );
} 