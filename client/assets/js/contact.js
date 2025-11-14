document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();

    const form = e.target;
    const btn = document.getElementById("sendBtn");

    // Show loading spinner
    btn.disabled = true;
    btn.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Sending...
    `;

    try {
        const formData = new FormData(form);

    const response = await fetch("/", {
        method: "POST",
    body: formData
        });

    if (response.ok) {
        showAlert("successAlert");
    form.reset();
        } else {
        showAlert("errorAlert");
        }

    } catch (err) {
        showAlert("errorAlert");
    }

    // Reset button
    btn.disabled = false;
    btn.innerHTML = "Send Message";
});

    function showAlert(id) {
    const alert = document.getElementById(id);
    alert.classList.add("show");
    setTimeout(() => alert.classList.remove("show"), 4000);
}
