import React, { useState,useEffect } from 'react'

const AddJob = () => {
  const [position,setPosition] = useState('')
  const [company,setCompany] = useState('')
  const [location,setLocation] = useState('')
  const [status,setStatus] = useState('pending')
  const [jobType,setJobType] = useState('fulltime')
  const [alertMsg,setAlertMsg] = useState('')
  const [user,setUser] = useState(localStorage.getItem('user'))
  const [token,setToken] = useState(localStorage.getItem('token'))

 

  const handleSubmit = async() =>{
    
    if(position.length<2 || company.length<2 || location.length<2 || status.length<2 || jobType.length<2){
      setAlertMsg('Please provide valid values for all.!!!')
    }
    else{
      let response = await fetch('http://127.0.0.1:8000/api/createJob',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+token
        },
        body:JSON.stringify({
          'position':position,
          'location':location,
          'company':company,
          'status':status,
          'jobtype':jobType,
        })
      })
      if(response.status == 400){
        alert('Invalid Authorization Header.!!!')
      }
      else if(response.status == 201){
        setAlertMsg('Job Created.!!!')
        setPosition('')
        setCompany('')
        setLocation('')
        setJobType('fulltime')
        setStatus('pending')
      }
      else if(response.status == 208){
        setAlertMsg('Job Already Exists...Try different one.!!')
      }
      else{
        let res = await response.json()
        setAlertMsg(res.errorMsg)
      }
      
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
      alert('Authentication failed.!!!')
      navigate('/')
    }
    setTimeout(()=>{
      setAlertMsg('')
    },3000)
  },[alertMsg,])

  return (
    <div className='addjob-tab'>
      <h2>Add Job</h2>
      <p className='alertMsg' style={{marginLeft : '30px'}}>{alertMsg}</p>
      <div className='addjob-row'>
        <div className='addjob-column'>
          <label htmlFor='position'>
            Position
          </label>
          <input 
            type='text'
            name='position'
            id='position'
            value={position}
            onChange={(e)=>setPosition(e.target.value)}></input>
        </div>
        <div className='addjob-column'>
        <label htmlFor='company'>
            Company
          </label>
          <input 
            type='text'
            name='company' 
            id='company'
            value={company}
            onChange={(e)=>setCompany(e.target.value)}></input>
        </div>
        <div className='addjob-column'>
        <label htmlFor='job-loc'>
            Job Location
          </label>
          <input 
            type='text'
            name='location'
            id='job-loc'
            value={location}
            onChange={(e)=>setLocation(e.target.value)}></input>
        </div>
      </div>
      <div className='addjob-row'>
        <div className='addjob-column'>
        <label htmlFor='status'>
            Status
          </label>
          <select id='status' value={status} onChange={(e)=>setStatus(e.target.value)} >
            <option value='pending'>Pending</option>
            <option value='interview' >interview</option>
            <option value='declined' >Declined</option>
          </select>
        </div>
        <div className='addjob-column'>
            <label htmlFor='job-type'>
              Job Type
            </label>
            <select id='job-type' value={jobType} onChange={(e)=>setJobType(e.target.value)}>
              <option value='fulltime'>Full-Time</option>
              <option value='parttime' >Part-Time</option>
              <option value='remote' >Remote</option>
              <option value='internship'>Internship</option>
          </select>
        </div>
        <div className='addjob-buttons'>
          <button className='addjob-add-btn' onClick={handleSubmit}>Submit</button>
          <button 
            className='addjob-clr-btn' 
            onClick={()=>{
              setCompany('')
              setJobType('fulltime')
              setLocation('')
              setPosition('')
              setStatus('pending')
            }}
          >Clear</button>
        </div>
      </div>
    </div>
  )
}

export default AddJob