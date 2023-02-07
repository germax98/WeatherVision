//-----------------dataProcessingForecast

function dataProcessingForecast(value){
    
    const fcTemp = [], fcdatetxt =[],fchumidity = [],fcpressure = [],fcwind=[]
    value.list.forEach(element => {
        fcTemp.push(element.main.temp)
        fcdatetxt.push(element.dt_txt)
        fchumidity.push(element.main.humidity)
        fcwind.push(element.wind.speed)
        fcpressure.push(element.main.pressure)
        
    });
    processedData = {fcTemp,fcdatetxt,fchumidity,fcwind,fcpressure}
    
    return AvgValues(processedData)
}

//-----------------dataProcessingActual
function dataProcessingActual(value){
    
    const data = value.main
    //Main
    const actualTemp        =   data.temp
    const actualTempMin     =   data.temp_min
    const actualTempMax     =   data.temp_max
    const actualPressure    =   data.pressure
    const actualHumidity    =   data.humidity
    //Wind
    const actualWindspeed         =   value.wind.speed
    //Weather
    const actualWeatherID         =   value.weather[0].id
    const actualWeather           =   value.weather[0].description
    //sunrise/sunset
    const sunrise           =   value.sys.sunrise
    const sunset            =   value.sys.sunset
    //weather Icon
    const icon              =   value.weather[0].icon
    
    const processedData     =   {actualTemp ,actualTempMin,actualTempMax,actualPressure,actualHumidity,actualWindspeed,sunrise,sunset,actualWeatherID,actualWeather,icon}
    

    return processedData  
}

module.exports = {dataProcessingForecast,dataProcessingActual}


function AvgValues(processedData){
    
  const value =   []
  const comp =    []
  const daytxt = []
  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  let count = 0
  //----------------process for the date 
  comp.push(processedData.fcdatetxt[0].split(' ')[0])
  
  processedData.fcdatetxt.forEach(element => {
      
      if(element.split(' ')[0]==comp.at(-1)&& count != 0){
          value.push('')
      }else if (count = 0) {
          value.push(element)
          
      }
      else{
          comp.push(element.split(' ')[0])
          value.push(element.split(' ')[0])
          let d = new Date(element)
          daytxt.push(weekday[d.getDay()])
          
      }
      count +=1
  });
  
  const counter= []
  const eachDaytemp = []
  const eachDayhum = []
  const eachDaywind = []
  const eachDaypress = []
  const eachdaytime = []
  
  comp.shift()
  comp.forEach(element=>{
      counter.push(value.indexOf(element))
      
  })
  // divide the values of temp... in day parts
  for (let i= 0; i<6;i++){
    if(i<5){
        eachdaytime.push(processedData.fcdatetxt.slice(counter[i],counter[i+1]))
        eachDaytemp.push(processedData.fcTemp.slice(counter[i],counter[i+1]))
        eachDayhum.push(processedData.fchumidity.slice(counter[i],counter[i+1]))
        eachDaywind.push(processedData.fcwind.slice(counter[i],counter[i+1]))
        eachDaypress.push(processedData.fcpressure.slice(counter[i],counter[i+1]))
    }else{
        try{
            eachdaytime.push(processedData.fcdatetxt.slice(counter[i],[processedData.fcTemp.length]))
            eachDaytemp.push(processedData.fcTemp.slice(counter[i],[processedData.fcTemp.length]))
            eachDayhum.push(processedData.fchumidity.slice(counter[i],[processedData.fcTemp.length]))
            eachDaywind.push(processedData.fcwind.slice(counter[i],[processedData.fcTemp.length]))
            eachDaypress.push(processedData.fcpressure.slice(counter[i],[processedData.fcTemp.length]))
            
        }catch{
            break
        }
        
    }
  }
  
  let allMessurements = {
    temp:       eachDaytemp,
    humi:       eachDayhum,
    wind:       eachDaywind,
    pressure:   eachDaypress,
  }
  //---------------------
  
  const avgTemp =[]
  const avgHum =[]
  const avgWind = []
  const avgPressure = []
  
Object.entries(allMessurements).forEach(entry => {
    const[key,value]=entry
    value.forEach(day=>{
        let Sum = 0 
        day.forEach(content =>{
            Sum+=content
        })
        if(key=='temp'){
            avgTemp.push(Math.round((Sum/day.length) * 100) / 100)
        }else if(key == 'humi'){
            avgHum.push(Math.round((Sum/day.length) * 100) / 100)
        }else if(key=='pressure'){
            avgPressure.push(Math.round((Sum/day.length) * 100) / 100)
        }
        else if(key=='wind'){
            avgWind.push(Math.round((Sum/day.length) * 100) / 100)
        }
    })

})
const avgValuesone = {
    //average
    weekday:        daytxt,
    avgtemp:        avgTemp,
    avghumi:        avgHum,
    avgwind:        avgWind,
    avgPressure:    avgPressure,
    //alldata
    date:           eachdaytime,
    temp:           eachDaytemp,
    humi:           eachDayhum,
    wind:           eachDaywind,
    pressure:       eachDaypress,
    
  }
 

return avgValuesone
}