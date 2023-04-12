let weatherAPIkey = 'b55002c98650706b2d6e3c1d6907a2ea';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?appid=' + weatherAPIkey;
let getWeatherByCityName = async(city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    console.log(response);
    
}

getWeatherByCityName('New York');