const apiKey = "e7c69f18a3fd68970857543278eeb063";
const city = "Tehran";

// current data
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`
)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("temp").textContent = parseInt(data.main.temp);
    document.getElementById("temp").style.fontSize = "70px";
    document.getElementById("temp").style.fontWeight = "600";

    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    // ************* new weather pic
    let mainWeather = data.weather[0].main; // مثلا "Rain"
    let description = data.weather[0].description; // مثلا "بارش باران متوسط"
    let weatherId = data.weather[0].id;
    console.log("weatherId", weatherId);
    console.log(mainWeather, description);
    console.log("------------------------");

    let iconPath = "";

    switch (mainWeather) {
      case "Clear":
        iconPath = "./pic/sunny_color.png";
        break;
      case "Clouds":
        iconPath = "./pic/cloud_color.png";
        break;
      case "Rain":
        iconPath = "./pic/wet_color.png";
        break;
      case "Snow":
        iconPath = "./pic/snow_color.png";
        break;
      default:
        iconPath = "./pic/full_moon_color.png";
    }
    document.getElementById("weatherPic").src = iconPath;
    document.getElementById("weatherDesc").innerText = description;
    document.getElementById("weatherPic").style.width = "100px";
    document.getElementById("weatherPic").style.height = "100px";
    // ************************************************************
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("cityName2").textContent = data.name;
    // ************************************************************
    const today = new Date();
    document.getElementById("today").textContent = today.toLocaleDateString(
      "fa-IR",
      { day: "numeric", weekday: "long", month: "long" }
    );
  });

// 5 days forecast
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fa`
)
  .then((res) => res.json())
  .then((data) => {
    const forecastContainer = document.getElementById("forecast");
    const noonForecasts = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    noonForecasts.forEach((item) => {
      const date = new Date(item.dt_txt);
      const dayName = date.toLocaleDateString("fa-IR", {
        weekday: "short",
      });

      let weatherDescDown = data.list[0].weather[0].main;
      console.log("weatherDescDown", weatherDescDown);

      let weatherDesc2 = data.list[0].weather[0].description;
      console.log("weatherDesc2", weatherDesc2);

      let iconUrl = "";
      switch (weatherDescDown) {
        case "Clear":
          iconUrl = "./pic/sunny_color.png";
          break;
        case "Clouds":
          iconUrl = "./pic/cloud_color.png";
          break;
        case "Rain":
          iconUrl = "./pic/wet_color.png";
          break;
        case "Snow":
          iconUrl = "./pic/snow_color.png";
          break;
        default:
          iconUrl = "./pic/full_moon_color.png";
      }

      //----------------------------------------
      const div = document.createElement("div");
      div.className = "day";
      div.innerHTML = `
        <img src="${iconUrl}" width="48">
        <p>${Math.round(item.main.temp)}°</p>
        <p>${weatherDesc2}</p>
        <p>${dayName}</p>
      `;
      forecastContainer.appendChild(div);
      console.log("+++++++");
    });
  });
