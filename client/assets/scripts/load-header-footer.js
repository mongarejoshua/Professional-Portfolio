// AUTO-DETECT PATH LEVEL (index.html vs /views/ pages)
const isInViewsFolder = window.location.pathname.includes("/views/");
const basePath = isInViewsFolder ? "../components/" : "components/";

// Function to load HTML components
async function loadComponent(elementId, file) {
    try {
        const response = await fetch(basePath + file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);

        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;

            // Fix navigation links if we're in views folder
            if (isInViewsFolder && elementId === "header") {
                fixNavigationLinks();
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Fix navigation links to point to index.html when in views folder
function fixNavigationLinks() {
    // Use setTimeout to ensure DOM is ready after innerHTML update
    setTimeout(() => {
        const navLinks = document.querySelectorAll("#header .nav-link[href^='#']");
        const brandLink = document.querySelector("#header .navbar-brand[href^='#']");

        navLinks.forEach(link => {
            const hash = link.getAttribute("href");
            if (hash && hash.startsWith("#")) {
                link.setAttribute("href", `../index.html${hash}`);
            }
        });

        if (brandLink) {
            const hash = brandLink.getAttribute("href");
            if (hash && hash.startsWith("#")) {
                brandLink.setAttribute("href", `../index.html${hash}`);
            }
        }
    }, 10);
}

// LOAD HEADER + FOOTER
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
