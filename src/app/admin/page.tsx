'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import '@/styles/admin.css';

export default function AdminPortalPage() {
  useEffect(() => {
    let isMounted = true;

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

    const initAdmin = async () => {
      try {
        if (typeof window !== 'undefined' && !(window as any).supabase) {
          await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
        }
        await loadScript('/frontend/localDb.js');
        await loadScript('/frontend/logisticsService.js');
        await loadScript('/frontend/alertService.js');
        await loadScript('/frontend/admin-bundle.js');
      } catch (err) {
        console.error('Lỗi khi tải script quản trị Admin:', err);
      }
    };

    initAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* ADMIN AUTH GATE OVERLAY */}
      <div
        id="admin-auth-gate"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, #153b2a, #0b1a13)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          fontFamily: 'var(--f, system-ui, sans-serif)',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 18,
            maxWidth: 420,
            width: '100%',
            padding: '32px 28px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: '1.6rem',
              color: '#1A6B47',
              letterSpacing: '-0.5px',
              marginBottom: 8,
            }}
          >
            FOOD<span style={{ color: '#F7B928' }}>SAVE</span>{' '}
            <span
              style={{
                fontSize: '0.9rem',
                background: '#e8f5e9',
                color: '#1A6B47',
                padding: '3px 8px',
                borderRadius: 6,
                verticalAlign: 'middle',
              }}
            >
              ADMIN
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#555', margin: '0 0 20px 0', lineHeight: 1.4 }}>
            Khu vực quản trị hệ thống. Vui lòng xác thực tài khoản có quyền Quản trị viên để truy cập.
          </p>
          <div
            id="gate-err"
            style={{
              display: 'none',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: '0.8rem',
              marginBottom: 16,
              textAlign: 'left',
            }}
          ></div>
          <form id="gate-form" style={{ display: 'grid', gap: 14, textAlign: 'left' }}>
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#333',
                  display: 'block',
                  marginBottom: 5,
                  textTransform: 'uppercase',
                }}
              >
                Email quản trị
              </label>
              <input
                id="gate-email"
                type="email"
                placeholder="admin@foodsave.vn"
                required
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  border: '1.5px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: '0.92rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#333',
                  display: 'block',
                  marginBottom: 5,
                  textTransform: 'uppercase',
                }}
              >
                Mật khẩu
              </label>
              <input
                id="gate-pass"
                type="password"
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  border: '1.5px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: '0.92rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
            <button
              id="gate-btn"
              type="submit"
              style={{
                marginTop: 6,
                padding: 12,
                background: '#1A6B47',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Đăng nhập Quản trị
            </button>
          </form>
          <div style={{ marginTop: 22, borderTop: '1px solid #e5e7eb', paddingTop: 16 }}>
            <Link
              href="/"
              style={{ color: '#6b7280', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 500 }}
            >
              ← Quay về Trang chủ FoodSave
            </Link>
          </div>
        </div>
      </div>

      {/* ADMIN SIDEBAR */}
      <aside className="S">
        <div className="S-b">
          <h1>
            <span className="brand-word">
              FOOD<span>SAVE</span>
            </span>
          </h1>
        </div>
        <nav className="S-n">
          <div className="S-s">Tổng quan</div>
          <div className="S-i on" data-p="dashboard">Bảng điều khiển</div>
          <div className="S-s">Người dùng</div>
          <div className="S-i" data-p="admins">Quản trị viên <em>40</em></div>
          <div className="S-i" data-p="users">Người dùng <em>40</em></div>
          <div className="S-i" data-p="reputation">Uy tín</div>
          <div className="S-s">Đối tác</div>
          <div className="S-i" data-p="merchants">Cửa hàng <em>40</em></div>
          <div className="S-i" data-p="charities">Tổ chức từ thiện <em>40</em></div>
          <div className="S-i" data-p="kyb">
            Duyệt hồ sơ KYB <em id="kyb-badge" style={{ background: '#ea580c', color: '#fff' }}>1</em>
          </div>
          <div className="S-s">Kho hàng</div>
          <div className="S-i" data-p="inventory">Lô hàng tồn kho <em>40</em></div>
          <div className="S-s">Giao dịch</div>
          <div className="S-i" data-p="orders">Đơn hàng <em>40</em></div>
          <div className="S-i" data-p="payments">Thanh toán <em>40</em></div>
          <div className="S-i" data-p="payouts">Chi trả đối tác <em>40</em></div>
          <div className="S-s">Xử lý vi phạm</div>
          <div className="S-i" data-p="disputes">Tranh chấp <em>7</em></div>
          <div className="S-i" data-p="risks">Cảnh báo gian lận <em>40</em></div>
          <div className="S-s">Hệ thống</div>
          <div className="S-i" data-p="audits">Nhật ký hoạt động <em>40</em></div>
          <div className="S-i" data-p="config">Cấu hình</div>
        </nav>
        <div className="S-f">
          <b id="admin-name">Quản trị viên</b>
          <small
            style={{ cursor: 'pointer', color: 'var(--err)', textDecoration: 'underline' }}
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).adminSignOut) {
                (window as any).adminSignOut();
              }
            }}
          >
            Đăng xuất
          </small>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="M">
        <div className="T">
          <h2 id="pt">Bảng điều khiển</h2>
          <div className="T-r">
            <div className="T-s">
              <input placeholder="Tìm kiếm..." />
            </div>
          </div>
        </div>
        <div className="C" id="ct"></div>
      </div>

      {/* FOOTER */}
      <footer className="foodsave-global-footnote" aria-label="FoodSave footer">
        <div className="foodsave-footnote-wrap">
          <Link className="foodsave-footnote-brand" href="/" aria-label="FoodSave">
            <span className="brand-word">
              FOOD<span>SAVE</span>
            </span>
          </Link>
          <p className="foodsave-footnote-copy">
            © 2026 Công ty TNHH FoodSave Việt Nam · MSDN 0317456789 · Trụ sở 19 Nguyễn Hữu Thọ, TP.HCM · Thực phẩm cứu trợ miễn phí, không thương mại hóa quyên góp.
          </p>
          <div className="foodsave-footnote-links" aria-label="Kênh liên hệ FoodSave">
            <a href="mailto:hello@foodsave.vn">hello@foodsave.vn</a>
            <a href="mailto:partners@foodsave.vn">partners@foodsave.vn</a>
            <a href="mailto:charity@foodsave.vn">charity@foodsave.vn</a>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL & OVERLAY */}
      <div
        className="DO"
        id="dO"
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).xD) {
            (window as any).xD();
          }
        }}
      ></div>
      <div className="DP" id="dP">
        <div className="DP-h">
          <h3 id="dT"></h3>
          <button
            className="DP-x"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).xD) {
                (window as any).xD();
              }
            }}
          >
            Đóng
          </button>
        </div>
        <div className="DP-b" id="dB"></div>
      </div>
    </>
  );
}
