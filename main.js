/* === New Counter Animation JS === */

function animateCounter(element, target, duration) {
    let start = 0;
    // Calculate the increment to reach the target in the given duration (at ~60 FPS / 16ms interval)
    const increment = target / (duration / 16);
    const showPlus = target >= 1000;

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            // Ensure the final number is exactly the target and add '+' if needed
            element.textContent = target.toLocaleString() + (showPlus ? '+' : '');
            clearInterval(timer);
        } else {
            // Update with the current floor value
            element.textContent = Math.floor(start).toLocaleString() + (showPlus ? '+' : '');
        }
    }, 16);
}

function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        // The animation runs for 2000ms (2 seconds)
        animateCounter(counter, target, 2000);
    });
}

// Intersection Observer to trigger the counter animation when the stats section is in viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            // Stop observing once the animation has run
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

// Start observing the container
counterObserver.observe(document.querySelector('.stats-container'));

/* === Existing JS (Modified for clarity and variable renaming) === */

let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function moveSlide(step) {
    slideIndex = (slideIndex + step + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => moveSlide(1), 3000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Select the elements you want to animate
const elements = document.querySelectorAll('.animate-on-scroll');

// NOTE: The previous code block containing 'elements.forEach(el => { observer.observe(el); });'
// was likely referring to the *second* observer you defined later.
// We'll rely on the comprehensive card observation block below.

// Observe all cards
// NOTE: The initial styles set here are redundant with the later scroll animation block.
document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    // observer.observe(card); // Will use the renamed scrollObserver below
});


function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const allButtons = document.querySelectorAll('.accordion-btn');
    const allContents = document.querySelectorAll('.accordion-content');

    // Close other accordions in the same service box
    const serviceBox = button.closest('.service-box');
    const buttonsInBox = serviceBox.querySelectorAll('.accordion-btn');
    const contentsInBox = serviceBox.querySelectorAll('.accordion-content');

    buttonsInBox.forEach((btn, index) => {
        if (btn !== button) {
            btn.classList.remove('active');
            contentsInBox[index].classList.remove('active');
        }
    });

    // NOTE: The 'document.getElementById('contactForm').addEventListener...' block was
    // incorrectly nested inside 'toggleAccordion'. It should be outside.

    // Toggle current accordion
    button.classList.toggle('active');
    content.classList.toggle('active');
}

// Fixed the nested form submit listener
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    // e.preventDefault(); // You might want this if using AJAX or similar
    const btn = document.querySelector('.submit-btn');
    btn.classList.add('loading');
    btn.disabled = true;
});


// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Renamed the second IntersectionObserver to 'scrollObserver' to avoid conflict
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // NOTE: You might want to unobserve here too: scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .product-card, .animate-on-scroll').forEach((card, index) => {
    // Applying initial styles to all for the animation effect
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    // The transition property should be applied once, not conditionally
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Observe using the renamed variable
    scrollObserver.observe(card);
});