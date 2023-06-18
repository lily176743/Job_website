import React,{useState,useEffect} from 'react'
import {GoLocation} from 'react-icons/go'
import {FcBriefcase} from 'react-icons/fc'
import {ImCalendar} from 'react-icons/im'
import {useNavigate} from 'react-router-dom'

const Job = (props) => {
    const [statusClass,setStatusClass] = useState('')
    const {company,jobtype,location,position,status,createdAt,id} = props.para
    
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        if(!localStorage.getItem('user') || !localStorage.getItem('token')){
            alert('Authentication failed.!!!')
            navigate('/')
        }
        if(status === 'pending'){
                setStatusClass('status-tag-orange')
            }else if(status === 'interview'){
                setStatusClass('status-tag-green')
            }else if(status === 'declined'){
                setStatusClass('status-tag-red')
            }
    }, [])
    const navigate = useNavigate()

    const deleteJob = async(id)=>
    {
        let response = await fetch(`http://127.0.0.1:8000/api/deleteJob/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
        if(response.status == 400){
            alert('Invalid Authorization Header.!!!')
          }
          else if(response.status == 200){
            alert('Job Deleted.!!!')
            navigate('/dashboard')
          }
          else{
            alert('Some Internal Server error occured during deletion of Job')
            let res = await response.json()
            console.log('Error : ',res)
        }
    }

  return (
    <div className='result-tab'>
        <div className='result-tab-top'>
            <h2>{position}</h2>
            <h3>{company}</h3>
        </div>
        <hr />
        <div className='result-tab-bottom'>
            <div className='result-tab-bottom-row'>
            <div className='result-tab-bottom-row-item'>
                <GoLocation />
                <p>{location}</p>
            </div>
            <div className='result-tab-bottom-row-item'>
                <ImCalendar />
                <p>{createdAt.split('T')[0]}</p>
            </div>
            </div>
            <div className='result-tab-bottom-row'>
            <div className='result-tab-bottom-row-item'>
                <FcBriefcase />
                <p>{jobtype}</p>
            </div>
            <div className='result-tab-bottom-row-item'>
                <p className={statusClass}>{status}</p>
            </div>
            </div>
        </div>
        <hr />
        <div className='result-tab-bottom-buttons'>
            <button className='result-tab-edit-btn' onClick={()=>navigate(`/dashboard/editJob/${id}`)}>Edit</button>
            <button className='result-tab-del-btn' onClick={()=>deleteJob(id)}>Delete</button>
        </div>
    </div>
  )
}

export default Job