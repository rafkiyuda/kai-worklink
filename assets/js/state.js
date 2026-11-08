/* Global app state and DOM helper */
const $ = (id) => document.getElementById(id);
let activated = false,
  wlMode = 'emp',
  simState = 0,
  delayed = false,
  stars = 0;
