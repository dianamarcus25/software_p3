const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwt = require("jsonwebtoken")

// User schema
const userSchema = new mongoose.Schema({

    firstname : {
        type: String,
        required : [true, "Please provide a first name"]
    },

    lastname : {
        type: String,
        required : [true, "Please provide a last name"]
    },

    email : {
        type: String,
        required : [true, "Please provide an email address"],
        unique : true,
        match: [ 
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            "Please provide a valid email"
        ]
    },
    
    password : {
        type: String,
        required : [true, "Please provide a password"],
        minlength: 8,
        maxlength: 20,
        select: false
    },

    role: {
        type: String,
        enum: ["mentor", "mentee", "admin"],
        required:true,
      },
    
    tokens : [
        {
        token : {
            type : String,
            required : true
        }
    }
]
},
    {collection: 'users'},
);


//hashing the password before registering an user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  });
     

// comparing password with database when logging in 
userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password)
};

//generating a token
userSchema.methods.getToken = function () {
    return jsonwt.sign({ id: this._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWTEXPIRE,
    });
  };

//Create model
const User = new mongoose.model("User", userSchema);


module.exports = User;