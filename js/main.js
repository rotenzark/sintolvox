/* Sintolvox — main.js
   PLUMBING_V 1. Bottega storica: aperta lun-gio (spezzato), chiusa ven/sab/dom.
   Gesto-firma: la lancetta del quadrante che si sintonizza allo scroll.
   GSAP SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'sintolvox',
    hours: {
      0: [],
      1: [['09:00', '12:30'], ['14:30', '19:00']],
      2: [['09:00', '12:30'], ['14:30', '19:00']],
      3: [['09:00', '12:30'], ['14:30', '19:00']],
      4: [['09:00', '12:30'], ['14:30', '19:00']],
      5: [],
      6: [],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 2000,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.sintonia': 'Tuning in', 'nav.trovi': 'What you find', 'nav.1954': '1954', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '73 reviews',
      'hero.kicker': 'The electronics workshop of old Milan, since 1954',
      'hero.sub': 'The component you <strong>can’t find anywhere else</strong>, the radio brought back to life. From the vintage valve to the electric scooter.',
      'hero.cta1': 'Call: 02 462237', 'hero.cta2': 'What you find',
      'tk.1': 'radio', 'tk.2': 'tv', 'tk.3': 'hi-fi & turntables', 'tk.4': 'components', 'tk.5': 'vintage valves', 'tk.6': 'repairs', 'tk.7': 'electric scooters', 'tk.8': 'since 1954',
      'tk.1b': 'radio', 'tk.2b': 'tv', 'tk.3b': 'hi-fi & turntables', 'tk.4b': 'components', 'tk.5b': 'vintage valves', 'tk.6b': 'repairs', 'tk.7b': 'electric scooters', 'tk.8b': 'since 1954',
      'sin.kicker': 'The workshop’s signature', 'sin.t1': 'Tuning in:', 'sin.t2': 'six worlds, one dial',
      'sin.lead': 'The name says it: <strong>sintonia</strong> — tuning. Like an old radio, the shop tunes from one world to the next — and in each you find what you’re after.',
      'sta.1t': 'Radio', 'sta.1d': 'Valve, transistor, collector’s pieces. And the parts to make them play again.',
      'sta.2t': 'TV', 'sta.2d': 'From the cathode tube to digital: sets, aerials, decoders, remotes.',
      'sta.3t': 'Hi-Fi & turntables', 'sta.3d': 'Amps, speakers, cables, styli and belts. Vintage and hi-end too.',
      'sta.4t': 'Components', 'sta.4d': 'The dated part you won’t find elsewhere: valves, small parts, hi-fi cables.',
      'sta.5t': 'Repairs', 'sta.5d': 'Reel-to-reel recorders, stereos, turntables. Electronics brought back to life.',
      'sta.6t': 'Scooters', 'sta.6d': 'Today’s electronics, repaired with yesterday’s hands.',
      'trovi.kicker': 'What you find', 'trovi.t1': 'If you look for it here,', 'trovi.t2': 'you’ll most likely find it',
      'trovi.p1': 'Vintage valves, hi-fi cables, the impossible connector, the small parts the megastores no longer stock. Shelves that read like an archive of Italian electronics, from the ’50s to today.',
      'trovi.p2': 'And if you’re not sure what you need, just ask: here, advice is part of the trade.',
      'trovi.q': '«If you’re looking for an electronic component, especially a dated one, you’ll most likely find it here. Courtesy and professionalism are a given.»',
      'vec.kicker': 'The old and the new', 'vec.t1': 'From the transistor', 'vec.t2': 'to the electric scooter',
      'vec.p1': 'Since 1954, the same care: first the valve radio, then TV, hi-fi, the turntable. Today the electric scooter too. The device changes, the way of fixing it doesn’t.',
      'vec.p2': 'A place where electronics aren’t thrown away: they’re repaired, made to last, brought back to life.',
      'targa.kicker': 'A Historic Shop of Milan', 'targa.t1': 'Since 1954,', 'targa.t2': 'an institution',
      'targa.lead': 'The City of Milan named it a <strong>Historic Shop (Bottega Storica)</strong>: the gold plaque carries the founding year, <strong>1954</strong>. Seventy years of electronics in the same district.',
      'targa.q': '«A historic electronics shop: so many memories, competent and always helpful staff. To me it’s an institution — few are left.»',
      'rob.kicker': 'The workshop', 'rob.t1': 'Roberto and', 'rob.t2': 'the craft',
      'rob.lead': 'A shopkeeper who loves his work: competent, warm, helps the customer whatever it takes. As many say, <strong>«when the electronics act up, he knows how to handle them»</strong>.',
      'gal.kicker': 'The workshop', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 73 Google reviews',
      'rec.r1': '«A historic electronics shop: so many good memories, competent and always helpful staff. To me it’s an institution — few are left.»',
      'rec.r2': '«The example of a shopkeeper who loves his work. Competent and warm, helps the customer whatever it takes. When the electronics act up, he knows how to handle them.»',
      'rec.r3': '«If you’re looking for an electronic component, especially a dated one, you’ll most likely find it here. Courtesy and professionalism are a given.»',
      'rec.r4': '«A small shop of old Milan: repairs of old turntables and reel-to-reel recorders, I recommend it. Many thanks to Roberto for his helpfulness and warmth.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Privata Asti,', 'dove.t2': 'De Angeli district',
      'dove.metro': 'Via Privata Asti 12, 20149 Milan · De Angeli / Piazza Piemonte area, steps from the M1 metro.',
      'dove.chiama': 'Call 02 462237', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What do you sell?', 'faq.a1': 'Consumer electronics and components, dated ones too: radios, TVs, hi-fi, turntables, valves, cables, aerials, remotes. If you need a particular part, especially a dated one, you’ll most likely find it here.',
      'faq.q2': 'Do you repair old equipment?', 'faq.a2': 'Yes: radios, vintage and hi-end stereos, turntables, reel-to-reel recorders. And today electric scooters too. Electronics brought back to life.',
      'faq.q3': 'How long have you been around?', 'faq.a3': 'Since 1954. Sintolvox is a Historic Shop of Milan: an electronics institution in the De Angeli district — few are left.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Monday to Thursday, 9am–12:30pm and 2:30–7pm. Closed Friday, Saturday and Sunday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Privata Asti 12 in Milan, De Angeli / Piazza Piemonte area. Phone 02 462237.',
      'foot.dove': 'Via Privata Asti 12, 20149 Milan · <a href="tel:+3902462237">02 462237</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* gesto-firma: la lancetta del quadrante che si sintonizza allo scroll */
  var dialSection = document.getElementById('sintonia');
  var needle = document.getElementById('dialNeedle');
  var dialEl = document.getElementById('dial');
  if (hasST && !reducedMotion && needle && dialSection) {
    ScrollTrigger.create({
      trigger: dialSection, start: 'top 78%', end: 'bottom 45%', scrub: .4,
      onUpdate: function (self) {
        var pct = 8 + self.progress * 84;
        needle.style.left = pct + '%';
        if (dialEl) dialEl.style.setProperty('--glow', pct + '%');
      }
    });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero__title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.tuner', { opacity: 1, y: 0, duration: .5 }, .7)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .8);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'On air · open now — closes ' : 'On air · aperto ora — chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
