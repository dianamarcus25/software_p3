const express=require('express');
const router=express.Router();

router.get('/api', (req, res)=> {
    res.redirect('http://localhost:3000/');
})

module.exports = router;