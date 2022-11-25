const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error.message, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;

      callback(Error(msg), null);
      return;
    }

    const parsedBody = JSON.parse(body);


    callback(null, parsedBody.ip);
  });
};


// IP ADDRESS 64.180.195.238


const fetchCoordsByIP = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error.message, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      return msg;
    }

    const parsedBody = JSON.parse(body);
    const latlong = {
      lat: parsedBody.latitude,
      long: parsedBody.longitude
    };
    callback(null, latlong);
  });
};

// COORDINATES { lat: 49.2488091, long: -122.9805104 }

const fetchISSFlyOverTimes = function(latlong, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${latlong.lat}&lon=${latlong.long}`, (error, response, body) => {

    if (error) {
      callback(error.message, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Fly over times. Response: ${body}`;
      return msg;
    }
    const parsedTimes = JSON.parse(body);

    let times = [];
    console.log(times);
    times = parsedTimes.response;

    callback(null, times);
  });

};




const nextISSTimesForMyLocation = function(cb) {
  fetchMyIP((err, ip) => {
    if (err) {
      return cb(err, null);
    }
    fetchCoordsByIP(ip, (err, data) => {
      // cb(null, data);
      if (err) {
        return cb(err, null);
      }
      fetchISSFlyOverTimes(data, (err, info) => {
        if (err) {
          return cb(err, null);
        }

        cb(null, info);
      });

    });
  });

};


module.exports = { fetchMyIP, fetchCoordsByIP, nextISSTimesForMyLocation, fetchISSFlyOverTimes };