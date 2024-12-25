import React from 'react'
import { Link } from 'react-router-dom';
import './LoadingPage.css';
import Lottie from "react-lottie-player";
import animation1 from "./assets/loadingAnimation.json";

 

const LoadingPage = () => {
  return (
    <div className="page-not-found">
            <Lottie
          loop
          animationData={animation1}
          play
          className="feature-animation"
        /> 
        </div>
  )
}

export default LoadingPage
