import React, { useContext, useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../../Ui/Footer/Footer'
import { mediaContext } from "../../../Context/MediaStore"; 

export default function MasterLayOut() {
  const { userData, updateUserInfo ,saveUserData } = useContext(mediaContext);
  return (
    <>
    {userData?<NavBar/>:<></>}
    <Outlet/>
    {userData?<Footer/>:<></>}
    </>
  )
}
