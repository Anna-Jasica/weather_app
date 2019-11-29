const apiKey = "bbec0d1829218955d05c457c1d23fee5";

document.addEventListener("DOMContentLoaded", function() {
  const myCity = "Kraków";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=metric&appid=${apiKey}`;
  let temp, description, humidity, pressure, city, icon, countryCode;
  let today = new Date();
  //Current weather
  let currentWeatherHtml = document.querySelector(".wrapperContent");
  let currentDateHtml = currentWeatherHtml.firstElementChild;
  let descHtml = currentWeatherHtml.lastElementChild;
  let cityHtml = document.querySelector(".wrapperContent p:nth-child(2)");
  let tempHtml = document.querySelector(".wrapperContent p:nth-child(5)");

  //Next 5 days weather
  let futureWeatherHtml = document.querySelectorAll(
    ".fiveDaysWeather div p:first-child"
  );

  ////Get and set weather info
  const weather = async () => {
    //Retrieve weather data from API
    let response = await fetch(url);
    if (!response.ok) {
      Promise.reject(response);
    }
    let data = await response.json();
    return data;
  };

  /*Initialize variables with specific values.
              Returns an array
            */
  function setValues(data) {
    temp = Math.round(data.main.temp);
    description = data.weather[0].description;
    humidity = data.main.humidity;
    pressure = data.main.pressure;
    city = data.name;
    icon = data.weather[0].icon;
    countryCode = data.sys.country;
    return {
      temp,
      description,
      humidity,
      pressure,
      city,
      icon
    };
  }

  ////Get and set date info
  function getFullDay(date) {
    //Returns the name of the given weekday
    return date.toLocaleString("en-us", {
      weekday: "long"
    });
  }
  const getNextFiveDays = function(startDate, daysNum) {
    //Returns an array with daysNum number of days from startDate
    var xDays = [];
    for (var i = 0; i <= daysNum; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      xDays.push(getFullDay(currentDate));
    }
    return xDays;
  };

  const dates = {
    weekDay: getNextFiveDays()[0],
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    nextFiveDays: getNextFiveDays(today, 5)
  };

  ////Inject data into html
  const setHtml = data => {
    //Insert weather info into html document
    tempHtml.innerHTML = data.temp + "&deg C";
    descHtml.innerHTML =
      data.description.charAt(0).toUpperCase() + data.description.slice(1);
    //Fix for spelling
    if (city === "Krakow") {
      cityHtml.innerHTML = "Cracow";
    } else {
      cityHtml.innerHTML = city;
    }
    //Insert date info into html
    currentDateHtml.innerHTML = `${dates.day}.${dates.month}.${dates.year}`;
    for (var i = 0; i <= 6; i++) {
      if (futureWeatherHtml[i]) {
        futureWeatherHtml[i].innerHTML = dates.nextFiveDays[i + 1];
      }
    }
    //Set img src for icons
    document.getElementById("image").src =
      "http://openweathermap.org/img/wn/" + data[5] + "@2x.png";
  };
  weather()
    .then(res => setValues(res))
    .then(res => setHtml(res))
    .catch(err => console.log("Error: ", err.status));
  getWeatherForNextDays("Cracow");
});

async function getWeatherForNextDays(city) {
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const weather = await response.json();

  console.log(weather);

  // let today = new Date();

  // let tomorrow = today.getDate() + 1;
  // console.log(tomorrow);

  // let dailyWeather;

  // for (let i = 0; i < weather.length; i++) {
  //   if (weather[i].dt_txt >= tomorrow) {
  //     const dailyWeather = weather.list.filter(element => {
  //       return element.dt_txt.includes("21:00");
  //     });
  //   }
  // }

  const dailyWeather = weather.list.filter(element => {
    return element.dt_txt.includes("15:00");
  });

  const degrees = document.getElementsByClassName("degrees");

  const dayNames = document.getElementsByClassName("dayName");

  const icons = document.getElementsByClassName("icon");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  console.log(dailyWeather);
  for (let i = 0; i < dayNames.length; i++) {
    degrees[i].innerHTML = dailyWeather[i].main.temp + "&deg C";
    const date = new Date(dailyWeather[i].dt * 1000);
    console.log(date);
    dayNames[i].innerHTML = days[date.getDay()];
    icons[
      i
    ].src = `http://openweathermap.org/img/wn/${dailyWeather[i].weather[0].icon}@2x.png`;
  }
}
