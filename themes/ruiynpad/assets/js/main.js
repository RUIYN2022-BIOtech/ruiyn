document.addEventListener('DOMContentLoaded', function() {
    
    // --- HOME PAGE SLIDER ---
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

    // --- PRODUCT FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length > 0) {
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
                        card.style.display = 'flex'; // Changed to flex to maintain card layout
                        // Add fade-in animation
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- PRODUCT GALLERY (Single Product) ---
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');
    
    if (thumbs.length && mainImage) {
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

    // --- MOBILE MENU TOGGLE ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});
