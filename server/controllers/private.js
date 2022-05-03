exports.getPrivateData = (req,res,next) =>{
    res.status(200).json({
        success: true,
        data: "you received access to the private data avaliable in this route"
    })
}