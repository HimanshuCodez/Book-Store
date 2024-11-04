import React from "react";
import Navbar from "./Navbar";
import AllBook from "./AllBook";
import Footer from "./Footer";

const AllBooks = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <AllBook />
      </div>
      <Footer />
    </>
  );
};

export default AllBooks;
