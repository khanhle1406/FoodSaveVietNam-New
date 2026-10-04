'use client';

import React from 'react';

export default function CharityTopbar() {
  const handleAuth = (mode: 'login' | 'register') => {
    if (typeof window !== 'undefined' && typeof (window as any).goAuth === 'function') {
      (window as any).goAuth(mode);
    }
  };

  const handleScrollTo = (id: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).scrollTo2 === 'function') {
      (window as any).scrollTo2(id);
    }
  };

  const handleGoView = (viewId: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).goView === 'function') {
      (window as any).goView(viewId);
    }
  };

  const handleContact = () => {
    if (typeof window !== 'undefined' && typeof (window as any).contact === 'function') {
      (window as any).contact();
    }
  };

  return (
    <header className="topbar" id="topbar">
      <div className="mission-strip">
        <div className="wrap">
          <div className="ticker-window">
            <div className="ticker-track">
              <span className="tick-item">
                <i className="ti ti-heart-handshake"></i>
                <span><b>24</b> tổ chức đang hoạt động trên FoodSave</span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-bowl"></i>
                <span>Đã luân chuyển <b>9,820 suất ăn</b> tháng 5/2026</span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-users"></i>
                <span>Phục vụ <b>3,420 người yếu thế</b></span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-leaf"></i>
                <span>Đã cứu <b>12.4 tấn</b> thực phẩm cuối ngày</span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-coin"></i>
                <span>Thực phẩm miễn phí <b>100%</b></span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-heart-handshake"></i>
                <span><b>24</b> tổ chức đang hoạt động trên FoodSave</span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-bowl"></i>
                <span>Đã luân chuyển <b>9,820 suất ăn</b> tháng 5/2026</span>
              </span>
              <span className="tick-sep"></span>
              <span className="tick-item">
                <i className="ti ti-users"></i>
                <span>Phục vụ <b>3,420 người yếu thế</b></span>
              </span>
              <span className="tick-sep"></span>
            </div>
          </div>
          <div className="strip-links">
            <span className="live-pulse">
              <span className="dot"></span>LIVE
            </span>
            <span className="strip-divider"></span>
            <a onClick={() => handleAuth('login')}>
              <i className="ti ti-login"></i>Đăng nhập
            </a>
            <span className="strip-divider"></span>
            <a onClick={handleContact}>
              <i className="ti ti-phone"></i>Hotline
            </a>
          </div>
        </div>
      </div>
      <div className="topbar-main">
        <div className="wrap">
          <div className="brand" onClick={() => handleGoView('landing')}>
            <div className="brand-stack">
              <span className="brand-word">
                FOOD<span>SAVE</span>
              </span>
              <span className="brand-tagline">FOR CHARITY · TỔ CHỨC TỪ THIỆN</span>
            </div>
          </div>
          <nav className="nav">
            <button onClick={() => handleScrollTo('hero')} className="active">
              <i className="ti ti-home"></i>Tổng quan
            </button>
            <button onClick={() => handleScrollTo('how')}>
              <i className="ti ti-route"></i>Cách hoạt động
            </button>
            <button onClick={() => handleScrollTo('types')}>
              <i className="ti ti-building-community"></i>Đối tượng phục vụ
            </button>
            <button onClick={() => handleScrollTo('faq')}>
              <i className="ti ti-help-circle"></i>FAQ
            </button>
          </nav>
          <div className="actions">
            <button className="btn btn-ghost" onClick={() => handleAuth('login')}>
              <i className="ti ti-login"></i>Đăng nhập
            </button>
            <button className="btn btn-accent" onClick={() => handleAuth('register')}>
              <i className="ti ti-heart-handshake"></i>Đăng ký tổ chức
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
