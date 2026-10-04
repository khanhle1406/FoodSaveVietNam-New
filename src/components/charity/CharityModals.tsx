'use client';

import React from 'react';

export default function CharityModals() {
  const handleOpenHelp = () => {
    if (typeof window !== 'undefined' && typeof (window as any).openLegal === 'function') {
      (window as any).openLegal('help');
    }
  };

  return (
    <>
      {/* Toast and Modal Containers for bundle alerts */}
      <div id="tb"></div>
      <div id="mb"></div>

      {/* Global Legal & Help Modal */}
      <div
        id="legal-modal"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,10,10,.5)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 3500,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div
          id="legal-content"
          style={{
            background: '#fff',
            borderRadius: 24,
            maxWidth: 760,
            width: '100%',
            maxHeight: '88vh',
            overflowY: 'auto',
          }}
        ></div>
      </div>

      {/* Floating Help Button */}
      <button
        type="button"
        id="float-help"
        onClick={handleOpenHelp}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#22c55e,#16a34a)',
          color: '#fff',
          border: 0,
          cursor: 'pointer',
          boxShadow: '0 12px 28px rgba(34,197,94,.4),0 4px 10px rgba(0,0,0,.1)',
          zIndex: 2900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          transition: 'all .25s cubic-bezier(.2,.8,.2,1)',
          fontFamily: 'inherit',
        }}
        title="Trợ giúp"
      >
        <i className="ti ti-help-circle"></i>
        <span
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#facc15',
            border: '2.5px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8,
            fontWeight: 900,
            color: '#0a0a0a',
          }}
        >
          ?
        </span>
      </button>

      {/* Offline Banner */}
      <div
        id="offline-banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#dc2626',
          color: '#fff',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12.5px',
          fontWeight: 800,
          zIndex: 9999,
          display: 'none',
          fontFamily: 'inherit',
        }}
      >
        <i className="ti ti-wifi-off"></i> Không có kết nối Internet — Một số tính năng tạm dừng
      </div>
    </>
  );
}
