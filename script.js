//Add an event listener to the button
document.getElementById("getWeather").addEventListener("click", function () {
    const apiKey = "b39460d7a9a6c2c41c2665de5073a9a4";//Individual API KEY
    const city = document.getElementById("city").value.trim();//Get the city name
    const output = document.getElementById("output")
    if (!city) {
        output.textContent = "Please enter a city name";
        return;//Stop execution if the input invalid
    }
    //Construct the API URL using city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    //Display a loading message while fetching the data

    output.textContent = "Loading weather data...";

    //Fetch the data from the API
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found or an error occurred");
            }
            return response.json();//Parse the JSON response
        })
        .then((data) => {
            //Extract the weather data from the response
            const temperature = data.main.temp; //Current temperature
            const description = data.weather[0].description; //Weather description
            const humidity = data.main.humidity; //Humidity percentage
            //Create a new DOM element to display the weather data
            output.textContent = "";
            const weatherInfo = document.createElement("div");
            const cityName = document.createElement("p");
            cityName.textContent = `Weather in ${city}:`;//Add city name
            const tempInfo = document.createElement("p");
            tempInfo.textContent = `Temperature: ${temperature} C`;//Add the temperature
            const descInfo = document.createElement("p");
            descInfo.textContent = `Description: ${description}:`;
            const humidityInfo = document.createElement("p");
            humidityInfo.textContent = `Humidity: ${humidity}%`;
            //Append all created elements to the WeatherInfo container
            weatherInfo.appendChild(cityName);
            weatherInfo.appendChild(tempInfo);
            weatherInfo.appendChild(descInfo);
            weatherInfo.appendChild(humidityInfo);

            //Append the weatherInfo to output
            output.appendChild(weatherInfo);
        })
        .catch((error) => {
            //Handle any errors during fetch data
            output.textContent = `Error: ${error.message}`;
        });

});