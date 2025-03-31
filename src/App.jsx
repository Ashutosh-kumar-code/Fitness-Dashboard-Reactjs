
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './components/dashboard/mainlayout/MainLayout'
import Dashboard from './pages/dashboardscrees/dashboard/Dashboard'
import UserList from './pages/dashboardscrees/projectinitiation/user/UserList'
import VerifiedTrainers from './pages/dashboardscrees/projectinitiation/user/VerifiedTrainers'
import UnverifiedTrainers from './pages/dashboardscrees/projectinitiation/user/UnverifiedTrainers'
 

function App() {
  const { pathname } = useLocation()


  return (
    <>
      <div>

        {pathname.includes("/dashboard") || <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='users' element={<UserList />} />
            <Route path='unverified-trainer' element={<UnverifiedTrainers />} />
            <Route path='verified-trainer' element={<VerifiedTrainers />} />
           
          
        
             
       
          </Route>
        </Routes>

         
        

      </div>
    </>
  )
}

export default App
