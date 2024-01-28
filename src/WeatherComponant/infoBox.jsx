import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

InfoBox.propTypes = {
  info: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    feelsLike: PropTypes.number.isRequired,
    weather: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default function InfoBox({ info }) {
  if(!info){
    return null
  }
  return (
    <div className="InfoBox">
      <h1>Weather Info - {info.weather} </h1>
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 180 }}
            image={`http://openweathermap.org/img/wn/${info.icon}@4x.png`}
            title={`Weather icon for ${info.weather}`}
            alt={`Weather icon for ${info.weather}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component={"span"}
            >
              <p>Temp - {info.temp}&deg;C</p>
              <p>Humidity - {info.humidity}</p>
              <p>Min temp - {info.tempMin}&deg;C</p>
              <p>Max temp - {info.tempMax}&deg;C</p>
              <p>
                The weather can be described as {info.weather} and feels like{" "}
                {info.feelsLike}&deg;C
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
