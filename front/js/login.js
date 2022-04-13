const axios = require("axios");

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = e.target.mail.value;
  const password = e.target.pass.value;

  try {
    const {
      data: { jwt },
    } = await axios.post("https://strapi3333.herokuapp.com/api/auth/local", {
      identifier,
      password,
    });
    localStorage.setItem("token", jwt);
    document.location.href = "index.html";
  } catch (err) {
    if (err.message === "Request failed with status code 400") {
      window.alert("L'identifiant ou le mot de passe est incorrect");
    }
  }
});
