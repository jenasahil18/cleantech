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

        // Observe each element
        elements.forEach(el => {
            observer.observe(el);
        });


        // Observe all cards
        document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
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
            
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                const btn = document.querySelector('.submit-btn');
                btn.classList.add('loading');
                btn.disabled = true;
            });

            // Toggle current accordion
            button.classList.toggle('active');
            content.classList.toggle('active');
        }

        // Add scroll animation
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

        document.querySelectorAll('.service-box').forEach((box) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(30px)';
            box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(box);
        });