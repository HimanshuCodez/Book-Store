import React from "react";
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import RecentlyAdded from '../components/RecentlyAdded'
import AuthorSlider from "../components/AuthorSlider";
import FreeDeliveryBanner from "../components/FreeDelivery";

const Home = () => {
  return (
    <>
    <FreeDeliveryBanner/>
    <div className=""><Navbar  /></div>
      
      <Banner />
      
      <RecentlyAdded/>
      <AuthorSlider/>
      <Footer />
    </>
  );
};

export default Home;


