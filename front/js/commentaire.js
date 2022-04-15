const axios = require("axios");

const getcommentaire = async () => {
  // on affiche les commentaire
  const { data } = await axios.get(
    `https://strapi3333.herokuapp.com/api/comentaires?populate=*`
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

getcommentaire();
