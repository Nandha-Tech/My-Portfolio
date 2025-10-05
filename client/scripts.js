// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Sticky Header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

// Form submission with EmailJS
const contactForm = document.getElementById('contactForm');

// Create message element
const messageElement = document.createElement('div');
messageElement.style.position = 'fixed';
messageElement.style.top = '20px';
messageElement.style.right = '20px';
messageElement.style.padding = '15px 20px';
messageElement.style.borderRadius = '5px';
messageElement.style.color = 'white';
messageElement.style.fontWeight = 'bold';
messageElement.style.zIndex = '1000';
messageElement.style.opacity = '0';
messageElement.style.transition = 'opacity 0.3s ease';
messageElement.style.maxWidth = '300px';
document.body.appendChild(messageElement);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.send("service_0gcsdvx", "template_o8aqmmh", {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    
    // Show success message
    showMessage('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();
  }, function(error) {
    console.log('FAILED...', error);
    
    // Show error message
    showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
  })
  .finally(function() {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

// Function to show message
function showMessage(text, type) {
  messageElement.textContent = text;
  
  if (type === 'success') {
    messageElement.style.backgroundColor = '#28a745'; // Green
  } else if (type === 'error') {
    messageElement.style.backgroundColor = '#dc3545'; // Red
  }
  
  messageElement.style.opacity = '1';
  
  // Hide message after 5 seconds
  setTimeout(() => {
    messageElement.style.opacity = '0';
  }, 5000);
}

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.tech-logo, .education-item, .project-card, .contact-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animated elements
document.querySelectorAll('.tech-logo, .education-item, .project-card, .contact-item').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);