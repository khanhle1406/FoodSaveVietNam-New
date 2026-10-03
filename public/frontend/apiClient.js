/**
 * FoodSave Việt Nam - Unified Frontend API Client
 * Kết nối chuẩn hóa giữa Frontend Static Pages và Backend REST API (/api/v1/*)
 */
(function (global) {
  'use strict';

  // Tự động nhận diện môi trường (Localhost vs Production Serverless)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  let defaultBaseUrl = isLocal
    ? (window.location.port === '8080' ? '/api/v1' : 'http://localhost:8080/api/v1')
    : '/.netlify/functions/api/v1';

  let currentToken = null;

  /**
   * Tự động tìm kiếm Supabase JWT Token từ localStorage nếu có
   */
  function autoDiscoverToken() {
    if (currentToken) return currentToken;
    try {
      // 1. Kiểm tra session tùy biến của FoodSave
      const customSession = localStorage.getItem('foodsave.auth.session');
      if (customSession) {
        const parsed = JSON.parse(customSession);
        if (parsed.access_token) return parsed.access_token;
        if (parsed.token) return parsed.token;
      }

      // 2. Kiểm tra token mặc định của Supabase Auth
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase.auth.token'))) {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            const token = parsed?.access_token || parsed?.currentSession?.access_token;
            if (token) return token;
          }
        }
      }
    } catch (e) {
      console.warn('[FoodSaveAPI] Không thể tự động đọc token:', e);
    }
    return null;
  }

  /**
   * Hàm gọi Fetch chuẩn kèm xử lý Header, Authorization và Error Response
   */
  async function request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${defaultBaseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    const token = autoDiscoverToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const isJson = (response.headers.get('content-type') || '').includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errorMessage = (data && data.message) || (data && data.error) || `Lỗi HTTP ${response.status}`;
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.warn(`[FoodSaveAPI Offline Fallback] ${options.method || 'GET'} ${url} thất bại, chuyển sang Local Data Engine`);
      
      // Fallback sang FoodSaveLocalDB
      if (typeof window !== 'undefined' && window.FoodSaveLocalDB) {
        const path = endpoint.split('?')[0];
        const method = (options.method || 'GET').toUpperCase();
        let body = {};
        try { body = typeof options.body === 'string' ? JSON.parse(options.body) : (options.body || {}); } catch(e){}

        if (path.includes('/donations')) {
          if (method === 'GET') {
            return { data: { items: window.FoodSaveLocalDB.getDonations() } };
          }
          if (method === 'POST') {
            const created = window.FoodSaveLocalDB.createDonation(body);
            return { data: created };
          }
          if (path.endsWith('/accept')) {
            const parts = path.split('/');
            const id = parts[parts.indexOf('donations') + 1];
            const updated = window.FoodSaveLocalDB.updateDonationStatus(id, 'accepted', body);
            return { data: updated };
          }
          if (path.endsWith('/status')) {
            const parts = path.split('/');
            const id = parts[parts.indexOf('donations') + 1];
            const updated = window.FoodSaveLocalDB.updateDonationStatus(id, body.status, body);
            return { data: updated };
          }
        }

        if (path.includes('/eco-impact')) {
          return { data: { totals: window.FoodSaveLocalDB.getEcoImpactStats() } };
        }

        if (path.includes('/admin/partners')) {
          if (path.endsWith('/pending')) {
            const stores = window.FoodSaveLocalDB.getStores();
            return { data: stores };
          }
          if (path.endsWith('/approve')) {
            const parts = path.split('/');
            const id = parts[parts.indexOf('partners') + 1];
            const updated = window.FoodSaveLocalDB.updateStoreVerification(id, 'verified');
            return { data: updated };
          }
          if (path.endsWith('/reject')) {
            const parts = path.split('/');
            const id = parts[parts.indexOf('partners') + 1];
            const updated = window.FoodSaveLocalDB.updateStoreVerification(id, 'rejected', body.reason);
            return { data: updated };
          }
        }
      }

      console.error(`[FoodSaveAPI Error] ${options.method || 'GET'} ${url}:`, error.message);
      throw error;
    }
  }

  // Khởi tạo đối tượng FoodSaveAPI
  const FoodSaveAPI = {
    setBaseUrl(url) {
      defaultBaseUrl = url.replace(/\/$/, '');
    },

    getBaseUrl() {
      return defaultBaseUrl;
    },

    setToken(token) {
      currentToken = token;
      if (token) {
        localStorage.setItem('foodsave.auth.token', token);
      } else {
        localStorage.removeItem('foodsave.auth.token');
      }
    },

    getToken() {
      return autoDiscoverToken();
    },

    // Phân hệ Auth
    auth: {
      async login(credentials) {
        const res = await request('/auth/login', {
          method: 'POST',
          body: credentials,
        });
        if (res?.data?.session?.access_token) {
          FoodSaveAPI.setToken(res.data.session.access_token);
        }
        return res;
      },

      async registerPartner(payload) {
        return request('/auth/register/partner', {
          method: 'POST',
          body: payload,
        });
      },

      async registerCharity(payload) {
        return request('/auth/register/charity', {
          method: 'POST',
          body: payload,
        });
      },

      async logout() {
        FoodSaveAPI.setToken(null);
        localStorage.removeItem('foodsave.auth.session');
      },
    },

    // Phân hệ Quản lý Quyên góp (Donations)
    donations: {
      async list(query = {}) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== '') params.append(k, String(v));
        });
        const qs = params.toString() ? `?${params.toString()}` : '';
        return request(`/donations${qs}`);
      },

      async create(payload) {
        return request('/donations', {
          method: 'POST',
          body: payload,
        });
      },

      async accept(donationId, payload = {}) {
        return request(`/donations/${donationId}/accept`, {
          method: 'PATCH',
          body: payload,
        });
      },

      async updateStatus(donationId, statusPayload) {
        const payload = typeof statusPayload === 'string' ? { status: statusPayload } : { ...statusPayload };
        if (payload.status === 'in-route') payload.status = 'in_route';
        return request(`/donations/${donationId}/status`, {
          method: 'PATCH',
          body: payload,
        });
      },
    },

    // Phân hệ Tác động Môi trường & Bảng xếp hạng (Eco Impact)
    ecoImpact: {
      async getMyImpact() {
        return request('/eco-impact/me');
      },

      async getPartnerImpact(query = {}) {
        const params = new URLSearchParams(query);
        return request(`/eco-impact/partner?${params.toString()}`);
      },

      async getCharityImpact(query = {}) {
        const params = new URLSearchParams(query);
        return request(`/eco-impact/charity?${params.toString()}`);
      },

      async getPlatformImpact() {
        return request('/eco-impact/platform');
      },

      async getLeaderboard(limit = 10) {
        return request(`/eco-impact/leaderboard?limit=${limit}`);
      },
    },

    // Phân hệ Quản trị viên (Admin)
    admin: {
      async getPendingPartners() {
        return request('/admin/partners/pending');
      },

      async approvePartner(userId) {
        return request(`/admin/partners/${userId}/approve`, {
          method: 'PATCH',
        });
      },

      async rejectPartner(userId, reason) {
        return request(`/admin/partners/${userId}/reject`, {
          method: 'PATCH',
          body: { reason },
        });
      },
    },

    // Phân hệ Uy tín Đối tác (Seller Reputation)
    reputation: {
      async get(sellerId) {
        return request(`/seller-reputation/${sellerId}`);
      },
    },
  };

  // Xuất ra biến toàn cục
  global.FoodSaveAPI = FoodSaveAPI;
})(typeof window !== 'undefined' ? window : this);
