/**
 * KONFIGURASI FRONTEND SIRAPAT
 * ============================================================
 * GANTI API_URL di bawah dengan URL Web App hasil deploy Apps Script Anda
 * (Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone)
 *
 * INGAT: setiap kali Anda redeploy versi baru Apps Script dan URL berubah,
 * atau setiap kali file ini di-replace penuh, pastikan API_URL dikembalikan
 * ke nilai yang benar sebelum publish ulang ke GitHub Pages.
 * ============================================================
 */
const API_URL = 'PASTE_API_URL_APPS_SCRIPT_DISINI';

/**
 * KOP SURAT - dipakai di halaman cetak (cetak.html) untuk dokumen undangan,
 * daftar materi, daftar hadir, dan notulen. Sesuaikan dengan kop surat resmi
 * RSU Allam Medica (boleh tempel logo sebagai data URL di HOSPITAL_LOGO_URL,
 * atau kosongkan jika belum ada).
 */
const HOSPITAL_NAME = 'RSU ALLAM MEDICA';
const HOSPITAL_ADDRESS = 'Bumiayu, Kabupaten Brebes, Jawa Tengah'; // GANTI dengan alamat lengkap RS
const HOSPITAL_CONTACT = ''; // GANTI dengan telepon/email RS, mis. "Telp. (0289) xxxxxxx | Email: info@..."
const HOSPITAL_LOGO_URL = ''; // opsional: taruh URL logo (mis. link Google Drive publik) atau kosongkan
