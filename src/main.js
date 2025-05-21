import AOS from 'aos';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Message sent successfully!');
      contactForm.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    alert('Failed to send message. Please try again later.');
  }
});

// Scroll Animation for Skills
const skills = document.querySelectorAll('.skill');

const animateSkills = () => {
  skills.forEach(skill => {
    const progress = skill.querySelector('.progress');
    const width = progress.style.width;
    progress.style.width = '0';
    setTimeout(() => {
      progress.style.width = width;
    }, 100);
  });
};

// Trigger skill animation when the about section is in view
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (aboutSection) {
  observer.observe(aboutSection);
}