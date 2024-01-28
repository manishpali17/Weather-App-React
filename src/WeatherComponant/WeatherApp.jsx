import { useState } from "react";
import Input from "./Input";
import InfoBox from "./infoBox.jsx";

const weatherBackgrounds = {
  Clouds: "url('Clouds.jpg')",
  Clear: "url('Clear.jpeg')",
  Snow: "url('Snow.jpeg')",
  Mist: "url('Mist.jpeg')",
  Rain: "url('Drizzle.jpg')",
  Fog: "url('Fog.jpg')",
  Tornado: "url('Tornado.jpeg')",
  Squall: "url('Squall.jpeg')",
  Ash: "url('Ash.webp')",
  Dust: "url('Dust.jpeg')",
  Haze: "url('Haze.jpg')",
  Sand: "url('Sand.jpg')",
  Smoke: "url('Smoke.jpg')",
  Drizzle: "url('Drizzle.jpg')",
  Thunderstorm: "url('Thunderstorm.jpeg')",
};

const defaultBackground =
  "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg')";

export default function WeatherApp() {
  const [info, setInfo] = useState({
    city: "",
    temp: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0,
    feelsLike: 0,
    weather: "",
    main: "",
    icon: "",
  });

  const updateWeatherInfo = (data) => {
    setInfo(data);
  };

  const bodyStyles = {
    backgroundImage: weatherBackgrounds[info.main] || defaultBackground,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100%",
    textAlign: "center",
  };

  return (
    <div className="WeatherApp" style={bodyStyles}>
      <Input handleWeatherInfo={updateWeatherInfo} />
      {info.city && <InfoBox info={info} />}
    </div>
  );
}
