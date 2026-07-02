/* Cool Creek Family Health — site behavior (deferred) */
(function () {
  'use strict';

  /* ----- mobile nav ----- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-locked', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
      }
    });
  }

  /* ----- header shadow on scroll ----- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- scroll reveal ----- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- reviews carousel ----- */
  var carousel = document.querySelector('.carousel');
  if (carousel) {
    var slides = carousel.querySelectorAll('.review-slide');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
      dot.addEventListener('click', function () { show(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.carousel-dot');

    function show(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { show(current + 1); }, 6500);
    }
    carousel.querySelector('.carousel-prev').addEventListener('click', function () { show(current - 1); restart(); });
    carousel.querySelector('.carousel-next').addEventListener('click', function () { show(current + 1); restart(); });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ----- footer year ----- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* ----- ARIA receptionist: launcher now, widget script on demand ----- */
  var launcher = document.createElement('button');
  launcher.className = 'aria-launcher';
  launcher.setAttribute('aria-label', 'Chat with ARIA, our virtual receptionist');
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    '<span>Chat with ARIA</span><span class="dot" aria-hidden="true"></span>';
  document.body.appendChild(launcher);

  var ariaLoaded = false;
  function loadAria() {
    if (ariaLoaded) return;
    ariaLoaded = true;
    var s = document.createElement('script');
    s.src = 'js/aria.js';
    s.defer = true;
    document.body.appendChild(s);
  }
  launcher.addEventListener('click', loadAria, { once: true });

  // warm the cache once the page is idle so first open feels instant
  var warm = function () {
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'js/aria.js';
    document.head.appendChild(link);
  };
  if ('requestIdleCallback' in window) { requestIdleCallback(warm, { timeout: 4000 }); }
  else { setTimeout(warm, 3500); }
})();
