const express=require('express');
const router=express.Router();

//route to connect to the client side
router.get('/api', (req, res)=> {
    res.redirect('http://localhost:3000/');
})

module.exports = router;