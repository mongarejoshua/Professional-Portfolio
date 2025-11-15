fetch("../assets/data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("allProjectsContainer");
    const modalContainer = document.getElementById("modalContainer");

    projects.forEach(p => {
      // Project Card
      container.innerHTML += `
        <div class="col-sm-12 col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <img src="${p.image}" class="card-img-top img-fluid" alt="${p.title}">
            <div class="card-body">
              <h5 class="card-title text-primary-emphasis fw-semibold">${p.title}</h5>
              <p class="card-text text-muted">${p.desc}</p>
              <p><strong>Tools:</strong> ${p.tools}</p>
              <a href="#" class="btn btn-outline-primary"
                 data-bs-toggle="modal" data-bs-target="#${p.id}">
                 <i class="bi bi-eye"></i> View Project
              </a>
            </div>
          </div>
        </div>
      `;
      // Modal
      modalContainer.innerHTML += `
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
    });
  });
