import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        let url = "http://localhost:8080/customer/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id = response.data.data.id_customer
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    alert("Success Login")
                    window.location.href = "/home"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login NextHotel");
                }
            })
    }




    
    render() {
        return (
            <div className="dashboard1 bg-cover bg-center">
                <div className="flex flex-col sm:flex-row">
                    <div className="md:w-1/2 w-full h-screen bg-gray-200 text-left">
                        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 p-8 m-24 mt-8  " onSubmit={(e) => this.handleLogin(e)}>
                            <p className="text-gray-700 text-2xl font-bold mb-8 text-center">Login Customer NextHotel</p>
                            <p className="text-gray-700 text-sm font-normal mb-6 text-center">Silahkan login untuk memesan kamar di NextHotel</p>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="text-sm font-normal text-gray-700 text-center mt-3 ">
                                Don’t have an account yet? <NavLink to="/registercust" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</NavLink>
                            </p>
                    </div>
                    <div className="hidden sm:block w-1/2 bg-gray-500 text-center">
                        <img src="/assets/loginnn.jpeg" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
        
        
    }

    
}
