/* QR */
let seed = 7;
function rnd() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function drawQR(id, s) {
  seed = s;
  const N = 29;
  let h = '<rect width="29" height="29" fill="#fff"/>';
  const finder = (x, y) =>
    `<rect x="${x}" y="${y}" width="7" height="7" fill="#1E1C4D"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#1E1C4D"/>`;
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const inF = (x < 8 && y < 8) || (x > 20 && y < 8) || (x < 8 && y > 20);
      if (!inF && rnd() > 0.52) h += `<rect x="${x}" y="${y}" width="1" height="1" fill="#1E1C4D"/>`;
    }
  h +=
    finder(0, 0) +
    finder(22, 0) +
    finder(0, 22) +
    `<rect x="11.5" y="11.5" width="6" height="6" rx="1.2" fill="#ED6B23"/><rect x="13" y="13" width="3" height="3" fill="#fff"/>`;
  const el = $(id);
  if (el) el.innerHTML = h;
}
let qs = 30,
  qseed = 3;
setInterval(() => {
  qs--;
  if (qs <= 0) {
    qs = 30;
    qseed++;
    drawQR('qr', qseed);
  }
  const t = $('qrT');
  if (t) t.textContent = qs;
}, 1000);
