async function getApiData_Forecast(){
    try{const api_url = `/Database_act/`
        const response =  await fetch(api_url)
        .then(res => res.json())
        .catch(e => {
          
            console.error({
                "message" : "error",
                error : e,
                
            })
        })
        Displaystatic(response)
        return response 
        }catch(err){
        console.log(err)
      }
  }  
//--------------Location ->Lat,Lon
  async function getApiData(lat,lon,city,country){
    if(error_g){
      document.getElementById("error").remove()
      error_g=false
    }else{}

    const api_url = `/weather_forecast/${lat},${lon},${city},${country}`
    const response =  await fetch(api_url)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message" : "error",
            error : e,
        })
    })
   
}