(function(){
  const STORAGE_KEY = 'oh_theme_pref';
  const body = document.documentElement || document.body;

  function applyTheme(pref){
    if(pref === 'light') body.classList.add('light');
    else body.classList.remove('light');
  }

  function getSystemPref(){
    try{
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }catch(e){return 'dark'}
  }

  // Initialize
  document.addEventListener('DOMContentLoaded',()=>{
    const stored = localStorage.getItem(STORAGE_KEY);
    const theme = stored || getSystemPref();
    applyTheme(theme);
  });

  // Expose toggle API
  window.toggleTheme = function(force){
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const next = force ? force : (current === 'light' ? 'dark' : 'light');
    applyTheme(next);
    try{ localStorage.setItem(STORAGE_KEY, next); }catch(e){}
    return next;
  };
})();
