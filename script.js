// Highlight the current page's nav link based on the URL path.
(function () {
  const current = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav__link').forEach(function (link) {
    if (link.getAttribute('href') === current) link.classList.add('is-active');
  });
})();

// Light / dark theme toggle. Persists the choice in localStorage and falls back
// to the OS color-scheme preference on the first visit.
(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function preferred() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      apply(next);
    });
  }

  apply(preferred());
})();
