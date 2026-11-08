/* navigation */
const tabFor = {
  home: 'home',
  tiket: 'tiket',
  notif: 'notif',
  akun: 'akun',
  wl: 'wl',
  'wl-onb': 'wl',
  'wl-trip': 'wl',
  'wl-qr': 'wl',
  'wl-hist': 'wl',
  'wl-rate': 'wl',
  hr: 'wl',
};
function go(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('on'));
  const el = $('s-' + id);
  el.classList.add('on');
  el.scrollTop = 0;
  document
    .querySelectorAll('.nav button')
    .forEach((b) => b.classList.toggle('on', b.dataset.t === tabFor[id]));
}
function openWL() {
  if (!activated) {
    go('wl-onb');
  } else {
    go(wlMode === 'hr' ? 'hr' : 'wl');
  }
}
function mode(m) {
  wlMode = m;
  go(m === 'hr' ? 'hr' : 'wl');
}

/* toast & sheet */
let tt;
function toast(msg) {
  const t = $('toast');
  t.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ED6B23" stroke-width="2.4" stroke-linecap="round"><path d="M5 12l5 5 9-10"/></svg>' +
    msg;
  t.classList.add('on');
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove('on'), 2600);
}
const S = {
  cari: ['Cari', 'Cari stasiun, kereta, atau fitur. Contoh: "Sudirman", "WorkLink", "Taksaka".'],
  antarkota: [
    'Kereta Antar Kota',
    'Fitur yang sudah ada di Access by KAI: pesan tiket kereta jarak jauh, pilih kursi, connecting train, transfer tiket, dan registrasi face recognition boarding.',
  ],
  lokal: ['Kereta Lokal', 'Fitur yang sudah ada: pemesanan tiket kereta lokal dan jadwal perjalanan.'],
  commuter: [
    'Commuter Line',
    'Fitur yang sudah ada: beli tiket Commuter Line dan tampilkan QR untuk masuk gerbang. Dengan WorkLink, tiket perjalanan kerja otomatis ditagihkan ke kantor.<br><br><button class="btn p" onclick="closeSheet();openWL()">Buka WorkLink</button>',
  ],
  commuterqr: [
    'Tiket Commuter Line',
    'Bogor → Sudirman · Hari ini · Ditanggung WorkLink.<br>Tunjukkan QR di gerbang tap stasiun.<br><svg viewBox="0 0 29 29" width="160" height="160" style="display:block;margin:12px auto" id="qrSmall" shape-rendering="crispEdges"></svg>',
  ],
  bandara: ['KA Bandara', 'Fitur yang sudah ada: tiket kereta bandara Soekarno-Hatta dan bandara lain.'],
  tracking: [
    'Live Tracking',
    'Fitur yang sudah ada: melihat posisi kereta secara real time setelah berangkat. WorkLink memakai data yang sama untuk menyiapkan shuttle sebelum kereta tiba.',
  ],
  planner: ['Trip Planner', 'Fitur yang sudah ada: merencanakan perjalanan wisata beserta akomodasinya.'],
  hotel: ['Hotel', 'Fitur yang sudah ada: reservasi hotel langsung dari aplikasi.'],
  porter: ['E-Porter', 'Fitur yang sudah ada: pesan jasa porter untuk membawa barang di stasiun.'],
  ppob: ['Pulsa & Tagihan', 'Fitur yang sudah ada: pembelian pulsa, paket data, dan token listrik.'],
  railpoint: [
    'RailPoint',
    'Fitur yang sudah ada: kumpulkan poin dari pembelian tiket, tukar dengan tiket atau di merchant mitra KAI. Usulan WorkLink: bonus RailPoint untuk perjalanan di luar jam sibuk.',
  ],
  karbon: [
    'Jejak Karbon',
    'Fitur yang sudah ada: estimasi emisi tiap perjalanan kereta dibanding kendaraan pribadi. WorkLink mengubah data ini menjadi laporan emisi bulanan untuk perusahaan.<div class="kv"><div>Bulan ini<b>−18 kg CO₂</b></div><div>Setara<b>≈ 1 pohon/bulan</b></div></div>',
  ],
  bantuan: [
    'Bantuan WorkLink',
    '• Shuttle tidak datang: armada cadangan dikirim otomatis bila tunggu lebih dari 10 menit.<br>• KRL terlambat: shuttle menunggu sesuai posisi kereta.<br>• Keluhan ditindaklanjuti maksimal 1 × 24 jam.<br><br><button class="btn p" onclick="closeSheet();toast(\'Tiket bantuan dibuat (simulasi).\')">Laporkan masalah</button>',
  ],
};
function sheet(k) {
  const [h, p] = S[k];
  $('sheet').innerHTML = '<div class="grab"></div><h3>' + h + '</h3><p>' + p + '</p>';
  $('sheetBg').classList.add('on');
  if (k === 'commuterqr') drawQR('qrSmall', 7);
}
function closeSheet() {
  $('sheetBg').classList.remove('on');
}
