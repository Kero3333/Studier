const axios = require('axios');

async function element(){
   

let one = `https://strapi3333.herokuapp.com/api/users/me/`
                
     const {data} =  await axios.get(one, {
         headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},

     });

     const id = data.id; 

console.log(id);
   

let two = `https://strapi3333.herokuapp.com/api/favoris?populate[users_id][fields][0]=id&populate[announces_ids][fields][0]=id&filters[users_id][id][$eq]=${id}`


     const {data : favori} = await axios.get(two ,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},

     })

     console.log(data);

    const results = favori.data[0].attributes.announces_ids.data.map(announce => {return announce.id});

     const ul = document.querySelector('ul');

     const li = document.createElement('li');

    results.forEach((id) => {
         
        ul.appendChild(li);
        
       li.innerHTML += `
        <li>${id}</li> 
        `
     });


 
     console.log(results);
            
}

element();