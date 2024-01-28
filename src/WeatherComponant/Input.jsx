import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Alert, AlertTitle } from "@mui/material";

Input.propTypes = {
  handleWeatherInfo: PropTypes.func.isRequired,
};

const appid = import.meta.env.VITE_APP_ID;
const units = "metric";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_CITY = "delhi";

async function getLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    const url = `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${appid}&units=${units}`;
    return url;
  } catch (error) {
    console.error("Error getting location:", error);
    throw new Error("Unable to get your location");
  }
}

export default function Input({ handleWeatherInfo }) {
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    getLocation()
      .then((url) => weatherApi(url))
      .catch(() =>
        weatherApi(
          `${API_BASE_URL}?q=${DEFAULT_CITY}&appid=${appid}&units=${units}`
        )
      );
  }, []);

  async function weatherApi(url) {
    try {
      const res = await fetch(url);
      const jsonRes = await res.json();
      const result = {
        city: jsonRes.name,
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
        main: jsonRes.weather[0].main,
        icon: jsonRes.weather[0].icon,
      };
      handleWeatherInfo(result);
      if (!res.ok) {
        setError("No such place exists in our API");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (e) {
      handleWeatherInfo({});
      setError("error while fetching data form api");
    }
  }

  //did't use useffect because openwether api limit
  const onSubmit = (e) => {
    e.preventDefault();
    weatherApi(`${API_BASE_URL}?q=${city}&appid=${appid}&units=${units}`);
    setCity("");
    setError("");
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        {error && (
          <Alert
            variant="filled"
            onClose={() => {
              setError("");
            }}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <TextField
          onChange={(e) => setCity(e.target.value)}
          value={city}
          id="city"
          label="City Name"
          variant="outlined"
          size="large"
          margin="normal"
          sx={{ bgcolor: "background.paper" }}
        />{" "}
        <br />
        <br />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
}
