/* ARIA — scripted virtual receptionist demo for Cool Creek Family Health.
   Loaded on demand by main.js the first time the launcher is clicked. */
(function () {
  'use strict';

  var INTENTS = [
    {
      match: /price|pricing|cost|how much|fee|rate|per month|monthly|afford/i,
      reply: 'Membership is a simple flat monthly rate — no copays, no surprise bills:\n\n' +
        '• Adults (18–64): $79/month\n' +
        '• Seniors (65+): $99/month\n' +
        '• Kids (with an enrolled adult): $30/month\n\n' +
        'Memberships are month-to-month and you can cancel anytime with 30 days’ notice. Want me to help you set up a free meet & greet?'
    },
    {
      match: /includ|cover|what do i get|come with|labs?\b|blood work|test|strep|flu|mono|procedure|ekg|wart|ear wax|biopsy/i,
      reply: 'Your membership includes a lot of care at no extra cost:\n\n' +
        '• Annual wellness labs\n' +
        '• In-house testing — urine dip, strep, flu, and mono\n' +
        '• Minor procedures — ear wax removal, wart cryotherapy, skin biopsy\n' +
        '• EKG\n' +
        '• Unhurried visits and direct access to your provider\n\n' +
        'For anything outside membership, we’ve negotiated transparent contracted discount rates — you’ll always know the price up front.'
    },
    {
      match: /insurance|insured|hsa|fsa|medicare|medicaid|deductible|bill|claim|reimburse/i,
      reply: 'Great question! We’re a Direct Primary Care practice, so we don’t bill insurance — your flat membership covers your primary care directly.\n\n' +
        'Most members keep a high-deductible or catastrophic plan for emergencies and specialists, and many pay for membership with HSA/FSA funds (we recommend confirming with your tax advisor).\n\n' +
        'Happy to talk it through — call us at (317) 663-9932.'
    },
    {
      match: /book|schedul|appoint|meet|greet|tour|visit|sign ?up|join|enroll|become a (member|patient)|get started/i,
      reply: 'We’d love to meet you! Every new patient relationship starts with a free, no-pressure meet & greet with our team.\n\n' +
        '• Call or text: (317) 663-9932\n' +
        '• Email: info@coolcreekfamilyhealth.com\n\n' +
        'Or use the form on our Contact page and we’ll reach out to find a time that works for you.'
    },
    {
      match: /employer|business|company|companies|team|staff|employee|benefit|small biz|workforce|hr\b/i,
      reply: 'Yes — we partner with small businesses across Hamilton County to offer DPC membership as an employee benefit. It’s a predictable flat monthly cost per employee, pairs well with high-deductible plans, and gives your team real access to a provider.\n\n' +
        'Check out our For Employers page, or email info@coolcreekfamilyhealth.com to request a proposal.'
    },
    {
      match: /house ?call|home visit|come to (me|my|our)/i,
      reply: 'We do offer house calls! If you’re within 7 miles of our Carmel office, we can come to you for an additional visit fee. Call (317) 663-9932 to arrange one.'
    },
    {
      match: /where|address|location|directions|parking|find you|hours|open|close/i,
      reply: 'You’ll find us at 340 N. Rangeline Rd, Carmel, IN 46032 — right in the heart of Carmel.\n\n' +
        'Visits are by appointment, and members get same- and next-day scheduling. Call (317) 663-9932 and we’ll get you on the calendar.'
    },
    {
      match: /controlled|adderall|xanax|narcotic|opioid|pain med|suboxone/i,
      reply: 'We take a careful, root-cause approach to prescribing. Controlled substances are prescribed only when clinically appropriate, within Indiana regulations, and we’re not a pain-management practice.\n\n' +
        'If you have questions about a specific medication, the best step is a conversation with Farah or Keyla — call (317) 663-9932.'
    },
    {
      match: /spanish|español|habla/i,
      reply: '¡Sí! Keyla Matthews, FNP is fully bilingual — she’s happy to care for you in English or Spanish. Call (317) 663-9932 to schedule with her.'
    },
    {
      match: /farah|keyla|saberman|provider|doctor|physician|nurse practitioner|who (do i|will) see|your team/i,
      reply: 'Care at Cool Creek comes from two board-certified Family Nurse Practitioners — Farah Myers, FNP, DipACLM (our founder, with a focus on lifestyle medicine) and Keyla Matthews, FNP (bilingual, with a critical care background) — supported by collaborating physician Dr. Jessica Saberman, who brings 21+ years of family medicine experience.\n\n' +
        'You can read all their bios on our About page.'
    },
    {
      match: /lifestyle|nutrition|sleep|stress|deprescrib|root cause|gut|vagus|chronic/i,
      reply: 'Lifestyle medicine is at the heart of what we do. Instead of a prescription for every symptom, we work on root causes — nutrition, sleep, stress, gut health, and thoughtfully deprescribing medications you may no longer need.\n\n' +
        'If you’re managing a chronic condition and want a different approach, a meet & greet is a great place to start.'
    },
    {
      match: /^(hi|hello|hey|good (morning|afternoon|evening)|howdy)\b/i,
      reply: 'Hi there! 👋 I’m ARIA, the virtual receptionist for Cool Creek Family Health. I can help with membership pricing, what’s included, insurance questions, or booking a free meet & greet. What can I do for you?'
    },
    {
      match: /thank|thx|appreciate/i,
      reply: 'You’re so welcome! If you need anything else, I’m right here — or you can always reach a real human at (317) 663-9932. 💚'
    }
  ];

  var FALLBACK = 'I want to make sure you get the right answer! I can help with things like membership pricing, what’s included, insurance & HSA questions, or scheduling a meet & greet — try one of the buttons below.\n\n' +
    'For anything else, our team is at (317) 663-9932 or info@coolcreekfamilyhealth.com.';

  var CHIPS = [
    'Membership pricing',
    'What’s included?',
    'Do you take insurance?',
    'Book a meet & greet',
    'For employers'
  ];

  var GREETING = 'Hi! I’m ARIA, Cool Creek’s virtual receptionist. 👋\n\nAsk me about membership, pricing, insurance, or booking a free meet & greet — or tap a question below.';

  /* ----- build panel ----- */
  var panel = document.createElement('div');
  panel.className = 'aria-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'ARIA virtual receptionist chat');
  panel.innerHTML =
    '<div class="aria-head">' +
      '<img src="assets/aria-avatar.webp" alt="" width="40" height="40" loading="lazy">' +
      '<div class="who"><strong>ARIA</strong><span>Virtual receptionist &middot; Cool Creek Family Health</span></div>' +
      '<button class="aria-close" aria-label="Close chat">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="aria-log" aria-live="polite"></div>' +
    '<div class="aria-chips" role="group" aria-label="Suggested questions"></div>' +
    '<form class="aria-form">' +
      '<label class="sr-only" for="aria-input">Type your question</label>' +
      '<input id="aria-input" type="text" placeholder="Type a question…" autocomplete="off">' +
      '<button type="submit" class="aria-send" aria-label="Send message">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>' +
      '</button>' +
    '</form>' +
    '<p class="aria-note">Demo widget &mdash; responses are scripted, not live AI.</p>';
  document.body.appendChild(panel);

  var log = panel.querySelector('.aria-log');
  var chipsWrap = panel.querySelector('.aria-chips');
  var form = panel.querySelector('.aria-form');
  var input = panel.querySelector('#aria-input');
  var closeBtn = panel.querySelector('.aria-close');
  var launcher = document.querySelector('.aria-launcher');
  var isOpen = false;
  var greeted = false;

  CHIPS.forEach(function (text) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'aria-chip';
    chip.textContent = text;
    chip.addEventListener('click', function () { send(text); });
    chipsWrap.appendChild(chip);
  });

  function addMsg(text, who) {
    var msg = document.createElement('div');
    msg.className = 'aria-msg ' + who;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
    return msg;
  }

  function respond(question) {
    var typing = document.createElement('div');
    typing.className = 'aria-msg bot typing';
    typing.setAttribute('aria-hidden', 'true');
    typing.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;

    setTimeout(function () {
      typing.remove();
      var intent = null;
      for (var i = 0; i < INTENTS.length; i++) {
        if (INTENTS[i].match.test(question)) { intent = INTENTS[i]; break; }
      }
      addMsg(intent ? intent.reply : FALLBACK, 'bot');
    }, 650 + Math.random() * 450);
  }

  function send(text) {
    var clean = text.trim();
    if (!clean) return;
    addMsg(clean, 'user');
    respond(clean);
  }

  function open() {
    isOpen = true;
    panel.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      setTimeout(function () { addMsg(GREETING, 'bot'); }, 250);
    }
    setTimeout(function () { input.focus(); }, 320);
  }

  function close() {
    isOpen = false;
    panel.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
    input.value = '';
    input.focus();
  });

  closeBtn.addEventListener('click', close);
  launcher.addEventListener('click', function () { isOpen ? close() : open(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close();
  });

  // main.js hands off after loading this script on the first click — open now
  open();
})();
