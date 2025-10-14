// Smooth scrolling to download section
function scrollToDownload() {
    // For demo purposes, scroll to the final CTA section
    const ctaSection = document.querySelector('.final-cta');
    if (ctaSection) {
        ctaSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animations
function addScrollAnimations() {
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

    // Observe feature sections
    const featureSections = document.querySelectorAll('.feature-section');
    featureSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe final CTA
    const finalCta = document.querySelector('.final-cta');
    if (finalCta) {
        finalCta.style.opacity = '0';
        finalCta.style.transform = 'translateY(30px)';
        finalCta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(finalCta);
    }
}

// Add button click effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Parallax removed per design system (no motion-heavy effects)

// Floating animation removed per design system

// Typing effect removed per design system

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isK = target.includes('K');
                const isStar = target.includes('★');
                
                let finalNumber;
                if (isPercentage) {
                    finalNumber = parseInt(target.replace('%', ''));
                } else if (isK) {
                    finalNumber = parseInt(target.replace('K+', ''));
                } else if (isStar) {
                    finalNumber = parseFloat(target.replace('★', ''));
                } else {
                    finalNumber = parseInt(target);
                }
                
                animateCounter(counter, 0, finalNumber, 2000, isPercentage, isK, isStar);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, isPercentage, isK, isStar) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        
        if (isPercentage) {
            element.textContent = Math.round(current) + '%';
        } else if (isK) {
            element.textContent = Math.round(current) + 'K+';
        } else if (isStar) {
            element.textContent = current.toFixed(1) + '★';
        } else {
            element.textContent = Math.round(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Add smooth reveal animation for feature benefits
function addBenefitAnimations() {
    const benefitLists = document.querySelectorAll('.feature-benefits');
    
    benefitLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });
    });
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    benefitLists.forEach(list => observer.observe(list));
}

// Initialize all animations and effects
function init() {
    addRippleStyles();
    addScrollAnimations();
    addButtonEffects();
    animateCounters();
    addBenefitAnimations();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add resize handler for responsive behavior
// No dynamic parallax init

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Update footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
