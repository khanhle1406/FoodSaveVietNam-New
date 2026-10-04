'use client';

import React from 'react';

export default function PartnerPortalView() {
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
            <span className="side-cap">Cổng đối tác</span>
          </div>
        </div>
        <div className="side-store" id="ss"></div>
        <nav className="side-nav" id="snav"></nav>
        <div className="side-ft">FoodSave Portal v2.6</div>
      </div>
      <div className="main">
        <div className="app-topbar">
          <div>
            <h2 id="pt">Tổng quan hệ thống</h2>
          </div>
          <div className="t-a">
            <div className="t-s">
              <i className="ti ti-search"></i>
              <input placeholder="Tìm đơn, sản phẩm, khách…" />
            </div>
            <div className="t-clk" id="clk">
              --:--:--
            </div>
            <div className="t-b" onClick={handleShowNoti}>
              <i className="ti ti-bell"></i>
              <div className="dot"></div>
            </div>
            <div className="t-b" onClick={handleShowQR}>
              <i className="ti ti-qrcode"></i>
            </div>
            <div className="t-av" id="partner-header-avatar" onClick={handleShowProf}>
              NV
            </div>
          </div>
        </div>
        <div className="content" id="ct"></div>
      </div>
    </div>
  );
}
