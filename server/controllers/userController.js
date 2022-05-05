const User = require('../models/userSchema');
const ErrorResponses = require("../utils/errorResponses")

//register users
    exports.registerUser = async(req,res,next) => {
        
    const {firstname, lastname, email, password, role } = req.body;

    try {
        const user = await User.create({
            firstname, 
            lastname, 
            email, 
            password, 
            role,
        })

        //generating a token
        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
};

// listing all users
exports.allUsers = async (req, res, next) => {

    User.find({  })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
  };

// login user
  exports.loginUser = async(req,res,next) => {

    const {email, password} =req.body;

    if(!email || !password) {
        return next(new ErrorResponses("Please provide a valid email address and password", 400))
    }

    try{
        const user = await User.findOne({email}).select("+password")

        if(!user) {
            return next(new ErrorResponses("invalid credentials", 401))
        }
        const matchesP = await user.comparePassword(password);

        if(!matchesP){
            return next(new ErrorResponses( "invalid password", 401))
        }

        //generating a token
        sendToken(user, 200, res);


    } catch (error) {
        
        next(error);
    }

};


    const sendToken = (user, status, res) => {
        const token = user.getToken();
        res.status(status).json({success:true, token})
    }
   
