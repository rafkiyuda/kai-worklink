/* onboarding */
function onbGo(n) {
  [1, 2, 3].forEach((i) => {
    $('onb' + i).style.display = i === n ? 'block' : 'none';
    $('st' + i).classList.toggle('on', i <= n);
  });
  $('onbStep').textContent = n;
  $('s-wl-onb').scrollTop = 0;
}
function toggleEmail() {
  const b = $('emailBox');
  b.style.display = b.style.display === 'none' ? 'block' : 'none';
}
function checkEmail() {
  const v = $('email').value.trim().toLowerCase();
  const e = $('codeErr');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
    e.textContent = 'Masukkan email kerja yang valid, misalnya nama@kantor.co.id.';
    e.style.display = 'block';
    return;
  }
  if (!v.endsWith('@' + CONFIG.company.emailDomain)) {
    e.textContent =
      'Domain email belum terdaftar di WorkLink. Minta HR mendaftarkan kantormu, atau untuk demo gunakan @majusejahtera.co.id.';
    e.style.display = 'block';
    return;
  }
  e.style.display = 'none';
  $('workEmail').textContent = v;
  $('emailBox').style.display = 'none';
  toast('Email cocok dengan PT Maju Sejahtera');
}
$('email').addEventListener('input', () => {
  $('codeErr').style.display = 'none';
});
function pick(el) {
  let sib = el;
  while (sib.previousElementSibling && sib.previousElementSibling.classList.contains('opt'))
    sib = sib.previousElementSibling;
  while (sib && sib.classList.contains('opt')) {
    sib.classList.remove('on');
    sib = sib.nextElementSibling;
  }
  el.classList.add('on');
}
function finishOnb() {
  if (!$('consent').checked) {
    $('consErr').style.display = 'block';
    return;
  }
  activated = true;
  $('akunWL').textContent = 'Aktif';
  $('akunWLdesc').textContent = 'PT Maju Sejahtera · Paket Flex · Bogor → Sudirman (Bay B2).';
  go('wl');
  toast('WorkLink aktif. Selamat bekerja tanpa ribet!');
  addNotif(
    'ok',
    'WorkLink aktif',
    'Akunmu terhubung ke PT Maju Sejahtera. Rute: ' + $('from').value + ' → ' + $('to').value + '.',
    'Baru saja',
  );
}
