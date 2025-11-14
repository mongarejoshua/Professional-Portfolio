document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById("sendBtn");
    const toastEl = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastEl);

    // Show loading spinner
    btn.disabled = true;
    btn.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Sending...   `

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `<span><i class="bi bi-send-fill me-2"></i>
        Send Message</span>`;

        toast.show()
        form.reset()

    }, 3000)
    
})