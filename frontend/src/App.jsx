import React from 'react'
import Home from './home/Home.jsx'
import Course from './components/Course'
import { Route, Routes } from 'react-router-dom'

const App= () => {
  return (<>
{/* <Home/>
<Course/> */}
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='course' element={<Course/>}/>

</Routes>
   </>
  )
}

export default App