//-----------------All Charts
function WF_Temp_act(data,date){
    const ctx = document.getElementById('Temp').getContext('2d');
    const height = window.innerHeight
    const gradientcolor = ctx.createLinearGradient(0, 0, 0, height)
    //x0=startingpoint horizontal
    //y0=startingpoint vertical
    //x1 = endingpoint horizontal
    //y1 = endpoint vertikal
    gradientcolor.addColorStop(0, 'rgba(102,130,208,0.8)')
    gradientcolor.addColorStop(0.3, 'rgba(222,225,229,0.0)')
    Graphtemp = new Chart(ctx, {            //Global
        
        type: 'line',
        data: {
          labels: date,
          datasets: [{
            label: false,
            fill:true,
            backgroundColor: gradientcolor,
            borderColor: '#344A75',
            borderWidth: 5, //stroke thickness
            tension:0.2, //kurved
            data: data
            
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          maintainAspectRatio:false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
      }
    })
    
    }
function WF_Hum_act(data,date){
    const ctx = document.getElementById('Humi').getContext('2d');
    const height = window.innerHeight
    const gradientcolor = ctx.createLinearGradient(0, 0, 0, height)
    //x0=startingpoint horizontal
    //y0=startingpoint vertical
    //x1 = endingpoint horizontal
    //y1 = endpoint vertikal
    gradientcolor.addColorStop(0, 'rgba(102,130,208,0.8)')
    gradientcolor.addColorStop(0.3, 'rgba(222,225,229,0.0)')
    GraphHumi = new Chart(ctx, {            //Global
        
        type: 'line',
        data: {
          labels: date,
          datasets: [{
            label: false,
            fill:true,
            backgroundColor: gradientcolor,
            borderColor: '#344A75',
            borderWidth: 5, //stroke thickness
            tension:0.2, //kurved
            data: data
            
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          maintainAspectRatio:false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
      }
    })
    
    }
function WF_Pres_act(data,date){
    const ctx = document.getElementById('Windspeed').getContext('2d');
    const height = window.innerHeight
    const gradientcolor = ctx.createLinearGradient(0, 0, 0, height)
    //x0=startingpoint horizontal
    //y0=startingpoint vertical
    //x1 = endingpoint horizontal
    //y1 = endpoint vertikal
    gradientcolor.addColorStop(0, 'rgba(102,130,208,0.8)')
    gradientcolor.addColorStop(0.3, 'rgba(222,225,229,0.0)')
    GraphPres = new Chart(ctx, {            //Global
        
        type: 'line',
        data: {
          labels: date,
          datasets: [{
            label: false,
            fill:true,
            backgroundColor: gradientcolor,
            borderColor: '#344A75',
            borderWidth: 5, //stroke thickness
            tension:0.2, //kurved
            data: data
            
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          maintainAspectRatio:false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
      }
    })
    
    }

const defaultvalue = [0,0,0,0,0]
const defaulttext = ['','','','','']
WF_Temp_act(defaultvalue,defaulttext)
WF_Hum_act(defaultvalue,defaulttext)
WF_Pres_act(defaultvalue,defaulttext)

//AverageCharts()
document.getElementById(`avg`).click();
//-----------------Average Data
function AverageCharts(){
  const response = getApiData_Forecast()
  response.then(function(result){
    const avgData = result.AVGValues[0]
    Graphtemp.destroy()
    GraphHumi.destroy()
    GraphPres.destroy()
    WF_Temp_act(JSON.parse(avgData.avgTemp),JSON.parse(avgData.Weekday))
    WF_Hum_act (JSON.parse(avgData.avgHumi),JSON.parse(avgData.Weekday))
    WF_Pres_act(JSON.parse(avgData.avgWind),JSON.parse(avgData.Weekday))
  })
}


//-----------------Actual Data
function ActualCharts(){
  const response = getApiData_Forecast()
  response.then(function(result){
    const actualData = result.ActualValues[0]
    
    Graphtemp.destroy()
    GraphHumi.destroy()
    GraphPres.destroy()
    WF_Temp_act((JSON.parse(actualData.allTemp))[0],(JSON.parse(actualData.allDay))[0])
    WF_Hum_act ((JSON.parse(actualData.allHumi))[0],(JSON.parse(actualData.allDay))[0])
    WF_Pres_act((JSON.parse(actualData.allWind))[0],(JSON.parse(actualData.allDay))[0])
  })
}
//--------------Get Data from databse

//async function getApiData_Forecast(){
//  try{const api_url = `/Database_act/`
//      const response =  await fetch(api_url)
//      .then(res => res.json())
//      .catch(e => {
//        
//          console.error({
//              "message" : "error",
//              error : e,
//              
//          })
//      })
//      Displaystatic(response)
//      return response 
//      }catch(err){
//      console.log(err)
//    }
//}  
//
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