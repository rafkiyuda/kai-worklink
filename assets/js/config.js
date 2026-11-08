/*
 * KAI WorkLink prototype configuration.
 * Change the numbers here and every screen updates. All values are illustrative.
 */
const CONFIG = {
  company: { name: 'PT Maju Sejahtera', emailDomain: 'majusejahtera.co.id', building: 'Menara Sudirman' },
  // Shuttle price per ride (IDR). KRL always follows the official fare.
  shuttle: { reg: 10000, flex: 7500 },
  krlFare: 5000, // official KRL fare for the demo route (illustrative)
  companyShare: 0.7, // portion paid by the employer
  // Peak windows in minutes from midnight: 06.30–08.30 and 16.30–18.30
  peak: [
    [390, 510],
    [990, 1110],
  ],
  serviceHours: { start: '05.30', end: '21.00' },
  // Demo month for the logged-in employee
  month: { days: 18, krlTrips: 36, flexTrips: 28, regTrips: 8 },
};

/* Format a number as Rupiah, e.g. 7500 -> "Rp7.500" */
function rp(n) {
  return 'Rp' + Math.round(n).toLocaleString('id-ID');
}

/* Monthly bill for the demo employee, derived from CONFIG */
function billing() {
  const m = CONFIG.month;
  const krl = m.krlTrips * CONFIG.krlFare;
  const shuttle = m.flexTrips * CONFIG.shuttle.flex + m.regTrips * CONFIG.shuttle.reg;
  const total = krl + shuttle;
  const company = total * CONFIG.companyShare;
  return { krl, shuttle, total, company, employee: total - company };
}
