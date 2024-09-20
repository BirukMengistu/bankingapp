'use client'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets:[{
            label:'Banks',
            data:[129, 345,700],
            backgroundColor:['#0747b6','#2265d8','#2f91fa']
        }],
        labels:['Nordea','SwedBank','SEB']
    }
  return (
    
      <Doughnut 
      options={{
        cutout:'60%',
        plugins:{
            legend:{
                display:false
            }
        }
      }
      }
      data={data}/>
    
  )
}

export default DoughnutChart