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
//-----------------Average Data
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