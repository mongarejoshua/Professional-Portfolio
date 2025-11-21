document.addEventListener("DOMContentLoaded", () => {
    const navlinks = document.querySelectorAll(".nav-link")
    const navCollapse = document.getElementById("navbarNav")

    if (navlinks.length > 0 && navCollapse) {
        navlinks.forEach(link => {
            link.addEventListener("click", () => {
                const bsCollapse = new bootstrap.Collapse(navCollapse, {
                    toggle: false
                })
                bsCollapse.hide()
            })
        })
    }
})