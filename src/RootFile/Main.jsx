import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import { Chatbot } from '../component/ChatBot';

function Main(props) {
  return (
    <div className="py-18">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Chatbot></Chatbot>
    </div>
  );
}

export default Main;
