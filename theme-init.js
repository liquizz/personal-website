// Runs before first paint so prerendered HTML shows in the right theme.
// Kept as an external file because the CSP disallows inline scripts.
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {
    // Storage unavailable: fall back to the light theme.
  }
})();
