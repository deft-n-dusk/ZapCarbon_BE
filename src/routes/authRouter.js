const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation.js")
const User = require("../models/user.js")
const bcrypt = require("bcrypt");


//SIGNUP API
authRouter.post("/signup", async (req, res) => {

    try{

    //Validate the data

    validateSignUpData(req);

    //Encrypt the password
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName, lastName, emailId, password : passwordHash
    });

        const savedUser = await user.save();

             //Create a JWT token
             const token = await savedUser.getJWT();

             //Add the token to the cookie and send the response back to the user
             res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
              expires: new Date(Date.now() + 8 * 3600000),
            });


        res.json({message : "User added successfully", data: savedUser});
    }
    catch (err){
        res.status(400).send("Error saving the user: " + err.message);
    }
})


// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 8 * 3600000),
    });


      res.send({
        message: "Login successful",
        token, // ✅ Send token to frontend
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
        },
      });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(400).send("Error logging in: " + err.message);
  }
});

//Logout API
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {expires : new Date(Date.now())});
    res.send("Logout successful!!");
})


module.exports = authRouter;