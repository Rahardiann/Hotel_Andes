import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faSearch } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import moment from 'moment';
import '@progress/kendo-theme-material/dist/all.css';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

//ini untuk print
const PrintElemen = (props) => {
    const { item } = props;

    return (
        <div className="mt-4">
            <div className="hotel-invoice">
                <h1 className="font-bold">Invoice Booking Room</h1>

                <div className="invoice-details">
                    <div>
                        <p><span className="font-semibold">Hotel Name:</span> OYO</p>
                        <p><span className="font-semibold mt-2">Address:</span> Sawojajar Gg 1</p>
                        <p><span className="font-semibold mt-2">Phone:</span> +62 823278378223</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">Date: </span> {moment(Date.now()).format('DD-MM-YYYY')}</p>
                        <p><span className="font-semibold">Invoice:</span> </p>
                        <span className="mt-1 px-3 py-2 inline-flex text-xl leading-5 font-semibold rounded bg-red-100 text-red-800">
                            BOOK - {item.nomor_pemesanan}
                        </span>
                    </div>
                </div>

                <table className="invoice-items">
                    <thead>
                        <tr>
                            <th className="p-4 text-left">Type Room</th>
                            <th className="p-4 text-center">Total-Day</th>
                            <th className="p-4 text-center">Check In</th>
                            <th className="p-4 text-center">Check Out</th>
                            <th className="p-4 text-center">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 text-left">{item.tipe_kamar.nama_tipe_kamar}</td>
                            <td className="p-4 text-center">{item.total_kamar}</td>
                            <td className="p-4 text-left">{moment(item.tanggal_check_in).format('DD-MM-YYYY')}</td>
                            <td className="p-4 text-left">{moment(item.tanggal_check_out).format('DD-MM-YYYY')}</td>
                            <td className="p-4 text-left">{item.tipe_kamar.harga * item.total_kamar}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default class MyBookings extends React.Component {
    constructor() {
        super()
        this.state = {
            booking: [],
            currentPage:2,
            itemsPerPage:5,
            id_pesanan: "",
            id_user: "",
            id_customer: "",
            id_tipe_kamar: "",
            nomor_pemesanan: "",
            nama_customer: "",
            email: "",
            tanggal_pesanan: "",
            tanggal_check_in: "",
            tanggal_check_out: "",
            nama_tamu: "",
            total_kamar: "",
            status_pemesanan: "",
            role: "",
            token: "",
            action: "",
            keyword: "",
            dataPrint: {},
            container: React.createRef(null),
            pdfExportComponent: React.createRef(null),
            isPrint: false
        };
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleClickPage = this.handleClickPage.bind(this);
    

        this.state.id_customer = localStorage.getItem("id")
        if (localStorage.getItem("token")) {
            if (
                localStorage.getItem("role") === "customer"
            ) {
                this.state.token = localStorage.getItem("token");
                this.state.role = localStorage.getItem("role");
            } else {
                window.alert("You must register or login as customer !");
                window.location = "/logincust";
            }
        }
    }

    
    

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getBookingByCust = () => {
        let url = "http://localhost:8080/booking/customer/" + this.state.id_customer
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({
                    booking: response.data.data
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _handleFilter = () => {
        let data = {
            keyword: this.state.keyword,
        }
        let url = "http://localhost:8080/booking/find/filter/" + this.state.id_customer
        axios.post(url, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        booking: response.data.data
                    })
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
            })
    }

    checkRole = () => {
        if (this.state.role !== "customer") {
            localStorage.clear()
            window.alert("You must register or login as customer !")
            window.location = '/logincust'
        }
    }

    handlePreviousPage() {
        this.setState((prevState) => ({
            currentPage: prevState.currentPage - 1
        }));
    }

    handleNextPage() {
        this.setState((prevState) => ({
            currentPage: prevState.currentPage + 1
        }));
    }

    handleClickPage(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
    }

    handlePrint = (item) => {
        let element = this.state.container.current;

        this.setState({
            dataPrint: item,
            isPrint: true
        })

        setTimeout(() => {
            savePDF(element, {
                fileName: `invoice-${item.nomor_pemesanan}`
            })
            this.setState({
                isPrint: false
            })
        }, 500)
    }

    componentDidMount() {
        this.getBookingByCust()
        this.checkRole()
    }

    render() {
        const { booking, currentPage, itemsPerPage } = this.state;

        // Logic for pagination
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = booking.slice(indexOfFirstItem, indexOfLastItem);
        const totalNumberOfPages = Math.ceil(booking.length / itemsPerPage);

        // Generate page numbers
        const pageNumbers = [];
        for (let i = 1; i <= totalNumberOfPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <div name='mybooks' className='relative bg-krem min-h-screen'>
                <Navbar />

                <div className="m-6 pl-6 ">
                    <p className="text-xl font-semibold text-main">History </p>
                    <p className="text-5xl font-bold mt-2">Transaction List</p>
                    <div className="flex mt-6">
                        <div className="flex rounded w-1/2">
                            <input
                                type="text"
                                className="w-5/6 block w-full px-4 py-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                                name="keyword"
                                value={this.state.keyword}
                                onChange={this.handleChange}
                            />
                            <button className="sm:w-1/2 md:w-1/6 ml-2 px-4 text-white bg-main rounded hover:bg-black" onClick={this._handleFilter}>
                                <FontAwesomeIcon icon={faSearch} size="" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-2= ml-12 mr-8 ">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Booking Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Guest
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Room Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Total Room
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Booking
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Check In
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Check Out
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Harga
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Print
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.nomor_pemesanan}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.nama_tamu}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {item.tipe_kamar.nama_tipe_kamar}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {item.total_kamar}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {moment(item.tanggal_pesanan).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {moment(item.tanggal_check_in).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {moment(item.tanggal_check_out).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                        {item.tipe_kamar.harga * item.total_kamar}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.status_pemesanan === "baru" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                        {item.status_pemesanan === "check_in" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                        {item.status_pemesanan === "check_out" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button class="bg-main hover:bg-black text-white py-1 px-2 rounded" onClick={() => this.handlePrint(item)}>
                                                            <FontAwesomeIcon icon={faPrint} size="lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4 ">
                    <button
                        onClick={this.handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-main hover:bg-black text-white py-1 px-2 rounded mr-2"
                    >
                        Previous
                    </button>
                    {/* Numeric pagination buttons */}
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => this.handleClickPage(pageNumber)}
                            className={`bg-main hover:bg-black text-white py-2 px-4 rounded mr-2 ${
                                pageNumber === currentPage ? 'bg-gray-600' : ''
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={this.handleNextPage}
                        disabled={indexOfLastItem >= booking.length}
                        className="bg-main hover:bg-black text-white py-1 px-2 rounded"
                    >
                        Next
                    </button>
                </div>

                <div style={{ height: "100px" }}></div>
                <div
                    className="hidden-on-narrow "
                >
                    <PDFExport ref={this.state.pdfExportComponent}>
                        <div ref={this.state.container}>
                            {this.state.isPrint ? <PrintElemen item={this.state.dataPrint}/> : null}
                        </div>
                    </PDFExport>
                </div>

            </div >
        )
    }

}