import React, { useEffect } from 'react'
import axios from 'axios';
import Cards from './Cards'

import {Link} from 'react-router-dom'
import { useState } from 'react';
import Loader from './Loader/Loader';

const AllBook = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    // Fetch data from API
    const fetch = async () => {
      const response = await axios.get(
        "https://backend-h759.onrender.com/api/v1/get-all-books"
      );
     setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div className="  max-w-screen-2xl container mx-auto md:px-20 px-4   ">
        <div className="mt-28 items-center justify-center text-center ">
          <h1 className="text-2xl  md:text-4xl ">
            We're delighted to have you{""}
            <span className="text-purple-500"> Here! :)</span>
          </h1>
         
       <Link to="/" >
            <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-pink-500 duration-300">
              Back
            </button>
            </Link>
        </div>
        {!Data && <div className=" flex items-center justify-center my-8"> <Loader/> </div>}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {Data && Data.map((item,i) => (
  <div key={i}>
  
  <Cards  data={item} key={item.id} />
  </div>
        ))}
        </div>
      </div>
     
    
    </>
  )
}

export default AllBook