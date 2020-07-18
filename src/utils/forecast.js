const request = require("request");

const forecast = (latitutde, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3998b9723b3b97c6ec33ed524321d887&query=${latitutde},${longitude}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      const data = response.body;
      const {
        temperature,
        humidity,
        precip,
        feelslike,
        weather_descriptions,
      } = data.current;

      callback(
        undefined,
        `${weather_descriptions}.temperature is ${temperature} and its feels like it is ${feelslike}. Today humidity is ${humidity} is and it is ${precip} chances of rain`
      );
    }
  });
};

module.exports = forecast;
