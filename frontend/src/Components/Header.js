import React from 'react'


export default class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            role: "",
            email : "",
            nama_user : ""

        }

        this.state.role = localStorage.getItem("role")
        this.state.email = localStorage.getItem("email")
        this.state.nama_user = localStorage.getItem("nama_user")
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.checkRole()
    }

    render() {
        return (
            <header className="header bg-white shadow py-4 px-4">
                <div className="header-content flex items-center flex-row">
                    <form action="#">
                        <div className=" md:flex relative ml-auto">
                            <h1 className="font-bold text-xl md:text-2xl text-gray-700">Dashboard</h1>
                        </div> 
                    </form>
                    <div className="flex ml-auto">
                        <a href className="flex flex-row items-center">
                            <img
                                src="/assets/5856.jpg"
                                alt=""
                                className="h-10 w-10 bg-gray-200 border rounded-full"
                            />
                            <span className="flex flex-col ml-2">
                                <span className="truncate w-20 font-semibold tracking-wide leading-none">{this.state.nama_user}</span>
                                <span className="truncate w-20 text-gray-500 text-base md:text-xs leading-none mt-1">{this.state.role}</span>
                            </span>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}