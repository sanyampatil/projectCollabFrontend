import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

const MainLayout = lazy(() => import('./layout/MainLayout.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const store = lazy(() => import('./redux/Store.js'))
const Step = lazy(() => import('./pages/Step.jsx'))
const UserProfile = lazy(() => import('./pages/UserProfile.jsx'))
// const Application = lazy(()=> import('./pages/Application.jsx'))
// const CheckOutSuccess = lazy(()=> import('./pages/Payment/CheckOutSuccess.jsx'))
// const CheckOutFail = lazy(()=> import('./pages/Payment/CheckOutFail.jsx'))
const RegistrationPaymentSuccess = lazy(() =>
  import('./pages/Payment/RegistrationPaymentSuccess.jsx')
)
const Batches = lazy(() => import('./pages/Batches.jsx'))
const UserRegistration = lazy(() => import('./pages/UserRegistration.jsx'))
const UserRegistrationPaymentSuccess = lazy(() =>
  import('./pages/Payment/UserRegistrationPaymentSuccess.jsx')
)
const AllStudentData = lazy(() => import('./pages/AllStudentData .jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))

function App () {
  return (
    <>
      <Routes>
        <Route>
          <Route path='' element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/batches' element={<Batches />}></Route>
            <Route path='/process' element={<Step />} />
            <Route path='/user/profile' element={<UserProfile />}></Route>;
            <Route path='/about' element={<About />}></Route>
            {/* <Route path='/application' element={<Application />}></Route> */}
            {/* <Route path='/checkout/success' element={<CheckOutSuccess />}></Route>
       <Route path='/checkout/fail' element={<CheckOutFail />}></Route> */}
            <Route
              path='/register/successfull'
              element={<RegistrationPaymentSuccess />}
            ></Route>
            <Route
              path='/user-registration'
              element={<UserRegistration />}
            ></Route>
            <Route
              path='/user-registration/success'
              element={<UserRegistrationPaymentSuccess />}
            ></Route>
            <Route path='/Admin-canData' element={<AllStudentData />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
