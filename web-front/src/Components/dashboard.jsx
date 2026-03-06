import {Bar} from 'react-chartjs-2'
import{
    Chart as Chartjs ,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'


Chartjs.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend)
 const Dashboard=({data})=>{
  
     return <Bar data={data} />
}

export default Dashboard
 