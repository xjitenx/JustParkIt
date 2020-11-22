require('dotenv').config();

const express = require("express");
const app = express();

const apis = require("./src/api");
app.use("/", apis);

// PORT use -> set PORT=5000 in ur CMD
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening at port " + port + "..."));
