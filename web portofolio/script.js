// ==========================================================================
// Ricky Ramadhan, S.Kom. — Portfolio Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && sidebar) {
    mobileNavToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      const icon = mobileNavToggle.querySelector('i');
      if (sidebar.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  });

  // 2. Hero Slider (Matches the 2-dot slider in Jackson template)
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 6500);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(idx);
      startAutoSlide();
    });
  });

  if (slides.length > 1) {
    startAutoSlide();
  }

  // 3. ScrollSpy Navigation Highlight
  const sections = document.querySelectorAll('section[id]');

  function onScrollSpy() {
    const scrollPos = window.scrollY + 180;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', onScrollSpy);

  // 4. Education Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach((other) => {
        other.classList.remove('active');
        const icon = other.querySelector('.accordion-header i');
        if (icon) icon.className = 'fa-solid fa-plus';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = header.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-minus';
      }
    });
  });

  // 5. Direct WhatsApp & Gmail Form Handler
  const quickForm = document.getElementById('quickContactForm');
  const sendEmailBtn = document.getElementById('sendEmailBtn');

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      const text = `Halo Ricky Ramadhan, S.Kom.%0A%0ASaya *${encodeURIComponent(name)}*%0A*Keperluan:* ${encodeURIComponent(subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(message)}`;
      window.open(`https://wa.me/62895346456400?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName').value.trim() || 'Pengunjung Website';
      const subject = document.getElementById('senderSubject').value.trim() || 'Pesan dari Website Portofolio';
      const message = document.getElementById('senderMessage').value.trim() || '';

      const body = `Halo Ricky Ramadhan, S.Kom.,\n\nNama: ${name}\n\nPesan:\n${message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ljriki84@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
