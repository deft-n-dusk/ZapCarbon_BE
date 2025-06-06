const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("photoURL is not valid");
      }
    },
  },
}, {
  timestamps: true,
});

// Optional indexes
userSchema.index({ firstName: 1, lastName: 1 });

// JWT generation
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "your_default_secret", {
    expiresIn: "7d",
  });
  return token;
};

// Password check
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
