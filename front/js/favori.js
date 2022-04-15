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

  console.log(id);

  let two = `https://strapi3333.herokuapp.com/api/favoris?populate=announces_ids&filters[users_id]=${id}`;

  const { data: favori } = await axios.get(two, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  console.log(data);

  const results = favori.data[0].attributes.announces_ids.data.map(
    (announce) => {
      return announce.attributes;
    }
  );

  const div = document.querySelector(".masonry");

  results.forEach((element) => {
    console.log(element);

    div.innerHTML += `
       <div class="item">
       <div class="img-details">
       <img  src="${element.picture}">
       <img class="favorite-item" src="https://res.cloudinary.com/dvpi39ag2/image/upload/v1649853368/img/heart_gerq0k.png" alt="favorite-icon">
       </div>
   <div class="flex-card">
       <div class="flex-column">
           <h4> ${element.title}</h4>
           <p> ${element.description}</p>
           <p>${element.number_of_like} :D</p>
       </div>
   </div>
   </div> 
        `;
  });

  console.log(results);
}

updateNbLike();
element();
