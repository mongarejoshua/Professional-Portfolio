document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');
    const btnTextSpan = sendBtn.querySelector('span');
    const modalElement = document.getElementById('staticBackdrop');

    // --- 1. Dynamic Spinner Creation ---
    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm visually-hidden ms-2';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-hidden', 'true');
    sendBtn.appendChild(spinner); // Add spinner to the button

    // --- Function to handle Netlify submission via AJAX/Fetch ---
    async function handleSubmit(event) {
        event.preventDefault(); // STOP default form submission (page reload)

        // 2. UI: Disable button and show spinner
        sendBtn.disabled = true;
        btnTextSpan.textContent = 'Sending...';
        spinner.classList.remove('visually-hidden');

        const formData = new FormData(form);

        try {
            // Netlify requires POST to the current page path, 
            // with the data encoded as application/x-www-form-urlencoded
            const response = await fetch(form.action || '/', {
                method: 'POST',
                body: new URLSearchParams(formData).toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // 3. Check for Netlify's successful submission status (200 or 204)
            if (response.ok) {
                // Success path confirmed by Netlify

                // 4. Update Modal Content for Success
                const modalBody = modalElement.querySelector('.modal-body p');
                const modalTitle = modalElement.querySelector('.modal-title');

                if (modalTitle) modalTitle.textContent = 'Success!';
                if (modalBody) modalBody.textContent = 'Your message has been sent successfully. Thank you!';

                // Show Success Modal
                const modal = new bootstrap.Modal(modalElement);
                modal.show();

                // Clear the form fields
                form.reset();
            } else {
                // Failure path (e.g., Netlify spam detection, validation error)
                throw new Error(`Netlify submission failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Form submission error:', error);

            // 4. Update Modal Content for Failure
            const modalBody = modalElement.querySelector('.modal-body p');
            const modalTitle = modalElement.querySelector('.modal-title');

            if (modalTitle) modalTitle.textContent = 'Submission Failed';
            if (modalBody) modalBody.textContent = 'An error occurred while sending the message. Please try again.';

            // Show Failure Modal
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } finally {
            // 5. Always hide spinner and restore button text/state
            spinner.classList.add('visually-hidden');
            sendBtn.disabled = false;
            btnTextSpan.textContent = 'Send Message';
        }
    }

    form.addEventListener('submit', handleSubmit);
});