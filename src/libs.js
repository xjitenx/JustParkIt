const CarClass = require("./carclass.js");

// Handle limit of the parking lot.
const PARKING_LOT_LIMIT = process.env.LIMIT || 10;
console.log("Parking limit is : " + PARKING_LOT_LIMIT);

//carSlotMap => { carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = []; //slots that were occupied once
let globalSlotNo = 0;


// Core Functionalities START
// - Park Car Start -//
function makeCarParkEntry(req, res) {
  if (isCarParkAllowed()) {
    res.send("Parking lot is full please try again later.");
  } else {
    if (intCheck(parseInt(req.query.carNumber))) {
      let parkSlotNo;
      if (vacatedSlots.length > 0) {
        parkSlotNo = vacatedSlots[0];
        vacatedSlots.splice(0, 1);
      } else {
        parkSlotNo = globalSlotNo + 1;
        globalSlotNo++;
      }
      carSlotMap.push(new CarClass(parseInt(req.query.carNumber), parkSlotNo));
      res.send("Car is parked, thanks and your slot no is :" + parkSlotNo);
    } else {
      res.send("Please enter a valid car number i.e: 1234.");
    }
  }
}

function isCarParkAllowed(params) {
  return vacatedSlots.length === 0 && globalSlotNo >= PARKING_LOT_LIMIT;
}
// - Park Car End -//

// - Un-Park Car Start - //
function unParkCarUpdate(req, res) {
  if (intCheck(parseInt(req.query.slotNumber))) {
    let removeSlotNo = parseInt(req.query.slotNumber);
    let index = carSlotMap.findIndex((obj) => obj.slotNumber === removeSlotNo);
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
// - Un-Park Car End - //

// - Get Info START - //
function sendCarSlotData(req, res, type) {
  if (type === "car") {
    let result = carSlotMap.filter(
      (obj) => obj.carNumber === parseInt(req.query.carNumber)
    );
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Sorry the entry doesnt exist. Please try a different value.");
    }
  } else if (type === "slot") {
    let result = carSlotMap.find(
      (obj) => obj.slotNumber === parseInt(req.query.slotNumber)
    );
    if (result) {
      res.send(result);
    } else {
      res.send("Sorry the entry doesnt exist. Please try a different value.");
    }
  }
}
// - Get Info END - //

// Core Functionalities END

// Helping Functions START
function intCheck(value) {
  return Number.isInteger(value);
}
// Helping FUnctions END

module.exports = {
  makeCarParkEntry,
  unParkCarUpdate,
  sendCarSlotData,
  intCheck
};
