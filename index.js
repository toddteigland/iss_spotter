const { fetchMyIP, fetchCoordsByIP, nextISSTimesForMyLocation , fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(ip);
// });

// fetchCoordsByIP((ip) => {
//   if(error) {
//     console.log(error);
//   }
//   console.log(data);
// });


const printPassTimes = function(times) {
  for (const pass of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, body) => {
  if (err) {
    console.log(err);
  } else {
    printPassTimes(body);
  }
});

module.exports = {printPassTimes};