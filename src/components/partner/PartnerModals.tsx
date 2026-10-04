'use client';

import React from 'react';

export default function PartnerModals() {
  const handleCloseFaceCapture = () => {
    if (typeof window !== 'undefined' && typeof (window as any).closeFaceCapture === 'function') {
      (window as any).closeFaceCapture();
    }
  };

  const handleCaptureFacePhoto = () => {
    if (typeof window !== 'undefined' && typeof (window as any).captureFacePhoto === 'function') {
      (window as any).captureFacePhoto();
    }
  };

  const handleOpenHelp = () => {
    if (typeof window !== 'undefined' && typeof (window as any).openLegal === 'function') {
      (window as any).openLegal('help');
    }
  };

  return (
    <>
      <div id="tb"></div>
      <div id="mb"></div>

      {/* Face Capture Modal */}
      <div
        id="face-capture-modal"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,10,10,.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 3600,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            maxWidth: 420,
            width: '100%',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: 18,
              color: 'var(--ink)',
              margin: '0 0 4px',
            }}
          >
            Quét khuôn mặt
          </h3>
          <p
            style={{
              fontSize: 12.5,
              color: 'var(--muted)',
              fontWeight: 600,
              margin: '0 0 16px',
            }}
          >
            Đưa khuôn mặt vào giữa khung hình rồi bấm chụp
          </p>
          <div
            style={{
              position: 'relative',
              width: 240,
              height: 240,
              margin: '0 auto 16px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#0a0a0a',
              border: '3px solid var(--green-700)',
            }}
          >
            <video
              id="face-capture-video"
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)',
              }}
            ></video>
            <canvas id="face-capture-canvas" style={{ display: 'none' }}></canvas>
          </div>
          <div
            id="face-capture-error"
            style={{
              display: 'none',
              fontSize: 12,
              color: 'var(--red)',
              fontWeight: 700,
              marginBottom: 12,
            }}
          ></div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn btn-o btn-lg"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={handleCloseFaceCapture}
            >
              <i className="ti ti-x"></i> Hủy
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={handleCaptureFacePhoto}
            >
              <i className="ti ti-camera"></i> Chụp ảnh
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              const fileInput = document.getElementById('face-scan-input');
              if (fileInput) fileInput.click();
              handleCloseFaceCapture();
            }}
            style={{
              marginTop: 14,
              background: 'none',
              border: 0,
              fontSize: 11.5,
              color: 'var(--muted)',
              fontWeight: 700,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Tải ảnh có sẵn từ thiết bị thay vào đó
          </button>
        </div>
      </div>

      {/* Global Legal Modal */}
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
          fontSize: 12.5,
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
