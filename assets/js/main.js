/* clock & greeting */
function tick() {
  const d = new Date();
  const h = d.getHours(),
    m = d.getMinutes();
  $('clock').textContent = String(h).padStart(2, '0') + '.' + String(m).padStart(2, '0');
  $('greet').textContent =
    h < 11 ? 'Selamat pagi,' : h < 15 ? 'Selamat siang,' : h < 19 ? 'Selamat sore,' : 'Selamat malam,';
  const mins = h * 60 + m;
  const peak = CONFIG.peak.some(([a, b]) => mins >= a && mins < b);
  $('peakStatus').textContent = peak ? 'Jam sibuk' : 'Di luar jam sibuk';
  $('peakBadge').textContent = peak ? 'HARGA REGULER' : 'HARGA FLEX';
  $('peakBadge').className = peak ? 'badge-reg' : 'badge-flex';
  $('peakHint').textContent = peak
    ? 'Jam sibuk sedang berlangsung · berangkat setelah ' +
      (mins < 510 ? '08.30' : '18.30') +
      ' untuk harga Flex'
    : mins < 390
      ? 'Berangkat sebelum 06.30 untuk tetap dapat harga Flex · sisa ' + (390 - mins) + ' menit'
      : 'Harga Flex berlaku untuk perjalanan saat ini';
}
tick();
setInterval(tick, 30000);
bindConfig();
renderTL();
renderNotif();
renderHist();
renderStars();
drawQR('qr', 3);
const _h = location.hash.slice(1);
if (_h) {
  document.body.insertAdjacentHTML('beforeend', '<style>.screen.on{animation:none}</style>');
  activated = true;
  if (_h === 'hr') wlMode = 'hr';
  go(_h);
}

/* bind config values into the page */
function bindConfig() {
  const c = CONFIG,
    b = billing();
  const v = {
    reg: rp(c.shuttle.reg),
    flex: rp(c.shuttle.flex),
    saving: Math.round((1 - c.shuttle.flex / c.shuttle.reg) * 100) + '%',
    share: Math.round(c.companyShare * 100) + '%',
    empShare: Math.round((1 - c.companyShare) * 100) + '%',
    krlTrips: c.month.krlTrips,
    flexTrips: c.month.flexTrips,
    regTrips: c.month.regTrips,
    billKrl: rp(b.krl),
    billShuttle: rp(b.shuttle),
    billTotal: rp(b.total),
    billCompany: rp(b.company),
    empAmount: rp(b.employee),
  };
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const k = el.dataset.bind;
    if (k in v) el.textContent = v[k];
  });
}
