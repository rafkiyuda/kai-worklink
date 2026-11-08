/* history */
const hist = [
  ['Kam, 5 Nov', 'Bogor → Menara Sudirman', 'FLEX', rp(CONFIG.shuttle.flex)],
  ['Rab, 4 Nov', 'Bogor → Menara Sudirman', 'FLEX', rp(CONFIG.shuttle.flex)],
  ['Sel, 3 Nov', 'Bogor → Menara Sudirman', 'REGULER', rp(CONFIG.shuttle.reg)],
  ['Sen, 2 Nov', 'Bogor → Menara Sudirman', 'FLEX', rp(CONFIG.shuttle.flex)],
];
function renderHist() {
  $('histList').innerHTML = hist
    .map(
      (h) =>
        `<div class="trip"><div class="t"><b style="font-size:12px">${h[0].split(', ')[1]}</b><small>${h[0].split(', ')[0]}</small></div><div class="mid"><b>${h[1]}</b>KRL + shuttle · tepat waktu</div><div class="pr"><span class="${h[2] === 'FLEX' ? 'badge-flex' : 'badge-reg'}">${h[2]}</span><b>${h[3]}</b></div></div>`,
    )
    .join('');
}
function addHist() {
  hist.unshift(
    ['Hari ini, 8 Nov', 'Bogor → Menara Sudirman', 'FLEX', rp(CONFIG.shuttle.flex)].map((x, i) =>
      i === 0 ? 'Min, 8 Nov' : x,
    ),
  );
  renderHist();
}
