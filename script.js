
    async function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      const weatherResult = document.getElementById('weatherResult');
      const errorMsg = document.getElementById('errorMsg');
      weatherResult.innerHTML = '';
      errorMsg.innerText = '';

      if (!city) {
        errorMsg.innerText = 'Please enter a city name.';
        return;
      }

      const apiKey = '615011c98381dc0568ac19121f931c14';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();

        weatherResult.innerHTML = `
          <div class="temperature">${Math.round(data.main.temp)}&deg;C</div>
          <div class="description">${data.weather[0].description}</div>
          <div class="icon">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}" />
          </div>
        `;
      } catch (error) {
        errorMsg.innerText = error.message;
      }
    }