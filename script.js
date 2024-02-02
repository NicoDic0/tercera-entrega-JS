const post = [
  {
    id: 1,

    category: "coberturas",
    title: "En fotos: Conociendo Rusia en el Teatro Vorterix",
    status: "A publicar",
    img: "pngs/rusia.png",
    description:
      "Sigue la cobertura fotográfica del concierto de Conociendo Rusia en el Teatro Vorterix.",
  },
  {
    id: 2,
    category: "noticias",
    title: "Ramones: A 20 años del último show en Argentina",
    status: "publicado",
    img: "pngs/ramones.png",
    description:
      "Conmemorando el vigésimo aniversario del último show de Ramones en Argentina.",
  },
  {
    id: 3,
    category: "noticias",
    title: "Queen regresa al país con su nueva gira mundial",
    status: "A publicar",
    img: "pngs/queen.png",
    description:
      "La legendaria banda Queen regresa con una gira que promete sorprender a sus fans de todo el mundo.",
  },
  {
    id: 4,
    category: "noticias",
    title: "Sonata Artica lanza un nuevo single",
    status: "publicado",
    img: "pngs/sonata.png",
    description: "Nuevo single del famoso grupo Sonata Artica.",
  },
  {
    id: 5,
    category: "coberturas",
    title: "En fotos: La Renga en el Racing",
    status: "publicado",
    img: "pngs/renga.png",
    description:
      "Revive los mejores momentos del concierto de La Renga en el Estadio de Racing a través de nuestras fotos exclusivas.",
  },
  {
    id: 6,
    category: "coberturas",
    title: "En fotos: Fito Páez en el Luna Park",
    status: "publicado",
    img: "pngs/paez.png",
    description:
      "Descubre las imágenes más impactantes del concierto de Fito Páez en el Luna Park.",
  },
];

class Check {
  constructor(post) {
    this.post = JSON.parse(localStorage.getItem("posts")) || [];
    this.container = document.getElementById("post-container");
    this.addPostSection = document.getElementById("add-post");
    this.searchPostSection = document.getElementById("search-post");
  }

  addPost(newPost) {
    let id = this.post.length + 1;
    newPost.id = id;
    this.post.push(newPost);
    this.showPost();
    this.saveToLocalStorage();
    
  }

   saveToLocalStorage() {
    // Convierte los posteos a formato JSON y los guarda en el Local Storage
    localStorage.setItem("posts", JSON.stringify(this.post));
  }

  searchPost(searchTerm) {
    const results = this.post.filter((item) => {
      return (
        item.id.toString() === searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Selecciona el contenedor donde se mostrarán los resultados
    const resultsContainer = document.getElementById(
      "search-results-container"
    );

    // Limpia cualquier contenido anterior en el contenedor
    resultsContainer.innerHTML = "";

    if (results.length > 0) {
      // Si encuentra resultados, crea un elemento para cada resultado y lo agrega al contenedor
      results.forEach((result) => {
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = `
          <h5>ID: ${result.id}</h5>
          <p>Título: ${result.title}</p>
          <p>Categoría: ${result.category}</p>
          <p>Estado: ${result.status}</p>
          <hr>
        `;
        resultsContainer.appendChild(resultDiv);
      });
    } else {
      resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
    }
  }

  showPost() {
    this.container.innerHTML = ""; 
    this.post.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <h5> ${item.title}</h5>
      <img class="imagenes" src="${item.img}" alt="Imagen de ${item.title}">
      <p>${item.description}</p>
      `;
      this.container.appendChild(div);
    });
  }

  toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "none") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}

const news = new Check(post);
news.showPost();

function addPost() {
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const img = document.getElementById("imageInput").files[0]; 
  const description = document.getElementById("description").value;

  if (category && title && img && description) {
    const reader = new FileReader(); // Crea un objeto FileReader que lee la imagen
    reader.readAsDataURL(img); // Lee el archivo de imagen como una URL de datos

    reader.onload = function () {
      const imgData = reader.result; 

      // Crea un objeto con los datos de la nueva publicación
      const newPost = {
        category,
        title,
        img: imgData, 
        description,
      };
      news.addPost(newPost);
      alert("Publicación agregada correctamente.");

      // Limpia los campos de entrada y cierra el modal una vez agregados correctamente todos los campos
      document.getElementById("category").value = "";
      document.getElementById("title").value = "";
      document.getElementById("imageInput").value = ""; 
      document.getElementById("description").value = "";

      closeModalAdd();
    };
  } else {
    alert("Por favor complete todos los campos.");
  }
}

function searchPost() {
  const searchTerm = document.getElementById("search").value;
  news.searchPost(searchTerm);
}

// variables del modal de busqueda
let modal = document.getElementById("myModalSearch");
let btn = document.getElementById("searchImg");
let span = document.getElementsByClassName("close")[0];

// Funcion para abrir el modal al apretar en el boton de lupa
btn.onclick = function () {
  modal.style.display = "block";
};

// Funciones para cerrar el modal
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Función para buscar y mostrar resultados en el contenedor del DOM
function searchPostModal() {
  const searchTerm = document.getElementById("searchModal").value;
  const results = post.filter((item) => {
    return (
      item.id.toString() === searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const postContainer = document.getElementById("post-container");

  postContainer.innerHTML = "";

  // Mostrar los resultados en el contenedor de publicaciones
  if (results.length > 0) {
    results.forEach((result) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h5>${result.title}</h5>
        <img class="imagenes" src="${result.img}" alt="Imagen de ${result.title}">
        <p>${result.description}</p>
      `;
      postContainer.appendChild(div);
    });
  } else {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No se encontraron resultados.";
    postContainer.appendChild(noResultsMessage);
  }

  closeModal();
}

function closeModal() {
  const modal = document.getElementById("myModalSearch");
  modal.style.display = "none";
}

function showModalAdd() {
  let modal = document.getElementById("myModalAdd");
  modal.style.display = "block";
}

function closeModalAdd() {
  let modal = document.getElementById("myModalAdd");
  modal.style.display = "none";
}

let postElement = document.getElementById("post");

postElement.addEventListener("click", function () {
  showModalAdd();
});

// Función para inicializar el Local Storage con los datos por defecto porque cuando se limpia la misma borra todos los datos incluidos los del array, quedando pendiente la creacion de un boton para borrar posteos
function initializeLocalStorage() {
  if (!localStorage.getItem('posts')) {
      localStorage.setItem('posts', JSON.stringify(post)); // 'post' es el array que tienes por defecto
  }
}
initializeLocalStorage();
