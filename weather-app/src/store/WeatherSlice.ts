import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  url,
  weekDayNames,
  monthNames,
  getDate,
  getHours,
  getTime,
  mps_to_kmh,
  getAqiLevel,
} from './api';

interface CurrentWeatherDataObject {
  date: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  visibility: number;
}

interface AirPollutionDataObject {
  aqi: number;
  level: string;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
}

interface WeatherTodayObject {
  dateTime: string;
  temp: number;
  icon: string;
  description: string;
}

interface WindTodayObject {
  dateTime: string;
  windSpeed: number;
  windDirection: number;
}

interface FiveDayForecastObject {
  icon: string;
  description: string;
  temp_max: number;
  date: number;
  month: string;
  day: string;
}


export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async () => {
    const response = await axios.get(
      url.currentWeather('lat=51.5073219', 'lon=-0.1276474')
    );
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = response.data;

    const [{ description, icon }] = weather;

    const date = getDate(dateUnix, timezone);
    const sunrise = getTime(sunriseUnixUTC, timezone);
    const sunset = getTime(sunsetUnixUTC, timezone);
    const windSpeed = mps_to_kmh(visibility);

    // console.log(
    //   date,
    //   description,
    //   icon,
    //   temp,
    //   feels_like,
    //   pressure,
    //   humidity,
    //   sunrise,
    //   sunset,
    //   windSpeed
    // );

    return {
      date,
      description,
      icon,
      temp: Math.round(temp),
      feels_like: Math.round(feels_like),
      visibility: visibility / 1000,
      pressure,
      humidity,
      sunrise,
      sunset,
      windSpeed,
    };
  }
);

export const getAirPollution = createAsyncThunk(
  'weather/getAirPollution',
  async () => {
    const response = await axios.get(
      url.airPollution('lat=51.5073219', 'lon=-0.1276474')
    );
    const { list } = response.data;
    const [{ components, main }] = list;
    const { aqi } = main;

    const { no2, o3, so2, pm2_5 } = components;

    // console.log(aqi, no2, o3, so2, pm2_5);

    const level = getAqiLevel(aqi);

    return {
      aqi,
      level,
      no2,
      o3,
      so2,
      pm2_5,
    };
  }
);

export const getForecast = createAsyncThunk('weather/getForecast', async () => {
  const response = await axios.get(
    url.forecast('lat=51.5073219', 'lon=-0.1276474')
  );
  const {
    list: forecastList,
    city: { timezone },
  } = response.data;

  const weatherToday = [] as WeatherTodayObject[];
  const windToday = [] as WindTodayObject[];

  const fiveDayForecast = [] as FiveDayForecastObject[];

  for (const data of forecastList.slice(0, 8)) {
    const {
      dt: dateTimeUnix,
      main: { temp },
      weather,
      wind: { deg: windDirection, speed: windSpeed },
    } = data;
    const [{ icon, description }] = weather;

    const dateTime = getHours(dateTimeUnix, timezone);
    weatherToday.push({
      dateTime,
      icon,
      description,
      temp: Math.round(temp),
    });

    windToday.push({
      dateTime,
      windDirection: windDirection - 180,
      windSpeed: Math.round(mps_to_kmh(windSpeed)),
    });
  }

  for (let i = 7, len = forecastList.length; i < len; i += 8) {
    const {
      main: { temp_max },
      weather,
      dt_txt
    } = forecastList[i];
    const [{ icon, description }] = weather
    const date = new Date(dt_txt);

    fiveDayForecast.push({
      icon,
      description,
      temp_max:parseInt(temp_max),
      date:date.getDate(),
      month:monthNames[date.getUTCMonth()],
      day:weekDayNames[date.getUTCDay()]
    })
  }

  return { weatherToday, windToday, fiveDayForecast };
});

const initialState = {
  currentWeather: { lat: -35.28255, lng: 149.1333022 },
  currentWeatherData: {} as CurrentWeatherDataObject,
  airPollutionData: {} as AirPollutionDataObject,
  weatherTodayData: [] as WeatherTodayObject[],
  windTodayData: [] as WindTodayObject[],
  fiveDayForecastData: [] as FiveDayForecastObject[],
  loading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.currentWeatherData = action.payload;
    });
    builder.addCase(getAirPollution.fulfilled, (state, action) => {
      state.loading = false;
      state.airPollutionData = action.payload;
    });
    builder.addCase(getForecast.fulfilled, (state, action) => {
      state.loading = false;
      state.weatherTodayData = action.payload!.weatherToday;
      state.windTodayData = action.payload!.windToday;
      state.fiveDayForecastData = action.payload!.fiveDayForecast;
    });
  },
});

export default weatherSlice.reducer;
