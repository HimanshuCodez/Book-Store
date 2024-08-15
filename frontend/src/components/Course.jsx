import React from 'react'
import list from '../../public/list.json'
import Cards from './Cards'

const Course = (item) => {

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-purple-500"> Here! :)</span>
          </h1>
          <p className="mt-10 font-bold">
          Want Free Books? Click Below
          </p>
       
            <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-pink-500 duration-300">
              Back
            </button>
          
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {list.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    
    </>
  )
}

export default Course