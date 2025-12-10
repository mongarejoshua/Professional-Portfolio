/**
 * Scroll Animations - Fade In Up Effect
 * Applies fade-in-up animation to all sections and content elements
 * Works for scrolling up, down, and repeats on every scroll
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        // Threshold for when element is considered "in view" (0 = top, 1 = bottom)
        threshold: 0.1,
        // Root margin to trigger animation slightly before element enters viewport
        rootMargin: '0px 0px -50px 0px',
        // Animation class names
        animationClass: 'fade-in-up',
        activeClass: 'active'
    };

    // Selectors for elements that should be animated
    // Target sections and their direct children, avoiding over-nesting
    const selectors = [
        'section',
        'section > .container',
        'section > .container > h1',
        'section > .container > h2',
        'section > .container > h3',
        'section > .container > h4',
        'section > .container > h5',
        'section > .container > h6',
        'section > .container > p',
        'section > .container > .row',
        'section .row > *',
        'section .card',
        'section .card-body',
        'section .alert',
        'section img',
        'section button',
        'section .btn',
        'section form',
        'section ul',
        'section li'
    ];

    /**
     * Add animation classes to elements
     */
    function initializeElements() {
        const elements = document.querySelectorAll(selectors.join(', '));
        
        elements.forEach((element) => {
            // Skip if element is already initialized
            if (element.classList.contains(config.animationClass)) {
                return;
            }

            // Skip elements that are inside already animated parents (to avoid double animation)
            const animatedParent = element.closest(`.${config.animationClass}`);
            if (animatedParent && animatedParent !== element) {
                return;
            }

            // Add the animation class
            element.classList.add(config.animationClass);

            // Add stagger delay to child elements in rows for smoother cascading effect
            if (element.parentElement && element.parentElement.classList.contains('row')) {
                const siblings = Array.from(element.parentElement.children);
                const childIndex = siblings.indexOf(element);
                if (childIndex > 0 && childIndex <= 4) {
                    element.classList.add(`delay-${childIndex}`);
                }
            }
        });
    }

    // Store the observer instance to manage it properly
    let scrollObserver = null;

    /**
     * Setup Intersection Observer for scroll animations
     */
    function setupScrollObserver() {
        // Disconnect previous observer if it exists
        if (scrollObserver) {
            scrollObserver.disconnect();
        }

        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: config.rootMargin,
            threshold: config.threshold
        };

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in view - add active class
                    entry.target.classList.add(config.activeClass);
                } else {
                    // Element is out of view - remove active class for repeat animation
                    entry.target.classList.remove(config.activeClass);
                }
            });
        }, observerOptions);

        // Observe all elements with the animation class
        const animatedElements = document.querySelectorAll(`.${config.animationClass}`);
        animatedElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    /**
     * Initialize on DOM ready
     */
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Small delay to ensure all dynamic content is loaded
                setTimeout(() => {
                    initializeElements();
                    setupScrollObserver();
                }, 100);
            });
        } else {
            // DOM is already loaded
            setTimeout(() => {
                initializeElements();
                setupScrollObserver();
            }, 100);
        }
    }

    /**
     * Re-initialize for dynamically loaded content
     */
    function reinitialize() {
        initializeElements();
        setupScrollObserver();
    }

    // Initialize on load
    init();

    // Re-initialize when new content is dynamically added
    // This is useful for content loaded via JavaScript (like projects)
    let reinitTimeout;
    const originalObserver = new MutationObserver(() => {
        // Debounce re-initialization to avoid excessive calls
        clearTimeout(reinitTimeout);
        reinitTimeout = setTimeout(() => {
            reinitialize();
        }, 300);
    });

    // Observe the document body for changes
    if (document.body) {
        originalObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Expose reinitialize function globally for manual triggering if needed
    window.reinitializeScrollAnimations = reinitialize;
})();

