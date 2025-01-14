import React, { useEffect } from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Profile from "./components/Profile/Profile";
import RecentlyAdded from "./components/RecentlyAdded";
import BookDetails from "./components/ViewBookDeatails/BookDetails";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store/auth';
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AdminBookRequests from "./components/Admin/bookRequest";
import UserBookRequest from "./components/RequestBook";
import Success from "./components/success";
import Failed from "./components/Failed";
// import Orders from "./components/Orders";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login())

      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-all-books" element={<AllBooks />} />
          <Route path="/recently-added" element={<RecentlyAdded />} />
          <Route path="/view-book-details" element={<BookDetails />} />
          <Route path="/admin-book-requests" element={<AdminBookRequests />} />
          <Route path="/bookRequest" element={<UserBookRequest />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} >
          <Route index element={<Favourites/>}/ >
          <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/ >
          <Route path="/profile/settings" element={<Settings/>}/ >

          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Failed/>} />
          <Route path="/view-book-details/:id" element={<BookDetails />} />

        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
