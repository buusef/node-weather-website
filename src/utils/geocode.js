const postmanRequest = require('postman-request');

const geocode = (address, callback) => {
    //encodeURIComponent function ensures that special characters are converted correctly to URL characters
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnV1c2VmIiwiYSI6ImNrZXFoajNzeDExbnIycmxnMnB1ZzY1cmUifQ.adrHzmNoG6seitWR6YXwNg.limit=1`;
    postmanRequest({url: url, json:true}, (error, response)=>{
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(response.body.features.length == 0) {
            callback('Not able to find location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;