/* rating */
const starSVG =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.6 5.9 20.9 7.1 14 2 9.2l6.9-.9z"/></svg>';
function renderStars() {
  $('stars').innerHTML = [1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<button class="${i <= stars ? 'on' : ''}" onclick="stars=${i};renderStars();$('rateErr').style.display='none'" aria-label="${i} bintang">${starSVG}</button>`,
    )
    .join('');
}
$('tags').innerHTML = ['Tepat waktu', 'Pengemudi ramah', 'Bersih', 'AC dingin', 'Kursi cukup', 'Terlambat']
  .map((t) => `<button onclick="this.classList.toggle('on')">${t}</button>`)
  .join('');
function sendRate() {
  if (!stars) {
    $('rateErr').style.display = 'block';
    return;
  }
  simState = 0;
  delayed = false;
  $('tripAlert').innerHTML = '';
  $('kvDep').textContent = '07.05';
  $('kvArr').textContent = '07.25';
  renderTL();
  stars = 0;
  renderStars();
  go('wl');
  toast('Terima kasih! Ulasan membantu operator menjaga kualitas.');
}
