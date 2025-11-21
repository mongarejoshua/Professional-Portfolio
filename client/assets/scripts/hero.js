document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("downloadBtn")

    if (!downloadBtn) return;

    downloadBtn.addEventListener("click", async () => {
    const response = await fetch("./public/files/cv.pdf");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    setTimeout(() => {
        const userWantsToOpen = confirm("File downloaded successfully!\nDo you want to open it?");
        if (userWantsToOpen) {
            const link = document.createElement("a")
            link.href = "./public/files/cv.pdf"
            link.download = "curriculum_vitae"
            link.click()
        }
        URL.revokeObjectURL(url); // clean up
    }, 1000); 
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});

