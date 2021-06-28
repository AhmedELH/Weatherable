window.addEventListener('load', () => {
    let lon;
    let lat;
    const locationRegion = document.querySelector('.location-name');
    const dateTime = document.querySelector('.date');
    const locationTemp = document.querySelector('.location-temp');
    let weatherDesc = document.querySelector('.description');
    const feelsLikeTemp = document.querySelector('.feels-like');
    const observedOn = document.querySelector('.observed-on');
    const clouds = document.querySelector('.clouds');
    const humidityLevel = document.querySelector('.humidity');
    const pressureLevel = document.querySelector('.pressure');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureUnit = document.querySelector('.temperature-unit');
    const uvIndex = document.querySelector('.summary-uv');
    const visibilityLevel = document.querySelector('.summary-visibility');
    const windDegree = document.querySelector('.summary-wind__degree');
    const windDir = document.querySelector('.summary-wind__direction');
    const windSpeed = document.querySelector('.summary-wind__speed');




    const myKey = "ce59712064ebbdc8ac39591b07cae1a3";
    const testkey = "708f548c38fb3ee89f3d709b983228d8";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherstack.com/current?access_key=${myKey}&query=${lat},${lon}`

            fetch(api)
                .then(Response => {
                    return Response.json();
                })

                .then(data => {
                    

                    const { country, localtime, name, region } = data.location;
                    const { temperature, feelslike, observation_time, cloudcover, humidity, pressure, weather_code } = data.current;
                    const { uv_index, visibility, wind_degree, wind_dir, wind_speed } = data.current;
                    const weather_descriptions = data.current.weather_descriptions[0];




                    locationRegion.textContent = region;
                    dateTime.textContent = localtime;
                    locationTemp.textContent = temperature + "\u00B0";
                    weatherDesc.textContent = weather_descriptions;
                    feelsLikeTemp.textContent = "Feels like: " + feelslike + "\u00B0";
                    observedOn.textContent = "Observed on: " + observation_time;
                    clouds.textContent = cloudcover + "%";
                    humidityLevel.textContent = humidity + "%";
                    pressureLevel.textContent = pressure;
                    uvIndex.textContent = uv_index;
                    visibilityLevel.textContent = visibility;
                    windDegree.textContent = wind_degree + "\u00B0";
                    windDir.textContent = wind_dir;
                    windSpeed.textContent = wind_speed + " km/h";

                    let icon = weather_code;

                   



                    setIcons(icon, document.querySelector('.icon'));
                    setIcons("122", document.querySelector('.icon__cloud'));
                    setIcons("143", document.querySelector('.icon__pressure'));
                    setIcons("263", document.querySelector('.icon__humidity'));

                    //Celsius to Farenheit

                    let Farenheit = (temperature * 9 / 5) + 32;
                    let celsius = temperature;

                    //Switch between Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureUnit.textContent === "°C") {
                            temperatureUnit.textContent = "°F";
                            locationTemp.textContent = Math.floor(Farenheit);
                        } else {
                            temperatureUnit.textContent = "°C";
                            locationTemp.textContent = temperature;

                        }

                    });




                })


        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        let checkIcon = icon;
        let currentIcon;

        if (checkIcon == "113") {
            currentIcon = "CLEAR_DAY";
        } else if (checkIcon == "116") {
            currentIcon = "PARTLY_CLOUDY_DAY";
        } else if (checkIcon == "119") {
            currentIcon = "CLOUDY";
        } else if (checkIcon == "122") {
            currentIcon = "CLOUDY";
        } else if ((checkIcon == "176") || (checkIcon == "263") || (checkIcon == "266") || (checkIcon == "293") || (checkIcon == "296") || (checkIcon == "299")) {
            currentIcon = "RAIN";
        } else if ((checkIcon == "185") || (checkIcon == "302") || (checkIcon == "305") || (checkIcon == "308") || (checkIcon == "311")) {
            currentIcon = "RAIN";
        } else if (checkIcon == "200") {
            currentIcon = "RAIN";
        } else if (checkIcon == "182") {
            currentIcon = "SLEET";
        } else if ((checkIcon == "179") || (checkIcon == "281") || (checkIcon == "284")) {
            currentIcon = "SNOW";
        } else if (checkIcon == "227") {
            currentIcon = "SNOW";
        } else if (checkIcon == "230") {
            currentIcon = "SNOW";
        } else if (checkIcon == "143") {
            currentIcon = "FOG";
        } else if (checkIcon == "248") {
            currentIcon = "FOG";
        } else if (checkIcon == "260") {
            currentIcon = "FOG";
        }
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }


});