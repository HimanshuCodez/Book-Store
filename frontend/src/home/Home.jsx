import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import RecentlyAdded from "../components/RecentlyAdded";
import AuthorSlider from "../components/Additionals.jsx/AuthorSlider";
import SaleSlider from "../components/Additionals.jsx/SaleSlider";
import GifReviewSlider from "../components/Additionals.jsx/gifs";
import Manga from "../components/BookCategory.jsx/Manga";
import Adult from "../components/BookCategory.jsx/Adult";


const Home = () => {
  return (
    <>
      
   

      <Navbar />
      <Banner />
      <RecentlyAdded />
      <SaleSlider/>
      <Manga/>
      <Adult/>
      <GifReviewSlider/>
      <AuthorSlider />
      <Footer />
    
      
    </>
  );
};

export default Home;
