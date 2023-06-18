import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

const welcome = () => {
  return (
    <div className='welcome-page'>
        <div className='welcome-head'>
            <img src={logo} alt="Can't find img" />
        </div>
        <div className='welcome-center'>
            <div className='center-left'>
                <h2>Job Tracking App</h2>
                <p>
                I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
                </p>
                <button type='button'>
                    <Link to='register' className='login-register-btn'>
                        Login / Register
                    </Link>
                </button>
            </div>
            <div className='center-right'>
                <img src={main} alt="can't load img" /> 
            </div>
        </div>
    </div>
  )
}

export default welcome