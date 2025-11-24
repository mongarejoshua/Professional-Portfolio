fetch("../assets/data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("allProjectsContainer");
    const modalContainer = document.getElementById("modalContainer");

    projects.forEach(p => {
      // Fix image paths for views folder (convert ./assets/ to ../assets/)
      const imagePath = p.image.replace(/^\.\//, "../");
      const modalImagePath1 = p.modalImage1.replace(/^\.\//, "../");
      const modalImagePath2 = p.modalImage2.replace(/^\.\//, "../");

      // Project Card
      container.innerHTML += `
        <div class="col-sm-12 col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <img src="${imagePath}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;" alt="${p.title}">
            <div class="card-body">
              <h5 class="card-title text-primary-emphasis fw-semibold">${p.title}</h5>
              <p class="card-text text-muted">${p.desc}</p>
              <p class="text-success"><strong>Tools:</strong> ${p.tools}</p>
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
              <div class="modal-header bg-primary text-white text-start">
                <h5 class="modal-title">${p.modalTitle}</h5>
              </div>
              <div class="modal-body text-center">
                <h6 class="text-dark">Project screenshots & demos</h6>
  
                <img src="${modalImagePath1}" class="img-fluid rounded shadow-sm mb-3" alt="${p.title}">
                <img src="${modalImagePath2}" class="img-fluid rounded shadow-sm mb-3" alt="${p.title}">
  
                <h6 class="text-dark mt-3 text-start">Key Learnings</h6>
                <ul class="list-unstyled text-start">
                  ${p.modalLearn.map(i => `
                    <li><i class="bi bi-check-circle-fill text-success me-2"></i> ${i}</li>
                  `).join("")}
                </ul>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error("Error loading projects:", error));
