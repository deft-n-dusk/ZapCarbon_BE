const express = require("express");
const app = express();

app.use((req, res) => {
    res.send("Hello")
})

app.listen(2707, () => {
    console.log("Server is successfully listening on port 2707");
});