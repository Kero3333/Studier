const axios = require("axios");

const getAnnounce = async () => {
  let {
    data: {
      data: {
        attributes: { title, description, picture, number_of_like },
      },
    },
  } = await axios.get(
    `https://strapi3333.herokuapp.com/api/announces/${localStorage.getItem(
      "announce"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const displayImage = document.querySelector(".product-imgs");
  displayImage.innerHTML = `
    <div class="img-select">
        <div class="img-item">
            <img src="${picture}" alt="picture" />
        </div>
    </div>
  `;

  const displayProduct = document.querySelector(".product-content");
  displayProduct.innerHTML = `
    <h4 class="product-title">${title}</h4>

    <div class="product-detail">
        <h6>Description</h6>
        <p>${description}</p>
        
    </div>
    <div class="text-center">
        <button class="btnDetail btn-secondary btn-lg">
            <a
            class="linkDetail"
            href=""
            target="_blank"
            >${number_of_like} :D</a>
        </button>
    </div>
  `;
};

const getUser = async () => {
  try {
    const { data } = await axios.get(
      "https://strapi3333.herokuapp.com/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const logProfil = document.querySelector("#logProfil");
    logProfil.href = "profil.html";

    logProfil.innerHTML = `
    <img class="logo-profil" src="${data.picture_profile}" alt="picture">
    `;
  } catch (err) {
    console.log(err.message);
  }
};

const getcommentaire = async () => {
  // on affiche les commentaire
  const { data } = await axios.get(
    `https://strapi3333.herokuapp.com/api/comentaires?populate=users_permissions_user&filters[announce][id][$eq]=${localStorage.getItem(
      "announce"
    )}`
  );

  const results = data.data;

  const div = document.querySelector(".card-columns");

  results.forEach((element) => {
    div.innerHTML += `
      <div class="card" style="background-color: #fff0e3">
      <h4>${element.attributes.users_permissions_user.data.attributes.username}</h4>
      <div class="card-body">
        <p class="card-text" style="color: #000">
        ${element.attributes.opinion}
        </p>
      </div>
    </div>
      `;
  });
};

if (localStorage.getItem("token")) {
  getUser();
}

getAnnounce();
getcommentaire();
