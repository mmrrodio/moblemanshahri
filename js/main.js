/* ========================================
   مبلمان شهری جعفری - Main JS v2
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Mobile menu -----
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ----- Active nav -----
  const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ----- Language switcher -----
  const savedLang = localStorage.getItem('siteLang') || 'fa';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('siteLang', lang);
    });
  });

  function setLanguage(lang) {
    document.body.classList.remove('lang-fa', 'lang-en', 'lang-ar');
    document.body.classList.add('lang-' + lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    // Update direction
    document.documentElement.dir = (lang === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'fa' ? 'fa' : (lang === 'ar' ? 'ar' : 'en');
  }

  // ----- Music (better persistence attempt) -----
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  let musicStarted = sessionStorage.getItem('musicStarted') === 'true';

  function tryPlay() {
    if (!audio) return;
    audio.volume = 0.4;
    audio.loop = true;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        musicStarted = true;
        sessionStorage.setItem('musicStarted', 'true');
        if (musicBtn) {
          musicBtn.classList.add('playing');
          musicBtn.innerHTML = '⏸';
        }
      }).catch(() => {});
    }
  }

  // Resume if already started in this session
  if (musicStarted) {
    tryPlay();
  }

  // First interaction starts music
  function onFirstInteract() {
    if (!musicStarted) tryPlay();
    document.body.removeEventListener('click', onFirstInteract);
    document.body.removeEventListener('touchstart', onFirstInteract);
  }
  document.body.addEventListener('click', onFirstInteract, { once: true });
  document.body.addEventListener('touchstart', onFirstInteract, { once: true });

  if (musicBtn && audio) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        tryPlay();
      } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '♪';
      }
    });
  }

  // ----- Splash animation (only on index) -----
  const splash = document.getElementById('splash');
  if (splash) {
    const alreadySeen = sessionStorage.getItem('splashSeen') === 'true';
    if (alreadySeen) {
      splash.classList.add('hide');
    } else {
      const words = splash.querySelectorAll('.splash-word');
      const enLine = splash.querySelector('.splash-en');
      let delay = 400;
      words.forEach((w, i) => {
        setTimeout(() => w.classList.add('show'), delay + i * 480);
      });
      setTimeout(() => {
        if (enLine) enLine.classList.add('show');
      }, delay + words.length * 480 + 200);

      // Hide after ~4.5 seconds
      setTimeout(() => {
        splash.classList.add('hide');
        sessionStorage.setItem('splashSeen', 'true');
      }, 4800);
    }
  }

  // ----- Lightbox -----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item, .strip-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && img.src && !img.classList.contains('placeholder')) {
        if (lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      }
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active'); });

  // Duplicate strip for seamless loop
  const strip = document.querySelector('.gallery-strip');
  if (strip) {
    strip.innerHTML = strip.innerHTML + strip.innerHTML;
  }
});
