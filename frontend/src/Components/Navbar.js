import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faHome, faBed, faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            role: "",
            token: "",
            isLogin: false
        }

        this.state.role = localStorage.getItem("role")
        this.state.token = localStorage.getItem("token")
    }

    logout = () => {
        if (window.confirm("Are you sure to logout?")) {
            localStorage.clear()
            localStorage.removeItem("id")
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("email")
            this.setState({
                isLogin: false
            })
        }
    }

    componentDidMount() {
        if (this.state.token) {
            this.setState({
                isLogin: true
            })
        }
    }

    render() {
        return (
            <>
                <nav className="bg-main px-5 sm:px-8 w-full z-20 top-0 left-0 drop-shadow-md md:drop-shadow-xl">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <NavLink to="/home" className="hidden lg:block h-10 ml-3 w-10 mr-0 ">
                            <img src="/assets/logo1.png" alt="icon" />
                        </NavLink>
                        <div className="flex md:order-2">
                            {this.state.isLogin ? (
                                <>
                                    <button onClick={() => this.logout()} className="no-underline text-white px-3 py-2 hover:text-gray-500 rounded-md text-2xl font-medium" aria-current="page" ><FontAwesomeIcon icon={faSignOut} /></button>

                                </>
                            ) : (
                                <>
                                    <NavLink to="/logincust" className="bg-transparent hover:bg-transparent text-white font-semibold hover:text-gray-500 py-2 px-3 border border-main hover:border-transparent rounded-md mr-4" aria-current="page" id="profile" variant="outlined">Login</NavLink>
                                    <NavLink to="/registercust" className="bg-transparent hover:bg-transparent text-white font-semibold hover:text-gray-500 py-2 px-3 border border-main hover:border-transparent rounded-md " aria-current="page" id="profile">Register</NavLink>

                                </>
                            )
                            }
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-main">
                                {this.state.isLogin ? (
                                    <>
                                        <NavLink to="/home" className="no-underline text-white hover:bg-white-500 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium" aria-current="page">Home</NavLink>
                                        <NavLink to="/services" className="no-underline text-white hover:bg-white-500 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium " aria-current="page"> Services</NavLink>
                                        <NavLink to="/rooms" className="no-underline text-white hover:bg-white-500 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Rooms</NavLink>
                                        <NavLink to="/mybookings" className="no-underline text-white hover:bg-white-500 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium " aria-current="page"> My Bookings</NavLink>
                                    </>
                                ) : (
                                    <>

                                        <NavLink to="/home" className="no-underline text-white hover:bg-white-600 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium" aria-current="page">Home</NavLink>
                                        <NavLink to="/services" className="no-underline text-white hover:bg-white-600 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Services</NavLink>
                                        <NavLink to="/rooms" className="no-underline text-white hover:bg-white-600 hover:text-gray-500 px-3 py-3 rounded-md text-sm font-medium " aria-current="page"> Rooms</NavLink>
                                    </>
                                )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Navbar untuk layar kecil */}
                {this.state.isLogin && (
                    <div className="fixed bottom-0 mb-2 left-0 right-0 z-50 bg-transparent rounded-full bg-white text-white py-4 px-6 bg-hijau shadow-md lg:hidden">
                        <div className="container flex justify-center mx-auto">
                            <NavLink to="/home" className="text-main hover:text-yellow-100 flex flex-col items-center">
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <span className="text-sm">Home</span>
                            </NavLink>
                            <NavLink to="/services" className="text-main hover:text-yellow-100 flex flex-col items-center ml-10">
                                <FontAwesomeIcon icon={faBed} size="lg" />
                                <span className="text-sm">Services</span>
                            </NavLink>
                            <NavLink to="/rooms" className="text-main hover:text-yellow-100 flex flex-col items-center ml-10">
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <span className="text-sm">Rooms</span>
                            </NavLink>
                            <NavLink to="/mybookings" className="text-main hover:text-yellow-100 flex flex-col items-center ml-10">
                                <FontAwesomeIcon icon={faClipboardList} size="lg" />
                                <span className="text-sm">Bookings</span>
                            </NavLink>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
