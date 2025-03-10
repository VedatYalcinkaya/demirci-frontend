import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const ColoredLogo = ({ className }) => {
  const location = useLocation();
  
  // Sayfa yoluna göre renk teması belirleme
  const getColorTheme = () => {
    const path = location.pathname;
    
    if (path.includes('web-tasarim')) {
      return 'emerald';
    } else if (path.includes('grafik-tasarim')) {
      return 'cyan';
    } else if (path.includes('sanal-pazaryeri')) {
      return 'purple';
    } else if (path.includes('e-ticaret')) {
      return 'amber';
    } else if (path.includes('dijital-reklamcilik')) {
      return 'rose';
    } else if (path.includes('yapay-zeka')) {
      return 'violet';
    } else {
      return 'emerald'; // Varsayılan renk
    }
  };
  
  // Renk temasına göre gradient renkleri belirleme
  const getGradientColors = () => {
    const theme = getColorTheme();
    
    switch (theme) {
      case 'emerald':
        return { start: '#99FCAC', end: '#08B99D' };
      case 'violet':
        return { start: '#4776E6', end: '#8E54E9' };
      case 'purple':
        return { start: '#D8B4FE', end: '#A855F7' };
      case 'amber':
        return { start: '#FDE68A', end: '#F59E0B' };
      case 'rose':
        return { start: '#FDA4AF', end: '#E11D48' };
      case 'cyan':
        return { start: '#A5F3FC', end: '#0891B2' };
      default:
        return { start: '#99FCAC', end: '#08B99D' };
    }
  };
  
  // Benzersiz gradient ID'leri oluştur
  const dGradientId = useMemo(() => {
    const theme = getColorTheme();
    return `d-logo-gradient-${theme}-${Math.random().toString(36).substring(2, 9)}`;
  }, [location.pathname]);
  
  const textGradientId = useMemo(() => {
    const theme = getColorTheme();
    return `text-logo-gradient-${theme}-${Math.random().toString(36).substring(2, 9)}`;
  }, [location.pathname]);
  
  const innerBorderGradientId = useMemo(() => {
    const theme = getColorTheme();
    return `inner-border-gradient-${theme}-${Math.random().toString(36).substring(2, 9)}`;
  }, [location.pathname]);
  
  const { start, end } = getGradientColors();
  
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      xmlSpace="preserve" 
      width="695.444mm" 
      height="183.001mm" 
      version="1.1" 
      viewBox="0 0 12860.06 3384.04"
      aria-label="Demirci Yazılım Logo"
    >
      <defs>
        {/* D harfi için gradyan */}
        <linearGradient id={dGradientId} gradientUnits="userSpaceOnUse" x1="1000" y1="1000" x2="2500" y2="2500">
          <stop offset="0" style={{ stopOpacity: 1, stopColor: start }} />
          <stop offset="1" style={{ stopOpacity: 1, stopColor: end }} />
        </linearGradient>
        
        {/* DEMİRCİ yazısı için gradyan */}
        <linearGradient id={textGradientId} gradientUnits="userSpaceOnUse" x1="3500" y1="1500" x2="8000" y2="2000">
          <stop offset="0" style={{ stopOpacity: 1, stopColor: start }} />
          <stop offset="1" style={{ stopOpacity: 1, stopColor: end }} />
        </linearGradient>
        
        {/* İç çerçeve için gradyan */}
        <linearGradient id={innerBorderGradientId} gradientUnits="userSpaceOnUse" x1="129.44" y1="1692.02" x2="12730.62" y2="1692.02">
          <stop offset="0" style={{ stopOpacity: 1, stopColor: start }} />
          <stop offset="1" style={{ stopOpacity: 1, stopColor: end }} />
        </linearGradient>
      </defs>
      <g>
        {/* D harfi */}
        <path 
          fill={`url(#${dGradientId})`} 
          d="M1999.51 2398.14l0 -1286.52 -309.87 0 0 1578.3 309.87 0 0 -291.77zm125.18 -1411.7l438.19 0c389.83,0 705.85,316.02 705.85,705.85 0,389.83 -316.02,705.85 -705.85,705.85l-1.73 -0 -436.45 0 0 291.77 438.19 0c550.97,0 997.62,-446.65 997.62,-997.62 0,-550.97 -446.65,-997.62 -997.62,-997.62l-873.23 0 0 291.77 309.87 0 125.18 0zm438.19 125.18l-438.19 0 0 1161.35 438.19 0c320.7,0 580.67,-259.98 580.67,-580.68 0,-320.7 -259.98,-580.67 -580.67,-580.67z"
        />
        
        {/* DEMİRCİ yazısı */}
        <path 
          fill={`url(#${textGradientId})`} 
          d="M3985.65 1985.86l0 -1291.61 623.6 0c161.97,0 275.38,31.98 340.82,96.24 65.44,63.96 98.01,175.89 98.01,335.19l0 426.1c0,160.19 -32.87,272.71 -98.6,337.26 -65.44,64.55 -178.85,96.83 -340.23,96.83l-623.6 0zm142.13 -127.92l458.08 0c124.07,0 207.57,-21.02 249.62,-63.37 42.34,-42.05 63.37,-122.59 63.37,-241.03l0 -417.51c0,-124.66 -21.02,-208.46 -62.77,-250.51 -42.05,-42.34 -125.55,-63.37 -250.21,-63.37l-458.08 0 0 1035.78zm1190.34 127.92l0 -1291.61 906.09 0 0 136.8 -763.95 0 0 422.84 742.34 0 0 131.47 -742.34 0 0 465.48 763.95 0 0 135.02 -906.09 0zm1135.57 0l0 -1291.61 234.81 0 442.38 1150.96 438.24 -1150.96 236.59 0 0 1291.61 -142.13 0 0 -1171.1 -445.94 1171.1 -175.89 0 -445.94 -1171.1 0 1171.1 -142.13 0zm1664.71 0l0 -1291.61 143.91 0 0 1291.61 -143.91 0zm7.11 -1465.73l0 -151.01 131.47 0 0 151.01 -131.47 0zm1003.5 310.91l-412.18 0 0 517 412.18 0c107.49,0 177.96,-13.33 211.12,-39.97 33.46,-26.65 50.04,-74.32 50.04,-143.02l0 -151.01c0,-69.88 -15.99,-117.85 -48.27,-143.91 -31.98,-26.06 -103.04,-39.09 -212.9,-39.09zm-554.31 1154.81l0 -1291.61 583.03 0c145.09,0 244.88,21.62 299.66,64.55 54.78,42.93 82.02,119.63 82.02,230.07l0 195.13c0,67.81 -13.62,121.11 -41.16,159.6 -27.54,38.49 -69.29,62.48 -125.55,72.25 61.3,14.51 104.53,40.86 129.4,79.06 24.87,38.2 37.31,98.31 37.31,180.62l0 310.32 -149.24 0 0 -266.2c0,-92.39 -14.51,-154.86 -43.82,-187.73 -29.32,-32.57 -86.46,-48.86 -171.45,-48.86l-458.08 0 0 502.79 -142.13 0zm1201.3 -864.93c0,-165.52 31.68,-280.71 95.05,-345.56 63.37,-64.85 175,-97.12 335.49,-97.12l151.02 0c159.01,0 270.64,27.83 334.9,83.8 64.26,55.96 96.23,150.72 96.23,284.56l0 56.26 -147.46 0 0 -35.53c0,-97.71 -19.84,-164.34 -59.81,-200.17 -39.97,-35.83 -118.15,-53.89 -234.52,-53.89l-99.79 0c-77.88,0 -134.73,4.74 -170.56,14.21 -35.53,9.77 -65.14,25.76 -88.83,48.26 -23.69,21.91 -40.27,50.63 -50.04,86.17 -9.48,35.53 -14.21,100.38 -14.21,194.54l0 367.76c0,93.57 4.74,158.12 14.21,193.95 9.77,35.53 26.35,64.25 50.04,86.17 23.69,22.5 52.41,38.49 86.46,48.27 33.76,9.48 91.5,14.21 172.93,14.21l99.79 0c119.33,0 198.69,-18.65 238.07,-56.26 39.08,-37.61 58.92,-109.85 58.92,-216.16 0,-16.29 -0.3,-28.72 -0.59,-37.31 -0.3,-8.59 -0.59,-16.88 -1.19,-24.28l146.57 0 0 84.98c0,143.61 -31.09,243.7 -93.27,299.66 -62.18,56.26 -175,84.39 -337.86,84.39l-151.02 0c-160.49,0 -272.12,-32.57 -335.49,-97.42 -63.37,-64.85 -95.05,-180.03 -95.05,-345.56l0 -437.94zm1254.6 864.93l0 -1291.61 143.91 0 0 1291.61 -143.91 0zm7.11 -1465.73l0 -151.01 131.47 0 0 151.01 -131.47 0z"
        />
        
        {/* Yazılım ve Teknoloji yazısı - beyaz renkte */}
        <text 
          x="7640" 
          y="2700" 
          fill="#FFFFFF" 
          fontFamily="Square721 Roman" 
          fontSize="630" 
          textAnchor="middle"
          style={{ fontFamily: 'Square721 Roman' }}
        >
          YAZILIM VE TEKNOLOJİ
        </text>
        
        {/* Dış çerçeve - beyaz
        <path 
          fill="#fff" 
          d="M1680.3 46.23l9499.45 0c903.72,0 1634.08,744.84 1634.08,1645.79 0,900.95 -730.36,1645.79 -1634.08,1645.79l-9499.45 0c-903.72,0 -1634.08,-744.84 -1634.08,-1645.79 0,-900.95 730.36,-1645.79 1634.08,-1645.79zm9499.45 -46.23l-9499.45 0c-929.23,0 -1680.3,765.55 -1680.3,1692.02 0,926.47 751.08,1692.02 1680.3,1692.02l9499.45 0c929.23,0 1680.3,-765.55 1680.3,-1692.02 0,-926.47 -751.08,-1692.02 -1680.3,-1692.02z"
        /> */}
        
        {/* İç çerçeve - renkli */}
        <path 
          fill={`url(#${innerBorderGradientId})`} 
          d="M1680.3 277.38l9499.45 0c771.61,0 1402.93,636.59 1402.93,1414.64 0,778.05 -631.32,1414.64 -1402.93,1414.64l-9499.45 0c-771.61,0 -1402.93,-636.59 -1402.93,-1414.64 0,-778.05 631.31,-1414.64 1402.93,-1414.64zm9499.45 -147.93l-9499.45 0c-857.83,0 -1550.86,707.52 -1550.86,1562.58 0,855.05 693.03,1562.57 1550.86,1562.57l9499.45 0c857.83,0 1550.86,-707.52 1550.86,-1562.58 0,-855.05 -693.03,-1562.57 -1550.86,-1562.57z"
        />
      </g>
    </svg>
  );
}; 