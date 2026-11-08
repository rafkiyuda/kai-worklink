/* notifications */
const notifs = [
  ['bus', 'Shuttle siap di Bay B2', 'Kemarin · WL-07 menunggu 5 menit sebelum KRL tiba.', 'Kemarin'],
  ['info', 'Laporan Oktober tersedia', '14 perjalanan Flex, hemat 16 kg CO₂.', '1 Nov'],
];
const nIco = {
  bus: [
    'var(--orange-l)',
    '#ED6B23',
    '<rect x="3" y="5" width="18" height="12" rx="3"/><path d="M3 11h18M7 17v2M17 17v2"/>',
  ],
  info: ['var(--navy-l)', '#2D2A70', '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>'],
  warn: ['var(--red-l)', '#D62839', '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17h.01"/>'],
  ok: ['var(--green-l)', '#1E8E4E', '<path d="M5 12l5 5 9-10"/>'],
};
function renderNotif() {
  $('notifList').innerHTML = notifs
    .map((n, i) => {
      const c = nIco[n[0]];
      return `<div class="notif ${i < 1 ? 'un' : ''}"><div class="ni" style="background:${c[0]}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${c[1]}" stroke-width="2" stroke-linecap="round">${c[2]}</svg></div><div class="nb"><b>${n[1]}</b>${n[2]}</div><div class="nt">${n[3]}</div></div>`;
    })
    .join('');
}
function addNotif(t, a, b, c) {
  notifs.unshift([t, a, b, c]);
  renderNotif();
}
