const express = require("express");
const app = express();

const PARKING_LOT_LIMIT = process.env.PARKINGLIMIT;
console.log("The Parking Lot Limit is : " + PARKING_LOT_LIMIT);

//{ carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = [];
let slotNo = 1;

app.get('/', (req, res) => {
    res.send('Welcome to the JustParkIt Page.<br>Keep Parking!');
});

// /api/parkcar?carNumber=123
app.get("/api/parkcar", (req, res, next) => {    
  carSlotMap.push({ carNo: parseInt(req.query.carNumber), slotNo: slotNo });
  res.send("Car is parked thanks and your slot no is :" + slotNo);
  slotNo++;
});

// /api/parkcar?slotNumber=123
app.get("/api/unparkcar", (req, res, next) => {
    let index = carSlotMap.findIndex(obj => obj.slotNo === parseInt(req.query.slotNumber));    
    vacatedSlots.push(parseInt(req.query.slotNumber));
    carSlotMap.splice(index, 1);    
    console.log(carSlotMap);
});

// /api/getinfo?carNumber=2343 or /api/getinfo?slotNumber=1
app.get("/api/getinfo", (req, res, next) => {
    if(req.query.carNumber) {
        res.send(carSlotMap.filter(obj => obj.carNo === parseInt(req.query.carNumber)));
    } else if (req.query.slotNumber) {        
        res.send(carSlotMap.find(obj => obj.slotNo === parseInt(req.query.slotNumber)));
    }
});


// PORT use -> set PORT=5000 in ur CMD
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening at "+ port +"..."));