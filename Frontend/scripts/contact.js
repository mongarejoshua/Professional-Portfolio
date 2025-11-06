

(function () {
    emailjs.init("ZcBjf3bnrw-K689bo"); // from your EmailJS dashboard
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_1n5d7uo", "template_w6vjoby", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
        .then(() => {
            alert("Message sent successfully! Check your inbox.");
            e.target.reset();
        })
        .catch(err => alert("Failed to send message: " + err));
});