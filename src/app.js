const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/authRouter.js");
app.use("/", authRouter);

connectDB()
        .then(() => {
            console.log("Database connection established...");
            app.listen(2707, () => {
            console.log("Server is successfully listening on port 2707");
            });
        })
        .catch((err) => {
            console.error("Database cannot be connected");
        });

