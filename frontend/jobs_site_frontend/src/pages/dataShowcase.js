import React,{useState} from 'react'
import AddJob from '../components/AddJob'
import AllJobs from '../components/AllJobs'
import Stats from '../components/Stats'
import Profile from '../components/Profile'
import EditJob from '../components/EditJob'
import {useParams} from 'react-router-dom'
const dataShowcase = (props) => {
    const {id} = useParams()
    if(props.para === 'stats'){      
        return (
            <div className='center-data'>
                <Stats />
            </div>
        )
    }
    else if(props.para === 'all-jobs'){      
        return (
            <div className='center-data'>
                <AllJobs />
            </div>
        )
    }
    else if(props.para === 'add-job'){      
        return (
            <div className='center-data'>
                <AddJob />
            </div>
        )
    }
    else if(props.para === 'profile'){      
        return (
            <div className='center-data'>
                <Profile />
            </div>
        )
    }
    else if(props.para === 'editJob'){
        return (
            <div className='center-data'>
                <EditJob id = {id} />
            </div>
        )
    }
}

export default dataShowcase