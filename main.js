(function () {
  'use strict';

  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!reduce) doc.classList.add('js-motion');

  // Current page in nav
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    if ((a.getAttribute('href') || '').split('#')[0] === here) a.setAttribute('aria-current', 'page');
  });

  // Mobile nav (full screen overlay)
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.visually-hidden').textContent = open ? 'Close menu' : 'Open menu';
      doc.style.overflow = open ? 'hidden' : '';
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false, false);
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false, false); });
  }

  // Smooth anchors
  if (!reduce) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Scroll driven bits: header, progress bar, hero parallax, call bar
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var heroMedia = document.querySelector('.hero-visual');
  var callBar = document.querySelector('.call-bar');
  var footer = document.querySelector('.site-footer');
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 30);
    if (bar) {
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }
    if (heroMedia && !reduce && y < window.innerHeight * 1.2) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.07).toFixed(1) + 'px,0)';
    }
    if (callBar && footer) {
      var fr = footer.getBoundingClientRect();
      var heroEl = document.querySelector('.hero');
      var inHero = heroEl && y < heroEl.offsetHeight - 120;
      callBar.classList.toggle('is-hidden', inHero || fr.top < window.innerHeight - 40);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Reveal on scroll, with stagger. Content is visible unless JS hides blocks that start below the fold.
  document.querySelectorAll('.stagger').forEach(function (group) {
    group.querySelectorAll(':scope > .reveal').forEach(function (el, i) { el.style.setProperty('--i', i); });
  });
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove('reveal-pending');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
        el.classList.add('reveal-pending');
        io.observe(el);
      }
    });
  }

  if (!reduce && finePointer) {
    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .btn-ghost').forEach(function (btn) {
      if (btn.closest('.call-bar')) return;
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });

    // Card tilt
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 6).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  // Map: locked until tapped, so the page keeps scrolling on phones
  document.querySelectorAll('.map-card').forEach(function (card) {
    var unlock = card.querySelector('.map-unlock');
    function open() { card.classList.remove('locked'); if (unlock) unlock.setAttribute('aria-hidden', 'true'); }
    if (unlock) unlock.addEventListener('click', open);
    card.addEventListener('click', function (e) { if (card.classList.contains('locked') && !e.target.closest('.map-info')) open(); });
    if (finePointer) card.addEventListener('mouseleave', function () { card.classList.add('locked'); if (unlock) unlock.removeAttribute('aria-hidden'); });
  });
})();
