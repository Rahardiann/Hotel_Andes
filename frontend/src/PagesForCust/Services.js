import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBed , faSwimmingPool} from "@fortawesome/free-solid-svg-icons";

export default class Services extends React.Component {
    render() {
        return (
            <div name='services' className='relative bg-krem min-h-screen flex-1 flex-col justify-between'>
              <Navbar />
              
              <div className="text-center pb-8">
                <p className='p-8 text-5xl font-bold'>The <span className="text-main">Services</span> You Get From AndesHotel</p>
                <p className="mx-auto text-gray-600 text-xl">No more Suitable than AndesHotel</p>
              </div>
          
              <div className="flex flex-col md:flex-row md:flex-wrap justify-center text-center md:justify-start md:ml-12 md:mr-12">
                <div className="max-w-sm mx-auto p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md mb-4 md:mb-0 md:mr-4">
                  <div className="mb-2 text-main"><FontAwesomeIcon icon={faBowlFood} size="2x" /></div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold text-black-600">High Quality Foods</h5>
                  </a>
                  <p className="mb-3 font-normal  text-gray-500 dark:text-gray-400">No more Suitable than AndesHotel</p>
                </div>
          
                <div className="max-w-sm mx-auto p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md mb-4 md:mb-0 md:mr-4">
                  <div className="mb-2 text-main"><FontAwesomeIcon icon={faBed} size="2x" /></div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold text-black-600">Simple & Elegant Room</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">No more Suitable than AndesHotel</p>
                </div>
          
                <div className="max-w-sm mx-auto p-6 bg-gray-100 rounded-lg shadow  md:mt-4 xl:mt-0 h-60 border border-gray-200 drop-shadow-md mb-4 md:mb-0">
                  <div className="mb-2 text-main"><FontAwesomeIcon icon={faSwimmingPool} size="2x" /></div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold text-black-600">Swimming Pool</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">No more Suitable than AndesHotel</p>
                </div>
              </div>
            </div>
          );
          
    }
}