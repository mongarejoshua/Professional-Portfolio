const downloadBtn = document.getElementById("downloadBtn")


downloadBtn.addEventListener("click", async () => {
    const response = await fetch("files/example.pdf");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    setTimeout(() => {
        const userWantsToOpen = confirm("File downloaded successfully!\nDo you want to open it?");
        if (userWantsToOpen) {
            const link = document.createElement("a")
            link.href = "../assets/files/cv.pdf"
            link.download = "curriculum_vitae"
            link.click()
        }
        URL.revokeObjectURL(url); // clean up
    }, 1000); 
    });










window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

