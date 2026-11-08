/* HR chart */
const wk = [
  ['M1', 410, 300],
  ['M2', 440, 282],
  ['M3', 486, 250],
  ['M4', 522, 214],
];
const mx = Math.max(...wk.map((w) => w[1] + w[2]));
$('hrChart').innerHTML = wk
  .map(
    (w) =>
      `<div class="c"><b style="font-size:10px;color:var(--navy-d)">${w[1] + w[2]}</b><div class="stack"><span style="height:${(w[1] / mx) * 100}%;background:var(--orange)"></span><span style="height:${(w[2] / mx) * 100}%;background:var(--navy)"></span></div>${w[0]}</div>`,
  )
  .join('');
