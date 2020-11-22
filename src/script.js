// Handle limit of the parking lot.
const PARKING_LOT_LIMIT = process.env.LIMIT || 10;

//carSlotMap => { carNo: 7771, slotNo: 3}
let carSlotMap = [];
let vacatedSlots = []; //slots that were occupied once
let globalSlotNo = 0;

// Ip Address LIMIT Handler
let userIpRequest = [];

function parkCar(req, res, next) {
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

function unParkCar(req, res, next) {
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
}

function getInfo(req, res, next) {
    let indexOfIp = userIpRequest.findIndex(obj => obj.ipAddress === req.ip);
    if (indexOfIp !== -1) {
        console.log(parseInt(new Date() - userIpRequest[indexOfIp].time));
        if ((parseInt(new Date() - userIpRequest[indexOfIp].time) / 1000) <= 10) {
            if (userIpRequest[indexOfIp].counter < 10) {
                userIpRequest[indexOfIp].counter++;
            } else {
                res.send('Sorry, you have made way more requests then allowed. Please try again in a short while.');
                return;
            }
        } else {
            userIpRequest[indexOfIp].time = new Date();
            userIpRequest[indexOfIp].counter = 1;
        }
    } else {
        userIpRequest.push({
            ipAddress: req.ip,
            time: new Date(),
            counter: 1
        });
    }
    console.log(userIpRequest);

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
}

module.exports = {
    getInfo,
    unParkCar,
    parkCar
}