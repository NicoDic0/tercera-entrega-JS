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
    constructor() {
      this.post = post
      this.container = document.getElementById("post-container");
      this.modalSearch = document.getElementById("myModalSearch");
      this.modalAdd = document.getElementById("myModalAdd");
      this.searchImgBtn = document.getElementById("searchImg");
      this.closeSpan = document.getElementsByClassName("close")[0];
    }
  
    addPost(newPost) {
      const id = this.post.length + 1;
      newPost.id = id;
      this.post.push(newPost);
      this.showPost();
      this.saveToLocalStorage();
    }
  
    saveToLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.post));
    }
  
    searchPost(searchTerm) {
      const results = this.post.filter((item) =>
        Object.values(item).some(
          (value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      this.displaySearchResults(results);
    }
  
    displaySearchResults(results) {
      const resultsContainer = this.container;
      resultsContainer.innerHTML = "";
  
      if (results.length > 0) {
        results.forEach((result) => {
          const div = this.createPostElement(result);
          resultsContainer.appendChild(div);
        });
      } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No se encontraron resultados.";
        resultsContainer.appendChild(noResultsMessage);
      }
    }
  
    showPost() {
      this.container.innerHTML = "";
      this.post.forEach((item) => {
        const div = this.createPostElement(item);
        this.container.appendChild(div);
      });
    }
  
    createPostElement(post) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h5>${post.title}</h5>
        <img class="imagenes" src="${post.img}" alt="Imagen de ${post.title}">
        <p>${post.description}</p>
      `;
      return div;
    }
  
    showModalAdd() {
      this.modalAdd.style.display = "block";
    }
  
    closeModalAdd() {
      this.modalAdd.style.display = "none";
    }
  
    bindModalEvents() {
      this.searchImgBtn.onclick = () => {
        this.modalSearch.style.display = "block";
      };
  
      this.closeSpan.onclick = () => {
        this.modalSearch.style.display = "none";
        this.modalAdd.style.display = "none";
      };
  
      window.onclick = (event) => {
        if (event.target == this.modalSearch || event.target == this.modalAdd) {
          this.modalSearch.style.display = "none";
          this.modalAdd.style.display = "none";
        }
      };
    }
  }
  
  const news = new Check();
  news.bindModalEvents();
  
  function addPost() {
    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const img = document.getElementById("imageInput").files[0];
    const description = document.getElementById("description").value;
  
    if (category && title && img && description) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
  
      reader.onload = function () {
        const imgData = reader.result;
        const newPost = {
          category,
          title,
          img: imgData,
          description,
        };
        news.addPost(newPost);
  
        alert("Publicación agregada correctamente.");
  
        document.getElementById("category").value = "";
        document.getElementById("title").value = "";
        document.getElementById("imageInput").value = "";
        document.getElementById("description").value = "";
  
        news.closeModalAdd();
      };
    } else {
      alert("Por favor complete todos los campos.");
    }
  }
  
  function searchPost() {
    const searchTerm = document.getElementById("search").value;
    news.searchPost(searchTerm);
  }
  
  let postElement = document.getElementById("post");
  
  postElement.addEventListener("click", () => {
    news.showModalAdd();
  });
  