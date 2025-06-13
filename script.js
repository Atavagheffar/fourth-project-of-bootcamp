const apiKey = "e7c69f18a3fd68970857543278eeb063";
const city = "Tehran";

// اطلاعات الان
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`
)
  .then((res) => res.json())
  .then((data) => {
    // document.getElementById("ata").textContent = data.main.humidity;
    document.getElementById("temp").textContent = parseInt(data.main.temp);
    document.getElementById("temp").style.fontSize = "80px";
    document.getElementById("temp").style.fontWeight = "600";
    // document.getElementById("temp").after.conte = "°";
    // °
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    // document.getElementById("desc").textContent = data.weather[0].description;
    // ************************************************************
    document.getElementById("pic").src = `./pic/sunny_color.png`;
    document.getElementById("pic").style.width = "100px";
    document.getElementById("pic").style.height = "100px";
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

// پیش‌بینی ۵ روز آینده
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

      const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      const div = document.createElement("div");
      div.className = "day";
      div.innerHTML = `
        <img src="${iconUrl}" width="48">
        <p>${Math.round(item.main.temp)}°</p>
        <p>${dayName}</p>
      `;
      forecastContainer.appendChild(div);
    });
  });
