const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());


const authRouter = require("./routes/authRouter.js");
app.use("/", authRouter);

const activityRouter = require("./routes/activityRouter");
app.use("/api/activities", activityRouter);

const summaryRouter = require("./routes/summaryRouter");
app.use("/api/summary", summaryRouter);

app.use("/auth", require("./routes/authCheckRouter"));


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

