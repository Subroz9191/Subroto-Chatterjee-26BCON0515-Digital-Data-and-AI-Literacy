/**
 * Subroto Chatterjee - Personal Portfolio
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      }
    });
  }

  // 2. Navbar Background on Scroll & Scrollspy
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky navbar backdrop
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Active Section Scrollspy
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  });

  // 3. Dynamic Typewriter Effect for Hero
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const words = [
      'B.Tech CSE Student',
      'Fintech Enthusiast',
      'C & Java Developer',
      'Passionate Problem Solver',
      'Creative Tech Builder'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing new word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 4. Certificate Lightbox Modal
  const certModal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalCertImg');
  const modalTitle = document.getElementById('modalCertTitle');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const previewButtons = document.querySelectorAll('.btn-preview-cert');

  function openModal(imgSrc, title, downloadHref, downloadFilename) {
    if (!certModal) return;
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDownloadBtn.href = downloadHref;
    modalDownloadBtn.download = downloadFilename;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.cert-card');
      const imgSrc = card.dataset.certImg;
      const title = card.dataset.certTitle;
      const downloadHref = card.dataset.certDownload;
      const downloadFilename = card.dataset.certFilename;
      openModal(imgSrc, title, downloadHref, downloadFilename);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 5. Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'subroto.chatterjee@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: ' + email);
      }).catch(() => {
        showToast('Contact: subroto.chatterjee@example.com');
      });
    });
  }

  // 7. Interactive Contact Form Submission
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      if (!name.trim() || !email.trim() || !message.trim()) {
        showToast('Please fill out all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... ⏳';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        showToast('Thank you Subroto received your message!');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // 8. Back To Top Action
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
