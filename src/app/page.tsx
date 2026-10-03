'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/home.css';

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<'business' | 'charity'>('business');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);

  const handleOpenLogin = (role?: 'business' | 'charity') => {
    if (role) setCurrentRole(role);
    setIsLoginOpen(true);
    setNoticeVisible(false);
    if (typeof document !== 'undefined') {
      document.body.classList.add('locked');
    }
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    setNoticeVisible(false);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('locked');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodsave_login_role', currentRole);
    }
    setNoticeVisible(true);
  };

  return (
    <>
      {/* Thông báo sứ mệnh FoodSave */}
      <div className="mission-strip" aria-label="Thông báo sứ mệnh FoodSave">
        <div className="wrap">
          <span className="live-pulse">
            <span className="dot"></span> Live
          </span>
          <div className="ticker-window">
            <div className="ticker-track">
              <span>FoodSave là tổ chức kết nối thực phẩm phi lợi nhuận</span>
              <span>Không thu phí từ doanh nghiệp hoặc tổ chức từ thiện</span>
              <span>Nhãn màu giúp ưu tiên nhận và sử dụng thực phẩm an toàn</span>
              <span>Doanh nghiệp -&gt; FoodSave -&gt; Tổ chức từ thiện</span>
              <span>FoodSave là tổ chức kết nối thực phẩm phi lợi nhuận</span>
              <span>Không thu phí từ doanh nghiệp hoặc tổ chức từ thiện</span>
              <span>Nhãn màu giúp ưu tiên nhận và sử dụng thực phẩm an toàn</span>
              <span>Doanh nghiệp -&gt; FoodSave -&gt; Tổ chức từ thiện</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topbar điều hướng chính */}
      <header className="topbar">
        <nav className="wrap nav" aria-label="Điều hướng chính">
          <Link className="brand" href="/" aria-label="FoodSave">
            <span>
              <span className="wordmark">FOOD<span>SAVE</span></span>
              <span className="tagline">Cứu thực phẩm, bảo vệ hành tinh</span>
            </span>
          </Link>
          <div className="nav-links">
            <a href="#story">Giới thiệu</a>
            <a href="#labels">Nhãn màu</a>
            <a href="#flow">Cách hoạt động</a>
            <Link href="/admin" style={{ opacity: 0.85 }}>Quản trị</Link>
            <button
              className="btn yellow"
              type="button"
              onClick={() => handleOpenLogin('business')}
            >
              Đăng nhập
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero" aria-label="FoodSave">
          <img
            className="hero-media"
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=82"
            alt="Thực phẩm tươi được chuẩn bị để chia sẻ"
          />
          <div className="wrap">
            <span className="eyebrow">Tổ chức kết nối thực phẩm phi lợi nhuận</span>
            <h1 className="hero-title">
              Cứu thực phẩm,{' '}
              <span className="accent">
                Bảo vệ <span className="shine">hành tinh.</span>
              </span>
            </h1>
            <p className="hero-copy">
              FoodSave giữ tinh thần cũ, nhưng mô hình mới chỉ còn doanh nghiệp và tổ chức từ thiện. Chúng tôi kết nối thực phẩm còn dùng tốt đến đúng nơi cần, phi lợi nhuận, không hoa hồng, không thu kinh phí hoạt động từ hai bên.
            </p>
            <div className="hero-actions">
              <Link className="btn yellow" href="/partner">
                Đăng nhập doanh nghiệp
              </Link>
              <Link className="btn light" href="/charity">
                Đăng nhập tổ chức
              </Link>
            </div>
            <div className="hero-stats" aria-label="Cam kết chính">
              <div className="hero-stat">
                <strong>0đ</strong>
                <span>phí nền tảng</span>
              </div>
              <div className="hero-stat">
                <strong>2 vai trò</strong>
                <span>doanh nghiệp và từ thiện</span>
              </div>
              <div className="hero-stat">
                <strong>3 nhãn</strong>
                <span>xanh, vàng, đỏ</span>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story">
          <div className="wrap">
            <header className="section-head center">
              <span className="section-kicker">Brand Story</span>
              <h2>FoodSave là cầu nối thực phẩm phi lợi nhuận.</h2>
              <p>Trang này là trang giới thiệu thương hiệu và điểm vào hệ thống. Các flow đăng nguồn, nhận nguồn, điều phối thông minh và báo cáo ESG nằm trong cổng chuyên biệt.</p>
            </header>
            <div className="grid three">
              <article className="card dark">
                <span className="card-tag">Phi lợi nhuận</span>
                <h3>Không thu bất kỳ khoản phí nào</h3>
                <p>FoodSave không lấy tiền từ doanh nghiệp, không thu phí tổ chức từ thiện và không thương mại hóa thực phẩm được kết nối.</p>
              </article>
              <article className="card">
                <span className="card-tag">Doanh nghiệp</span>
                <h3>Chia sẻ nguồn còn dùng tốt</h3>
                <p>Nhà hàng, khách sạn, siêu thị, bếp ăn hoặc nhà sản xuất có thể đưa thực phẩm dư vào mạng lưới kết nối.</p>
              </article>
              <article className="card">
                <span className="card-tag">Từ thiện</span>
                <h3>Tiếp nhận theo năng lực thật</h3>
                <p>Mái ấm, bếp ăn cộng đồng, nhóm cứu trợ hoặc tổ chức xã hội nhận thực phẩm theo địa điểm, thời gian và khả năng xử lý.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Brand Banner */}
        <section className="brand-band">
          <div className="wrap">
            <h2>Giữ điều hay nhất: nhãn màu để biết nhận thực phẩm và ưu tiên sử dụng thế nào.</h2>
            <p>Nhãn màu là ngôn ngữ nhận diện của FoodSave. Nó giúp hai bên nói cùng một ngôn ngữ về thời hạn, mức ưu tiên và trách nhiệm an toàn khi tiếp nhận thực phẩm.</p>
          </div>
        </section>

        {/* Labels Section */}
        <section id="labels">
          <div className="wrap">
            <header className="section-head">
              <span className="section-kicker">Color System</span>
              <h2>Nhãn màu FoodSave</h2>
              <p>Mỗi nhãn là một tín hiệu ưu tiên. Tổ chức tiếp nhận vẫn cần kiểm tra thực tế, điều kiện bảo quản và khả năng chế biến trước khi phân phối.</p>
            </header>
            <div className="label-grid">
              <article className="label-card label-green">
                <span className="label-chip">Nhãn xanh</span>
                <h3>Dùng trong 48 giờ</h3>
                <p>Thực phẩm còn ổn định, phù hợp để nhận theo kế hoạch và phân phối trong ngày hôm sau.</p>
              </article>
              <article className="label-card label-yellow">
                <span className="label-chip">Nhãn vàng</span>
                <h3>Dùng trong 24 giờ</h3>
                <p>Nguồn cần được ưu tiên nhận sớm, kiểm tra nhanh và chế biến trong ngày.</p>
              </article>
              <article className="label-card label-red">
                <span className="label-chip">Nhãn đỏ</span>
                <h3>Dùng trong 6-12 giờ</h3>
                <p>Chỉ nhận khi có đội xử lý ngay, không để qua đêm nếu chưa có điều kiện bảo quản phù hợp.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Flow Section */}
        <section id="flow">
          <div className="wrap">
            <header className="section-head">
              <span className="section-kicker">How It Works</span>
              <h2>Một thương hiệu, hai cổng chuyên biệt.</h2>
              <p>FoodSave giữ trải nghiệm tinh gọn, bảo đảm tốc độ và phân loại chính xác theo nhu cầu thực tế.</p>
            </header>
            <div className="grid three flow">
              <article className="card step">
                <h3>Doanh nghiệp đăng tin</h3>
                <p>Quản lý nguồn thực phẩm còn dùng tốt, thời gian bàn giao, nhãn màu và trạng thái kết nối.</p>
              </article>
              <article className="card step">
                <h3>Tổ chức từ thiện tiếp nhận</h3>
                <p>Xem nguồn phù hợp, xác nhận nhu cầu, cập nhật năng lực vận chuyển và tiếp nhận.</p>
              </article>
              <article className="card step">
                <h3>FoodSave điều phối AI</h3>
                <p>Ưu tiên theo độ gấp hạn dùng, khoảng cách địa lý, năng lực tiếp nhận và chứng thực minh bạch.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Portals Section */}
        <section className="portal" aria-label="Cổng đăng nhập FoodSave">
          <div className="wrap">
            <header className="section-head">
              <span className="section-kicker">Access Portal</span>
              <h2>Cổng đăng nhập FoodSave</h2>
              <p>Chọn đúng vai trò. FoodSave hiện mở cổng cho Doanh nghiệp, Tổ chức từ thiện và Quản trị viên.</p>
            </header>
            <div className="portal-cards">
              <article className="portal-card">
                <span className="card-tag">Business</span>
                <h3>Doanh nghiệp</h3>
                <p>Dành cho đơn vị có nguồn thực phẩm còn dùng tốt và muốn kết nối miễn phí với mạng lưới từ thiện.</p>
                <Link className="btn yellow" href="/partner">
                  Đăng nhập doanh nghiệp
                </Link>
              </article>
              <article className="portal-card">
                <span className="card-tag">Charity</span>
                <h3>Tổ chức từ thiện</h3>
                <p>Dành cho mái ấm, bếp ăn cộng đồng, nhóm cứu trợ và tổ chức xã hội có nhu cầu tiếp nhận.</p>
                <Link className="btn light" href="/charity">
                  Đăng nhập tổ chức
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footnote */}
      <footer className="foodsave-global-footnote" aria-label="FoodSave footer">
        <div className="foodsave-footnote-wrap">
          <Link className="foodsave-footnote-brand" href="/" aria-label="FoodSave">
            <span className="brand-word">FOOD<span>SAVE</span></span>
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

      {/* Login Modal */}
      {isLoginOpen && (
        <div
          className="modal open"
          id="loginModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="loginTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseLogin();
          }}
        >
          <div className="dialog">
            <div className="dialog-head">
              <div>
                <span className="section-kicker">Login</span>
                <h2 id="loginTitle">
                  Đăng nhập {currentRole === 'business' ? 'doanh nghiệp' : 'tổ chức từ thiện'}
                </h2>
              </div>
              <button
                className="close"
                type="button"
                onClick={handleCloseLogin}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <div className="dialog-body">
              <div className="roles" aria-label="Chọn vai trò đăng nhập">
                <button
                  className={`role ${currentRole === 'business' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setCurrentRole('business')}
                >
                  Doanh nghiệp
                </button>
                <button
                  className={`role ${currentRole === 'charity' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setCurrentRole('charity')}
                >
                  Tổ chức từ thiện
                </button>
              </div>
              <form className="form" id="loginForm" onSubmit={handleLoginSubmit}>
                <div className="field">
                  <label htmlFor="email">Email đăng nhập</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="ten@donvi.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn yellow" type="submit" id="loginSubmit">
                  Tiếp tục với vai trò {currentRole === 'business' ? 'doanh nghiệp' : 'tổ chức từ thiện'}
                </button>
                <p className="form-note">
                  Hoặc bạn có thể truy cập trực tiếp vào{' '}
                  <Link
                    href={currentRole === 'business' ? '/partner' : '/charity'}
                    style={{ textDecoration: 'underline', color: 'var(--green-800)' }}
                  >
                    Cổng {currentRole === 'business' ? 'Doanh nghiệp' : 'Từ thiện'}
                  </Link>
                  .
                </p>
                {noticeVisible && (
                  <div className="notice" id="loginNotice" style={{ display: 'block' }}>
                    Đã ghi nhận vai trò {currentRole === 'business' ? 'Doanh nghiệp' : 'Tổ chức từ thiện'}. Bạn đang chuyển hướng đến cổng làm việc...
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
