const mongoose = require("mongoose");

const db = process.env.MONGO_URL

//connecting to the database
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Connected to db successfully");
}).catch((error)=>{
    console.log(error);
    console.log("Could not connect database!");
})



