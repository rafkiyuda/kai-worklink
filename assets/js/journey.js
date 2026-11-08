/* journey simulation */
const steps = [
  ['Tap-in Commuter Line', '06.15', 'Tap-in di Stasiun Bogor. Biaya KRL tercatat sesuai tarif resmi.'],
  ['Di dalam KRL', '06.16–07.02', 'Posisi kereta dipantau. Perkiraan tiba Sudirman 07.02.'],
  ['Shuttle siap di Bay B2', '07.05', 'Shuttle siaga 5 menit sebelum kereta tiba. Scan QR saat naik.'],
  ['Menuju kantor', '07.05–07.25', 'Shuttle WL-07 menuju Menara Sudirman.'],
  ['Tiba di kantor', '07.25', 'Perjalanan selesai, tagihan otomatis ke kantor.'],
];
function renderTL() {
  $('timeline').innerHTML = steps
    .map((s, i) => {
      const st = i < simState ? 'done' : i === simState ? 'now' : 'wait';
      let tm = s[1];
      if (delayed && i >= 1) {
        tm = { 1: '06.16–07.06', 2: '07.09', 3: '07.09–07.29', 4: '07.29' }[i] || tm;
      }
      return `<div class="it ${st}"><div class="nd">${i < simState ? '✓' : i + 1}</div><div class="bd"><span class="tm">${tm}</span><b>${s[0]}</b><p>${s[2]}</p></div></div>`;
    })
    .join('');
  const pct = [0, 0.25, 0.52, 0.75, 1][Math.min(simState, 4)];
  const path = $('prog');
  const L = path.getTotalLength();
  path.setAttribute('stroke-dasharray', L);
  path.setAttribute('stroke-dashoffset', L * (1 - pct));
  const p = path.getPointAtLength(L * pct);
  $('mover').setAttribute('cx', p.x);
  $('mover').setAttribute('cy', p.y);
  const labels = [
    'Simulasikan: tap-in di Bogor',
    'Simulasikan: KRL tiba di Sudirman',
    'Simulasikan: naik shuttle (scan QR)',
    'Simulasikan: tiba di kantor',
    'Beri ulasan perjalanan',
  ];
  $('simBtn').textContent = labels[Math.min(simState, 4)];
  if (simState >= 2) {
    $('seatbar').style.width = '43%';
    $('seattxt').textContent = '8 dari 14 kursi tersedia · kamu sudah terdaftar';
  }
}
function simStep() {
  if (simState >= 4) {
    go('wl-rate');
    return;
  }
  if (simState === 2) {
    go('wl-qr');
    return;
  }
  simState++;
  renderTL();
  if (simState === 1) {
    toast('Tap-in tercatat 06.15 · harga Flex berlaku');
    addNotif(
      'info',
      'Tap-in tercatat',
      `Bogor 06.15 · perjalanan ini memakai harga Flex ${rp(CONFIG.shuttle.flex)}.`,
      '06.15',
    );
  }
  if (simState === 2) {
    toast('Shuttle WL-07 siap di Bay B2');
    addNotif('bus', 'Shuttle siap di Bay B2', 'WL-07 (B 7204 KAI) menunggu. Scan QR saat naik.', '07.00');
  }
  if (simState === 4) {
    toast('Tiba 07.25. Terima kasih!');
    addHist();
  }
}
function simDelay() {
  if (delayed) {
    toast('Simulasi keterlambatan sudah aktif');
    return;
  }
  delayed = true;
  $('kvDep').textContent = '07.09';
  $('kvArr').textContent = '07.29';
  $('tripAlert').innerHTML =
    '<div class="alert o"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><div><b>KRL terlambat 4 menit.</b> Shuttle WL-07 tetap menunggu sesuai posisi kereta. Perkiraan tiba kantor 07.29.</div></div>';
  addNotif(
    'warn',
    'KRL terlambat 4 menit',
    'Shuttle tetap menunggu di Bay B2. Kamu tidak perlu khawatir tertinggal.',
    '06.48',
  );
  renderTL();
}
function scanDone() {
  if (simState < 2) {
    simState = 2;
  }
  simState = 3;
  renderTL();
  go('wl-trip');
  toast(`QR dipindai · ${rp(CONFIG.shuttle.flex)} (Flex) ditagihkan ke kantor`);
}
