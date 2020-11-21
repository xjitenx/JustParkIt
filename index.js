const express = require("express");
const app = express();

const PARKING_LOT_LIMIT = process.env.PARKINGLIMIT;
console.log("The Parking Lot Limit is : " + PARKING_LOT_LIMIT);

//carSlotMap => { carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = []; //slots that were occupied once
let globalSlotNo = 1;

app.get("/", (req, res) => {
  res.send("Welcome to the JustParkIt Page.<br>Keep Parking!");
});

// /api/parkcar?carNumber=123
app.get("/api/parkcar", (req, res, next) => {
  let parkSlotNo;
  if (vacatedSlots.length > 0) {
    parkSlotNo = vacatedSlots[0];
    vacatedSlots.splice(0, 1);
  } else {
    parkSlotNo = globalSlotNo;
    globalSlotNo++;
  }

  carSlotMap.push({ carNo: parseInt(req.query.carNumber), slotNo: parkSlotNo });
  res.send("Car is parked, thanks and your slot no is :" + parkSlotNo);
});

// /api/parkcar?slotNumber=123
app.get("/api/unparkcar", (req, res, next) => {
  let removeSlotNo = parseInt(req.query.slotNumber);
  let index = carSlotMap.findIndex((obj) => obj.slotNo === removeSlotNo);
  vacatedSlots.push(removeSlotNo);
  carSlotMap.splice(index, 1);
  console.log(carSlotMap);
  res.send("Car is unparked from slot no :" + removeSlotNo);
});

// /api/getinfo?carNumber=2343 or /api/getinfo?slotNumber=1
app.get("/api/getinfo", (req, res, next) => {
  if (req.query.carNumber) {
    res.send(
      carSlotMap.filter((obj) => obj.carNo === parseInt(req.query.carNumber))
    );
  } else if (req.query.slotNumber) {
    res.send(
      carSlotMap.find((obj) => obj.slotNo === parseInt(req.query.slotNumber))
    );
  } else {
    res.send("Please provide either car number or slot number.");
  }
});

// PORT use -> set PORT=5000 in ur CMD
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening at " + port + "..."));