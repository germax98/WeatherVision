//-------------Chart
function drawChart(date,temp){
    const ctx = document.getElementById('myChart').getContext('2d');
    const height = window.innerHeight
    const gradientcolor = ctx.createLinearGradient(0, 0, 0, height)
    gradientcolor.addColorStop(0, 'rgba(102,130,208,0.8)')
    gradientcolor.addColorStop(0.3, 'rgba(222,225,229,0.0)')
    Graph = new Chart(ctx, {            //Global
        
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
            data: temp
            
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
    drawChart(defaulttext,defaultvalue)
