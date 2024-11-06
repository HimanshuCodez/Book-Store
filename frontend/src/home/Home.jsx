import React from "react";
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import RecentlyAdded from '../components/RecentlyAdded'

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <RecentlyAdded/>
      <Footer />
    </>
  );
};

export default Home;
