import React from 'react'
import './index.css'
import App from './App'

// new in react 18
import {render} from 'react-dom'
import {createRoot} from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)