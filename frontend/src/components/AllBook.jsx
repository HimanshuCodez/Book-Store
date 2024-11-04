import React from 'react'

import Cards from './Cards'
import {Link} from 'react-router-dom'
import list2 from "../../public/list2.json"
const AllBook = () => {
  const filterData2 = list2.filter((data)=>data.category==="Paid")
  return (
    <>
      <div className="  max-w-screen-2xl container mx-auto md:px-20 px-4   ">
        <div className="mt-28 items-center justify-center text-center ">
          <h1 className="text-2xl  md:text-4xl ">
            We're delighted to have you{""}
            <span className="text-purple-500"> Here! :)</span>
          </h1>
          <p className="mt-12 font-bold">
          Want Free Books? Click Below
          </p>
       <Link to="/" >
            <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-pink-500 duration-300">
              Back
            </button>
            </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {filterData2.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    
    </>
  )
}

export default AllBook