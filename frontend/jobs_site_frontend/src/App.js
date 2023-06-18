import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/welcome'
import RegisterLogin from './pages/register_login'
import Home from './pages/home'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element={<Welcome />} />
        <Route exact path = '/register' element={<RegisterLogin />} />
        <Route exact path = '/dashboard' element={<Home para={'stats'}/>} />
        <Route exact path = '/dashboard/allJobs' element={<Home para={'all-jobs'}/>} />
        <Route exact path = '/dashboard/addJob' element={<Home para={'add-job'}/>} />
        <Route exact path = '/dashboard/profile' element={<Home para={'profile'}/>} />
        <Route exact path = '/dashboard/editJob/:id' element={<Home para={'editJob'}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
