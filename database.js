const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'MAX',
    password: 'WEATHERDATA',
    database: 'WEATHERAPPLICATION',
  })
  db.connect()
  const Test = '3'
  
  
  async function setData (){
    await db.promise().query(`INSERT INTO WEATHEREACHDAY (Date,Time,Wind,TEMP,HUM)values(${Test},${Test},${Test},${Test},${Test}); `)
}

  async function getData (){
    const results = await db.promise().query('SELECT * FROM WEATHEREACHDAY;')
    
}

