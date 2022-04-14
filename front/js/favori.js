const axios = require('axios');

async function element(){
   

let one = `https://strapi3333.herokuapp.com/api/users/me/`
                
     const {data} =  await axios.get(one, {
         headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},

     });

     const id = data.id; 

console.log(id);
   

let two = `https://strapi3333.herokuapp.com/api/favoris?populate=announces_ids&filters[users_id]=${id}`


     const {data : favori} = await axios.get(two ,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},

     })

     console.log(data);

    const results = favori.data[0].attributes.announces_ids.data.map(announce => {return announce.attributes});

     const div = document.querySelector('.masonry');


     

    results.forEach((element) => {
         console.log(element);


        
       div.innerHTML += `
       <div class="item">
       <div class="img-details">
       <img  src="${element.picture}">
       <img class="favorite-item" src="https://res.cloudinary.com/dvpi39ag2/image/upload/v1649853368/img/heart_gerq0k.png" alt="favorite-icon">
       </div>
   <div class="flex-card">
       <div class="flex-column">
           <h4> ${element.title}</h4>
           <p> ${element.description}</p>
       </div>
   </div>
   </div> 
        `
     });


 
     console.log(results);
            
}

element();