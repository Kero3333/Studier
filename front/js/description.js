// const imgs = document.querySelectorAll(".img-select a");
// const imgBtns = [...imgs];
// let imgId = 1;

// imgBtns.forEach((imgItem) => {
//   imgItem.addEventListener("click", (event) => {
//     event.preventDefault();
//     imgId = imgItem.dataset.id;
//     slideImage();
//   });
// });

// function slideImage() {
//   const displayWidth = document.querySelector(
//     ".img-showcase img:first-child"
//   ).clientWidth;

//   document.querySelector(".img-showcase").style.transform = `translateX(${
//     -(imgId - 1) * displayWidth
//   }px)`;
// }

// window.addEventListener("resize", slideImage);

const axios = require("axios");

// require("./commentaire");

const getAnnounce = async () => {
  let {
    data: {
      data: {
        attributes: { title, description, picture, number_of_like },
      },
    },
  } = await axios.get(
    `https://strapi3333.herokuapp.com/api/announces/${localStorage.getItem(
      "announce"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const displayImage = document.querySelector(".product-imgs");
  displayImage.innerHTML = `
    <div class="img-select">
        <div class="img-item">
            <img src="${picture}" alt="picture" />
        </div>
    </div>
  `;

  const displayProduct = document.querySelector(".product-content");
  displayProduct.innerHTML = `
    <h4 class="product-title">${title}</h4>

    <div class="product-detail">
        <h6>Description</h6>
        <p>${description}</p>
        
    </div>
    <div class="text-center">
        <button class="btnDetail btn-secondary btn-lg">
            <a
            class="linkDetail"
            href=""
            target="_blank"
            >${number_of_like} :D</a>
        </button>
    </div>
  `;
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

getAnnounce();
