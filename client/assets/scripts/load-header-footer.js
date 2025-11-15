// AUTO-DETECT PATH LEVEL (index.html vs /views/ pages)
const isInViewsFolder = window.location.pathname.includes("/views/");
const basePath = isInViewsFolder ? "../components/" : "components/";

// Function to load HTML components
async function loadComponent(elementId, file) {
    try {
        const response = await fetch(basePath + file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);

        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// LOAD HEADER + FOOTER
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
