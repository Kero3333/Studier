const axios = require("axios");

const updateNbLike = async () => {
  // on récupère la liste des des annonces qui ont été "like"
  const {
    data: { data: announcesLiked },
  } = await axios.get(
    "https://strapi3333.herokuapp.com/api/favoris?populate[announces_ids][fields][0]=id",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  // on compte le nombre de "like" qu'a reçue chaque annonce
  const countOfLikeByAnnounce = {};

  announcesLiked.forEach((user) => {
    user.attributes.announces_ids.data.forEach((announce) => {
      if (countOfLikeByAnnounce[announce.id] === undefined) {
        countOfLikeByAnnounce[announce.id] = 1;
      } else {
        countOfLikeByAnnounce[announce.id] += 1;
      }
    });
  });

  const announces = Object.keys(countOfLikeByAnnounce);

  // on met à jour le nombre de "like" dans la BDD
  announces.forEach(async (announce) => {
    await axios.put(
      `https://strapi3333.herokuapp.com/api/announces/${announce}`,
      {
        data: {
          number_of_like: countOfLikeByAnnounce[announce],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  });
};

async function element() {
  let one = `https://strapi3333.herokuapp.com/api/users/me/`;

  const { data } = await axios.get(one, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const id = data.id;

  let two = `https://strapi3333.herokuapp.com/api/favoris?populate=announces_ids&filters[users_id]=${id}`;

  const { data: favori } = await axios.get(two, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const results = favori.data[0].attributes.announces_ids.data.map(
    (announce) => {
      return announce;
    }
  );

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
            <div class="flex-column">
                <h4> ${element.attributes.title}</h4>
                <p> ${element.attributes.description}</p>
                <p> ${element.attributes.number_of_like} :D</p>
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
    console.log(data);
    const logProfil = document.querySelector("#logProfil");
    logProfil.href = "profil.html";

    logProfil.innerHTML = `
    <img class="logo-profil" src="${data.picture_profile}" alt="picture">
    `;
  } catch (err) {
    console.log(err.message);
  }
};

if (localStorage.getItem("token")) {
  getUser();
}

updateNbLike();
element();
