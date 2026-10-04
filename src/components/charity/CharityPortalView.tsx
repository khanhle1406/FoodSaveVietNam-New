'use client';

import React from 'react';

export default function CharityPortalView() {
  const handleShowMatching = () => {
    if (typeof window !== 'undefined' && (window as any).FoodSaveMatching) {
      (window as any).FoodSaveMatching.showCreateDemandModal();
    }
  };

  const handleShowNoti = () => {
    if (typeof window !== 'undefined' && typeof (window as any).showNoti === 'function') {
      (window as any).showNoti();
    }
  };

  const handleShowQR = () => {
    if (typeof window !== 'undefined' && typeof (window as any).showQR === 'function') {
      (window as any).showQR();
    }
  };

  const handleShowProf = () => {
    if (typeof window !== 'undefined' && typeof (window as any).showProf === 'function') {
      (window as any).showProf();
    }
  };

  return (
    <div className="app-w" id="portal">
      <div className="side">
        <div className="side-logo">
          <div className="brand-stack">
            <span className="brand-word">
              FOOD<span>SAVE</span>
            </span>
            <span className="side-cap">Cổng từ thiện</span>
          </div>
        </div>
        <div className="side-org" id="so"></div>
        <nav className="side-nav" id="snav"></nav>
        <div className="side-ft">FoodSave Portal v2.6</div>
      </div>
      <div className="main">
        <div className="app-topbar">
          <div>
            <h2 id="pt">Tổng quan hoạt động</h2>
          </div>
          <div className="t-a">
            <div className="t-s">
              <i className="ti ti-search"></i>
              <input placeholder="Tìm donation, tình nguyện viên..." />
            </div>
            <div className="t-clk" id="clk">
              --:--:--
            </div>
            <button
              type="button"
              onClick={handleShowMatching}
              className="btn btn-sm"
              style={{
                height: 36,
                padding: '0 14px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
              }}
            >
              <i className="ti ti-bolt"></i>Đăng Nhu Cầu & Ghép Đơn
            </button>
            <div className="t-b" onClick={handleShowNoti}>
              <i className="ti ti-bell"></i>
              <div className="dot"></div>
            </div>
            <div className="t-b" onClick={handleShowQR}>
              <i className="ti ti-qrcode"></i>
            </div>
            <div className="t-av" id="charity-header-avatar" onClick={handleShowProf}>
              <img id="charity-header-avatar-img" src="/link_anh_placeholder_mac_dinh.png" alt="Avatar tổ chức" />
            </div>
          </div>
        </div>
        <div className="content" id="ct"></div>
      </div>
    </div>
  );
}
