 //-------------Request user Position
Submit()
 async function Submit (){
    try{if('geolocation' in navigator){
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(async position => {
        //user lat/lon
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        //lat/lon --> city/country name
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${lat}&lon=${lon}`)
        const data = await response.json()
        const city = data.features[0].properties.geocoding.city
        const country = data.features[0].properties.geocoding.country
        DisplayLocation(lat,lon,city,country)

        const response_actual = getApiData_Actual(lat,lon)

        response_actual.then(function(resultActual){
            
            DisplayData_actual(resultActual)
            
        })
        const response_forecast = getApiData_Forecast(lat,lon,city,country)
        response_forecast.then(function(resultForecast){

            DisplayData_forecast(resultForecast)
            
        })

        
        
      });   
}else{
    console.log('geolocation not available')
}
}catch(error){
    console.log(error)
}
}
    


//-------------search via searchbar
function searchCity() {
    var cityName = document.getElementById("myText").value;
    getLocation(cityName)
  }
