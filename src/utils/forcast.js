const postmanRequest = require('postman-request');

const forcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1b94fe41672dfaa8a85d8a8248d61aae&query=${latitude},${longitude}&units=m`;

    postmanRequest({url:url, json:true}, (error, {body})=>{
        if(error) {
            callback('unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(error, {
                weatherCondition: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    });
};

module.exports = forcast;