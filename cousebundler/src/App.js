import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/login/Login'
import Register from '../src/components/auth/register/Register'
import Courses from './components/couserse/Courses'
import Home from './components/home/Home'
import Footer from './components/layout/header/footer/Footer'
import Header from './components/layout/header/Header'
import Forgotpassword from './components/auth/forgotpassword/Forgotpassword'
import Resetpassword from './components/auth/reset/Resetpassword'
import Contact from './components/contact/Contact'
import Request from './components/request/Request'
import About from './components/about/About'
import Subscribe from './components/payment/Subscribe'
import Paymnetsucces from './components/payment/Paymnetsucces'
import Paymnetfailed from './components/payment/Paymnetfailed'
import Notfound from './components/notfound/Notfound'
import Coursepage from './components/coursePage/Coursepage'
import Profile from './components/profile/Profile'
import Changepassword from './components/profile/Changepassword'
import Updateprofile from './components/profile/Updateprofile'
import Dashbord from './components/admin/dashbord/Dashbord'
import Createcourse from './components/admin/createcourse/Createcourse'
import AdminCourses from './components/admin/Admincouses/AdminCourses'
import User from './components/admin/users/User'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from "react-hot-toast"
import { getmyprofile } from './redux/Action/action'
import { ProtectedRoute } from "protected-route-react"
import Loader from './components/layout/loader/Loader'

function App() {

  const { isAuthenticated, user, message, error, loading } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearmessage" })
    }


  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getmyprofile())
  }, [dispatch])


  return (
    <Router>

      {

        loading ? (<Loader />)
          :
          <>

            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/courses' element={<Courses />} />
              <Route path='/course/:id' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}> <Coursepage user={user}/></ProtectedRoute>
            } />
              <Route path='/contact' element={<Contact />} />
              <Route path='/request' element={<Request />} />
              <Route path='/about' element={<About />} />

        {/* protected routes statrt here  */ }
              <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>  <Profile user={user} />  </ProtectedRoute>} />

              <Route path='/changepassword' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>  <Changepassword /> </ProtectedRoute>
              } />

              <Route path='/updateprofile' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}> <Updateprofile user={user} /> </ProtectedRoute>
              } />





              <Route path='/login' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Login />

                </ProtectedRoute>
              } />
              <Route path='/register' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Register />

                </ProtectedRoute>

              } />
              <Route path='/subscribe' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}> <Subscribe user={user} /> </ProtectedRoute>
              } />

              <Route path='/forgotpasssword' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Forgotpassword />

                </ProtectedRoute>
              } />
              <Route path='/resetpassword/:token' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Resetpassword />

                </ProtectedRoute>
              } />


              <Route path='/paymnetsucces' element={<Paymnetsucces />} />
              <Route path='/paymentfailed' element={<Paymnetfailed />} />
              <Route path='*' element={<Notfound />} />



              { /* admin routes*/}

              <Route path='/admin/dashbord' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}><Dashbord /> </ProtectedRoute>
              } />
              <Route path='/admin/createcourse' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  <Createcourse />
                </ProtectedRoute>

              }
              />
              <Route path='/admin/courses' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  <AdminCourses />
                </ProtectedRoute>
              } />
              <Route path='/admin/users' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  <User />
                </ProtectedRoute>

              } />



            </Routes>
            <Footer />
            <Toaster />
          </>

      }

    </Router>

  )
}

export default App