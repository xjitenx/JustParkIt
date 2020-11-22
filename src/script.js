const libs = require("./libs");

// Handle limit of the parking lot.
const PARKING_LOT_LIMIT = process.env.LIMIT || 10;
console.log(PARKING_LOT_LIMIT);

//carSlotMap => { carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = []; //slots that were occupied once
let globalSlotNo = 0;

// Ip Address LIMIT Handler
global.userIpRequest = [];

function welcomeHomePage(req, res) {
  var ipAllowedYN = libs.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    res.send("Welcome to the JustParkIt Page.<br>Keep Parking!");
  }
}

function parkCar(req, res, next) {
  var ipAllowedYN = libs.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    if (vacatedSlots.length === 0 && globalSlotNo >= PARKING_LOT_LIMIT) {
      res.send("Parking lot is full please try again later.");
    } else {
      if (Number.isInteger(parseInt(req.query.carNumber))) {
        let parkSlotNo;
        if (vacatedSlots.length > 0) {
          parkSlotNo = vacatedSlots[0];
          vacatedSlots.splice(0, 1);
        } else {
          parkSlotNo = globalSlotNo + 1;
          globalSlotNo++;
        }
        carSlotMap.push({
          carNo: parseInt(req.query.carNumber),
          slotNo: parkSlotNo,
        });
        res.send("Car is parked, thanks and your slot no is :" + parkSlotNo);
      } else {
        res.send("Please enter a valid car number i.e: 1234.");
      }
    }
  }
}

function unParkCar(req, res, next) {
  var ipAllowedYN = libs.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    if (Number.isInteger(parseInt(req.query.slotNumber))) {
      let removeSlotNo = parseInt(req.query.slotNumber);
      let index = carSlotMap.findIndex((obj) => obj.slotNo === removeSlotNo);
      if (index > -1) {
        vacatedSlots.push(removeSlotNo);
        carSlotMap.splice(index, 1);
        res.send("Car is unparked from slot no :" + removeSlotNo);
      } else {
        res.send(
          "Sorry this slot number doesnt have any car parked on it. Please try a different slot number."
        );
      }
    } else {
      res.send("Please enter a valid car number i.e: 1 or 2 or 4 etc.");
    }
  }
}

function getInfo(req, res, next) {
  var ipAllowedYN = libs.makeIpEntry(req.ip);
  if (!ipAllowedYN) {
    res.send(
      "Sorry you have crossed the maximum limit of requests in 10secs. Please try again in a short while."
    );
  } else {
    if (req.query.carNumber) {
      if (Number.isInteger(parseInt(req.query.carNumber))) {
        let result = carSlotMap.filter(
          (obj) => obj.carNo === parseInt(req.query.carNumber)
        );
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send(
            "Sorry the entry doesnt exist. Please try a different value."
          );
        }
      } else {
        res.send("Please enter a valid car number i.e: 1234.");
      }
    } else if (req.query.slotNumber) {
      if (Number.isInteger(parseInt(req.query.slotNumber))) {
        let result = carSlotMap.find(
          (obj) => obj.slotNo === parseInt(req.query.slotNumber)
        );
        if (result) {
          res.send(result);
        } else {
          res.send(
            "Sorry the entry doesnt exist. Please try a different value."
          );
        }
      } else {
        res.send("Please enter a valid car number i.e: 1 or 2 or 4 etc.");
      }
    } else {
      res.send("Please provide either car number or slot number.");
    }
  }
}

module.exports = {
  getInfo,
  unParkCar,
  parkCar,
  welcomeHomePage,
};
