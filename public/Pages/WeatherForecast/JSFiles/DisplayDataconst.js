//----------------------Display Data
function Displaystatic(response){
    const actualData = response.ActualValues[0]
    document.getElementById("temp").innerHTML     =       (JSON.parse(actualData.allTemp))[0][0]
    document.getElementById("wind").innerHTML     =       (JSON.parse(actualData.allWind))[0][0]
    document.getElementById("hum").innerHTML      =       (JSON.parse(actualData.allHumi))[0][0]
    document.getElementById("pressure").innerHTML =       (JSON.parse(actualData.allPressure))[0][0]
    document.getElementById("country").innerHTML  =       actualData.Country
    document.getElementById("countrynav").innerHTML  =       actualData.Country
    document.getElementById("city").innerHTML     =       actualData.City
    document.getElementById("lat").innerHTML      =       Math.round((JSON.parse(actualData.Lat)) * 100) / 100
    document.getElementById("lon").innerHTML      =       Math.round((JSON.parse(actualData.Lon)) * 100) / 100
  }

  async function searchCityForecast() {
    var cityName = document.getElementById("search").value;
    await getLocation (cityName)
    setTimeout(() => {AverageCharts()},500)
  }
  error_g = false
  async function getLocation (cityName){
    
    try {
        
        const response = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${cityName}&format=json&limit=1`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        const lat = data[0].lat
        const lon = data[0].lon
        const city = data[0].address.city
        const country = data[0].address.country
        getApiData(lat,lon,city,country)
      }catch (error) {
        document.getElementById("error").innerHTML= 'Unable to Process youre Input please try again.'
        error_g = true
        console.log(error)
    }}
  