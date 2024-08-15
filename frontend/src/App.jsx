import React from 'react'
import Home from './home/Home.jsx'

import { Route, Routes } from 'react-router-dom'
import Courses from './courses/Courses.jsx'

const App= () => {
  return (<>

<div className='dark:bg-slate-900 dark:text-white'>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='course' element={<Courses/>}/>

</Routes>
</div>
   </>
  )
}

export default App