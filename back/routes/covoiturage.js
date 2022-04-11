const {Router} = require('express');
const axios  = require('axios');

const router = Router();

router.post("/" ,  async (req , res ) =>{
try {
    const {Start , Arrive , Price} = req.body;
    const {data} = await axios.get(`https://strapi3333.herokuapp.com/api/carpools?filters[$or][0][Start][$eq]=${Start}&filters[$or][1][Arrive][$eq]=${Arrive}&filters[$or][2][Price][$eq]=${Price}` , {
        headers: {'Authorization': req.headers.authorization}
    });
   res.status(200).send(data); 
}catch(err){
 res.status(400).send(err.message);
}
});




module.exports = router;