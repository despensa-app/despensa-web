(() => {
  const THEME_KEY = 'dsp-theme';
  let stored = null;

  try {
    stored = window.localStorage.getItem(THEME_KEY);
  } catch {
    // Sin almacenamiento se utiliza la preferencia del sistema.
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored === 'light' || stored === 'dark'
    ? stored
    : prefersDark ? 'dark' : 'light';

  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.style.colorScheme = theme;
})();
