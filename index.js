const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to MessBook App!");
});

app.listen(port, () => {
    console.log("MessBook App listening on port " + port);
});