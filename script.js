

'use strict';


(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();


(function initTypingEffect() {
  const comments = [
    {
      id: 'comment-text-1',
      text: 'String interpolation in SQL queries allows attackers to inject arbitrary SQL. An attacker could pass `1 OR 1=1` as `user_id` to leak all records. Use a parameterized query to bind `user_id` safely.',
    },
    {
      id: 'comment-text-2',
      text: 'The variable `result` is assigned on line 22 but never read. `cursor.execute()` returns a cursor object, not query results — use `cursor.fetchone()` to retrieve data. Remove the unused assignment.',
    },
  ];

  const CHAR_DELAY = 18; 
  const COMMENT_GAP = 300; 

  function typeText(el, text, onDone) {
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;

    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(tick, CHAR_DELAY);
      } else {
        el.classList.remove('typing');
        el.classList.add('done');
        if (typeof onDone === 'function') onDone();
      }
    };

    tick();
  }

 
  const diffCard = document.querySelector('.diff-card');
  if (!diffCard) return;

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          observer.unobserve(entry.target);

          const el1 = document.getElementById(comments[0].id);
          const el2 = document.getElementById(comments[1].id);

          if (el1) {
            typeText(el1, comments[0].text, () => {
              if (el2) {
                setTimeout(() => typeText(el2, comments[1].text), COMMENT_GAP);
              }
            });
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(diffCard);
})();



(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const handler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
})();



(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  const toggle = (force) => {
    const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => toggle());


  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });

 
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      toggle(false);
    }
  });
})();



(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();



(function initKonami() {
  const SEQUENCE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];

  const modal    = document.getElementById('easter-egg');
  const overlay  = document.getElementById('easter-egg-overlay');
  const dismiss  = document.getElementById('easter-egg-dismiss');

  if (!modal || !overlay || !dismiss) return;

  let pointer = 0;
  let lastTime = 0;
  const TIMEOUT = 2000;

  const show = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    dismiss.focus();
  };

  const hide = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    const now = Date.now();

   
    if (now - lastTime > TIMEOUT) pointer = 0;
    lastTime = now;

 
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (key === SEQUENCE[pointer]) {
      pointer++;
      if (pointer === SEQUENCE.length) {
        pointer = 0;
        show();
      }
    } else {
      
      pointer = key === SEQUENCE[0] ? 1 : 0;
    }
  });

  overlay.addEventListener('click', hide);
  dismiss.addEventListener('click', hide);

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) hide();
  });


  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      dismiss.focus();
    }
  });
})();



(function initHeroParallax() {
  const glow = document.querySelector('.hero__bg-glow');
  if (!glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let raf;

  const handleMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dx = ((x / w) - 0.5) * 24;
    const dy = ((y / h) - 0.5) * 14;

    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  window.addEventListener('mousemove', handleMove, { passive: true });
})();
