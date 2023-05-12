import React from 'react';
import Footer from '../components/Layout/Footer';
import directionImg from '../assets/images/weather_icons/direction.png';

import { useAppDispatch, useAppSelector } from '../store/store';
import {
  getCurrentWeather,
  getAirPollution,
  getForecast,
} from '../store/WeatherSlice';
import { getImage } from '../utils/imageUrl';

import { useEffect } from 'react';



function WeatherScreen() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.weather.loading);

  const weather = useAppSelector((state) => state.weather.currentWeatherData);
  const airPollution = useAppSelector(
    (state) => state.weather.airPollutionData
  );
  const weatherToday = useAppSelector(
    (state) => state.weather.weatherTodayData
  );
  const windToday = useAppSelector((state) => state.weather.windTodayData);
  const fiveDayForecast = useAppSelector(
    (state) => state.weather.fiveDayForecastData
  );

  const currentCity = useAppSelector((state) => state.weather.currentCity);
  const currentLocation = useAppSelector( (state) => state.weather.location);
  
  const badgeClassName = 'badge label-1 aqi-' + airPollution.aqi;


  useEffect(() => {
    dispatch(getCurrentWeather({ lat: currentLocation.lat, lon: currentLocation.lon}));
    dispatch(getAirPollution({ lat: currentLocation.lat, lon: currentLocation.lon}));
    dispatch(getForecast({ lat: currentLocation.lat, lon: currentLocation.lon}));
  }, [dispatch, currentLocation,currentCity]);
  return (
    <main>
      <article className="container" data-container>
        <div className="content-left">
          <section
            className="section current-weather"
            aria-label="current weather"
            data-current-weather
          >
            <div className="card card-lg current-weather-card">
              <h2 className="title-2 card-title">Now</h2>

              <div className="weapper">
                <p className="heading">
                  {weather.temp}&deg;<sup>c</sup>
                </p>
                <img
                  src={getImage(weather.icon)}
                  width="64"
                  height="64"
                  alt="Overcast Clouds"
                  className="weather-icon"
                />
              </div>

              <p className="body-3">{weather.description}</p>

              <ul className="meta-list">
                <li className="meta-item">
                  <span className="m-icon">calendar_today</span>
                  <p className="title-3 meta-text">{weather.date}</p>
                </li>
                <li className="meta-item">
                  <span className="m-icon">location_on</span>
                  <p className="title-3 meta-text">{currentCity}</p>
                </li>
              </ul>
            </div>
          </section>

          <section
            className="section forecast"
            aria-labelledby="forecast-label"
            data-5-day-forecast
          >
            <h2 className="title-2" id="forecast-label">
              5 Days Forecast
            </h2>

            <div className="card card-lg forecast-card">
              <ul>
                {fiveDayForecast.map((item,index) => (
                  <li className="card-item" key={index}>
                    <div className="icon-wrapper">
                      <img
                        src={getImage(item.icon)}
                        alt={item.description}
                        className="weather-icon"
                        width="36"
                        height="36"
                        title={item.description}
                      />
                      <span className="span">
                        <p className="title-2">{item.temp_max}&deg;</p>
                      </span>
                    </div>
                    <p className="label-1">{item.date} {item.month}</p>
                    <p className="label-1">{item.day}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="content-right">
          <section
            className="section highlights"
            aria-labelledby="highlights-label"
            data-highlights
          >
            <section className="section highlights">
              <div className="card card-lg">
                <h2 className="title-2">Today's Highlights</h2>
                <div className="highlight-list">
                  <div className="card card-sm highlight-card one">
                    <h3 className="title-3">Air Quality Index</h3>
                    <div className="wrapper">
                      <span className="m-icon">air</span>
                      <ul className="card-list">
                        <li className="card-item">
                          <p className="title-1">{Math.round(airPollution.pm2_5*10)/10}</p>
                          <p className="label-1">
                            PM<sub>2.5</sub>
                          </p>
                        </li>
                        <li className="card-item">
                          <p className="title-1">{Math.round(airPollution.so2*10)/10}</p>
                          <p className="label-1">
                            SO<sub>2</sub>
                          </p>
                        </li>
                        <li className="card-item">
                          <p className="title-1">{Math.round(airPollution.no2*10)/10}</p>
                          <p className="label-1">
                            NO<sub>2</sub>
                          </p>
                        </li>
                        <li className="card-item">
                          <p className="title-1">{Math.round(airPollution.o3*10)/10}</p>
                          <p className="label-1">
                            O<sub>3</sub>
                          </p>
                        </li>
                      </ul>
                    </div>

                    <span className={badgeClassName} title="aqi message">
                      {airPollution.level}
                    </span>
                  </div>
                  <div className="card card-sm highlight-card two">
                    <h3 className="title-3">Sunrise & Sunset</h3>

                    <div className="card-list">
                      <div className="card-item">
                        <span className="m-icon">clear_day</span>
                        <div>
                          <p className="label-1">Sunrise</p>
                          <p className="title-1">{weather.sunrise}</p>
                        </div>
                      </div>
                      <div className="card-item">
                        <span className="m-icon">clear_night</span>
                        <div>
                          <p className="label-1">Sunset</p>
                          <p className="title-1">{weather.sunset}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card card-sm highlight-card">
                    <h3 className="title-3">Humidity</h3>
                    <div className="wrapper">
                      <span className="m-icon">humidity_percentage</span>
                      <p className="title-1">
                        {weather.humidity}
                        <sup>%</sup>
                      </p>
                    </div>
                  </div>
                  <div className="card card-sm highlight-card">
                    <h3 className="title-3">Pressure</h3>
                    <div className="wrapper">
                      <span className="m-icon">airwave</span>
                      <p className="title-1">
                        {weather.pressure}
                        <sup>hpa</sup>
                      </p>
                    </div>
                  </div>
                  <div className="card card-sm highlight-card">
                    <h3 className="title-3">Visibility</h3>
                    <div className="wrapper">
                      <span className="m-icon">visibility</span>
                      <p className="title-1">
                        {weather.visibility}
                        <sup>km</sup>
                      </p>
                    </div>
                  </div>
                  <div className="card card-sm highlight-card">
                    <h3 className="title-3">Feels Like</h3>
                    <div className="wrapper">
                      <span className="m-icon">thermostat</span>
                      <p className="title-1">
                        {weather.feels_like}&deg;<sup>c</sup>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section
            className="section hourly-forecast"
            aria-label="hourly forecast"
            data-hourly-forecast
          >
            <h2 className="title-2">Today at</h2>
            <div className="slider-container">
              <ul className="slider-list">
                {weatherToday.map((item, index) => {
                  return (
                    <li className="slider-item" key={index}>
                      <div className="card card-sm slider-card">
                        <p className="body-3">{item.dateTime}</p>
                        <img
                          src={getImage(item.icon)}
                          width="48"
                          height="48"
                          loading="lazy"
                          alt={item.description}
                          className="weather-icon"
                        />
                        <p className="body-3">{item.temp}&deg;</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <ul className="slider-list">
                {windToday.map((item, index) => {
                  return (
                    <li className="slider-item" key={index}>
                      <div className="card card-sm slider-card">
                        <p className="body-3">{item.dateTime}</p>
                        <img
                          src={directionImg}
                          width="48"
                          height="48"
                          loading="lazy"
                          alt="direction"
                          className="weather-icon"
                          style={{
                            transform: `rotate(${item.windDirection}deg)`,
                          }}
                        />
                        <p className="body-3">{item.windSpeed} km/h</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <Footer />
        </div>

        <div className="loading" style={isLoading ? {display:'grid' } : undefined}></div>
      </article>
    </main>
  );
}

export default WeatherScreen;
