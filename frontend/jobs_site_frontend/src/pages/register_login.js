import React,{useState,useEffect} from 'react'
import logo from '../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'

const register_login = () => {
    const [suggestion,setSuggestion] = useState('Already a member ?')
    const [linkText,setLinkText] = useState('Login')    

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [alertMsg,setAlertMsg] = useState('')
    const navigate = useNavigate()

    const toggle = () =>{
        
        // here, toggling values for register and login

        if((linkText === 'Login') && (suggestion === 'Already a member ?')){
            setLinkText('Register')
            setSuggestion('Not a member yet?')   
        }
        else{
            setLinkText('Login')
            setSuggestion('Already a member ?')   
            
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setAlertMsg('')
        },3000)
    },[alertMsg,])

    const handleSubmit = async()=>{
        if(!email || (email===' ') || !password || (password===' ')){
            setAlertMsg('Please Enter Email and Password.!!!')
            setEmail('')
            setPassword('')
        }
        else{
            if(linkText==='Login'){
                // current Register
                let response = await fetch('http://127.0.0.1:8000/api/registerUser',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        'useremail': email,
                        'password':password
                    })
                })
                if(response.status == 201){
                    let data = await response.json()
                    console.log(data.user.email, data.token)
                    localStorage.setItem('user',data.user.email)
                    localStorage.setItem('token',data.token)
                    setAlertMsg('User Registered.!!!..Redirecting...')
                    setTimeout(()=>{
                        navigate('/dashboard')
                    },2000)
                }
                else{
                    let error = await response.json()
                    let errorMsg = error.errorMsg + ''
                    if(errorMsg === 'UNIQUE constraint failed: jobsapi_customuser.email'){    
                        setAlertMsg('Email is already registered...Try different one.!!')
                    }
                    else{
                        setAlertMsg(errorMsg)
                    }
                }
            }
            else{
                // current Login
                let response = await fetch('http://127.0.0.1:8000/api/loginUser',{
                    method : 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        'useremail':email,
                        'password':password
                    })
                })
                if(response.status == 200){
                    let data = await response.json()
                    console.log(data.user,data.token)
                    localStorage.setItem('user',data.user)  ///???
                    localStorage.setItem('token',data.token)  ///???
                    setAlertMsg('Login successful.!!!Redirecting...')
                    setTimeout(()=>{
                        navigate('/dashboard')
                    },2000)
                }else if(response.status == 401){
                    setAlertMsg('Invalid Credentials.!!!')
                }
                else{
                    let errorMsg = await response.json()
                    console.log(errorMsg)
                    setAlertMsg('Error Occured in loging in.!!! Try again.!')
                }
            }
        }
    }

    return (
    <div className='register-login-page'>
        <div className='centertab'>
            <div className='centertab-head'>
                <img src={logo} alt="Can't load img" />
                
                {
                    // here, toggling of Register and Login
                    (linkText==='Login')?
                    (<h2>Register</h2>):
                    (<h2>Login</h2>)
                }
                <p className='alertMsg'>{alertMsg}</p>
            </div>
            <div className='register-login-form'>        
                <label htmlFor='email'>
                    Email
                </label>
                <input 
                    type='email' 
                    name='useremail' 
                    id='email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    type='password' 
                    name='password' 
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                />
                <button className='submit-btn' onClick={handleSubmit}>
                    Submit
                </button>
                <p>{suggestion} <span onClick={toggle}>{linkText}</span></p>
            </div>
        </div>
    </div>
  )
}

export default register_login