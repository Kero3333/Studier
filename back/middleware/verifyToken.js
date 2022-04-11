const axios = require("axios");

const verifyToken = async (req, res, next) => {
  try {
    const { data: user } = await axios.get(
      "https://strapi3333.herokuapp.com/api/users/me",
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = verifyToken;
