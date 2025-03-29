
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './components/dashboard/mainlayout/MainLayout'
import Dashboard from './pages/dashboardscrees/dashboard/Dashboard'
import UserList from './pages/dashboardscrees/projectinitiation/user/UserList'
 

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
            <Route path='creators' element={<UserList />} />
            <Route path='brands' element={<UserList />} />
           
          
        
             
       
          </Route>
        </Routes>

         
        

      </div>
    </>
  )
}

export default App
