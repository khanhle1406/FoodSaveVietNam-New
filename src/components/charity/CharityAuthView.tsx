'use client';

import React from 'react';

export default function CharityAuthView() {
  return (
    <div className="view" id="auth">
      <div className="auth-wrap">
        <div className="auth-left">
          <div className="auth-brand-big">
            <span className="brand-word">
              FOOD<span>SAVE</span>
            </span>
          </div>
          <div className="auth-hero-text" style={{ margin: 'auto 0' }}>
            <h1 className="auth-h-title">
              Nhận <em>thực phẩm cứu trợ</em>
              <br />
              cho cộng đồng <em>yếu thế</em>.
            </h1>
            <p className="auth-h-sub">
              Nền tảng kết nối tổ chức từ thiện với 120+ cửa hàng tài trợ. Thực phẩm 100% miễn phí · Điều phối thông minh · Báo cáo minh bạch cho nhà tài trợ.
            </p>
          </div>
          <div className="auth-stats">
            <div className="auth-stat">
              <div className="auth-stat-v">24</div>
              <div className="auth-stat-l">Tổ chức</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-v">9.8K</div>
              <div className="auth-stat-l">Suất/tháng</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-v">3.4K</div>
              <div className="auth-stat-l">Người được hỗ trợ</div>
            </div>
          </div>
        </div>
        <div className="auth-right" id="auth-c"></div>
      </div>
    </div>
  );
}
