import { Dropdown } from 'bootstrap'
import React, { useState,useEffect } from 'react'
import logo from '../assets/images/logo.svg'
import user_icon from '../assets/images/user-icon.png'
//import dropdown from '../assets/images/dropdown.png'
//import addjob from '../assets/images/addjob.png'
//import jobsearch from '../assets/images/jobsearch.png'
//import profile from '../assets/images/profile.png'
//import stats from '../assets/images/stats.png'
import { FaRegCaretSquareDown} from 'react-icons/fa' // dropdown btn
import {FaChartBar } from 'react-icons/fa' // stats icon
import {FaRegEdit } from 'react-icons/fa' // add job icon
import {FaUser} from 'react-icons/fa' // profile icon
import {FaThList} from 'react-icons/fa' // jobs icon
import {ImCross} from 'react-icons/im'
import {FcList} from 'react-icons/fc'

import DataShowCase from './dataShowcase'
import { useNavigate,useParams } from 'react-router-dom'

const home = (props) => {
    const [dataOf,setShowDataOf] = useState('stats')
    const [showSidebar,setShowSideBar] = useState(false)

    const [user,setUser] = useState(localStorage.getItem('user'))
    const [token,setToken] = useState(localStorage.getItem('token'))


    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('user') || !localStorage.getItem('token')){
            alert('Authentication failed.!!!')
            navigate('/')
        }
    },[])
    
    const toggleSideBar = () =>{
        if(!showSidebar){
            const sidebar = document.getElementById('sidebar')
            sidebar.style.marginLeft = 0
            setShowSideBar(true)
        }
        else{    
            const sidebar = document.getElementById('sidebar')
            sidebar.style.marginLeft = '-500px'
            setShowSideBar(false)
        }
    }

    const openLogoutBtn = () =>{
        const logout = document.getElementById('logout-btn')
        if(logout.style.display === 'none'){
            logout.style.display = 'flex'
        }
        else{
            logout.style.display = 'none'
        }
    }
    const handleLogout = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }

    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
        return (<></>)
    }
    else{
    return (
    <div className='home-page'>
        <div className='home-page-header'>
            <img src={logo} alt="can't load img" />
            <h1>Dashboard</h1>
            <div className='user-tab' onClick={openLogoutBtn}>
                <img src={user_icon} alt='' />
                <p>{(user.split('@')[0].substr(0,5).length > 5) ? (user.split('@')[0].substr(0,5) + '...'):(user.split('@')[0].substr(0,5)) }</p>
                <FaRegCaretSquareDown />
            </div>
            <div className='logout-btn' id='logout-btn' onClick={handleLogout}>Logout</div>
        </div>
        <div className='home-page-center'>
            <div className='home-page-center-left' id='sidebar'>
                <div className='home-page-center-left-tab' onClick={()=>navigate('/dashboard')}>
                    <FaChartBar />
                    <p>Stats</p>
                </div>
                <div className='home-page-center-left-tab' onClick={()=>navigate('/dashboard/allJobs')}>
                    <FaThList />
                    <p>All Jobs</p>
                </div>
                <div className='home-page-center-left-tab' onClick={()=>navigate('/dashboard/addJob')}>
                    <FaRegEdit />
                    <p>Add Job</p>
                </div>
                <div className='home-page-center-left-tab' onClick={()=>navigate('/dashboard/profile')}>
                    <FaUser />
                    <p>Profile</p>
                </div>
            </div>
            {showSidebar ? (
                <div className='close-btn' onClick={toggleSideBar}>
                    <ImCross />
                </div>
            ):(
                <div className='open-btn' onClick={toggleSideBar}>
                    <FcList />
                </div>
            )}
            <div className='home-page-center-right'>
                <DataShowCase para={props.para}/>
            </div>
        </div>
    </div>
  )
}
}

export default home