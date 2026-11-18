(function () {
  'use strict';

  var CASES = {
    stroika: {
      category: 'Автоматизация + ИИ',
      title: 'Автоматизация заявок строительной компании',
      description: 'Разработали систему, которая анализирует входящие заявки, определяет потенциальных клиентов и автоматически направляет их ответственным менеджерам.',
      before: [['Первый ответ', 'До 2 часов'], ['Конверсия во встречу', 'Исходный уровень']],
      after: [['Первый ответ', '1–2 минуты'], ['Конверсия во встречу', '+18%']],
      benefit: 'Заявки распределяются без участия диспетчера, ответ приходит за минуты. Рост конверсии во встречу на 18% показывает, что скорость реакции напрямую влияет на продажи.'
    },
    docs: {
      category: 'Документооборот + ИИ',
      title: 'Автоматический ввод PDF-счетов в 1С',
      description: 'Создали систему, которая распознаёт счета из электронной почты, извлекает данные, проверяет их и автоматически переносит в рабочие системы.',
      before: [['Ручной ввод', '100%'], ['Время бухгалтерии', 'Базовый уровень']],
      after: [['Ручной ввод', '10%'], ['Освобождённое время', '15 часов в неделю']],
      benefit: 'Бухгалтерия тратит на 90% меньше времени на ручной ввод и получает 15 часов в неделю для более важных задач. Данные попадают в учётные системы без ошибок.'
    },
    med: {
      category: 'ИИ-ассистент',
      title: 'Telegram-бот для справочной поддержки клиники',
      description: 'Разработали бота, который отвечает на типовые вопросы пациентов по базе знаний клиники и передаёт сложные обращения администраторам.',
      before: [['Типовые вопросы', 'Обрабатывают сотрудники'], ['Нагрузка на колл-центр', 'Базовый уровень']],
      after: [['Автоматические ответы', 'До 70% типовых вопросов'], ['Нагрузка на колл-центр', '−35%']],
      benefit: 'До 70% типовых вопросов закрываются автоматически, а нагрузка на колл-центр снизилась на 35%. Сотрудники сосредоточились на сложных обращениях.'
    },
    rest: {
      category: 'Аналитика + ИИ',
      title: 'Мониторинг отзывов ресторанной сети',
      description: 'Объединили отзывы с пяти площадок в единую систему, которая определяет тональность, выявляет жалобы и уведомляет управляющих о проблемах.',
      before: [['Реакция на негатив', 'До 2 дней'], ['Повторные жалобы', 'Базовый уровень']],
      after: [['Реакция на негатив', '2–3 часа'], ['Повторные жалобы', '−25%']],
      benefit: 'Управляющие реагируют на негатив за часы вместо дней, а количество повторных жалоб снизилось на 25%. Сеть быстрее устраняет причины проблем.'
    },
    hr: {
      category: 'Бизнес-процессы + ИИ',
      title: 'Автоматизация адаптации новых сотрудников',
      description: 'Создали систему, которая автоматизирует выход нового сотрудника: от отправки документов и создания доступов до ответов на вопросы по внутренним регламентам.',
      before: [['Онбординг', '2–3 дня'], ['Ручные действия', 'HR и IT выполняют вручную']],
      after: [['Онбординг', 'Около 1 дня'], ['Рутинные операции', 'Автоматизированы']],
      benefit: 'Онбординг сократился с 2–3 дней до примерно одного дня, рутинные операции HR и IT автоматизированы, а новые сотрудники быстрее включаются в работу.'
    }
  };

  var POLICY = {
    title: 'Политика конфиденциальности',
    cat: 'Демонстрационная версия',
    lead: 'Эта страница описывает, как обрабатываются данные в демонстрационной версии сайта.',
    explanation: 'Сайт не передаёт данные на сервер. Сведения, введённые в форму, сохраняются только в хранилище браузера и используются для показа работы интерфейса.',
    recommendations: 'В рабочей версии сайта политика должна содержать: состав собираемых данных, цели обработки, сроки хранения, способ передачи в рабочую систему компании, права пользователя и контакты ответственного лица.',
    solution: 'Не отправляйте через демонстрационную форму реальные персональные данные или коммерческую информацию.',
    cta: 'Для рабочего сайта текст политики должен быть подготовлен с учётом фактических процессов обработки данных.'
  };

  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');
  var toast = document.getElementById('toast');
  var lastFocused = null;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function openModal(html) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = '';
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  function showToast(text) {
    toast.textContent = text;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { toast.hidden = true; }, 3200);
  }

  // Mobile navigation
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Case details
  document.querySelectorAll('.case-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var c = CASES[btn.dataset.case];
      if (!c) return;
      function rows(items) {
        return items.map(function (r) {
          return '<div class="modal-metric"><span>' + esc(r[0]) + '</span><strong>' + esc(r[1]) + '</strong></div>';
        }).join('');
      }
      openModal(
        '<p class="modal-cat">' + esc(c.category) + '</p>' +
        '<h2 id="modalTitle">' + esc(c.title) + '</h2>' +
        '<p class="modal-lead">' + esc(c.description) + '</p>' +
        '<h4>До внедрения</h4><div class="modal-metrics">' + rows(c.before) + '</div>' +
        '<h4>После внедрения</h4><div class="modal-metrics after-metrics">' + rows(c.after) + '</div>' +
        '<h4>Польза для бизнеса</h4><p>' + esc(c.benefit) + '</p>' +
        '<a class="btn btn-primary modal-cta" href="#contacts" data-modal-link>Обсудить похожую задачу</a>'
      );
    });
  });

  // Contacts channels and policy
  document.querySelectorAll('[data-channel]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(
        '<span class="modal-cat">Канал связи</span>' +
        '<h2 id="modalTitle">' + esc(btn.dataset.channel) + '</h2>' +
        '<p>В демонстрационной версии реальный адрес канала не указан. Здесь будет действующая ссылка на канал Bitcore.</p>' +
        '<p class="modal-note">Свяжитесь с нами через форму на этой странице — она работает в демонстрационном режиме.</p>' +
        '<button class="btn btn-outline modal-cta" type="button" data-modal-link>Понятно</button>'
      );
    });
  });

  document.querySelectorAll('[data-contact-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(
        '<span class="modal-cat">Bitcore</span>' +
        '<h2 id="modalTitle">Связаться с нами</h2>' +
        '<p class="modal-lead">Расскажите о задаче — мы изучим её и предложим подходящий вариант решения.</p>' +
        '<p>Для связи используйте каналы Telegram, MAX и VK или оставьте заявку через форму на этой странице.</p>' +
        '<p class="modal-note">Реальные адреса каналов будут подставлены после подключения. Сейчас форма сохраняет заявку в этом браузере.</p>' +
        '<button class="btn btn-primary modal-cta" type="button" data-modal-link>Понятно</button>'
      );
    });
  });

  document.querySelectorAll('[data-policy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(
        '<span class="modal-cat">' + esc(POLICY.cat) + '</span>' +
        '<h2 id="modalTitle">' + esc(POLICY.title) + '</h2>' +
        '<p class="modal-lead">' + esc(POLICY.lead) + '</p>' +
        '<h4>Как обрабатываются данные</h4><p>' + esc(POLICY.explanation) + '</p>' +
        '<h4>Что должно быть в рабочей версии</h4><p>' + esc(POLICY.recommendations) + '</p>' +
        '<h4>Важно</h4><p>' + esc(POLICY.solution) + '</p>' +
        '<p class="modal-footnote">' + esc(POLICY.cta) + '</p>'
      );
    });
  });

  modalBody.addEventListener('click', function (e) {
    if (e.target.closest('[data-modal-link]')) closeModal();
  });

  // Contact form
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var reset = document.getElementById('resetForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.namedItem('name').value.trim();
    var contact = form.elements.namedItem('contact').value.trim();
    var valid = true;

    form.querySelectorAll('.error').forEach(function (el) { el.textContent = ''; });

    if (name.length < 2) {
      form.querySelector('[data-error="name"]').textContent = 'Укажите имя';
      valid = false;
    }
    if (contact.length < 3) {
      form.querySelector('[data-error="contact"]').textContent = 'Укажите контакт для связи';
      valid = false;
    }
    if (!valid) return;

    var record = {
      name: name,
      company: form.elements.namedItem('company').value.trim(),
      contact: contact,
      task: form.elements.namedItem('task').value.trim(),
      unknown: form.elements.namedItem('unknown').checked,
      date: new Date().toISOString()
    };

    try {
      var stored = JSON.parse(window.localStorage.getItem('bitcore_leads') || '[]');
      stored.push(record);
      window.localStorage.setItem('bitcore_leads', JSON.stringify(stored));
    } catch (err) {
      // Storage may be unavailable in some browsers — form still confirms visually.
    }

    form.hidden = true;
    success.hidden = false;
    showToast('Заявка сохранена в этом браузере');
  });

  reset.addEventListener('click', function () {
    form.reset();
    form.hidden = false;
    success.hidden = true;
  });

  // Motion: particle background, reveals, counters, scroll progress, sticky CTA
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initParticles() {
    var canvas = document.getElementById('bgParticles');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var width = 0, height = 0, raf = null;
    var linkDistance = 110;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(90, Math.max(35, Math.round((width * height) / 18000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.3 + 0.6
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx.strokeStyle = 'rgba(143, 184, 255, ' + (0.12 * (1 - dist / linkDistance)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(143, 184, 255, .35)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }
      draw();
      raf = window.requestAnimationFrame(step);
    }

    function start() { if (raf === null) raf = window.requestAnimationFrame(step); }
    function stop() { if (raf !== null) { window.cancelAnimationFrame(raf); raf = null; } }

    resize();
    draw();
    if (reduceMotion) return;

    window.addEventListener('resize', function () { resize(); draw(); }, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  function initReveals() {
    var targets = document.querySelectorAll(
      '.section-head, .card, .problem, .step, .trust-card, .hero-copy > *, .hero-visual, .custom-cta, .transparency, .contact-form'
    );
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', (Math.min(i % 6, 5) * 70) + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    var start = performance.now();
    var duration = 900;
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    counters.forEach(function (el) { io.observe(el); });
  }

  function initScrollChrome() {
    var progress = document.getElementById('scrollProgress');
    var header = document.querySelector('.site-header');
    var hero = document.getElementById('top');
    var mobileCta = document.getElementById('mobileCta');
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
      if (hero && mobileCta) mobileCta.classList.toggle('show', window.scrollY > hero.offsetHeight - 120);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  initParticles();
  initReveals();
  initCounters();
  initScrollChrome();
})();
