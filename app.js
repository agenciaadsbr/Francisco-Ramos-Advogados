/* Francisco Ramos Advogados · LP Direito Criminal · ADS BR */
(function () {
  'use strict';
  var SB_URL = 'https://qxhnjzyhtllmtdrcyygi.supabase.co';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG5qenlodGxsbXRkcmN5eWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzczNjgsImV4cCI6MjA5NzgxMzM2OH0.DWf4I_x9F--H7ZZHUt_n4V3B__Nlsf1jNZdUV0vNBLU';
  var SITE = 'francisco-ramos-criminal';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Leads (Supabase lp_leads / lp_visits) ---------- */
  function insert(table, row) {
    return fetch(SB_URL + '/rest/v1/' + table, {
      method: 'POST', keepalive: true,
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    });
  }
  function origem() {
    try { var s = sessionStorage.getItem('fr_origem'); if (s) return s; } catch (e) {}
    var q = new URLSearchParams(location.search), o, ref = q.get('ref') || document.referrer || '';
    if (q.get('utm_source')) o = q.get('utm_source') + (q.get('utm_campaign') ? ' / ' + q.get('utm_campaign') : '') + (q.get('utm_term') ? ' / ' + q.get('utm_term') : '');
    else if (q.get('gclid') || q.get('gbraid') || q.get('wbraid')) o = 'google-ads';
    else if (q.get('fbclid')) o = 'meta';
    else if (ref) { try { o = new URL(ref).hostname.replace(/^www\./, ''); } catch (e) { o = 'referência'; } }
    else o = 'direto';
    o = o.slice(0, 160);
    try { sessionStorage.setItem('fr_origem', o); } catch (e) {}
    return o;
  }
  var ORIGEM = origem();
  var SERVICO = 'Direito Criminal';
  insert('lp_visits', { site: SITE, referrer: document.referrer || null, path: (location.pathname + location.search).slice(0, 500) }).catch(function () {});

  /* ---------- Header / menu ---------- */
  var hdr = $('#hdr'), mb = $('.menu-btn'), mn = $('#mnav');
  function closeMenu() { mn.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  mb.addEventListener('click', function () { var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.style.overflow = o ? 'hidden' : ''; });
  mn.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* CTA → formulário (registra a área de origem) */
  $$('a[href="#contato"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (a.dataset.servico) SERVICO = 'Direito Criminal · ' + a.dataset.servico;
      setTimeout(function () { var n = $('#f-nome'); if (n) n.focus({ preventScroll: true }); }, 700);
    });
  });

  /* ---------- Split text ---------- */
  $$('[data-split]').forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            var s = document.createElement('span'); s.textContent = t; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
  });

  /* ---------- Reveal ---------- */
  var targets = $$('.rv, [data-split], [data-io]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else targets.forEach(function (el) { el.classList.add('in'); });
  /* hero entra imediatamente */
  requestAnimationFrame(function () { $$('.hero [data-split], .hero .rv, .hero-photo').forEach(function (el) { el.classList.add('in'); }); });

  /* ---------- Contadores ---------- */
  $$('[data-count]').forEach(function (el) {
    var end = +el.dataset.count; if (reduce) return;
    el.textContent = '0';
    var ob = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; ob.disconnect();
      var t0 = performance.now(), d = 1400;
      (function step(t) { var p = Math.min(1, (t - t0) / d); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
    }, { threshold: .6 });
    ob.observe(el);
  });

  /* ---------- Scroll: header, parallax, stack, fab ---------- */
  var pars = $$('[data-par]'), cards = $$('.stack .card'), fab = $('.fab'), hero = $('#topo'), contato = $('#contato');
  var desk = window.matchMedia('(min-width: 1081px)');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    hdr.classList.toggle('scrolled', y > 40);
    var heroB = hero.getBoundingClientRect().bottom, ct = contato.getBoundingClientRect();
    fab.classList.toggle('on', heroB < 0 && !(ct.top < vh * .7 && ct.bottom > 0));
    if (reduce) return;
    pars.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translate3d(0,' + (p * -100 * +el.dataset.par) + '%,0)';
    });
    if (desk.matches) {
      cards.forEach(function (c, i) {
        var next = cards[i + 1]; if (!next) { c.style.transform = ''; c.style.filter = ''; return; }
        var r = c.getBoundingClientRect(), nr = next.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, 1 - (nr.top - r.top) / r.height));
        c.style.transform = 'scale(' + (1 - p * .06) + ')';
        c.style.filter = 'brightness(' + (1 - p * .35) + ')';
      });
    } else cards.forEach(function (c) { c.style.transform = ''; c.style.filter = ''; });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { onScroll(); ticking = false; }); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Spotlight + botões magnéticos ---------- */
  if (fine && !reduce) {
    $$('.tile').forEach(function (t) {
      t.addEventListener('pointermove', function (e) { var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    });
    $$('.mag').forEach(function (b) {
      b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3) + 'px)'; });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- FAQ com altura animada ---------- */
  $$('.qa details').forEach(function (d) {
    var s = d.querySelector('summary'), a = d.querySelector('.ans');
    s.addEventListener('click', function (e) {
      if (reduce) return;
      e.preventDefault();
      if (d.open) {
        a.animate([{ height: a.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 380, easing: 'cubic-bezier(.2,.75,.15,1)' }).onfinish = function () { d.open = false; };
      } else {
        d.open = true; var h = a.offsetHeight;
        a.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.2,.75,.15,1)' });
      }
    });
  });

  /* ---------- Formulário ---------- */
  var form = $('#lead-form'), nome = $('#f-nome'), tel = $('#f-tel'), consent = $('#f-consent'), consentL = $('#consent-l'), msg = $('#f-msg'), btn = $('#f-btn'), btnT = $('#f-btn-t');
  function mask(v) {
    var d = v.replace(/\D/g, ''); if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2); d = d.slice(0, 11);
    if (!d) return ''; if (d.length <= 2) return '(' + d; if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }
  function validPhone(d) {
    if (d.length !== 10 && d.length !== 11) return false;
    var ddd = +d.slice(0, 2); if (ddd < 11 || ddd > 99 || d[0] === '0' || d[1] === '0') return false;
    if (d.length === 11 && d[2] !== '9') return false;
    return !/^(\d)\1+$/.test(d.slice(2));
  }
  function setErr(input, id, t) { input.setAttribute('aria-invalid', t ? 'true' : 'false'); $('#' + id).textContent = t || ''; }
  tel.addEventListener('input', function () { tel.value = mask(tel.value); });
  tel.addEventListener('blur', function () { var d = tel.value.replace(/\D/g, ''); setErr(tel, 'e-tel', d && !validPhone(d) ? 'Confira o número com DDD.' : ''); });
  nome.addEventListener('input', function () { if (nome.getAttribute('aria-invalid') === 'true') setErr(nome, 'e-nome', ''); });
  consent.addEventListener('change', function () { if (consent.checked) consentL.classList.remove('bad'); });

  var sending = false;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); if (sending) return;
    msg.className = 'msg'; msg.textContent = '';
    var n = nome.value.trim().replace(/\s+/g, ' '), d = tel.value.replace(/\D/g, ''), ok = true;
    if (n.length < 2 || !/[A-Za-zÀ-ÿ]/.test(n)) { setErr(nome, 'e-nome', 'Informe seu nome.'); ok = false; } else setErr(nome, 'e-nome', '');
    if (!validPhone(d)) { setErr(tel, 'e-tel', 'Informe um WhatsApp válido com DDD.'); ok = false; } else setErr(tel, 'e-tel', '');
    if (!consent.checked) { consentL.classList.add('bad'); ok = false; } else consentL.classList.remove('bad');
    if (!ok) { (form.querySelector('[aria-invalid="true"]') || consent).focus(); msg.className = 'msg err-box'; msg.textContent = 'Revise os campos destacados para continuar.'; return; }
    sending = true; btn.disabled = true; form.classList.add('loading'); btnT.textContent = 'Enviando...';
    var row = { site: SITE, nome: n.slice(0, 120), whatsapp: d, origem: ORIGEM, servico: SERVICO.slice(0, 120) };
    var attempt = function () { return Promise.race([insert('lp_leads', row), new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')); }, 12000); })]).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); }); };
    attempt().catch(function () { return new Promise(function (r) { setTimeout(r, 900); }).then(attempt); })
      .then(function () {
        try { sessionStorage.setItem('fr_nome', n.split(' ')[0]); } catch (e) {}
        msg.className = 'msg ok-box'; msg.textContent = 'Recebemos seus dados. Direcionando para o WhatsApp...'; btnT.textContent = 'Enviado';
        window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'lead_submit', servico: SERVICO });
        location.href = '/redirect' + location.search;
      })
      .catch(function () {
        sending = false; btn.disabled = false; form.classList.remove('loading'); btnT.textContent = 'Conversar com um advogado';
        msg.className = 'msg err-box'; msg.textContent = 'Não foi possível enviar agora. Verifique sua conexão e tente novamente em instantes.';
      });
  });
})();
