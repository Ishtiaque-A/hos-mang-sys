import { createContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import UploadPrescription from './Components/UploadPrescription/UploadPrescription';
export const  authContext = createContext(null);

function App() {
const [loggedIn,setLoggedIn] = useState(false)
  return (
    <>
    <authContext.Provider value={{loggedIn,setLoggedIn}}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/upload-report' element={<UploadPrescription />} />
        </Routes>
    </authContext.Provider>
      
    </>
  )
}

export default App
