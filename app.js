let apiKey = "8c8cf22d00eced25f918eb56bae3ca00";

async function getWeather(city) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const weather = await response.json();
  let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
  console.log(message);
  document.getElementById("temp").innerHTML = weather.main.temp;
}
// request(url, function (err, response, body) {
//     if (err) {
//         console.log('error:', error);
//     } else {
//         console.log('body:', body);
//     }

//     let weather = JSON.parse(body);
//     let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//     console.log(message);

// });
