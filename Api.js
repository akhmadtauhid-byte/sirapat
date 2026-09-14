/**
 * Helper pemanggilan API Apps Script.
 * POST menggunakan Content-Type text/plain agar tidak memicu CORS preflight
 * (keterbatasan Apps Script Web App yang tidak menangani request OPTIONS).
 */
async function apiGet(action, params) {
  const qs = new URLSearchParams({ action, ...(params || {}) });
  const res = await fetch(`${API_URL}?${qs.toString()}`);
  return res.json();
}

async function apiPost(action, payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...(payload || {}) })
  });
  return res.json();
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