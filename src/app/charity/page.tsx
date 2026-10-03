'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/charity.css';
import { CHARITY_BODY_HTML } from './charityHtml';

export default function CharityPortalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    };

    const initCharity = async () => {
      try {
        if (typeof window !== 'undefined' && !(window as any).supabase) {
          await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
        }
        await loadScript('https://unpkg.com/lucide@latest/dist/umd/lucide.min.js');
        await loadScript('/frontend/localDb.js');
        await loadScript('/frontend/qrService.js');
        await loadScript('/frontend/esgCertificate.js');
        await loadScript('/frontend/logisticsService.js');
        await loadScript('/frontend/matchingService.js');
        await loadScript('/frontend/alertService.js');
        await loadScript('/frontend/apiClient.js');
        await loadScript('/frontend/foodsave-live-data.js');
        await loadScript('/frontend/charity-bundle.js');
        await loadScript('/frontend/foodsave-auth-client.js');
      } catch (err) {
        console.error('Lỗi khởi tạo cổng Từ thiện:', err);
      }
    };

    initCharity();
  }, []);

  return (
    <div
      id="charity-portal-root"
      dangerouslySetInnerHTML={{ __html: CHARITY_BODY_HTML }}
    />
  );
}
