const {Router} = require('express');
const axios = require('axios');

const router = Router();


router.post('/' , async (req , res)=>{
    Object.keys(req.body);
    let variable = "";

    Object.keys(req.body).forEach((element) =>{
        variable += `filters[$or][0][${element}][$eq]=${req.body[element]}&filters`;
    })
    console.log(variable);
    try{
    const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/jobs?${variable}` , {
     headers : {'Authorization' : req.headers.authorization}   
    });
    res.status(200).send(data);
    }catch(err){
    res.status(400).send(err.message);
    }
});





module.exports = router;