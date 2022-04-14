/* <div class="item">
<div class="img-details">
    <img  src="https://source.unsplash.com/random">
     <img class="favorite-item" src="./img/heart.jpg" alt="favorite-icon">
</div>
<div class="flex-card">
    <img class="logo-profil" src="http://www.pixeden.com/media/k2/galleries/468/001-business-card-clip-brand-mock-up-vol-20-psd.jpg" alt="logo">
    <div class="flex-column">
        <h4>Titre</h4>
        <p> Lorem ipsum dolor sit, amet consectetur</p>
    </div>
</div>
</div> */




const axios = require('axios');

async function element(){

    const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/announces?populate=*`);

    const results = data.data;

    const div = document.querySelector('.masonry');

   results.forEach(element => {

     div.innerHTML += `
     <div class="item">
    <div class="img-details">
    <img  src="${element.attributes.picture}">
    <img class="favorite-item" src="https://res.cloudinary.com/dvpi39ag2/image/upload/v1649853368/img/heart_gerq0k.png" alt="favorite-icon">
    </div>
<div class="flex-card">
    <img class="logo-profil" src="${element.attributes.user.data.attributes.picture_profile}" alt="logo">
    <div class="flex-column">
        <h4> ${element.attributes.title}</h4>
        <p> ${element.attributes.description}</p>
    </div>
</div>
</div> 
`;

console.log(element.attributes);

   });

};

 element(); 

    
  



