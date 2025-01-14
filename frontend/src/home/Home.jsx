import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import RecentlyAdded from "../components/RecentlyAdded";
import AuthorSlider from "../components/Additionals.jsx/AuthorSlider";
import SaleSlider from "../components/Additionals.jsx/SaleSlider";
import GifReviewSlider from "../components/Additionals.jsx/gifs";


const Home = () => {
  return (
    <>
      
   

      <Navbar />
      <Banner />
      <RecentlyAdded />
      <SaleSlider/>
      <GifReviewSlider/>
      <AuthorSlider />
      <Footer />
    
      
    </>
  );
};

export default Home;
