'use client';

import React from 'react';

export default function PartnerAuthView() {
  return (
    <div className="view" id="auth">
      <div className="auth-wrap">
        <div className="auth-left">
          <div className="auth-hero">
            <div className="auth-brand-big">
              <span className="brand-word">
                FOOD<span>SAVE</span>
              </span>
            </div>
            <h1 className="auth-h-title">
              Cứu thực phẩm.
              <br />
              Trao <em>giá trị</em>.
              <br />
              Lan tỏa <em>yêu thương</em>.
            </h1>
            <p className="auth-h-sub">
              Nền tảng điều phối thực phẩm cận hạn dành riêng cho 120+ đối tác cửa hàng. Giảm thiểu lãng phí · San sẻ cộng đồng · Minh bạch nguồn tài trợ.
            </p>
            <div className="auth-stats">
              <div className="auth-stat">
                <div className="auth-stat-v">120+</div>
                <div className="auth-stat-l">Cửa hàng</div>
              </div>
              <div className="auth-stat">
                <div className="auth-stat-v">12.4T</div>
                <div className="auth-stat-l">kg đã cứu</div>
              </div>
              <div className="auth-stat">
                <div className="auth-stat-v">28.6T</div>
                <div className="auth-stat-l">kg CO₂ giảm</div>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-right" id="auth-c"></div>
      </div>
    </div>
  );
}
