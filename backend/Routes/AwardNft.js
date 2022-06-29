const router = require('express').Router();

router.post('/',async(req,res)=>{
    res.status(200).json({message:"Award NFT Route Reached"});
})

module.exports = router;
