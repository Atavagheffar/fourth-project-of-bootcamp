const apiKey = "e7c69f18a3fd68970857543278eeb063";
const city = "Tehran";

// اطلاعات الان
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`
)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById(
      "icon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const today = new Date();
    document.getElementById("today").textContent = today.toLocaleDateString(
      "fa-IR",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
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
        <p>${dayName}</p>
        <img src="${iconUrl}" width="50">
        <p>${Math.round(item.main.temp)}°</p>
      `;
      forecastContainer.appendChild(div);
    });
  });
