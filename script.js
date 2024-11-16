document.addEventListener('DOMContentLoaded', () => {
    const manualCityInput = document.getElementById('manual-city');
    const searchButton = document.getElementById('search-button');
    const cityName = document.getElementById('city-name');
    const weatherDesc = document.getElementById('weather-description');
    const weatherDetails = document.getElementById('weather-details');
    const alertInfo = document.getElementById('alert-info');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const apiKey = 'e3f8222c1c13451da8e110207241611'; // Replace with your WeatherAPI key
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    // Default city to be displayed initially
    manualCityInput.value = 'New Delhi';

    // Function to fetch weather data
    function fetchWeatherData(city) {
        fetch(`${baseUrl}?key=${apiKey}&q=${city}&aqi=no`)
            .then(response => response.json())
            .then(data => {
                const currentWeather = data.current;
                const location = data.location;

                cityName.textContent = `${location.name}, ${location.country}`;
                weatherDesc.textContent = `Condition: ${currentWeather.condition.text}`;
                weatherDetails.innerHTML = `
                    Temperature: ${currentWeather.temp_c}°C<br>
                    Wind Speed: ${currentWeather.wind_kph} km/h<br>
                    Humidity: ${currentWeather.humidity}%`;

                // Check for alerts
                if (data.alerts && data.alerts.alert) {
                    alertInfo.style.display = 'block';
                    alertInfo.textContent = `Red Alert: ${data.alerts.alert[0].headline}`;
                } else {
                    alertInfo.style.display = 'none';
                }

                // Add animation based on weather condition
                addWeatherAnimation(currentWeather.condition.text);
            })
            .catch(error => {
                alert('Failed to fetch weather data');
                console.error(error);
            });
    }

    // Weather animation effects
    function addWeatherAnimation(weatherCondition) {
        document.body.classList.remove('rain-animation');

        if (weatherCondition.toLowerCase().includes('rain')) {
            document.body.classList.add('rain-animation');
        } else if (weatherCondition.toLowerCase().includes('clear')) {
            document.body.style.background = 'linear-gradient(135deg, #87CEEB, #f0f8ff)';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #ffcc00, #ff6600)';
        }
    }

    // Initially fetch weather data for New Delhi
    fetchWeatherData('New Delhi');

    // Handle search button click to fetch weather of entered city
    searchButton.addEventListener('click', () => {
        const city = manualCityInput.value;
        if (city.trim() !== '') {
            fetchWeatherData(city);
        } else {
            alert('Please enter a valid city name.');
        }
    });

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    });
});
