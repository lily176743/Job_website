import React, { useState,useEffect } from 'react'
import {FaClock} from 'react-icons/fa'
import {IoDocument} from 'react-icons/io5'
import {RiMailCloseFill} from 'react-icons/ri'
import Barchart from './Barchart'
import Linechart from './Linechart'
const Stats = () => {
  const [chartType,setChartType] = useState('BarChart')

  
  const [user,setUser] = useState(localStorage.getItem('user'))
  const [token,setToken] = useState(localStorage.getItem('token'))

  const [jobsList,setJobsList] = useState([])

  const [pendings,setPendings] = useState(0)
  const [interviews,setInterviews] = useState(0)
  const [declined,setDeclined] = useState(0)

  var monthlyData = [{'January':0}, {'February':0},{'March':0},{'April':0},{'May':0},{'June':0},{'July':0},{'August':0},{'September':0},{'October':0},{'November':0},{'December':0}];
  const [dataForChart,setDataForChart] = useState([])

  const getJobs = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/readAllJobs',{
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
      }
    })
    if(response.status == 400){
      alert('Invalid Authorization Header.!!!')
    }
    else if(response.status == 200){
      let data = await response.json()
      var noOfPendings = 0
      var noOfInterviews = 0
      var noOfDeclined = 0
      data.jobs.forEach((item)=>{
        if(item.status === 'pending'){
          noOfPendings += 1
        }
        else if(item.status === 'interview'){
          noOfInterviews += 1        
        }
        else if(item.status === 'declined'){
          noOfDeclined += 1
        }
      })
      setPendings(noOfPendings)
      setInterviews(noOfInterviews)
      setDeclined(noOfDeclined)
      setJobsList(data.jobs)
        
      var months = Object.keys(monthlyData)
      
      data.jobs.forEach((job)=>{
        switch(parseInt(job.createdAt.split('-')[1]))
        {
          case 1: monthlyData[0]['January'] += 1
                  console.log(monthlyData[0]['January'])
                  break
          case 2: monthlyData[1]['Febuary'] += 1
                  console.log(monthlyData[1]['Febuary'])
                  break
          case 3: monthlyData[2]['March'] += 1
                  console.log(monthlyData[2]['March'])
                  break
          case 4: monthlyData[3]['April'] += 1
                  console.log(monthlyData[3]['April'])
                  break
          case 5: monthlyData[4]['May'] += 1
                  console.log(monthlyData[4]['May'])
                  break
          case 6: monthlyData[5]['June'] += 1
                  console.log(monthlyData[5]['June'])
                  break
          case 7: monthlyData[6]['July'] += 1
                  console.log(monthlyData[6]['July'])
                  break
          case 8: monthlyData[7]['August'] += 1
                  console.log(monthlyData[7]['August'])
                  break
          case 9: monthlyData[8]['September'] += 1
                  console.log(monthlyData[8]['September'])
                  break
          case 10: monthlyData[9]['October'] += 1
                  console.log(monthlyData[9]['October'])
                  break
          case 11: monthlyData[10]['November'] += 1
                  console.log(monthlyData[10]['November'])
                  break
          case 12: monthlyData[11]['December'] += 1
                  console.log(monthlyData[11]['December'])
                  break
                   
        }
      })
      setDataForChart(monthlyData)
      console.log(monthlyData)
    }
    else{
      alert('Error in getting data.!!!!')
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
      alert('Authentication failed.!!!')
      navigate('/')
    }
    getJobs()
  },[])

  return (
    <div className='stats-data'>
        <div className='stats-head'>
          <div className='stats-data-tab-1'>
            <div className='stats-data-tab-top'>
              {pendings}
              <div className='stats-data-tab-top-icon-1'>
                <FaClock />
              </div>
            </div>
            <p>Pending Applications</p>
          </div>
          <div className='stats-data-tab-2'>
            <div className='stats-data-tab-top'>
              {interviews}
              <div className='stats-data-tab-top-icon-2'>
                <IoDocument />
              </div>
            </div>
            <p>Interviews Scheduled</p>
          </div>
          <div className='stats-data-tab-3'>
            <div className='stats-data-tab-top'>
              {declined}
              <div className='stats-data-tab-top-icon-3'>
                <RiMailCloseFill />
              </div>
            </div>
            <p>Jobs Declined</p>
          </div>
        </div>
        <div className='stats-bottom'>
          <h2>Monthly Applications</h2>
          <div className='stats-bottom-chart'>
              <div className='stats-bottom-inputs'>
                <input type='radio' id='barchart' name='charttype' onChange={(e)=>setChartType(e.target.value)} value='BarChart'/><label htmlFor='barchart'>Bar Chart</label>
                <input type='radio' id='linechart' name='charttype' onChange={(e)=>setChartType(e.target.value)} value='linechart'/><label htmlFor='linechart'>Line Chart</label>
              </div>
              <p style={{borderBottom : '5px solid var(--primary-900)', borderRadius:'0.25rem' }}>{chartType}</p>
              <div className='chart'>
                {(chartType==='BarChart')?(<Barchart data={dataForChart}/>):(<Linechart data={dataForChart}/>)}
              </div>
          </div>
        </div>
      </div>
  )
}

export default Stats