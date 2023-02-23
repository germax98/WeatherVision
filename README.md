# WeatherVision
![Weather-Vision-P1](Weather-Vision-P1.png?raw=true "Weather Vision Page 1")
![Weather-Vision-P2](Weather-Vision-P2.png?raw=true "Weather Vision Page 2")
# Project Description
The WeatherVision project is a full stack weather application and is used as a portfolio project. WeatherVision's goal is to display current and forecast weather data with a good user experience. This goal is achieved through the use of various modern programming technologies.

##### Table of Contents  
[What This Projects Covers](#introduction)  
[Technologies used in this project](#coverage)  
[Installation](#installation)  
[Guide](#guide)  

<a name="introduction"/>

## What This Projects Covers:
WeatherVision is a Portfolio Project to Cover the following Aspects:

1 Frontend
- API Requests Java Script
- JS Libary to Display Data
- Responsive Web Design 
- CSS Framerwork
- CSS Preprocessor


2 Backend
- Build a scalable and Functional Backend
- Implementing a secure database
- Secure API requests to external APIS

3 General 
- using a Version Control System 
- write clean and modular Code 

<a name="coverage"/>

## Technologies used in this project:

1 Frontend
  - ChartJS
  - Boostrap
  - Sass

2 Backend
  - nodejs
  - npm
  - expreess
  - MYSQL

3 General
  - GIT
  
  
4 UI/UX
  - Adobe XD
  - Adobe Photoshop

<a name="installation"/>

# Installation
## Requirements
- node 
- MySQL

After copying the repository you need to create a database and two tables, the first is called **AVGValues** and should look like this:

| ID| Weekday| avgTemp| avgHumi | avgPressure| avgWind | Lat | Lon | City | Country |
|----|---|---|---|---|----|---|---|---|---|
|    |   |   |   |   |    |   |   |   |   |



the second table is called **ForecastValues** and should look like this:

| ID| allDay| allTemp| avgHumi | allHumi| allPressure| allWind | Lat | Lon | City | Country |
|----|---|---|---|---|----|---|---|---|---|---|
|    |   |   |   |   |    |   |   |   |   |

After creating the table you will also need an API key from the page: https://openweathermap.org/api

Now it's time to implement the API key and database information in the code. Add all your data in the **.env_sample** file

After that you can start the application. In a new terminal, run the **node server.js** command, open a new browser and enter the URL:

**http://localhost:3000/**

You should now see the WeatherVision application. Have fun :)


<a name="guide"/>

# Guide

## Weather Dashboard
WeatherVision is an intuitively designed weather visualization. When you first open the application, you will be greeted with a weather dashboard. On the left is the Nav. The rest of this site is current weather data. At the moment only the weather forecast link works. When you first load this page, you will be asked to share your location data. By allowing WeatherVision this data, it will display your actual weather at your location. Above you can also enter additional city names like London, Paris... to search the weather for a specific location. All data requests are stored in one record.

## Weather Forecast 
By clicking on the weather forecast in the navigation area, you will be redirected to the weather forecast. This page shows you a more specific data visualization about temperature, humidity and wind speed over the last record entry. You can choose between two buttons. The Average button shows all average weather data for the next 5 days. By clicking on the button actual you receive a detailed overview of today's weather. The measurement distance is every 3 hours. You can also get the weather data for a specific location at the top right.


