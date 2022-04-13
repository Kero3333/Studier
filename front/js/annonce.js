const axios = require('axios');

const div = document.querySelector('.flex-card');


div.addEventListener('.flex-column' , async (e) =>{


e.preventDefault();

    const title = document.querySelector('h4').value;
    const description = document.querySelector('p').value;

    const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/announces?populate=*`);

    console.log(data);


    //console.log(results);

});


  


