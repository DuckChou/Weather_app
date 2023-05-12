export const api_key = "14aa8751f26b21e4c54e2768274bbb84";

export const url = {
  currentWeather(lat:string, lon:string) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric&appid=${api_key}`
  },
  forecast(lat:string, lon:string) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric&appid=${api_key}`
  },
  airPollution(lat:string, lon:string) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}&appid=${api_key}`
  },
  reverseGeo(lat:string, lon:string) {
    return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5&appid=${api_key}`
  },
  /**
   * @param {string} query Search query e.g.: "London", "New York"
   */
  geo(query:string) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`
  }
}

export const weekDayNames:string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const monthNames:string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];


export const getDate = (dateUnix:number, timezone:number):string => {
  const date = new Date((dateUnix + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}

export const getTime = (timeUnix:number, timezone:number):string => {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  if(minutes < 10){
    return `${hours % 12 || 12}:0${minutes} ${period}`;
  }


  return `${hours % 12 || 12}:${minutes} ${period}`;
}

export const getHours = function (timeUnix:number, timezone:number) {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${period}`;
}

export const mps_to_kmh = (mps:number) => {
  const mph = mps * 3600;
  return mph / 1000;
}

export const getAqiLevel = (aqi:number):string => {
  if(aqi === 1){
    return "Good"
  }else if(aqi === 2){
    return "Fair"
  }else if(aqi === 3){
    return "Moderate"
  }else if(aqi === 4){
    return "Poor"
  }else{
    return "Very Poor"
  }
}

export const aqiText = {
  1: {
    level: "Good",
    message: "Air quality is considered satisfactory, and air pollution poses little or no risk"
  },
  2: {
    level: "Fair",
    message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
  },
  3: {
    level: "Moderate",
    message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
  },
  4: {
    level: "Poor",
    message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects"
  },
  5: {
    level: "Very Poor",
    message: "Health warnings of emergency conditions. The entire population is more likely to be affected."
  }
}