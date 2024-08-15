import React from 'react'
import Home from './home/Home.jsx'

import { Route, Routes } from 'react-router-dom'
import Courses from './courses/Courses.jsx'

const App= () => {
  return (<>

<Routes>
<Route path='/' element={<Home/>}/>
<Route path='course' element={<Courses/>}/>

</Routes>
   </>
  )
}

export default App