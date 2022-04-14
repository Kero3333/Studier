const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  // on récupère la liste des des annonces qui ont été aimé
  const {
    data: { data: announcesLiked },
  } = await axios.get(
    "https://strapi3333.herokuapp.com/api/favoris?populate[announces_ids][fields][0]=id",
    {
      headers: {
        Authorization: req.headers.authorization,
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

  console.log(popularAnnounces);

  // on récupère les images des 4 annonces les plus populaires
  for (let i = 0; i < 4; i++) {
    const {
      data: {
        data: {
          attributes: { picture },
        },
      },
    } = await axios.get(
      `https://strapi3333.herokuapp.com/api/announces/${popularAnnounces[i][0]}`,
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(picture);
  }

  res.send("ok");
});

module.exports = router;
