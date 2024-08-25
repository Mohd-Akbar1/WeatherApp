import { useEffect, useState } from 'react'

import './App.css'
import Search from './component/searchBox/Search'
import Forecast from './component/Forecast/Forecast'
import axios from 'axios'

function App() {

  const [weatherdata,setweatherdata]=useState([])
  const [unit, setUnit] = useState('metric');

  const weathedataupdate=(val)=>{
    setweatherdata(val)
  }
const unitconversion=(Currunit)=>{
  setUnit(Currunit)
}
console.log('check',unit)
 
 

  return (
    <div className='Appcomponent'>
      
    <div className="currentInfo">
      <Search weathedataupdate={weathedataupdate} unitconversion={unitconversion}/>
    </div>
    <div className="FullDetail">
    <Forecast weatherdata={weatherdata} unitconversion={unit}/>
    </div>
        
    </div>
  )
}

export default App
