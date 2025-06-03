import axios from "axios";

export const checkRainProbability = async (latitude, longitude, date, hour, probability_threshold) => {
  url = "https://api.open-meteo.com/v1/forecast";

  const response = await axios.get(url, {
    params: {
      latitude,
      longitude,
      hourly: "precipitation_probability",
      start_date: date,
      end_date: date,
    },
  });

  const hourly = response.data.hourly;
  const index = hourly.time.findIndex(t => new Date(t).getHours() === hour)
  const probability = hourly.precipitation_probability[index]
  return{
    willRain: probability >= probability_threshold, 
  probability
  }

};
