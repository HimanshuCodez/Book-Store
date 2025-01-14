import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import RecentlyAdded from "../components/RecentlyAdded";
import AuthorSlider from "../components/AuthorSlider";


const Home = () => {
  return (
    <>
      
   

      <Navbar />
      <Banner />
      <RecentlyAdded />
      <AuthorSlider />
      <Footer />
    
      
    </>
  );
};

export default Home;
