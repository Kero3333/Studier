



3
const router = require("express").Router();
const axios = require("axios");

const db = require("../db/connect");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post("/", async (req, res) => {
  const typeAnnounce = Object.keys(req.body)[1];
  let typeAnnounceId = 0;

  // si il y a une annonce spécifique (non général)
  if (typeAnnounce) {
    let typeAnnouncePath = "";

    if (typeAnnounce === "activity") {
      typeAnnouncePath = `activities`;
    } else {
      typeAnnouncePath = `${typeAnnounce}s`;
    }

    try {
      //on créer l'annonce dans une sous table à la table annonce
      const {
        data: {
          data: { id },
        },
      } = await axios.post(
        `https://strapi3333.herokuapp.com/api/${typeAnnouncePath}`,
        { data: req.body[typeAnnounce] },
        {
          headers: {
            Authorization: req.headers.authorization,
            "Content-Type": "application/json",
          },
        }
      );
      typeAnnounceId = id;
    } catch (err) {
      res.send(err.message);
    }
  }

  try {
    // on créer l'annonce dans la table annonce
    const {
      data: {
        data: { id: announceId },
      },
    } = await axios.post(
      "https://strapi3333.herokuapp.com/api/announces",
      { data: req.body.announce },
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );

    // on créer la relation entre la table annonce et celui de la sous table
    if (typeAnnounceId !== 0) {
      await db.query(
        `INSERT INTO announces_${typeAnnounce}_links(announce_id, ${typeAnnounce}_id) VALUES($1, $2);`,
        [announceId, typeAnnounceId]
      );
    }

    // on crée la relation entre l'annonce et l'utilisateur qui l'a créer
    await db.query(
      "INSERT INTO announces_user_links(announce_id, user_id) VALUES($1, $2);",
      [announceId, req.user.id]
    );
    // à changer
    res.send("ok");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
