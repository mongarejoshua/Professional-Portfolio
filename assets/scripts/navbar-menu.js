/**
 * Navbar Menu Custom Behavior
 * Handles smooth scrolling and auto-collapse on link click
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const navLinks = document.querySelectorAll('.nav-link');
        const navCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (!navCollapse) return;

        // Handle smooth scrolling and auto-collapse for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Only handle internal anchor links (starting with #)
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    // Skip if it's an external link (has target="_blank")
                    if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
                        return;
                    }

                    if (targetElement) {
                        e.preventDefault();
                        e.stopPropagation(); // Prevent other handlers from firing

                        // Get or create Bootstrap collapse instance
                        let bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                        if (!bsCollapse) {
                            bsCollapse = new bootstrap.Collapse(navCollapse, {
                                toggle: false
                            });
                        }

                        // Collapse the menu if it's open
                        if (navCollapse.classList.contains('show')) {
                            // Hide the collapse menu first
                            bsCollapse.hide();

                            // Wait for collapse animation to start, then scroll
                            setTimeout(() => {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }, 100);
                        } else {
                            // If menu is already closed, just scroll
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
            });
        });

        // Close menu when clicking outside (optional enhancement)
        document.addEventListener('click', function (e) {
            const isClickInsideNav = navCollapse.contains(e.target);
            const isClickOnToggler = navbarToggler && navbarToggler.contains(e.target);

            if (!isClickInsideNav && !isClickOnToggler && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });

        // Handle escape key to close menu
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
})();

