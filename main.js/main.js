/* ========================================
   مبلمان شهری جعفری - Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== Music: play only on first user interaction, persist state ==========
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  let musicStarted = false;

  // Check if music was already started in this session
  if (sessionStorage.getItem('musicStarted') === 'true' && audio) {
    // Attempt to resume (may be blocked by browser, but we try)
    audio.volume = 0.35;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        musicStarted = true;
        if (musicBtn) musicBtn.classList.add('playing');
        if (musicBtn) musicBtn.innerHTML = '⏸';
      }).catch(() => {
        // Autoplay blocked – wait for click
      });
    }
  }

  function startMusic() {
    if (!audio || musicStarted) return;
    audio.volume = 0.35;
    audio.play().then(() => {
      musicStarted = true;
      sessionStorage.setItem('musicStarted', 'true');
      if (musicBtn) {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '⏸';
      }
    }).catch(err => console.log('Music play blocked:', err));
  }

  // First click anywhere starts music
  document.body.addEventListener('click', function firstClick() {
    startMusic();
    document.body.removeEventListener('click', firstClick);
  }, { once: true });

  // Toggle button
  if (musicBtn && audio) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '⏸';
        sessionStorage.setItem('musicStarted', 'true');
      } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '♪';
      }
    });
  }

  // ========== Lightbox for gallery ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item, .strip-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && img.src && !img.src.includes('placeholder')) {
        if (lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // Escape key closes lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active');
  });

  // Duplicate strip items for seamless infinite scroll
  const strip = document.querySelector('.gallery-strip');
  if (strip) {
    const items = strip.innerHTML;
    strip.innerHTML = items + items; // duplicate for continuous loop
  }
});
