// Required script files
const ip_limiter = require("./ip-limiter");
const libs = require("./libs");

// Welcome HomePage Message
function welcomeHomePage(req, res) {
  var ipAllowedYN = ip_limiter.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    res.send("Welcome to the JustParkIt Server.<br>Keep Parking!");
  }
}

// Logic for parking a car
function parkCar(req, res, next) {
  var ipAllowedYN = ip_limiter.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    libs.makeCarParkEntry(req, res);
  }
}

// Logic for Un-Parking a car
function unParkCar(req, res, next) {
  var ipAllowedYN = ip_limiter.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    libs.unParkCarUpdate(req, res);
  }
}

// Logic for Get Info of a car or a slot
function getInfo(req, res, next) {
  var ipAllowedYN = ip_limiter.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    if (req.query.carNumber) {
      if (libs.intCheck(parseInt(req.query.carNumber))) {
        libs.sendCarSlotData(req, res, "car");
      } else {
        res.send("Please enter a valid car number i.e: 1234.");
      }
    } else if (req.query.slotNumber) {
      if (libs.intCheck(parseInt(req.query.slotNumber))) {
        libs.sendCarSlotData(req, res, "slot");
      } else {
        res.send("Please enter a valid car number i.e: 1 or 2 or 4 etc.");
      }
    } else {
      res.send("Please provide either carNumber or slotNumber as parameter.");
    }
  }
}

// Export all these functions only
module.exports = {
  getInfo,
  unParkCar,
  parkCar,
  welcomeHomePage,
};
