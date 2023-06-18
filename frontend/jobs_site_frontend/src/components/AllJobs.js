import React, { useState ,useEffect} from 'react'
import Job from './Job'
const AllJobs = () => {

  const [searchText, setSearchText] = useState('')
  const [statusText, setStatusText] = useState('all')
  const [typeText, setTypeText] = useState('all')
  const [sortText, setSortText] = useState('latest')

  const [user,setUser] = useState(localStorage.getItem('user'))
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [alertMsg,setAlertMsg] = useState('')

  const [jobsList,setJobsList] = useState([])

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
      setJobsList(data.jobs)
    }
    else{
      let res = await response.json()
      setAlertMsg(res.errorMsg)
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
      alert('Authentication failed.!!!')
      navigate('/')
    }
    getJobs()
    setTimeout(()=>{
      setAlertMsg('')
    },3000)
  },[alertMsg,])
 
  

  return (
    <div className='alljobs-data'>
      <div className='alljobs-search-form'>
        <div className='row'>
          <h2>Search Form</h2>
        </div>
        <div className='row'>
          <div className='col'>
            <label htmlFor='search'>Search</label>
            <input id='search' name='search' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
          </div>
          <div className='col'>
            <label htmlFor='status'>Status</label>
            <select id='status' value={statusText} onChange={(e)=>setStatusText(e.target.value)} >
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='interview' >interview</option>
            <option value='declined' >Declined</option>
          </select>
          </div>
          <div className='col'>
            <label htmlFor='type'>Type</label>
            <select id='job-type' value={typeText} onChange={(e)=>setTypeText(e.target.value)}>
              <option value='all'>All</option>
              <option value='fulltime'>Full-Time</option>
              <option value='parttime' >Part-Time</option>
              <option value='remote' >Remote</option>
              <option value='internship'>Internship</option>
          </select>
          </div>
        </div>
        <div className='row2'>
          <div className='col'>
            <label htmlFor='sort'>Sort By</label>
            <select id='sort' value={sortText} onChange={(e)=>setSortText(e.target.value)}>
              <option value='latest'>Latest</option>
              <option value='oldest' >Oldest</option>
              <option value='atoz' >A to Z</option>
              <option value='ztoa'>Z to A</option>
          </select>
          </div>
          <div className='col'>
            <button onClick={()=>setSearchText('')} >Clear Filters</button>
          </div>
        </div>
      </div>
      <div className='alljobs-results'>
        {(jobsList.length < 1)?(<h3>No Jobs Found...</h3>):(<h3>{jobsList.length} Jobs found</h3>)}
        <div className='result-row'>
          {jobsList.map((item)=>{
            return (
                <Job para={item} key={item.id}/>
              )

          })}
        </div>
      </div>
    </div>
  )
}

export default AllJobs