let projects = [];

    function addProject(event) {
      event.preventDefault();

      const name = document.getElementById("projectName").value;
      const start = document.getElementById("startDate").value;
      const end = document.getElementById("endDate").value;
      const desc = document.getElementById("description").value;
      const techNodes = document.querySelectorAll("input[type=checkbox]:checked");
      const techs = Array.from(techNodes).map(t => t.value);

      const imageInput = document.getElementById("image");
      const image = imageInput.files.length > 0 
        ? URL.createObjectURL(imageInput.files[0]) 
        : "assets/images/PBG.jpg"; // default gambar

      const project = { name, start, end, desc, techs, image };
      projects.push(project);

      renderProjects();
      document.getElementById("projectForm").reset();
    }

    function renderProjects() {
      const projectList = document.getElementById("projectList");
      projectList.innerHTML = "";

      projects.forEach((p, i) => {
        projectList.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="${p.image}" class="card-img-top" alt="${p.name}">
              <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p><strong>Duration:</strong> ${p.start} - ${p.end}</p>
                <p>${p.desc.substring(0,100)}...</p>
                <p><strong>Tech:</strong> ${p.techs.join(", ")}</p>
                <div class="d-flex justify-content-between">
                  <button class="btn btn-sm btn-dark">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteProject(${i})">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }

    function deleteProject(index) {
      projects.splice(index, 1);
      renderProjects();
    }