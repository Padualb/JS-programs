let weatherAPIkey = 'b55002c98650706b2d6e3c1d6907a2ea';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIkey;
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIkey;

let city = document.querySelector(".weather-city");
let day = document.querySelector(".weather-day");
let humidity = document.querySelector(".weather-indicator-humidity>.value");
let wind = document.querySelector(".weather-indicator-wind>.value");
let pressure = document.querySelector(".weather-indicator-pressure>.value");
let image = document.querySelector("weather-image");
let temperature = document.querySelector(".weather-temperature>.value");
let search = document.querySelector(".weather-search");



let getWeatherByCityName = async(city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
    
}

search.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13){
        let weather = await getWeatherByCityName(search.value);
        updateCurrentWeather(weather);
        getForecastByCityID(weather.id);
    }
})


let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', '+ data.sys.country;
    temperature.textContent = Math.round(data.main.temp) + '°';
    day.textContent = dayOfWeek(data);
    humidity.textContent = data.main.humidity + '%';
    pressure.textContent = data.main.pressure + 'hPa';
    wind.textContent = data.main.wind + '%';

}

let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday' : 'long'})
}

let getForecastByCityID = async (id) => {
    let endpoint = forecastBaseEndpoint + '&id=' + id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];
    

    forecastList.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let hours = date.getHours();
        
        if(hours === 12){
            daily.push(day);
        }

        
    });
}

// https://openweathermap.org/img/wn/10d@2x.png