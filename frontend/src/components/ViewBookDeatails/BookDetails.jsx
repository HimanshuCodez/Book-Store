import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  useEffect(() => {
    // Fetch data from API
    const fetch = async () => {
      const response = await axios.get(`
        http://localhost:4000/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
      console.log(response);
    };
    fetch();
  }, []);
  return (
    <>
    {Data && 
    <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex flex-col  md:flex-row gap-8">
      <div className="bg-zinc-700 rounded p-4  h-[60vh] lg:h-[88vh]  w-full lg:w-3/6 flex items-center justify-center">
        <img className=" h-[50vh] lg:h-[70vh]  rounded" src={Data.url} alt="" />
      </div>
      <div className="p-4 w-full lg:w-3/6">
        <p className="font-semibold text-4x1 text-zinc-100">{Data.title}</p>
        <p className="font-semibold  mt-1">₹{Data.author}</p>
        <p className="font-semibold text-zinc-400 mt-4 text-xl">₹{Data.description}</p>
        <p className="flex mt-4 items-center justify-startfont-semibold">₹{Data.language}</p>
        <p className="font-semibold text-3x1 text-zinc-100">Price : ₹{Data.price}</p>
        
      </div>
    </div> }
    {!Data &&<div className=" flex items-center justify-center my-8"> <Loader/> </div>}
    </>
  );
};
// return (
//   <div className="px-12 py-8 bg-zinc-900 flex gap-8">
//   <div className="bg-white lg:px-20">
//     <div className="pt-6">
//     <div className='bg-zinc-700 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center'><img src={Data.url} alt="" /></div>

//         {/* Product info */}
//         {/* <div className="mt-4 lg:row-span-3 lg:mt-0">
//           <h2 className="text-lg font-semibold">{Data.title}</h2>
//           <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
//             <p className="font-semibold">₹{Data.discountedPrice}</p>
//             <p className="line-through opacity-50">₹{Data.price}</p>
//             <p className="text-green-600 font-semibold">{Data.discountPercent}% off</p>
//           </div> */}

//           {/* Reviews */}
//           {/* <div className="mt-6">
//             <div className="flex items-center space-x-3">
//               <Rating name="read-only" value={data.rating} readOnly />
//               <p className="opacity-50 text-sm">{data.ratingCount} Ratings</p>
//               <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{data.reviewCount} Reviews</p>
//             </div>
//           </div> */}

//           <form className="mt-10">
//             {/* Sizes */}
//             <div className="mt-10">
//               <h3 className="text-sm font-medium text-gray-900">Format</h3>
//               <RadioGroup>
//                 {data.map((data) => (
//                   <Radio
//                     key={data.name}
//                     value={data.name}
//                     disabled={!data.inStock}
//                     className={`group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase ${
//                       data.inStock ? 'bg-white text-gray-900 shadow-sm cursor-pointer' : 'bg-gray-50 text-gray-200 cursor-not-allowed'
//                     }`}
//                   >
//                     <span>{data.name}</span>
//                   </Radio>
//                 ))}
//               </RadioGroup>
//             </div>

//             <Button  color="secondary" variant="contained" sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}>
//               Add To Cart
//             </Button>
//           </form>
//         </div>

//       {/* Recent Review & Rating */}
//       {/* <section>
//         <h1 className="font-bold text-lg pb-4">Recent Review & Rating</h1> */}
//         {/* <div className="border p-5"> */}
//           {/* <div className="space-y-5">
//             {data.reviews.map((review, index) => (
//               <ProductReviewCard key={index} review={review} />
//             ))}
//           </div>

//           {/* <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
//           <div className="flex items-center space-x-6">
//             <Rating value={data.rating} precision={0.5} readOnly />
//             <p className="opacity-60">{data.ratingCount} Ratings</p>
//           </div>
//           <div className="mt-5 space-x-3">
//             {data.ratingDistribution.map((item, index) => (
//               <div key={index} className="flex items-center">
//                 <p>{item.label}</p>
//                 <LinearProgress variant="determinate" value={item.value} sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} />
//               </div>
//             ))}
//           </div>
//         </div>*/}
//       {/* </section>  */}

//       {/* Similar Products */}
//       <section className="pt-10">
//         <h1 className="py-5 text-xl font-bold">Similar Products</h1>
//         <div className="flex flex-wrap space-x-5">
//           {data.map((item) => (
//             <Cards key={item._id} data={item} />
//           ))}
//         </div>
//       </section>
//     </div>
//     </div>
// );

export default BookDetails;
