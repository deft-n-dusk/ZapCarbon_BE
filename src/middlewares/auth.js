const jwt = require("jsonwebtoken");
const User = require("../models/user")


const userAuth = async (req, res, next) => {
    //Read the token from the req cookies

   try {const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        res.status(401).send("Please Login!!");
    }
    const decodedObj = await jwt.verify(token, "ZAP@CARBON$2713")

    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    //Validate the token
    //Find the user
}

module.exports = {
    userAuth,
}