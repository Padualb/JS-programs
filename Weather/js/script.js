let weatherAPIkey = 'b55002c98650706b2d6e3c1d6907a2ea';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIkey;
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIkey;

let city = document.querySelector(".weather-city");
let day = document.querySelector(".weather-day");
let humidity = document.querySelector(".weather-indicator-humidity>.value");
let pressure = document.querySelector(".weather-indicator-pressure>.value");
let status = document.querySelector(".weather-indicator-status>.value");
let image = document.querySelector("weather-image");
let temperature = document.querySelector(".weather-temperature>.value");
let search = document.querySelector(".weather-search");
let forecastBlock = document.querySelector('.weather-forecast');
let weatherImage = document.querySelector('.weather-image');



let getWeatherByCityName = async(city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
    
}

let weatherForCity = async (city) => {
    let weather = await getWeatherByCityName(city);
        updateCurrentWeather(weather);
        weatherCityImg(weather);
        let forecast = await getForecastByCityID(weather.id);
        updateForecast(forecast);

}

search.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13){
        weatherForCity(search.value)
        
    }
})


let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', '+ data.sys.country;
    temperature.textContent = Math.round(data.main.temp) + '°';
    day.textContent = dayOfWeek();
    status.textContent =  firstLetterUp(data.weather[0].description);
    humidity.textContent = data.main.humidity + '%';
    pressure.textContent = data.main.pressure + 'hPa';
}

let weatherCityImg = (data) =>{
    weatherDes = data.weather[0].description.replace(' ', '-');
    weatherMain = data.weather[0].main;
    
    
    var img = new Image();
    file = 'assets/images/' + weatherDes + '.png';
    img.src = file;
    
    img.onload = function() {
        weatherImage.src = file;
      }
    img.onerror = function() {
        weatherImage.src = 'assets/images/' + weatherMain + '.png';
      }
  
     

}

let dayOfWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString('en-EN', {'weekday' : 'long'});
    
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
    return daily;
}

let updateForecast = (forecast) => {
    forecastBlock.innerHTML = '';
    forecast.forEach(day =>{
        let iconUrl = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
        let dayName = dayOfWeek(day.dt * 1000);
        let temp = Math.round(day.main.temp) + '°';
        let forecastItem = `
            <article class="weather-forecast-item">
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="weather-forecast-item">
                <h3 class="weather-forecast-day">${dayName}</h3>
                <p class="weather-forecast-temperature"><span class="value">${temp}</span></p>
            </article>
        `
        forecastBlock.insertAdjacentHTML('beforeend', forecastItem);
    })
}

let init = async () => {
    await weatherForCity('Sydney');
}

let firstLetterUp = (word) => {
    let firstLetter = word.charAt(0);
    let remainingLetters = word.substring(1)
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + remainingLetters;
}

init();