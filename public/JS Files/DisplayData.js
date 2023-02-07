//-------------DispayActual
function DisplayData_actual(processedData){
    
    //Sunset
    var date = new Date(processedData.sunset  * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    const sunset = String(hours)+':'+minutes+' PM'
    //Sunrise
    var date_sr = new Date(processedData.sunrise  * 1000);
    var hours_sr = date_sr.getHours();
    var minutes_sr = "0" + date.getMinutes();
    const sunrise = String(hours_sr)+':'+minutes_sr+' AM'
    

    document.getElementById("actualTemp").innerHTML         =   processedData.actualTemp        + ' °C'
    document.getElementById("actualTemptwo").innerHTML      =   processedData.actualTemp        + ' °C'
    document.getElementById("actualPressure").innerHTML     =   processedData.actualPressure    + ' hpa'
    document.getElementById("actualHumidity").innerHTML     =   processedData.actualHumidity    + ' %'
    document.getElementById("actualWindspeed").innerHTML    =   processedData.actualWindspeed   + ' km/h'
    document.getElementById("sunrise").innerHTML            =   sunrise
    document.getElementById("sunset").innerHTML             =   sunset         
    document.getElementById("actualWeather").innerHTML      =   processedData.actualWeather     
    
    //weather icon
    document.getElementById("icon").src=`http://openweathermap.org/img/wn/${processedData.icon}@2x.png`
}

//-------------Display Location Data

function DisplayLocation(lat,lon,city,country){
    const fulldate = new Date()
    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const monthShort = ["Jan","Feb","March","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    const Firstline = String(month[fulldate.getMonth()])+' '+String(fulldate.getFullYear())
    const Secondline = String(weekday[fulldate.getDay()])+','+String(monthShort[fulldate.getMonth()])+' '+String(fulldate.getDate())+' '+String(fulldate.getFullYear())
    document.getElementById("date-y-m").innerHTML        =   Firstline
    document.getElementById("date-d-m-y").innerHTML      =   Secondline
    
    document.getElementById("lat").innerHTML         =   Math.round((lat) * 100) / 100
    document.getElementById("lon").innerHTML         =   Math.round((lon) * 100) / 100
    document.getElementById("city").innerHTML        =   String(city)
    document.getElementById("country").innerHTML     =   String(country)
}

//-------------DisplayForecastData

function DisplayData_forecast(processedData){
    Graph.destroy()
    drawChart(processedData.weekday,processedData.avgtemp)
}