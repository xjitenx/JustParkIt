const express = require("express");
const app = express();

const script = require('./script');

// /
app.get("/", (req, res) => {
  res.send("Welcome to the JustParkIt Page.<br>Keep Parking!");
});

// /api/parkcar?carNumber=123
app.get("/api/parkcar", (req, res, next) => {
  script.parkCar(req, res, next);
});

// /api/parkcar?slotNumber=123
app.get("/api/unparkcar", (req, res, next) => {
  script.unParkCar(req, res, next);
});

// /api/getinfo?carNumber=2343 or /api/getinfo?slotNumber=1
app.get("/api/getinfo", (req, res, next) => {
  script.getInfo(req, res, next);
});

module.exports = app;