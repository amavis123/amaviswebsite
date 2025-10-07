/**
 * Amavis.AI - Improved Modern AI Website JavaScript
 * Enhanced hero transitions, modern interactions, and smooth animations
 */

// ================================================
// Utility Functions
// ================================================

/**
 * Debounce function to limit the rate of function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= -rect.height * threshold &&
        rect.left >= -rect.width * threshold &&
        rect.bottom <= windowHeight + rect.height * threshold &&
        rect.right <= windowWidth + rect.width * threshold
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Animate number counter
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ================================================
// Navigation System
// ================================================

class Navigation {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Navigation scroll effect
        this.setupScrollEffect();
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.navMenu.style.display = 'flex';
            this.navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMobileMenu();
        }
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        // Only hide menu if we're in mobile mode (nav-toggle is visible)
        if (this.navMenu && window.innerWidth <= 768) {
            this.navMenu.style.display = 'none';
        }
        if (this.navToggle) this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Bypass scrolljacking system before navigating
                        this.bypassScrolljackingIfActive();
                        
                        // Small delay to ensure bypass is processed
                        setTimeout(() => {
                            smoothScrollTo(targetElement, 100);
                        }, 50);
                    }
                }
            });
        });
    }
    
    bypassScrolljackingIfActive() {
        // Get the hero card system from the global app
        if (window.amavisImprovedApp && window.amavisImprovedApp.isInitialized) {
            const heroSystem = window.amavisImprovedApp.getComponent(EnhancedHeroCardSystem);
            if (heroSystem && heroSystem.scrollMode !== 'unlocked') {
                heroSystem.bypassScrolljacking();
            }
        }
    }
    
    setupScrollEffect() {
        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;
            
            // Simple style changes based on scroll position within hero section
            if (scrollY > 50) {
                this.nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                this.nav.style.backdropFilter = 'blur(15px)';
                this.nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            } else {
                this.nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                this.nav.style.backdropFilter = 'blur(10px)';
                this.nav.style.boxShadow = 'none';
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
        
        // Add click handler for nav logo to scroll to top
        const navLogoCard = document.getElementById('nav-logo-card');
        if (navLogoCard) {
            navLogoCard.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Add cursor pointer and accessibility attributes
            navLogoCard.style.cursor = 'pointer';
            navLogoCard.setAttribute('role', 'button');
            navLogoCard.setAttribute('aria-label', 'Scroll to top');
            navLogoCard.setAttribute('tabindex', '0');
            
            // Add keyboard support
            navLogoCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// ================================================
// Enhanced Hero Card System
// ================================================

class EnhancedHeroCardSystem {
    constructor() {
        this.cards = document.querySelectorAll('.hero-card');
        this.dots = document.querySelectorAll('.nav-dot');
        this.progressBar = document.getElementById('hero-progress-bar');
        this.heroSection = document.querySelector('.hero-section');
        this.navDotsElement = document.querySelector('.hero-nav-dots');
        this.navGuideElement = document.querySelector('.nav-guide');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 6000;
        this.isUserInteracting = false;
        this.isScrollLocked = false;
        this.hasCompletedAllSlides = false;
        this.scrollThreshold = 10; // Very small threshold as requested
        this.lastScrollTime = 0;
        this.scrollCooldown = 300; // Prevent rapid scrolling
        
        // Bidirectional scrolljacking state
        this.scrollMode = 'forward'; // 'forward', 'reverse', 'unlocked'
        this.intersectionObserver = null;
        this.isReverseEngaged = false;
        this.isHardReset = false;
        this.hardResetCount = 0;
        this.reverseProgressionTimer = null;
        
        // Navigation visibility state
        this.visibilityObserver = null;
        this.isNavigationVisible = true;
        this.isNavigationGuideVisible = true;
        
        this.init();
    }
    
    init() {
        if (this.cards.length === 0) return;
        
        // Set up dot navigation
        this.setupDotNavigation();
        
        // Set up keyboard navigation
        this.setupKeyboardNavigation();
        
        // Set up swipe navigation for mobile
        this.setupSwipeNavigation();
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        this.setupHoverPause();
        
        // Setup CTA button bypass
        this.setupCTAButtonBypass();
        
        // Setup scrolljacking and lock viewport
        this.setupScrollJacking();
        this.setupHeroIntersectionObserver();
        this.setupNavigationVisibilityObserver();
        this.lockViewport();
        
        // Initialize first card
        this.showCard(0);
    }
    
    setupDotNavigation() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.isUserInteracting = true;
                this.showCard(index);
                this.resetAutoPlay();
                
                // Reset user interaction flag after delay
                setTimeout(() => {
                    this.isUserInteracting = false;
                }, 3000);
            });
            
            // Add keyboard support for dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dot.click();
                }
            });
        });
        
        // Setup navigation arrows
        this.setupArrowNavigation();
        
        // Setup "See More" button
        this.setupSeeMoreButton();
    }
    
    setupArrowNavigation() {
        const arrowUp = document.querySelector('.nav-arrow-up');
        const arrowDown = document.querySelector('.nav-arrow-down');
        
        if (arrowUp) {
            arrowUp.addEventListener('click', () => {
                this.isUserInteracting = true;
                this.previousCard();
                this.resetAutoPlay();
                
                setTimeout(() => {
                    this.isUserInteracting = false;
                }, 3000);
            });
            
            arrowUp.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    arrowUp.click();
                }
            });
        }
        
        if (arrowDown) {
            arrowDown.addEventListener('click', () => {
                this.isUserInteracting = true;
                
                // Check if we're on the last slide
                if (this.currentIndex === this.cards.length - 1) {
                    // On last slide - move to video section
                    this.completeSlideSequence();
                } else {
                    // Not on last slide - proceed to next card
                    this.nextCard();
                    this.resetAutoPlay();
                }
                
                setTimeout(() => {
                    this.isUserInteracting = false;
                }, 3000);
            });
            
            arrowDown.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    arrowDown.click();
                }
            });
        }
    }
    
    setupSeeMoreButton() {
        const seeMoreButton = document.getElementById('see-more-button');
        
        if (seeMoreButton) {
            // Initially hide the button
            seeMoreButton.style.opacity = '0';
            seeMoreButton.style.visibility = 'hidden';
            seeMoreButton.style.transform = 'translateX(-50%) translateY(20px)';
            
            seeMoreButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Bypass scrolljacking and smooth scroll to video section
                if (this.scrollMode !== 'unlocked') {
                    this.bypassScrolljacking();
                }
                
                setTimeout(() => {
                    const videoSection = document.getElementById('video-section');
                    if (videoSection) {
                        videoSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 50);
            });
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle if focus is not on form elements
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA' ||
                document.activeElement.isContentEditable) {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCard();
                    break;
            }
        });
    }
    
    setupSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                this.isUserInteracting = true;
                
                if (swipeDistance > 0) {
                    // Swiped left - next card
                    this.nextCard();
                } else {
                    // Swiped right - previous card
                    this.previousCard();
                }
                
                this.resetAutoPlay();
                
                setTimeout(() => {
                    this.isUserInteracting = false;
                }, 3000);
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    setupHoverPause() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        heroSection.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            if (!this.isUserInteracting) {
                this.startAutoPlay();
            }
        });
    }
    
    setupCTAButtonBypass() {
        // Find all CTA buttons within the hero section that link to other sections
        const ctaButtons = document.querySelectorAll('.hero-section .cta-button[href^="#"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = button.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement && this.scrollMode !== 'unlocked') {
                    
                    // Bypass scrolljacking system before navigating
                    this.bypassScrolljacking();
                    
                    // Small delay to ensure bypass is processed, then smooth scroll
                    setTimeout(() => {
                        smoothScrollTo(targetElement, 100);
                    }, 50);
                    
                    // Prevent default link behavior since we're handling it
                    e.preventDefault();
                }
            });
        });
    }
    
    showCard(index) {
        if (index < 0 || index >= this.cards.length) return;
        
        // Hide all cards
        this.cards.forEach((card, i) => {
            card.classList.remove('active');
            if (this.dots[i]) {
                this.dots[i].classList.remove('active');
            }
        });
        
        // Show selected card
        this.cards[index].classList.add('active');
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentIndex = index;
        
        // Update progress bar
        this.updateProgressBar();
        
        // Show/hide "See More" button based on current slide
        this.toggleSeeMoreButton(index);
        
        // Trigger metric animations if this is the metrics card
        if (index === 2) {
            this.animateMetrics();
        }
    }
    
    toggleSeeMoreButton(currentIndex) {
        const seeMoreButton = document.getElementById('see-more-button');
        if (!seeMoreButton) return;
        
        const isLastSlide = currentIndex === this.cards.length - 1;
        
        if (isLastSlide) {
            // Show button with animation
            seeMoreButton.style.visibility = 'visible';
            seeMoreButton.style.opacity = '1';
            seeMoreButton.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            // Hide button with animation
            seeMoreButton.style.opacity = '0';
            seeMoreButton.style.transform = 'translateX(-50%) translateY(20px)';
            
            // Hide visibility after animation
            setTimeout(() => {
                if (this.currentIndex !== this.cards.length - 1) {
                    seeMoreButton.style.visibility = 'hidden';
                }
            }, 300);
        }
    }
    
    nextCard() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.showCard(nextIndex);
    }
    
    previousCard() {
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.showCard(prevIndex);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (!this.isUserInteracting) {
                this.nextCard();
            }
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        setTimeout(() => {
            if (!this.isUserInteracting) {
                this.startAutoPlay();
            }
        }, 1000);
    }
    
    animateMetrics() {
        const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
        metricNumbers.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            if (target) {
                animateCounter(element, target, 2000);
            }
        });
    }
    
    updateProgressBar() {
        if (!this.progressBar) return;
        
        // Calculate progress: each slide is 20% (5 slides total)
        const progress = ((this.currentIndex + 1) / this.cards.length) * 100;
        this.progressBar.style.width = progress + '%';
    }
    
    setupHeroIntersectionObserver() {
        if (!this.heroSection) return;
        
        // Create intersection observer to detect when hero section comes back into view from below
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before hero is fully visible
            threshold: 0.1
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.scrollMode === 'unlocked') {
                    // Check if we're scrolling up into hero section (from below)
                    const heroRect = this.heroSection.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // If hero top is near or above viewport top, we're scrolling up into it
                    if (heroRect.top <= viewportHeight * 0.3) {
                        this.engageReverseMode();
                    }
                }
            });
        }, options);
        
        this.intersectionObserver.observe(this.heroSection);
    }
    
    setupNavigationVisibilityObserver() {
        if (!this.heroSection || !this.navDotsElement) return;
        
        // Create intersection observer to detect when hero section is visible
        const options = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.3 // Show navigation when 30% of hero section is visible
        };
        
        this.visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero section is visible - show navigation
                    this.showNavigation();
                } else {
                    // Hero section is not visible - hide navigation
                    this.hideNavigation();
                }
            });
        }, options);
        
        this.visibilityObserver.observe(this.heroSection);
    }
    
    showNavigation() {
        if (!this.navDotsElement || this.isNavigationVisible) return;
        
        this.navDotsElement.classList.remove('hidden');
        this.isNavigationVisible = true;
    }
    
    hideNavigation() {
        if (!this.navDotsElement || !this.isNavigationVisible) return;
        
        this.navDotsElement.classList.add('hidden');
        this.isNavigationVisible = false;
    }
    
    showNavigationGuide() {
        if (!this.navGuideElement || this.isNavigationGuideVisible) return;
        
        this.navGuideElement.style.opacity = '1';
        this.navGuideElement.style.visibility = 'visible';
        this.navGuideElement.style.transform = 'translateX(0)';
        this.isNavigationGuideVisible = true;
    }
    
    hideNavigationGuide() {
        if (!this.navGuideElement || !this.isNavigationGuideVisible) return;
        
        this.navGuideElement.style.opacity = '0';
        this.navGuideElement.style.transform = 'translateX(20px)';
        // Hide visibility after transition completes
        setTimeout(() => {
            if (!this.isNavigationGuideVisible && this.navGuideElement) {
                this.navGuideElement.style.visibility = 'hidden';
            }
        }, 300);
        this.isNavigationGuideVisible = false;
    }
    
    engageReverseMode() {
        
        // Set state
        this.scrollMode = 'reverse';
        this.isReverseEngaged = true;
        this.currentIndex = this.cards.length - 1; // Start from last slide
        
        // Show navigation guide when returning to hero section
        this.showNavigationGuide();
        
        // Lock viewport and show last slide
        this.lockViewport();
        this.showCard(this.currentIndex);
        
        // Disable auto-play during reverse mode
        this.pauseAutoPlay();
        
        // Start automatic reverse progression
        this.startAutoReverseProgression();
    }
    
    startAutoReverseProgression() {
        // Clear any existing timer
        if (this.reverseProgressionTimer) {
            clearInterval(this.reverseProgressionTimer);
        }
        
        
        // Calculate interval for 1 second total progression
        const totalTime = 1000; // 1 second
        const slideTransitions = this.currentIndex; // Number of transitions needed to reach slide 0
        const intervalTime = slideTransitions > 0 ? totalTime / slideTransitions : 250;
        
        // Automatically progress backwards ultra-fast to complete in 1 second
        this.reverseProgressionTimer = setInterval(() => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.showCard(this.currentIndex);
            } else {
                // Reached slide 0 - immediately trigger hard reset
                this.stopAutoReverseProgression();
                
                // Immediate hard reset (minimal delay)
                setTimeout(() => {
                    this.hardResetScrolljacking();
                }, 25); // Minimal delay to ensure slide 0 is visible
            }
        }, intervalTime); // Dynamic interval to complete in exactly 1 second
    }
    
    stopAutoReverseProgression() {
        if (this.reverseProgressionTimer) {
            clearInterval(this.reverseProgressionTimer);
            this.reverseProgressionTimer = null;
        }
    }
    
    setupScrollJacking() {
        if (!this.heroSection) return;
        
        // Disable auto-play when scroll jacking is active
        this.pauseAutoPlay();
        
        // Global scroll events (capture all scroll attempts)
        document.addEventListener('wheel', (e) => {
            this.handleScroll(e);
        }, { passive: false, capture: true });
        
        // Global touch events for mobile
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleTouchScroll(touchStartY, touchEndY);
        }, { passive: false });
        
        // Prevent keyboard scrolling
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardScroll(e);
        }, { passive: false });
    }
    
    handleScroll(e) {
        // Only prevent scrolling and engage scrolljacking when viewport is locked
        if (this.isScrollLocked && (this.scrollMode === 'forward' || this.scrollMode === 'reverse')) {
            e.preventDefault();
            
            // Throttle scroll events
            const now = Date.now();
            if (now - this.lastScrollTime < this.scrollCooldown) {
                return;
            }
            
            const deltaY = e.deltaY;
            
            // Check if scroll is significant enough
            if (Math.abs(deltaY) < this.scrollThreshold) return;
            
            this.lastScrollTime = now;
            
            if (deltaY > 0) {
                // Scroll down
                this.handleScrollDown();
            } else {
                // Scroll up
                this.handleScrollUp();
            }
        }
        // If mode is 'unlocked', allow normal scrolling
    }
    
    handleTouchScroll(startY, endY) {
        // Only handle touch scrolling when viewport is locked and in scrolljacking mode
        if (!this.isScrollLocked || (this.scrollMode !== 'forward' && this.scrollMode !== 'reverse')) return;
        
        const deltaY = startY - endY;
        
        if (Math.abs(deltaY) < this.scrollThreshold * 2) return; // Higher threshold for touch
        
        const now = Date.now();
        if (now - this.lastScrollTime < this.scrollCooldown) return;
        
        this.lastScrollTime = now;
        
        if (deltaY > 0) {
            // Swipe up - handle scroll down
            this.handleScrollDown();
        } else {
            // Swipe down - handle scroll up
            this.handleScrollUp();
        }
    }
    
    handleScrollDown() {
        if (this.scrollMode === 'forward') {
            // Forward mode: progress through slides 0→4
            if (this.currentIndex < this.cards.length - 1) {
                this.nextCard();
            } else {
                // Completed forward sequence
                this.completeSlideSequence();
            }
        } else if (this.scrollMode === 'reverse') {
            // Reverse mode is now automatic - ignore manual scroll attempts
            return;
        }
    }
    
    handleScrollUp() {
        if (this.scrollMode === 'forward') {
            // Forward mode: go back through slides, but prevent if hard reset is active
            if (this.currentIndex > 0 && !this.isHardReset) {
                this.previousCard();
            }
            // If at first slide or hard reset is active, stay locked
        } else if (this.scrollMode === 'reverse') {
            // Reverse mode is now automatic - ignore manual scroll attempts
            return;
        }
    }
    
    lockViewport() {
        // Lock the entire page scroll
        this.isScrollLocked = true;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // Ensure hero section is at top of viewport
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    unlockViewport() {
        // Unlock page scroll
        this.isScrollLocked = false;
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    
    completeSlideSequence() {
        
        // Mark sequence as completed
        this.hasCompletedAllSlides = true;
        this.scrollMode = 'unlocked';
        this.isHardReset = false; // Reset the hard reset flag
        
        // Hide navigation guide when sequence is complete
        this.hideNavigationGuide();
        
        // Show completion indicator (optional)
        this.showCompletionIndicator();
        
        // Unlock viewport after a brief delay
        setTimeout(() => {
            this.unlockViewport();
            
            // Smooth scroll to video section with center positioning
            const videoSection = document.querySelector('.video-section');
            if (videoSection) {
                videoSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 800); // Brief delay to show completion
    }
    
    hardResetScrolljacking() {
        
        // Stop any reverse progression timer
        this.stopAutoReverseProgression();
        
        // Set reset state
        this.isHardReset = true;
        this.hardResetCount++;
        this.scrollMode = 'forward';
        this.isReverseEngaged = false;
        this.currentIndex = 0;
        
        // Keep viewport locked (don't unlock like the old method)
        // Show reset visual feedback
        this.showHardResetIndicator();
        
        // Show navigation guide for hard reset
        this.showNavigationGuide();
        
        // Show first slide
        this.showCard(0);
        
        // Disable auto-play to force manual progression
        this.pauseAutoPlay();
    }
    
    showCompletionIndicator() {
        // Add a subtle animation to progress bar to indicate completion
        if (this.progressBar) {
            this.progressBar.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
            this.progressBar.style.background = 'linear-gradient(90deg, var(--color-secondary), var(--color-silver-light))';
            
            // Reset after animation
            setTimeout(() => {
                this.progressBar.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                this.progressBar.style.background = 'linear-gradient(90deg, var(--color-silver-light), var(--color-secondary))';
            }, 1000);
        }
    }
    
    showHardResetIndicator() {
        // Add a distinct hard reset animation to progress bar
        if (this.progressBar) {
            // Pulsing orange/red glow to indicate reset
            this.progressBar.style.boxShadow = '0 0 25px rgba(255, 140, 0, 0.9)'; // Orange glow
            this.progressBar.style.background = 'linear-gradient(90deg, #ff8c00, #ff6b35)'; // Orange gradient
            
            // Brief flash animation
            this.progressBar.style.transform = 'scaleY(1.5)';
            this.progressBar.style.transition = 'all 0.3s ease';
            
            // Reset after animation with multiple pulses to emphasize reset
            setTimeout(() => {
                this.progressBar.style.boxShadow = '0 0 15px rgba(255, 140, 0, 0.6)';
                this.progressBar.style.transform = 'scaleY(1)';
            }, 300);
            
            setTimeout(() => {
                this.progressBar.style.boxShadow = '0 0 25px rgba(255, 140, 0, 0.9)';
                this.progressBar.style.transform = 'scaleY(1.3)';
            }, 600);
            
            setTimeout(() => {
                this.progressBar.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                this.progressBar.style.background = 'linear-gradient(90deg, var(--color-silver-light), var(--color-secondary))';
                this.progressBar.style.transform = 'scaleY(1)';
                this.progressBar.style.transition = '';
            }, 1200);
        }
        
    }
    
    bypassScrolljacking() {
        
        // Stop all timers and auto-play
        this.stopAutoReverseProgression();
        this.pauseAutoPlay();
        
        // Set to completed/unlocked state
        this.hasCompletedAllSlides = true;
        this.scrollMode = 'unlocked';
        this.isHardReset = false;
        this.isReverseEngaged = false;
        
        // Unlock viewport immediately
        this.unlockViewport();
        
        // Show completion on progress bar
        if (this.progressBar) {
            this.progressBar.style.width = '100%';
            this.progressBar.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
            this.progressBar.style.background = 'linear-gradient(90deg, var(--color-silver-light), var(--color-secondary))';
        }
        
    }
    
    handleKeyboardScroll(e) {
        // Prevent keyboard scrolling when viewport is locked
        if (this.isScrollLocked) {
            const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', 'Space'];
            
            if (scrollKeys.includes(e.key)) {
                e.preventDefault();
                
                // Map some keys to slide navigation
                if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'Space') {
                    this.handleScrollDown();
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    this.handleScrollUp();
                }
            }
        }
    }
    
    destroy() {
        // Clean up intersection observer
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }
        
        // Clean up visibility observer
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
            this.visibilityObserver = null;
        }
        
        // Clean up auto-play interval
        this.pauseAutoPlay();
        
        // Clean up reverse progression timer
        this.stopAutoReverseProgression();
        
        // Reset scroll mode and hard reset state
        this.scrollMode = 'unlocked';
        this.isHardReset = false;
        this.hardResetCount = 0;
        this.unlockViewport();
        
        // Reset navigation visibility
        if (this.navDotsElement) {
            this.navDotsElement.classList.remove('hidden');
        }
    }
}

// ================================================
// Scroll Animations (AOS Alternative)
// ================================================

class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        const elementsToAnimate = document.querySelectorAll('[data-aos]');
        
        elementsToAnimate.forEach((element, index) => {
            const animationType = element.getAttribute('data-aos');
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            this.elements.push({
                element,
                animationType,
                delay: parseInt(delay),
                animated: false
            });
        });
        
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.2
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elementData = this.elements.find(item => item.element === entry.target);
                    if (elementData && !elementData.animated) {
                        this.animateElement(elementData);
                    }
                }
            });
        }, options);
        
        this.elements.forEach(item => {
            this.observer.observe(item.element);
        });
    }
    
    animateElement(elementData) {
        const { element, delay } = elementData;
        
        setTimeout(() => {
            element.classList.add('aos-animate');
            elementData.animated = true;
        }, delay);
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// ================================================
// Back to Top Button
// ================================================

class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;
            const showThreshold = window.innerHeight * 0.5;
            
            if (scrollY > showThreshold) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ================================================
// Enhanced Button Effects
// ================================================

class EnhancedButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.cta-button');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            this.setupButtonEffects(button);
        });
    }
    
    setupButtonEffects(button) {
        // Ripple effect on click
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                pointer-events: none;
                z-index: 1;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                ripple.remove();
            });
        });
        
        // Magnetic effect on hover for larger buttons
        if (button.classList.contains('large') || button.classList.contains('primary')) {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.1;
                button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        }
    }
}

// ================================================
// Performance Monitor (Development Only)
// ================================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            startTime: performance.now(),
            scrollEvents: 0,
            animationFrames: 0
        };
        this.init();
    }
    
    init() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.startMonitoring();
        }
    }
    
    startMonitoring() {
        // Log performance metrics every 10 seconds
        setInterval(() => {
            this.logMetrics();
        }, 10000);
        
        // Monitor scroll events
        let scrollCount = 0;
        window.addEventListener('scroll', () => {
            scrollCount++;
        });
        
        setInterval(() => {
            this.metrics.scrollEvents = scrollCount;
            scrollCount = 0;
        }, 1000);
    }
    
    logMetrics() {
        const runtime = (performance.now() - this.metrics.startTime) / 1000;
        
    }
}

// ================================================
// Hybrid Service Cards System
// ================================================

class HybridServiceCardsManager {
    constructor() {
        this.cards = [];
        this.init();
    }
    
    init() {
        // Find all hybrid service cards
        const serviceCards = document.querySelectorAll('.service-card-hybrid');
        
        serviceCards.forEach((card, index) => {
            const hybridCard = new HybridServiceCard(card, index);
            if (hybridCard.isInitialized) {
                this.cards.push(hybridCard);
            }
        });
        
    }
    
    // Get specific card by service type
    getCard(serviceType) {
        return this.cards.find(card => card.serviceType === serviceType);
    }
    
    // Collapse all cards except the specified one (optional accordion behavior)
    collapseAllExcept(exceptCard = null) {
        this.cards.forEach(card => {
            if (card !== exceptCard && card.isExpanded) {
                card.collapse();
            }
        });
    }
    
    // Collapse all cards
    collapseAll() {
        this.cards.forEach(card => {
            if (card.isExpanded) {
                card.collapse();
            }
        });
    }
    
    destroy() {
        this.cards.forEach(card => card.destroy());
        this.cards = [];
    }
}

class HybridServiceCard {
    constructor(cardElement, index) {
        this.card = cardElement;
        this.index = index;
        this.serviceType = cardElement.getAttribute('data-service') || `service-${index}`;
        this.expandedContent = cardElement.querySelector('.service-card-expanded');
        this.expandIndicator = cardElement.querySelector('.expand-indicator');
        this.expandIcon = this.expandIndicator?.querySelector('i');
        
        this.isExpanded = false;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        if (!this.card || !this.expandedContent || !this.expandIndicator) {
            return;
        }
        
        // Set up click handler for the entire card
        this.card.addEventListener('click', (e) => this.handleCardClick(e));
        
        // Set up keyboard handler
        this.card.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Initialize ARIA attributes
        this.card.setAttribute('aria-expanded', 'false');
        this.expandedContent.setAttribute('aria-hidden', 'true');
        
        this.isInitialized = true;
        
    }
    
    handleCardClick(e) {
        // Prevent expansion if clicking on links inside the card
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        this.toggleExpansion();
    }
    
    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleExpansion();
        }
    }
    
    toggleExpansion() {
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    
    expand() {
        // Update ARIA attributes
        this.card.setAttribute('aria-expanded', 'true');
        this.expandedContent.setAttribute('aria-hidden', 'false');
        
        // Add visual feedback
        this.card.classList.add('expanded');
        
        // Smooth scroll to ensure expanded content is visible
        setTimeout(() => {
            const rect = this.expandedContent.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If the expanded content extends below the viewport, scroll to it
            if (rect.bottom > windowHeight - 50) {
                this.card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 300); // Wait for expansion animation to start
        
    }
    
    collapse() {
        // Update ARIA attributes
        this.card.setAttribute('aria-expanded', 'false');
        this.expandedContent.setAttribute('aria-hidden', 'true');
        
        // Remove visual feedback
        this.card.classList.remove('expanded');
        
    }
    
    // Method to programmatically expand
    programmaticExpand() {
        if (!this.isExpanded) {
            this.toggleExpansion();
        }
    }
    
    // Method to programmatically collapse
    programmaticCollapse() {
        if (this.isExpanded) {
            this.toggleExpansion();
        }
    }
    
    destroy() {
        if (this.card) {
            this.card.removeEventListener('click', this.handleCardClick);
            this.card.removeEventListener('keydown', this.handleKeydown);
        }
    }
}

// ================================================
// Video Modal System
// ================================================

class VideoModal {
    constructor() {
        this.modal = document.getElementById('video-modal');
        this.modalVideo = document.getElementById('modal-video');
        this.heroVideo = document.getElementById('hero-video');
        this.videoContainer = document.querySelector('.video-container');
        this.overlay = document.querySelector('.video-modal-overlay');
        this.closeButton = document.querySelector('.video-modal-close');
        
        this.isOpen = false;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        if (!this.modal || !this.modalVideo || !this.heroVideo || !this.videoContainer) {
            return;
        }
        
        this.setupEventListeners();
        this.isInitialized = true;
        
    }
    
    setupEventListeners() {
        // Click on hero video to open modal
        this.videoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
        
        // Keyboard support for hero video
        this.heroVideo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openModal();
            }
        });
        
        // Close modal events
        this.closeButton?.addEventListener('click', () => this.closeModal());
        this.overlay?.addEventListener('click', () => this.closeModal());
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });
        
        // Auto-close when video ends
        this.modalVideo.addEventListener('ended', () => {
            this.closeModal();
        });
        
        // Prevent modal from closing when clicking on video
        this.modalVideo.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle modal content click to prevent closing
        const modalContent = document.querySelector('.video-modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    openModal() {
        if (this.isOpen) return;
        
        
        // Set modal state
        this.isOpen = true;
        
        // Show modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Reset and setup modal video
        this.modalVideo.currentTime = 0;
        this.modalVideo.muted = false; // Enable audio
        
        // Play the modal video
        this.modalVideo.play().catch(error => {
        });
        
        // Pause the hero video
        this.heroVideo.pause();
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.trapFocus();
        
        // Focus the close button for accessibility
        setTimeout(() => {
            this.closeButton?.focus();
        }, 100);
    }
    
    closeModal() {
        if (!this.isOpen) return;
        
        
        // Set modal state
        this.isOpen = false;
        
        // Hide modal
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Stop and reset modal video
        this.modalVideo.pause();
        this.modalVideo.currentTime = 0;
        this.modalVideo.muted = true; // Re-mute for next time
        
        // Resume hero video
        this.heroVideo.play().catch(error => {
        });
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Return focus to hero video
        this.heroVideo.focus();
    }
    
    trapFocus() {
        // Get all focusable elements within the modal
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Handle tab key to trap focus within modal
        const handleTabKey = (e) => {
            if (!this.isOpen) return;
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        // Remove existing listener if any
        document.removeEventListener('keydown', this.focusTrapHandler);
        
        // Add new listener
        this.focusTrapHandler = handleTabKey;
        document.addEventListener('keydown', this.focusTrapHandler);
    }
    
    // Method to check if modal is currently open
    isModalOpen() {
        return this.isOpen;
    }
    
    // Method to programmatically open modal (for external use)
    programmaticOpen() {
        this.openModal();
    }
    
    // Method to programmatically close modal (for external use)
    programmaticClose() {
        this.closeModal();
    }
    
    destroy() {
        // Remove event listeners
        if (this.focusTrapHandler) {
            document.removeEventListener('keydown', this.focusTrapHandler);
        }
        
        // Reset modal state
        this.closeModal();
        
        // Clean up
        this.isInitialized = false;
        
    }
}

// ================================================
// Application Initialization
// ================================================

class AmavisImprovedApp {
    constructor() {
        this.components = [];
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    async initializeComponents() {
        try {
            
            // Initialize core components
            this.components = [
                new Navigation(),
                new EnhancedHeroCardSystem(),
                new VideoModal(),
                new ScrollAnimations(),
                new BackToTop(),
                new EnhancedButtonEffects(),
                new HybridServiceCardsManager(),
                new PerformanceMonitor()
            ];
            
            // Setup accessibility enhancements
            this.setupAccessibility();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup reduced motion preferences
            this.setupReducedMotion();
            
            this.isInitialized = true;
            
        } catch (error) {
        }
    }
    
    setupAccessibility() {
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-accent-primary);
            color: white;
            padding: 8px 12px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Ensure proper focus management
        this.setupFocusManagement();
    }
    
    setupFocusManagement() {
        // Trap focus within mobile menu when open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navToggle.click();
                }
            });
        }
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
        });
        
        window.addEventListener('unhandledrejection', (e) => {
        });
    }
    
    setupReducedMotion() {
        // Respect user's reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0.01s');
            document.documentElement.style.setProperty('--transition-normal', '0.01s');
            document.documentElement.style.setProperty('--transition-slow', '0.01s');
            
            // Disable auto-play for hero cards
            const heroSystem = this.components.find(comp => comp instanceof EnhancedHeroCardSystem);
            if (heroSystem) {
                heroSystem.pauseAutoPlay();
            }
            
            // Optionally disable hybrid service card animations for reduced motion
            const hybridServiceCardsManager = this.components.find(comp => comp instanceof HybridServiceCardsManager);
            if (hybridServiceCardsManager) {
                // Cards will respect CSS reduced motion preferences automatically
            }
        }
    }
    
    getComponent(componentClass) {
        return this.components.find(comp => comp instanceof componentClass);
    }
    
    destroy() {
        this.components.forEach(component => {
            if (component.destroy && typeof component.destroy === 'function') {
                try {
                    component.destroy();
                } catch (error) {
                }
            }
        });
        this.components = [];
        this.isInitialized = false;
    }
}

// ================================================
// Initialize Application
// ================================================

const amavisImprovedApp = new AmavisImprovedApp();

// Expose global utilities for debugging
window.amavisImprovedApp = amavisImprovedApp;
window.AmavisUtils = {
    debounce,
    throttle,
    isInViewport,
    smoothScrollTo,
    animateCounter
};

