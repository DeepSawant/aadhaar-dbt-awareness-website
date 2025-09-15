// Basic enhancements and interactivity for the site
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Update footer year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const navToggle = $('#navToggle');
  const navMenu = $('#nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (navMenu.hasAttribute('hidden')) {
        navMenu.removeAttribute('hidden');
      } else {
        navMenu.setAttribute('hidden', '');
      }
    });
  }

  // Smooth scrolling for in-page anchors (with focus management)
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length === 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // After scrolling, move focus for accessibility
        setTimeout(() => {
          if (typeof target.tabIndex !== 'number' || target.tabIndex < 0) {
            target.tabIndex = -1;
          }
          target.focus({ preventScroll: true });
        }, 400);
      }
    });
  });

  // Accordion functionality
  $$('.accordion__button').forEach((btn) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel.hasAttribute('hidden')) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    // Keyboard support: toggle with Enter/Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Simple intersection animation for cards
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, { threshold: 0.15 })
    : null;

  if (observer) {
    $$('.card, .steps li, .video-card').forEach((el) => observer.observe(el));
  }

  // Aadhaar checker form logic (client-side demo only)
  const aadhaarForm = document.getElementById('aadhaarForm');
  const checkResult = document.getElementById('checkResult');
  if (aadhaarForm && checkResult) {
    const aadhaarInput = document.getElementById('aadhaarNumber');
    const mobileInput = document.getElementById('mobileNumber');
    const accountInput = document.getElementById('accountNumber');
    const bankSelect = document.getElementById('bankName');

    // Format Aadhaar as XXXX XXXX XXXX
    const formatAadhaar = (value) => value.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})(\d{4})(\d{0,4}).*/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' '));
    aadhaarInput.addEventListener('input', () => {
      const caret = aadhaarInput.selectionStart;
      aadhaarInput.value = formatAadhaar(aadhaarInput.value);
      aadhaarInput.setSelectionRange(caret, caret);
    });

    // Format mobile as +91 XXXXX XXXXX
    const formatMobile = (value) => {
      const digits = value.replace(/\D/g, '').slice(0, 12); // include country code 91 + 10 digits
      if (digits.startsWith('91')) {
        const body = digits.slice(2);
        return `+91 ${body.slice(0,5)}${body.length>5?' ':''}${body.slice(5)}`.trim();
      }
      return `+91 ${digits.slice(0,5)}${digits.length>5?' ':''}${digits.slice(5)}`.trim();
    };
    mobileInput.addEventListener('input', () => {
      const caret = mobileInput.selectionStart;
      mobileInput.value = formatMobile(mobileInput.value);
      mobileInput.setSelectionRange(caret, caret);
    });

    // Account number last 4 only digits
    accountInput.addEventListener('input', () => {
      accountInput.value = accountInput.value.replace(/\D/g, '').slice(0, 4);
    });

    const luhnCheck = (num) => {
      // Aadhaar uses Verhoeff, but we'll simulate a simple checksum for demo
      let sum = 0, shouldDouble = false;
      for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num.charAt(i), 10);
        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
    };

    const renderResult = ({ status, title, message }) => {
      const cls = status === 'linked' ? 'result-success' : status === 'maybe' ? 'result-warning' : 'result-error';
      const icon = status === 'linked' ? '✅' : status === 'maybe' ? '⚠️' : '❌';
      checkResult.hidden = false;
      checkResult.className = `check-result ${cls}`;
      checkResult.innerHTML = `
        <span class="result-icon" aria-hidden="true">${icon}</span>
        <div class="result-title">${title}</div>
        <p class="result-description">${message}</p>
        ${status === 'linked' ? '' : `
          <div class="result-action">
            <a class="btn btn--primary" href="dbt-guide.html">Go to DBT Enabling Guide</a>
          </div>
        `}
        <p style="margin-top:1rem; font-size:0.85rem; color:#718096;">Note: This is a demo checker and does not access government databases. Always verify with your bank.</p>
      `;
      checkResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    aadhaarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const aadhaar = aadhaarInput.value.replace(/\s/g, '');
      const mobile = mobileInput.value.replace(/\D/g, '');
      const account4 = accountInput.value.replace(/\D/g, '');
      const bank = bankSelect.value;

      if (aadhaar.length !== 12) {
        renderResult({ status: 'error', title: 'Invalid Aadhaar number', message: 'Please enter your 12-digit Aadhaar number.' });
        return;
      }
      if (!bank) {
        renderResult({ status: 'error', title: 'Please select your bank', message: 'Choose your bank to proceed.' });
        return;
      }
      if (account4.length !== 4) {
        renderResult({ status: 'error', title: 'Enter last 4 digits of account', message: 'We need the last 4 digits to personalize your guidance.' });
        return;
      }
      if (!(mobile.startsWith('91') ? mobile.length === 12 : mobile.length === 10)) {
        renderResult({ status: 'error', title: 'Invalid mobile number', message: 'Enter your registered mobile number in the format +91 XXXXX XXXXX or 10 digits.' });
        return;
      }

      // Simulated decision logic (client-only):
      // Use checksum and last digit heuristics to mock statuses.
      const isChecksumOk = luhnCheck(aadhaar);
      const lastDigit = parseInt(aadhaar[aadhaar.length - 1], 10);
      if (isChecksumOk && lastDigit % 2 === 0) {
        renderResult({ status: 'linked', title: 'Your Aadhaar appears linked and DBT may be enabled', message: 'Based on the basic checks, your Aadhaar seems properly set. Please confirm with your bank for the official status.' });
      } else if (isChecksumOk) {
        renderResult({ status: 'maybe', title: 'Aadhaar may be linked, DBT enabling uncertain', message: 'We could not confirm DBT enabling. You might need to set your primary DBT account in the NPCI mapper.' });
      } else {
        renderResult({ status: 'error', title: 'Aadhaar likely not linked or entered incorrectly', message: 'It looks like your Aadhaar may not be linked to your bank account. Head to the guide to complete the process.' });
      }
    });
  }

  // Assistance form on dbt-guide page
  const assistForm = document.getElementById('assistForm');
  const assistResult = document.getElementById('assistResult');
  if (assistForm && assistResult) {
    assistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bank = document.getElementById('assistBank').value;
      const city = document.getElementById('assistCity').value.trim();
      if (!bank || !city) return;
      const bankNames = {
        sbi: 'State Bank of India',
        hdfc: 'HDFC Bank',
        icici: 'ICICI Bank',
        axis: 'Axis Bank',
        pnb: 'Punjab National Bank',
        boi: 'Bank of India',
        canara: 'Canara Bank',
        union: 'Union Bank',
        other: 'Your Bank'
      };
      const bankName = bankNames[bank] || 'Your Bank';
      assistResult.hidden = false;
      assistResult.className = 'check-result result-warning';
      assistResult.innerHTML = `
        <span class="result-icon" aria-hidden="true">📞</span>
        <div class="result-title">Steps for ${bankName} — ${city}</div>
        <ol class="steps" style="margin:0;">
          <li>Visit your ${bankName} branch in ${city} with Aadhaar and PAN, or use the bank's official mobile/net banking app to seed Aadhaar.</li>
          <li>Request the staff/app to set this account as your <strong>primary DBT account</strong> in the NPCI mapper.</li>
          <li>After 2-3 working days, verify status in the app or with the branch. You should receive SMS on your registered mobile.</li>
          <li>If credits fail or go elsewhere, ask the bank to update the NPCI mapper to this account.</li>
        </ol>
        <div class="result-action" style="margin-top:1rem;">
          <a class="btn btn--primary" href="resources.html">View Official Resources</a>
          <a class="btn" style="margin-left:0.5rem;" href="index.html#checker">Re-check Status</a>
        </div>
        <p style="margin-top:1rem; font-size:0.85rem; color:#718096;">This guidance is informational. Always use official ${bankName} channels and government portals.</p>
      `;
      assistResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

