// Main script: project clicks, typing animation, hamburger toggle
document.addEventListener('DOMContentLoaded', function() {
  // Ensure page content isn't hidden under the fixed topbar by setting body padding
  const topbar = document.querySelector('.topbar');
  function updateBodyPadding() {
    if (topbar) {
      // use the rendered height of the topbar
      const h = topbar.offsetHeight;
      document.body.style.paddingTop = h + 'px';
    }
  }
  updateBodyPadding();
  window.addEventListener('resize', updateBodyPadding);

  // Project card click handler
  const projectCards = document.querySelectorAll('.project');
  projectCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      const fileName = this.getAttribute('data-file');
      if (fileName) {
        const fileUrl = './' + fileName;
        console.log('Attempting to open:', fileUrl);
        // Open in new tab/window (works when served via http)
        const win = window.open(fileUrl, '_blank');
        if (!win || win.closed || typeof win.closed == 'undefined') {
          // Popup blocked — open via link fallback
          const link = document.createElement('a');
          link.href = fileUrl;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  });

  // Typing animation for role
  const roles = ['Python', 'Machine Learning', 'Generative AI', 'XAI'];
  const typedEl = document.getElementById('typed');
  const cursorEl = document.querySelector('.typed-cursor');
  if (typedEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let typingForward = true;

    function typeStep() {
      const current = roles[roleIndex];
      if (typingForward) {
        if (charIndex <= current.length) {
          typedEl.textContent = current.substring(0, charIndex);
          charIndex++;
          setTimeout(typeStep, 110);
          return;
        }
        typingForward = false;
        setTimeout(typeStep, 900);
      } else {
        if (charIndex >= 0) {
          typedEl.textContent = current.substring(0, charIndex);
          charIndex--;
          setTimeout(typeStep, 60);
          return;
        }
        // move to next role
        roleIndex = (roleIndex + 1) % roles.length;
        typingForward = true;
        setTimeout(typeStep, 300);
      }
    }
    typeStep();
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      const nav = document.getElementById('nav');
      if (!nav) return;
      // prefer flex when showing
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Contact form handling
  // Formspree endpoint (set to your form URL)
  const CONTACT_ENDPOINT = 'https://formspree.io/f/xeovrola';
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (contactStatus) contactStatus.textContent = 'Sending...';

      const formData = new FormData(contactForm);

      if (CONTACT_ENDPOINT && CONTACT_ENDPOINT.startsWith('http')) {
        fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(res => {
          if (res.ok) {
            if (contactStatus) contactStatus.textContent = 'Message sent — thank you.';
            contactForm.reset();
          } else {
            return res.json().then(data => { throw data; });
          }
        }).catch(err => {
          console.error('Form submit error', err);
          if (contactStatus) contactStatus.textContent = 'Send failed — try emailing directly.';
        });
      } else {
        // Fallback: open mail client with prefilled subject/body
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';
        const subject = encodeURIComponent('Portfolio contact from ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
        window.location.href = 'mailto:jagadeeshmollguri@gmail.com?subject=' + subject + '&body=' + body;
        if (contactStatus) contactStatus.textContent = 'Opened your mail client. Please send the message.';
      }
    });
  }
});