const axios = require("axios");

const getPopularAnnounces = async () => {
  try {
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

    // on tri par ordre décroissant les annonces qui ont reçues le plus de "like"
    const popularAnnounces = Object.entries(countOfLikeByAnnounce)
      .sort((a, b) => {
        return a[1] - b[1];
      })
      .reverse();

    const carousel = document.querySelector(".carousel-inner");

    carousel.innerHTML = ``;

    const nbCarousel = ["First", "Second", "Third", "Four"];
    let itemActive = "active";

    // on récupère les images des 4 annonces les plus populaires
    for (let i = 0; i < 4; i++) {
      if (i > 0) {
        itemActive = "";
      }

      let {
        data: {
          data: {
            attributes: { picture, title },
          },
        },
      } = await axios.get(
        `https://strapi3333.herokuapp.com/api/announces/${popularAnnounces[i][0]}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // on redimensionne l'image
      const urlPicture = picture.split("/upload/");
      const resizePicture = "w_1000,ar_16:9,c_fill,g_auto,e_sharpen";
      picture = `${urlPicture[0]}/upload/${resizePicture}/${urlPicture[1]}`;

      const div = document.createElement("div");
      div.id = popularAnnounces[i][0];
      div.className = `carousel-item ${itemActive}`;

      div.innerHTML = `
        <h3>${title}</h3>
        <img
        class="d-block w-50"
        src="${picture}"
        alt="${nbCarousel[i]} slide"
        />
      `;

      const disp = document.querySelector(".carousel-inner");

      div.addEventListener("click", () => {
        localStorage.setItem("announce", popularAnnounces[i][0]);
        document.location.href = "description.html";
      });

      disp.appendChild(div);
    }
  } catch (err) {
    console.log(err.message);
  }
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
getPopularAnnounces();
