document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("latest-projects");
    const modal = document.getElementById("modalContainer");
    
    if (!container || !modal) {
        console.error("Required containers not found");
        return;
    }

    fetch("./assets/data/projects.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(projects => {
            // Sort by date (newest first)
            projects.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Pick the latest 8
            const latest = projects.slice(0, 8);

            latest.forEach(p => {
                const card = `
                <div class="col-sm-12 col-md-4 mb-2">
                    <div class="card h-100 shadow-sm border-0 bg-light">
                        <img src="${p.image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${p.title}">
                        <div class="card-body">
                            <h5 class="card-title text-primary-emphasis fw-semibold">
                                ${p.title}
                            </h5>
                            <p class="card-text text-muted">
                                ${p.desc}
                            </p>
                            <p class="text-success"><strong>Tools:</strong> ${p.tools}</p>
                            <a href="${p.link}" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#${p.id}">
                                <i class="bi bi-eye"></i> View Project
                            </a>
                        </div>
                    </div>
                </div>
                `;
                container.innerHTML += card;

                modal.innerHTML += `
                    <div class="modal fade" id="${p.id}" tabindex="-1" aria-hidden="true"
                    data-bs-backdrop="static" data-bs-keyboard="false">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title">${p.modalTitle}</h5>
                        </div>
                        <div class="modal-body">
                            <h6 class="text-info">Project Screenshot</h6>
            
                            <img src="${p.modalImage}" class="img-fluid rounded shadow-sm mb-3" alt="${p.title}">
            
                            <h6 class="text-info mt-3">Key Learnings</h6>
                            <ul class="list-unstyled">
                            ${p.modalLearn.map(i => `
                                <li><i class="bi bi-check-circle-fill text-success me-2"></i> ${i}</li>
                            `).join("")}
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                `;

            })

            container.innerHTML += `
            <div class="col-sm-12 col-md-4 d-flex align-items-center">
                <div class="card shadow-sm border-0 bg-light w-100" style="height: 300px;">
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
