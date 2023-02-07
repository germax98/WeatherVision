const express = require('express')      //import express
const processing = require("./dataProcessing")
const mysql = require('mysql2')
require('dotenv').config()

const app = express()                   //make the funktions available  
app.listen(3000,()=> console.log('listening at Port 3000'))     // access point in this case Port 3000
app.use(express.static('./public'))                               //send the frontend to display in the browser
app.use(express.json({limit: '1mb'}))                           //parse incoming data



//------------------API Endpoint Actual

app.get('/weather_actual/:latlon',async (req,res)=>{
    const apiKey= process.env.apiKey
    const latlon = req.params.latlon.split(',')
    const lat = latlon[0]
    const lon = latlon[1]
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const options = {
        "method":"GET"
    }
    const response = await fetch(url,options)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message" : "error",
            error : e,
        })
    })

    const actualWeatherdata = processing.dataProcessingActual(response)
    res.json(actualWeatherdata)
    
})

//-----------------API Endpoint Forecast
app.get('/weather_forecast/:latloncitycountry',async (req,res)=>{
    const apiKey= process.env.apiKey
    const latlon = req.params.latloncitycountry.split(',')
    const lat = latlon[0]
    const lon = latlon[1]
    const city =latlon[2]
    const country = latlon[3]
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const options = {
        "method":"GET"
    }
    const response = await fetch(url,options)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message" : "error",
            error : e,
        })
    })
    
    const forecastdata  = processing.dataProcessingForecast(response)
    setDataAVG(forecastdata,lat,lon,city,country)
    setDataForecast(forecastdata,lat,lon,city,country)
    
    getData ()
    res.json(forecastdata)
    
    
    
})

//Endpoint Database

app.get('/Database_act/',async (req,res)=>{
    const test = getData()
    test.then(function(result){
        res.json(result)
    })
    
    
})

//in die Datei database.js verschieben

const db = mysql.createConnection({
    host: process.env.dbhost ,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: 'WEATHERAPPLICATION',
  })
  db.connect()
  
  
 function setDataAVG (forecastdata,lat,lon,city,country){
    
    let sql = "INSERT INTO AVGValues (Weekday, avgTemp, avgHumi, avgPressure, avgWind, Lat, Lon, City,Country) VALUES (?,?,?,?,?,?,?,?,?)";
    let values = [JSON.stringify(forecastdata.weekday),JSON.stringify(forecastdata.avgtemp),JSON.stringify(forecastdata.avghumi),JSON.stringify(forecastdata.avgPressure),JSON.stringify(forecastdata.avgwind),String(lat),String(lon),String(city),String(country)];
    
    db.promise().query(sql, values)
   
}

function setDataForecast(forecastdata,lat,lon,city,country){
    
    let sql = "INSERT INTO ForecastValues (allDay, allTemp, allHumi, allPressure, allWind, Lat, Lon, City,Country) VALUES (?,?,?,?,?,?,?,?,?)";
    let values = [JSON.stringify(forecastdata.date),JSON.stringify(forecastdata.temp),JSON.stringify(forecastdata.humi),JSON.stringify(forecastdata.pressure),JSON.stringify(forecastdata.wind),String(lat),String(lon),String(city),String(country)];
    
    db.promise().query(sql, values)
}
async function getData (){
    const resultsavg = await db.promise().query('SELECT * FROM AVGValues ORDER BY ID DESC LIMIT 1;');
    const resultsforecast = await db.promise().query('SELECT * FROM  ForecastValues ORDER BY ID DESC LIMIT 1;');
    const responseDatabase ={
        AVGValues: resultsavg[0],
        ActualValues: resultsforecast[0],
    }
    
    return responseDatabase
}

