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
const url = import.meta.env.VITE_API_URL;
const units = "metric";
const DEFAULT_CITY = "delhi";

async function getLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    const positionUrl = `${url}?lat=${latitude}&lon=${longitude}&appid=${appid}&units=${units}`;
    return positionUrl;
  } catch (error) {
    console.error("Error getting location:", error);
    throw new Error("Unable to get your location");
  }
}

export default function Input({ handleWeatherInfo }) {
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocation()
      .then((url) => weatherApi(url))
      .catch(() =>
        weatherApi(`${url}?q=${DEFAULT_CITY}&appid=${appid}&units=${units}`)
      );
  }, []);

  async function weatherApi(url) {
    try {
      setLoading(true);
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
      setError("Error fetching data from the API");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    weatherApi(`${url}?q=${city}&appid=${appid}&units=${units}`);
    setCity("");
    setError("");
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        {loading && <p>Loading...</p>}
        {error && (
          <Alert variant="filled" onClose={() => setError("")} severity="error">
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
        />
        <br />
        <br />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
}