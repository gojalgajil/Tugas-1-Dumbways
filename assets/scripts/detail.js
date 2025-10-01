// ambil id dari URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// ambil project dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let project = projects[id];

// render ke halaman
let detailContainer = document.getElementById("detail");

if (project) {
  detailContainer.innerHTML = `
    <div class="card">
      <img src="${project.image}" class="card-img-top">
      <div class="card-body">
        <h3>${project.name}</h3>
        <p><strong>Duration:</strong> ${project.start} - ${project.end}</p>
        <p>${project.desc}</p>
        <p><strong>Tech:</strong> ${project.techs.join(", ")}</p>
      </div>
    </div>
  `;
} else {
  detailContainer.innerHTML = `<p>Project tidak ditemukan.</p>`;
}
