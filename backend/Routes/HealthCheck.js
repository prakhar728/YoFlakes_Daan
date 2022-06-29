const router = require('express').Router();

router.get('/',(req,res)=>{
    res.status(200).json({message:"The Server is Up and Running"});
})


module.exports = router;