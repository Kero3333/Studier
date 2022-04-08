const axios = require("axios");

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = e.target.mail.value;
  const password = e.target.pass.value;

  try {
    const { data } = await axios.post("http://127.0.0.1:3000/auth", {
      identifier,
      password,
    });
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
});
