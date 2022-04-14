const axios = require('axios');

async function profile (){
    const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/users/me`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });

    const main = document.querySelector('main');
    
    console.log(data)

     main.innerHTML += `
     <div class="card">
     <div class="card-horizontal">
         <div class="img-square-wrapper">
             <img class="card-img" src="${data.picture_profile}" alt="Card image cap">
         </div>
         <div class="card-body">
             <h1 class="card-title">${data.firstname} ${data.lastname}</h1>
             <p class="card-text">${data.email}</p>
         </div>
     </div>
 </div>

`;
console.log(element.attributes);

}

profile();