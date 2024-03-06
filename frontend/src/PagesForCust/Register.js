import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            nik_customer: "",
            customer_name: "",
            address_customer: "",
            email_customer: "",
            password_customer: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault()
        
        let data = {
            nik : this.state.nik_customer,
            nama_customer: this.state.customer_name,
            alamat : this.state.address_customer,
            email : this.state.email_customer,
            password : this.state.password_customer
        }
        let url = "http://localhost:8080/customer/register"
        axios.post(url, data)
            .then(res => {
                window.alert("Success to Register")
                window.location.href = "/logincust"
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500) {
                    window.alert("Failed Register as Customer");
                }
            }) 
    }


    render() {
        return (
            <div className="dashboard1 bg-cover bg-center">
                <div className="flex flex-col sm:flex-row">
                    <div className="md:w-1/2 sm:bg-gray-200 bg-gray-200 text-left"> {/* Updated class */}
                        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 p-8 m-24 mt-64 " onSubmit={(e) => this.handleRegister(e)}>
                            <p className="text-gray-700 text-2xl font-bold mb-8 text-center">Register To NextHotel</p>
                            <p className="text-gray-700 text-2xl font-bold mb-8 text-center">Silahkan Register sebagai Customer NextHotel</p>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nik">
                                    NIK
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nik_customer" name="nik_customer" placeholder="NIK" value={this.state.nik_customer} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_customer">
                                    Nama Lengkap
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="customer_name" name="customer_name" placeholder="Nama Lengkap" value={this.state.customer_name} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="alamat">
                                    Alamat
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="address_customer" name="address_customer" placeholder="Alamat" value={this.state.address_customer} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_customer" name="email_customer" placeholder="Email" value={this.state.email_customer} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password_customer" name="password_customer" type="password" placeholder="Password" value={this.state.password_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="hidden sm:block w-1/2 bg-gray-500 text-center">
                        <img src="/assets/loginnn.jpeg" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
    }

}
