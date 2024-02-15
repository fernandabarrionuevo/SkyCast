const apiKey = "7c1f2af89500650ddb69a05c860f0440";

async function getAirQuality(lat, lon){
    const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    try {
  
      const makeFetch = await fetch(url);
      const data = await makeFetch.json();
      return data;
  
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getInfo(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=es&units=metric`;
  
    try {
      const makeFetch = await fetch(url);
      const data = await makeFetch.json();
  
      if (data.cod == "200") {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }


  export const apiConection = {
    getInfo, getAirQuality
  }