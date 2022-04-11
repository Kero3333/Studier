const axios = require('axios');

const form = document.querySelector('form');

form.addEventListener('submit' , (e) =>{

    e.preventDefault();

    try {
        const {Start , Arrive , Price} = req.body;
        const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/carpools?filters[$or][0][Start][$eq]=${Start}&filters[$or][1][Arrive][$eq]=${Arrive}&filters[$or][2][Price][$eq]=${Price}` , {
            headers: {'Authorization': req.headers.authorization}
        });
    const results = data.data;

    console.log(results);

    }catch{
     
    }
})

