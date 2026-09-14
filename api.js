/**
 * Helper pemanggilan API Apps Script menggunakan teknik JSONP.
 *
 * Kenapa JSONP (bukan fetch() biasa)? Apps Script Web App tidak mengirim
 * header CORS pada responsnya, sehingga fetch() lintas domain (GitHub Pages
 * -> script.google.com) diblokir browser. Memuat data lewat tag <script>
 * tidak tunduk pada aturan CORS, jadi ini cara paling andal untuk kombinasi
 * Google Apps Script + GitHub Pages.
 */

let _jsonpCounter = 0;

function jsonpRequest(action, params) {
  return new Promise((resolve, reject) => {
    const callbackName = '_sirapat_cb_' + (_jsonpCounter++) + '_' + Date.now();
    const qs = new URLSearchParams({ action, callback: callbackName, ...(params || {}) });
    const script = document.createElement('script');
    script.src = `${API_URL}?${qs.toString()}`;

    const cleanup = () => {
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Waktu permintaan habis. Periksa koneksi atau URL API_URL di config.js.'));
    }, 20000);

    window[callbackName] = (data) => {
      clearTimeout(timer);
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error('Gagal memanggil API. Periksa API_URL di config.js dan status deployment Apps Script.'));
    };
    document.body.appendChild(script);
  });
}

async function apiGet(action, params) {
  return jsonpRequest(action, params);
}

async function apiPost(action, payload) {
  return jsonpRequest(action, { payload: JSON.stringify(payload || {}) });
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
