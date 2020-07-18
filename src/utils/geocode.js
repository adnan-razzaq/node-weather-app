const request = require("request");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWRuYW4xIiwiYSI6ImNrYmY5cjhtaDB0aDcyeXM3OTVjaGtoMHIifQ.Pat_G7EkSXzIcbMczesbtw`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("unable to connect to loaction services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const { features } = body;
      const center = features[0].center;
      const [long, lat] = [...center];
      callback(undefined, {
        longitude: long,
        latitude: lat,
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
