const axios = require("axios");

async function profile() {
  const { data } = await axios.get(
    `https://strapi3333.herokuapp.com/api/users/me`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  const main = document.querySelector("main");

  main.innerHTML += `
     <div class="bigContainer">
             <img class="card-img" src="${data.picture_profile}" alt="Card image cap">
         <div class="profilInfos"> 
            <input class="profilInput profilName" type="text" name="firstname" value="${data.firstname}"readonly></input>
            <input class="profilInput profilName" type="text" name="lastname" value="${data.lastname}"readonly></input>
            <input class="profilInput" type="text" name="email" value="${data.email}" readonly></input>
         </div>    
         
    </div>
<button id="modifyButton">Modifier</button>

`;
  const id = data.id;

  const modifyButton = document.getElementById("modifyButton");
  modifyButton.addEventListener("click", (event) => {
    Array.from(document.querySelectorAll(".profilInput")).forEach((input) => {
      input.readOnly = false;
    });

    document.querySelector("#modifyButton").textContent = "Enregistrer";
    document.querySelector("#modifyButton").id = "saveButton";
    document
      .getElementById("saveButton")
      .addEventListener("click", async (e) => {
        const inputs = Array.from(document.querySelectorAll(".profilInput"));

        const body = {};
        inputs.forEach((input) => {
          body[input.name] = input.value;
        });
        console.log(body);
        const { data } = await axios.put(
          `https://strapi3333.herokuapp.com/api/users/${id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      });
  });
}

profile();

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
