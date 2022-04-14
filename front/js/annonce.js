const axios = require("axios");

async function element() {
  const { data } = await axios.get(
    `https://strapi3333.herokuapp.com/api/announces?populate=*`
  );

  const results = data.data;

  const masonry = document.querySelector(".masonry");

  results.forEach((element) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML += `
        <div class="img-details">
        <img  src="${element.attributes.picture}">
        <img class="favorite-item" src="https://res.cloudinary.com/dvpi39ag2/image/upload/v1649853368/img/heart_gerq0k.png" alt="favorite-icon">
        </div>
        <div class="flex-card">
            <img class="logo-profil" src="${element.attributes.user.data.attributes.picture_profile}" alt="logo">
            <div class="flex-column">
                <h4> ${element.attributes.title}</h4>
                <p> ${element.attributes.description}</p>
            </div>
        </div>
    `;

    div.addEventListener("click", () => {
      localStorage.setItem("announce", element.id);
      document.location.href = "description.html";
    });

    masonry.appendChild(div);
  });
}

element();
