const weatherApi = {
    key: "eb7a2d4a5a9b284fe54b7bb547238443",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keypress", function(event){
    if(event.keyCode == 13){
        getWeatherReport(searchBox.value);
        searchBox.value = "";
    }
});

function getWeatherReport(city) {

    const sCity = city ?? searchBox.value;
    if(!sCity){
        alert("Please Enter City Name!!");
        return;
    }
    let reqCity = sCity;
    //  https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=eb7a2d4a5a9b284fe54b7bb547238443&unit=metric
    fetch(`${weatherApi.baseUrl}?q=${reqCity}&appid=${weatherApi.key}&units=metric`)
        .then(function (response) { return response.json() })
        .then(function (response) {
            showWeatherReport(response);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function showWeatherReport(curWeather){
    let city = document.getElementById("city");
    let date = document.getElementById("date");
    let image = document.getElementById("image");
    let temp = document.getElementById("temp");
    let feel = document.getElementById("feel");
    let weather = document.getElementById("weather");
    let minmaxTemp = document.getElementById("minmaxTemp");
    let humidity = document.getElementById("humidity");
    let pressure = document.getElementById("pressure");
    let visibility = document.getElementById("visibility");
    let windspeed = document.getElementById("windspeed");

    console.log(curWeather);

    city.innerHTML = curWeather.name;

    let todayDate = new Date().toDateString();
    date.innerHTML = todayDate;
    image.src = manageImage(curWeather.weather[0].main);
    temp.innerHTML = Math.round(curWeather.main.temp) + "°C";
    feel.innerHTML = `(Feels Like ${Math.round(curWeather.main.feels_like)}°C)`;
    weather.innerHTML = curWeather.weather[0].main;
    minmaxTemp.innerHTML = `${Math.floor(curWeather.main.temp_min)}°C(min) / ${Math.ceil(curWeather.main.temp_max)}°C(max)`;

    humidity.innerHTML = `<span>Humidity</span> ${curWeather.main.humidity}`;
    pressure.innerHTML = `<span>Pressure</span> ${curWeather.main.pressure}`;
    visibility.innerHTML = `<span>Visibility</span> ${curWeather.visibility}`;
    windspeed.innerHTML = `<span>Wind Speed</span> ${curWeather.wind.speed}`;

}

function manageImage(weatherType) {
    if (weatherType === 'Clear') {

        return "/images/clear.jpg";

    } else if (weatherType === 'Smoke') {

        return "/images/smoke.jpg";

    } else if (weatherType === 'Haze') {

        return "/images/haze.jpg";

    } else if (weatherType === 'Rain') {

        return "/images/rain.jpg";

    } else if (weatherType === 'Snow') {

        return "/images/snow.jpg";

    } else if (weatherType === 'Thunderstorm') {

        return "/images/thunderstorm.jpg";

    } else if (weatherType === 'Mist') {

        return "/images/mist.jpg";

    } else if (weatherType === 'Clouds') {

        return "/images/clouds.jpg";

    }
    else {
        return "/images/clear.jpg";
    }
}

// const toggle = document.getElementById('toggleDark');
// const body = document.getElementById('cont');
// const cbody = document.getElementById('cbody');
// const accordionExample = document.getElementById('accordionExample');

// toggle.addEventListener('click', function(){
//     this.classList.toggle('bi-moon');
//     if(this.classList.toggle('bi-moon-fill')){
//         body.style.background = 'white';
//         body.style.color = 'black';
//         body.style.transition = '2s';
//         cbody.style.color = 'black';
//         cbody.style.transition = '2s';
//         accordionExample.style.color = 'black';
//         accordionExample.style.transition = '2s';
//     }
//     else{
//         body.style.background = 'black';
//         body.style.color = 'white';
//         body.style.transition = '2s';
//         cbody.style.color = 'white';
//         cbody.style.transition = '2s';
//         accordionExample.style.color = 'white';
//         accordionExample.style.transition = '2s';
//     }
// });

var light = true;
function setTheme(){
    if(light){
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-sun fa-lg fa-fw"></i>'

    }
    else{
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-moon fa-lg fa-fw"></i>'

    }
    light = !light;
}