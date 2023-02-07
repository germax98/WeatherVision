//-------------getApiData_Actual
async function getApiData_Actual(lat,lon){
    
    const api_url = `weather_actual/${lat},${lon}`
    const response =  await fetch(api_url)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message" : "error",
            error : e,
        })
    })
    return response
}
    

//-------------getApiData_Forecast
async function getApiData_Forecast(lat,lon,city,country){
    const api_url = `weather_forecast/${lat},${lon},${city},${country}`
    const response =  await fetch(api_url)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message" : "error",
            error : e,
        })
    })
    
    return response
}

//-------------city name -> lat/lon
error_g = false
async function getLocation (cityName){
    
    try {
        if(error_g){
            document.getElementById("error").remove()
            error_g=false
          }else{}
        const response = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${cityName}&format=json&limit=1`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        const lat = data[0].lat
        const lon = data[0].lon
        const city = data[0].address.city

        const country = data[0].address.country
       
        DisplayLocation(lat,lon,city,country)
        const response_actual = getApiData_Actual(lat,lon,city,country)
        response_actual.then(function(resultActual){

            DisplayData_actual(resultActual)
            
        })
        const response_forecast = getApiData_Forecast(lat,lon,city,country)
        response_forecast.then(function(resultForecast){

            DisplayData_forecast(resultForecast)    
            }
            
        )
    } catch (error) {
        document.getElementById("error").innerHTML= 'Unable to Process youre Input please try again.'
        error_g = true
        console.log(error)
    }
}

