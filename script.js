// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// ===== SERVICE CARD ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== CONTACT ITEMS ANIMATION =====
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ===== SOCIAL LINKS ANIMATION =====
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateX(-30px)';
    link.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
    observer.observe(link);
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== BOOKING MODAL LOGIC =====
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close-modal');
const bookingForm = document.getElementById('bookingForm');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const availableDays = document.querySelectorAll('.calendar-day.available');
let preSelectedService = '';

// Handle Select Service buttons
document.querySelectorAll('.select-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click if any
        preSelectedService = btn.getAttribute('data-service');

        // Scroll to booking section
        const bookingSection = document.getElementById('booking');
        const offsetTop = bookingSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Open modal when clicking available date
availableDays.forEach(day => {
    day.addEventListener('click', () => {
        const date = day.getAttribute('data-date');
        // Format date for display (e.g., "December 3, 2025")
        const dateObj = new Date(date + 'T12:00:00'); // Add time to prevent timezone issues
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        selectedDateDisplay.textContent = dateObj.toLocaleDateString('en-US', options);

        // Add active class to show modal
        modal.classList.add('active');
        modal.style.display = 'flex'; // Ensure display is flex before opacity transition

        // Pre-select service if one was chosen
        if (preSelectedService) {
            const serviceSelect = document.getElementById('service');
            serviceSelect.value = preSelectedService;
            // Reset after selection so it doesn't persist if they close and pick another date without clicking select again
            // preSelectedService = ''; // Optional: decide if you want it to persist or not. Let's keep it for now.
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Wait for transition
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// Handle form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData.entries());
    bookingData.date = selectedDateDisplay.textContent;

    // Prepare template parameters
    // These names must match the variables in your EmailJS email template
    const templateParams = {
        to_name: "PureHearted Studioz",
        from_name: bookingData.name,
        from_email: bookingData.email,
        service: bookingData.service,
        date: bookingData.date,
        message: `New booking request for ${bookingData.service} on ${bookingData.date}`
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual IDs from EmailJS dashboard
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function () {
            console.log('SUCCESS!');

            // Show success message
            submitBtn.textContent = 'Booking Confirmed! ✓';
            submitBtn.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    // Reset form
                    bookingForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 300);
            }, 1500);
        }, function (error) {
            console.log('FAILED...', error);
            submitBtn.textContent = 'Failed to send. Try again.';
            submitBtn.style.backgroundColor = '#f44336';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
});
