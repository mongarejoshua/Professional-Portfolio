document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const sendBtn = document.getElementById("sendBtn");
    const toastEl = document.getElementById("successToast");

    // Add spinner
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Sending...
    `;

    // Convert form data
    const formData = new FormData(form);

    try {
        // Send to Netlify
        const response = await fetch("/", {
            method: "POST",
            body: formData
        });

        // Wait 3 seconds for the effect
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Reset button
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Send Message`;

        // Show toast
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        // Clear form
        form.reset();

    } catch (error) {
        alert("Something went wrong. Try again.");
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Send Message`;
    }
    });
});