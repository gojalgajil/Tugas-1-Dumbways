let projects = JSON.parse(localStorage.getItem("projects")) || [] // untuk ambil data project dari LocalStorage (kalau udah ada), yang JSON.parse() buat ubah string dari localstorage jadi array, kalau kosong/null, kasih default array []

function addProject(event) {
  event.preventDefault(); // biar gak pake form submit bawaah browser (reload), jadi pake js.


  //ini buat ambil data dari form
  let name = document.getElementById("projectName").value;
  let start = document.getElementById("startDate").value;
  let end = document.getElementById("endDate").value;
  let desc = document.getElementById("description").value;

  let techNodes = document.querySelectorAll("input[type=checkbox]:checked");
  let techs = Array.from(techNodes).map(t => t.value);
  // nanti semua yang dicentang bakal dicari, terus disimpan di value. Dan dipake buat ubah NodeList jadi array biasa.

  let imageInput = document.getElementById("image");
  // *1
  // let image = imageInput.files.length > 0 
  //   ? URL.createObjectURL(imageInput.files[0]) 
  //   : "assets/images/PBG.jpg";
  // nanti filenya pake URL sementara : URL.createObjectURL
  // kalau kita ga pilih gambar, nanti otomatis yang kesave gambar default PBG.jpg

  // di sini mulai Conditional (validasi input)
  if (!name || !start || !end){
    alert("Project Name, Start Date, and End Date wajib diisi!");
    return;
  }
  // ! artinya not/ ga ada, || untuk menghubungkan (atau)

  if (new Date(end) < new Date(start)){
    alert("End Date tidak boleh sebelum Start Date!");
    return;
  }

  //*2
  // untuk convert gambar yang diupload ke Base64
  if (imageInput.files.length > 0){
    let reader = new FileReader();
    reader.onload = function (e) {
      let imageBase64 = e.target.result; // ini hasil convert ke Base64
    

    let project = { name, start, end, desc, techs, image: imageBase64 };
    projects.push(project); // biar objek project keisi dengan semua data (name, start, end, dll) terus ditambahin push ke array projects

  // untuk nyimpan ulang array projects ke localstorage
  // JSON.stringfy() untuk ubah array/object jadi string
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects(); // render ke halaman
    document.getElementById("projectForm").reset(); // yang reset buat ngosoin form lagi setelah submit
  };
  reader.readAsDataURL(imageInput.files[0]); // convert file ke Base 64
} else {
  // kalau ga pilih gambar, pake default
  let project = {
    name, start, end, desc, techs,
    image: "assets/images/PBG.jpg"
  }
}
projects.push(project);
localStorage.setItem("projects", JSON.stringify(projects));
document.getElementById("projectForm").reset(); // simpan ulang ke localstorage
}

  function renderProjects() {
  let projectList = document.getElementById("projectList");
  projectList.innerHTML = ""; // kosongkan dulu biar ga dobel


// looping pakai for
for (let i = 0; i <projects.length; i++){
    let p = projects[i];

    // conditional + operator
    let descText = p.desc
    ? p.desc.substring(0, 100) + "..."
    : "No description provided"; // ? jika nilai true : false
    let techText = p.techs.length > 0
    ? p.techs.join(", ")
    : "No tech delected";


  // p.desc.substring(0, 100) untuk ambil 100 karakter pertama biar deskripsi enggak kepanjangan
  // p.techs.join untuk gabung array tech jadi string
  // tombol delete buat manggil deleteProject(i) sesuai index project
    projectList.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p><strong>Duration:</strong> ${p.start} - ${p.end}</p>
            <p>${descText}</p>
            <p><strong>Tech:</strong> ${techText}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-dark">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteProject(${i})">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}


function deleteProject(index) {
  projects.splice(index, 1); // untuk hapus 1 project dari array
  localStorage.setItem("projects", JSON.stringify(projects));
document.getElementById("projectForm").reset(); // simpan ulang ke localstorage
  renderProjects(); // render ulang tampilan
}

renderProjects(); // buat render project pas halaman dibuka
// Tugas Day6
// Array (sudah ada)
// Array of object (sudah ada: name, start, end, dll)
// Operator : bisa dipake buat cek durasi, jumlah tect, atau yang lain
// Conditional : dipake buat cek misal desc kosong, techs tidak dipilih, dan end<start
// Looping : sebelumnya kan pake forEach, nanti ubah ke for..of atau for
// Disimpan ke internal (localStrage)
