// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileToggle.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = 'var(--shadow)';
        }
    }
});

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
if (langButtons.length > 0) {
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = button.href;
        });
    });
}

// Home Page Slider
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.slider-dot');
if (slides && dots.length > 0) {
    let slideIndex = 0;
    
    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Set up dots navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            slideIndex = i;
            showSlide(slideIndex);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        slideIndex = (slideIndex + 1) % dots.length;
        showSlide(slideIndex);
    }, 5000);
}

// Product Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Product Gallery
const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
if (thumbs.length > 0 && mainImage) {
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            thumb.classList.add('active');
            
            // Update main image
            mainImage.src = thumb.dataset.image;
        });
    });
}

// Quantity Selector
const minusBtn = document.querySelector('.qty-btn.minus');
const plusBtn = document.querySelector('.qty-btn.plus');
const qtyInput = document.getElementById('qty');
if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value < 10) {
            qtyInput.value = value + 1;
        }
    });
}

// Rating Stars
const stars = document.querySelectorAll('.rating-input i');
const ratingValue = document.getElementById('rating-value');
if (stars.length > 0 && ratingValue) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.dataset.value;
            ratingValue.value = value;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // In a real implementation, you would send the form data to a server
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Home Page Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.slider-dot');
    
    if(slides && dots.length > 0) {
        let slideIndex = 0;
        
        function showSlide(index) {
            slides.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Set up dots navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                slideIndex = i;
                showSlide(slideIndex);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            slideIndex = (slideIndex + 1) % dots.length;
            showSlide(slideIndex);
        }, 5000);
    }
});

