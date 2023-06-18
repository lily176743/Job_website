import React,{useState,useEffect,useRef} from 'react'
import {MdOutlineVisibility} from 'react-icons/md'
import {MdVisibility} from 'react-icons/md'
const Profile = () => {

  const refCont = useRef(null)

  const [user,setUser] = useState(localStorage.getItem('user'))
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [showPass,setshowPass] = useState(false)
  const [alertText,setAlert] = useState('')
  const [changed,setChanged] = useState('')

  const getProfile = async()=>{
    let response = await fetch('http://127.0.0.1:8000/api/getProfile',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
      }
    })
    if(response.status == 200){
      let data = await response.json()
      setEmail(data.user.email)
      setPassword(data.user.password)
    }
    else{
      alert('Error in getting data')
    }
  }
  
  useEffect(()=>{
    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
      alert('Authentication failed.!!!')
      navigate('/')
    }
    if(alertText === ''){    
      getProfile()
    }else{  
      setTimeout(()=>{
        setAlert('')
        getProfile()
      },2000)
    }
  },[alertText,])

  const toggleVis = () =>{
    setshowPass(!showPass)
    let inputCont = refCont.current
    if(inputCont.getAttribute('type') === 'password'){
      inputCont.setAttribute('type','text')
    }else{
      inputCont.setAttribute('type','password')
    }
  }

  const handleSave = async()=>{
    let response = await fetch('http://127.0.0.1:8000/api/changePassword',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
      },
      body: JSON.stringify({
        'email':email,
        'password' : password
      })
    })
    if(response.status == 200){
      let data = await response.json()
      localStorage.removeItem('user')
      localStorage.setItem('user',data.user.email)
      localStorage.removeItem('token')
      localStorage.setItem('token',data.token)
      console.log(data)
      setEmail('')
      setPassword('')
      setAlert('User details updated.!!')
    }
    else if(response.status == 400){
      alert('Invalid Authorization Header.!!')
      setAlert('Invalid token passed.!!')
    }
    else{
      let msg = await response.json()
      setAlert('Some Error occured during updating user profile.!!!')
      console.log(msg)
    }
  }

  return (
    <div className='addjob-tab'>
      <h2>Profile</h2>
      <p className='alertMsg' style={{marginLeft : '60px'}}>{alertText}</p>
      <div className='addjob-row'>
        <div className='addjob-column' style={{marginLeft:'50px', marginTop:'20px'}}>
        <label htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className='hidden-class'>
        </div>
        <div className='addjob-column' style={{ marginTop:'20px'}}>
        <label htmlFor='passwordInput'>
            Password
          </label>
          <input ref={refCont} type='password' id='passwordInput' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <div className='vis-btn' onClick={toggleVis}>
            {(showPass)?(<MdVisibility/>):(<MdOutlineVisibility />)}
          </div>
        </div>
      </div>
      <div className='addjob-row'>
        <div className='addjob-buttons'>
          <button className='savechanges-btn' onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default Profile