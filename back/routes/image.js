const router = require("express").Router();

const axios = require("axios");

// router.get("/", async (req, res) => {
//   const { resources } = await cloudinary.v2.search
//     .expression("folder:img/carousel")
//     .execute();

//   const images = resources.map((image) => {
//     return image.url;
//   });
//   res.send(images);
// });

router.get("/", async (req, res) => {
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
  const dict = {};
  const announces_id = announcesLiked
    .map((person) => {
      return person.attributes.announces_ids.data.map((announceId) => {
        if (dict[announceId.id] === undefined) {
          dict[announceId.id] = 1;
        } else {
          dict[announceId.id] += 1;
        }
        return announceId.id;
      });
    })
    .flat()
    .sort();
  console.log(dict);
  res.send("ok");
});

module.exports = router;
