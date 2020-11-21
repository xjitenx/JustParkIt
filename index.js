const express = require("express");
const app = express();

let PARKING_LOT_LIMIT = 0;
if (process.env.PARKINGLIMIT) {
  PARKING_LOT_LIMIT = process.env.PARKINGLIMIT;
} else {
  PARKING_LOT_LIMIT = 5;
}
console.log("The Parking Lot Limit is : " + process.env.PARKINGLIMIT);

//carSlotMap => { carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = []; //slots that were occupied once
let globalSlotNo = 0;

app.get("/", (req, res) => {
  res.send("Welcome to the JustParkIt Page.<br>Keep Parking!");
});

// /api/parkcar?carNumber=123
app.get("/api/parkcar", (req, res, next) => {
  if (vacatedSlots.length === 0 && globalSlotNo >= PARKING_LOT_LIMIT) {
    res.send("Parking lot is full please try again later.");
  } else {
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
  }
});

// /api/parkcar?slotNumber=123
app.get("/api/unparkcar", (req, res, next) => {
  let removeSlotNo = parseInt(req.query.slotNumber);
  let index = carSlotMap.findIndex((obj) => obj.slotNo === removeSlotNo);
  if (index > -1) {
    vacatedSlots.push(removeSlotNo);
    carSlotMap.splice(index, 1);
    console.log(carSlotMap);
    res.send("Car is unparked from slot no :" + removeSlotNo);
  } else {
    res.send(
      "Sorry this slot number doesnt have any car parked on it. Please try a different slot number."
    );
  }
});

// /api/getinfo?carNumber=2343 or /api/getinfo?slotNumber=1
app.get("/api/getinfo", (req, res, next) => {
  if (req.query.carNumber) {
    let result = carSlotMap.filter(
      (obj) => obj.carNo === parseInt(req.query.carNumber)
    );
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Sorry the entry doesnt exist. Please try a different value.");
    }
  } else if (req.query.slotNumber) {
    let result = carSlotMap.find(
      (obj) => obj.slotNo === parseInt(req.query.slotNumber)
    );
    if (result) {
      res.send(result);
    } else {
      res.send("Sorry the entry doesnt exist. Please try a different value.");
    }
  } else {
    res.send("Please provide either car number or slot number.");
  }
});

// PORT use -> set PORT=5000 in ur CMD
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening at " + port + "..."));
