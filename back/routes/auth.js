const router = require("express").Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { data } = await axios.post(
      "https://strapi3333.herokuapp.com/api/auth/local",
      req.body
    );
    res.send(data);
  } catch (err) {
    res.status(400).send("wrong email or password");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { data } = await axios.post(
      "https://strapi3333.herokuapp.com/api/auth/local/register",
      req.body
    );
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
