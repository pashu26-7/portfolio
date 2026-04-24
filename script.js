
/* ── CONTACT FORM SEND (Formspree) ── */
async function sendContactEmail() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const btn     = document.querySelector('.btn-send-msg');

  if (!name || !email || !message) {
    showToast('⚠️ Please fill in all fields.', '#fb923c');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Please enter a valid email address.', '#fb923c');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch('https://formspree.io/f/xyzqpnvn', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body   : JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      showToast("✅ Message sent! I'll get back to you soon.", '#00d9c0');
      document.getElementById('cf-name').value    = '';
      document.getElementById('cf-email').value   = '';
      document.getElementById('cf-message').value = '';
    } else {
      const data = await res.json();
      showToast('❌ ' + (data.error || 'Something went wrong. Try emailing directly.'), '#f87171');
    }
  } catch (err) {
    showToast('❌ Network error. Please email gardheprashant101@gmail.com directly.', '#f87171');
  }

  btn.disabled = false;
  btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
}

function showToast(msg, color) {
  let t = document.getElementById('pg-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'pg-toast';
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);padding:14px 24px;border-radius:10px;font-size:14px;font-weight:600;z-index:9999;opacity:0;transition:all .3s;pointer-events:none;max-width:90vw;text-align:center;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = color;
  t.style.color = color === '#00d9c0' ? '#000' : '#fff';
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 4000);
}

/* ── TYPEWRITER ── */
const phrases = [
  'Software Developer',
  'Flutter Developer',
  'Data Scientist',
  'Cloud Enthusiast',
  'Full-Stack Engineer'
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const current = phrases[pi];
  if (!deleting) {
    el.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── STAGGER CARDS ── */
document.querySelectorAll('.proj-card, .cert-row, .edu-row, .stat-card, .contact-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
});
