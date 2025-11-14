document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/data/all-projects.json")
        .then(response => response.json())
        .then(projects => {
            // Sort by date (newest first)
            projects.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Pick the latest 6
            const latest = projects.slice(0, 8);

            const container = document.getElementById("latest-projects");

            latest.forEach(p => {
                const card = `
                <div class="col-sm-12 col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0 bg-white">
                        <img src="${p.image}" class="card-img-top" alt="${p.title}">
                        <div class="card-body">
                            <h5 class="card-title text-primary-emphasis fw-semibold">
                                ${p.title}
                            </h5>
                            <p class="card-text text-muted">
                                ${p.description}
                            </p>
                            <p><strong>Tools:</strong> ${p.tools}</p>
                            <a href="${p.link}" class="btn btn-outline-primary">
                                <i class="bi bi-eye"></i> View Project
                            </a>
                        </div>
                    </div>
                </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});
