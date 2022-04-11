const router = require("express").Router();
const axios = require("axios");

const db = require("../db/connect");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    // on créer l'annonce
    const { data } = await axios.post(
      "https://strapi3333.herokuapp.com/api/announces",
      { data: req.body },
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );

    // on récupère l'id de l'annonce créer et celui de l'utilisateur
    const id = {
      announce: data.data.id,
      user: req.user.id,
    };

    // on crée la relation entre l'annonce et l'utilisateur qui l'a créer
    await db.query(
      "INSERT INTO announces_user_links(announce_id, user_id) VALUES($1, $2);",
      [id.announce, id.user]
    );
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
