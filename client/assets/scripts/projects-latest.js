document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/data/projects.json")
        .then(response => response.json())
        .then(projects => {
            // Sort by date (newest first)
            projects.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Pick the latest 6
            const latest = projects.slice(0, 8);

            const container = document.getElementById("latest-projects");

            latest.forEach(p => {
                const card = `
                <div class="col-sm-12 col-md-4 mb-2">
                    <div class="card h-100 shadow-sm border-0 bg-light">
                        <img src="${p.image}" class="card-img-top" alt="${p.title}">
                        <div class="card-body">
                            <h5 class="card-title text-primary-emphasis fw-semibold">
                                ${p.title}
                            </h5>
                            <p class="card-text text-muted">
                                ${p.desc}
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

            })

            container.innerHTML += `
            <div class="col-sm-12 col-md-4 d-flex align-items-center">
                <div class="card h-75 w-100 shadow-sm border-0 bg-light">
                    <a href="./views/projects-all.html"
                        class="btn btn-outline-info pt-4 pb-4 text-primary-emphasis w-100 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm border-0 bg-light"
                        style="text-decoration: none;">

                        <h5 class="mb-2 fw-bold text-primary-emphasis">View All Projects</h5>
                        <i class="bi bi-arrow-right-circle-fill fs-2"></i>
                    </a>
                </div>
            </div>
        `
        })
        .catch(error => console.error("Error loading projects:", error));
});
