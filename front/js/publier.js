const axios = require("axios");




const getType = async () => {
    const { data } = await axios.get(
      `https://strapi3333.herokuapp.com/api/types`
    );

    const results = data.data.map(type => {
      return type.attributes.label
    })
    console.log(results);

results.forEach(type => {
  let option = document.createElement("option");
  let datalist = document.getElementById("type")
  option.value = type;
  datalist.appendChild(option)
});
    

}

const getSubType = async () => {
  const { data } = await axios.get(
    `https://strapi3333.herokuapp.com/api/sub-types`
  );

  const results = data.data.map(type => {
    return type.attributes.label
  })
  console.log(results);

results.forEach(type => {
let option = document.createElement("option");
let datalist = document.getElementById("sub_type")
option.value = type;
datalist.appendChild(option)
});
}

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titre = e.target.titre.value;
  const description = e.target.description.value;
  const type = e.target.type.value;
  const sub_type = e.target.sub_type.value;

  const {data:{id}} = await axios.get(
    "https://strapi3333.herokuapp.com/api/users/me",   
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    });

  const {data} = await axios.post(
    "https://strapi3333.herokuapp.com/api/announces",
    { 
      data: {
        title: titre,
        description: description,
        // type: type,
        // sub_types: sub_type
        user: id
      }
      
            
    },
    
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    }
    );
    document.location.href = "annonce.html";
  })




getType()
getSubType()