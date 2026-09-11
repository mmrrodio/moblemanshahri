/* ========================================
   مبلمان شهری جعفری - Main JS v3 (fixed)
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
    document.documentElement.dir = (lang === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'fa' ? 'fa' : (lang === 'ar' ? 'ar' : 'en');
  }

  // ----- Music: continuous across pages (no restart) -----
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');

  function restoreMusicState() {
    if (!audio) return;
    audio.volume = 0.4;
    audio.loop = true;

    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

    if (wasPlaying) {
      if (savedTime > 0 && !isNaN(savedTime)) {
        audio.currentTime = savedTime;
      }
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          if (musicBtn) {
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '⏸';
          }
        }).catch(() => {});
      }
    }
  }

  function saveMusicState() {
    if (!audio) return;
    localStorage.setItem('musicPlaying', audio.paused ? 'false' : 'true');
    if (!audio.paused) {
      localStorage.setItem('musicTime', audio.currentTime.toString());
    }
  }

  setInterval(saveMusicState, 800);
  window.addEventListener('beforeunload', saveMusicState);
  window.addEventListener('pagehide', saveMusicState);

  function onFirstInteract() {
    if (!audio) return;
    if (localStorage.getItem('musicPlaying') !== 'true') {
      audio.volume = 0.4;
      audio.loop = true;
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          localStorage.setItem('musicPlaying', 'true');
          if (musicBtn) {
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '⏸';
          }
        }).catch(() => {});
      }
    }
    document.body.removeEventListener('click', onFirstInteract);
    document.body.removeEventListener('touchstart', onFirstInteract);
  }
  document.body.addEventListener('click', onFirstInteract, { once: true });
  document.body.addEventListener('touchstart', onFirstInteract, { once: true });

  restoreMusicState();

  if (musicBtn && audio) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.play().then(() => {
          localStorage.setItem('musicPlaying', 'true');
          musicBtn.classList.add('playing');
          musicBtn.innerHTML = '⏸';
        }).catch(() => {});
      } else {
        audio.pause();
        localStorage.setItem('musicPlaying', 'false');
        localStorage.setItem('musicTime', audio.currentTime.toString());
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
      const imgWrap = splash.querySelector('.splash-img-wrap');
      let delay = 350;

      words.forEach((w, i) => {
        setTimeout(() => w.classList.add('show'), delay + i * 520);
      });

      setTimeout(() => {
        if (enLine) enLine.classList.add('show');
      }, delay + words.length * 520 + 250);

      setTimeout(() => {
        if (imgWrap) imgWrap.classList.add('show');
      }, delay + words.length * 520 + 900);

      setTimeout(() => {
        splash.classList.add('hide');
        sessionStorage.setItem('splashSeen', 'true');
      }, delay + words.length * 520 + 3800);
    }
  }

  // ----- Auto-load gallery images from folders -----
  function loadGalleryImages() {
    const page = (window.location.pathname.split('/').pop() || '').replace('.html', '');
    const map = {
      'traffic': 'traffic',
      'lighting': 'lighting',
      'rest': 'rest',
      'info': 'info',
      'services': 'services',
      'security': 'security',
      'artistic': 'artistic',
      'custom': 'custom',
      'about': 'about'
    };
    const folder = map[page];
    if (!folder) return;

    const mainItems = document.querySelectorAll('.gallery-main .gallery-item');
    const stripItems = document.querySelectorAll('.gallery-strip .strip-item');

    mainItems.forEach((item, i) => {
      const num = String(i + 1).padStart(2, '0');
      const src = 'images/' + folder + '/' + num + '.jpg';
      const img = new Image();
      img.onload = function() {
        const placeholder = item.querySelector('.img-placeholder');
        if (placeholder) placeholder.remove();
        let existing = item.querySelector('img');
        if (!existing) {
          existing = document.createElement('img');
          existing.alt = folder + ' ' + num;
          item.insertBefore(existing, item.firstChild);
        }
        existing.src = src;
      };
      img.onerror = function() {};
      img.src = src;
    });

    stripItems.forEach((item, i) => {
      const num = String(i + 4).padStart(2, '0');
      const src = 'images/' + folder + '/' + num + '.jpg';
      const img = new Image();
      img.onload = function() {
        const placeholder = item.querySelector('.img-placeholder');
        if (placeholder) placeholder.remove();
        let existing = item.querySelector('img');
        if (!existing) {
          existing = document.createElement('img');
          existing.alt = folder + ' ' + num;
          item.appendChild(existing);
        }
        existing.src = src;
      };
      img.onerror = function() {};
      img.src = src;
    });
  }
  loadGalleryImages();

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
    setTimeout(() => {
      strip.innerHTML = strip.innerHTML + strip.innerHTML;
    }, 400);
  }
});
