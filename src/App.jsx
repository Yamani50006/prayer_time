import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pray from './component/pray'

function App() {
  const [prayTimer, setPrayTimer] = useState({});
  const [PrayDate,setDate]=useState("");
  const [city,setcities]=useState("aden");
  const cites=[
    {
      name:"عدن",
      value:"aden"
    }
    ,
    {
      name:"صنعاء",
      value:"sanaa"
    }
    ,{
      name:"تعز",
      value:"taiz"
    }
    ,{
      name:"حضرموت",
      value:"hadramout"
    }


  ]

  console.log(city);

  useEffect(()=>{
    const fetchPrayerTime= async()=>{
      try {
        const respose= await fetch(`https://api.aladhan.com/v1/timingsByCity/16-09-2024?city=${city}&country=yemen&method=8`);
        const data=await respose.json();
        setPrayTimer(data.data.timings) ;
        setDate(data.data.date.gregorian.date);
        console.log(data.data.date.gregorian.date);
         
      } catch (error) {
       console.log(error);
      }
    }

    fetchPrayerTime();
  },[city])

  const format =(time)=>{
    if(!time){
      return "00:00"
    }
    let [hours,min]=time.split(":").map(Number)
    const perd=hours>=12 ?" PM":" AM"
    hours=hours%12 ||12;
    return `${hours}:${min}${perd}`
  }
  return (
    <>
      <section>
        <div className="container">
           <div className="top_sec">
            <div className="city">
              <h3>المدينه</h3>
              <select name="" id="" onChange={e=>{setcities(e.target.value)}}> 
               {cites.map((item) =>(
                <option key={item.value} value={item.value}>{item.name}</option>
               ))}
              </select>
             
            </div>
            <div className="date">
             <h3>التاريخ</h3>
             <h4>{PrayDate}</h4>
            </div>
           </div>
        <Pray name="الفجر" time={format (prayTimer.Fajr)}/>
        <Pray name="الظهر" time={format( prayTimer.Dhuhr)}/>
        <Pray name="العصر" time={format (prayTimer.Asr)}/>
        <Pray name="المغرب" time={format( prayTimer.Maghrib)}/>
        <Pray name="العشاء" time={format( prayTimer.Isha)}/>
        </div>
      </section>
    
    </>
  )

  {

    

  }
}

export default App
