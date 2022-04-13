const axios = require("axios");
const carousel = document.querySelector(".carousel-inner");

const getImages = async () => {
  const { data: images } = await axios.get("http://localhost:3000/image");

  console.log(images);

  carousel.innerHTML = ``;

  const nbCarousel = ["First", "Second", "Third", "Four"];
  let itemActive = "active";
  images.forEach((image, index) => {
    if (index > 0) {
      itemActive = "";
    }
    carousel.innerHTML += `
          <div class="carousel-item ${itemActive}">
              <img
              class="d-block w-50"
              src="${image}"
              alt="${nbCarousel[index]} slide"
              />
          </div>
      `;
  });
};
getImages();
