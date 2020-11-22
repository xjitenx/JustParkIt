// Make an IP Entry or work on existing entry
function makeIpEntry(paramIp) {
  let indexOfIp = userIpRequest.findIndex((obj) => obj.ipAddress === paramIp);
  if (indexOfIp !== -1) {    
    if (parseInt(new Date() - userIpRequest[indexOfIp].time) / 1000 <= 10) {
      if (userIpRequest[indexOfIp].counter < 10) {
        userIpRequest[indexOfIp].counter++;
      } else {
        return false;
      }
    } else {
      userIpRequest[indexOfIp].time = new Date();
      userIpRequest[indexOfIp].counter = 1;
    }
  } else {
    userIpRequest.push({
      ipAddress: paramIp,
      time: new Date(),
      counter: 1,
    });
  }
  return true;
}

module.exports = {
  makeIpEntry,
};
