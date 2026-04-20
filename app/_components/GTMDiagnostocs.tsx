'use client';

import { useEffect } from 'react';

export default function GTMDiagnostics() {
  useEffect(() => {
    // Перевіряємо, чи завантажений GTM
    const checkGTM = () => {
      if (typeof window !== 'undefined') {
        console.log('GTM ID:', process.env.NEXT_PUBLIC_GTM_ID);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log('dataLayer exists:', !!(window as any).dataLayer);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log('google_tag_manager exists:', !!(window as any).google_tag_manager);
        
        // Перевіряємо, чи є GTM скрипт на сторінці
        const gtmScript = document.querySelector('script[src*="googletagmanager.com"]');
        console.log('GTM script loaded:', !!gtmScript);
        
        if (gtmScript) {
          console.log('GTM script src:', gtmScript.getAttribute('src'));
        }
      }
    };

    // Перевіряємо через 1 секунду після завантаження
    const timeoutId = setTimeout(checkGTM, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Компонент нічого не рендерить у продакшені
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{ display: 'none' }}>
      GTM Diagnostics Active
    </div>
  );
}   