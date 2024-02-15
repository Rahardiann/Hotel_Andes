import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from "react-lines-ellipsis";
import $ from "jquery";
import moment from "moment";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      in: "",
      out: "",
      id_tipe_kamar: "",
      nama_tipe_kamar: "",
      harga: "",
      deskripsi: "",
      foto: "",
      rooms: [],
      booking: [],
      id_pemesanan: "",
      id_user: "",
      id_customer: "",
      id_tipe_kamar: "",
      nomor_pemesanan: "",
      tanggal_pemesanan: "",
      tanggal_check_in: "",
      tanggal_check_out: "",
      nama_tamu: "",
      total_kamar: "",
      typeroom: [],
      user: [],
      role: "",
      token: "",
      action: "",
      isLogin: false,
    };

    this.state.id_customer = localStorage.getItem("id");
    this.state.token = localStorage.getItem("token");
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    $("#modal_detail").hide();
  };

  handleDetail = (item) => {
    $("#modal_detail").show();
    this.setState({
      id_tipe_kamar: item.id_tipe_kamar,
      nama_tipe_kamar: item.nama_tipe_kamar,
      harga: item.harga,
      deskripsi: item.deskripsi,
      foto: item.foto,
    });
  };

  handleCloseBooking = () => {
    $("#modal_booking").hide();
  };

  showModal = () => {
    $("#modal_booking").show();
    this.setState({
      id_user: "",
      id_customer: this.state.id_customer,
      id_tipe_kamar: "",
      nomor_pemesanan: Math.floor(Math.random() * 90000) + 10000,
      tanggal_pemesanan: moment().format("YYYY-MM-DD"),
      tanggal_check_in: "",
      tanggal_check_out: "",
      nama_tamu: "",
      total_kamar: "",
      action: "insert",
    });
  };

  handleAddBooking = () => {
    let form = {
      id_user: this.state.id_user,
      id_customer: this.state.id_customer,
      id_tipe_kamar: this.state.id_tipe_kamar,
      nomor_pemesanan: this.state.nomor_pemesanan,
      tanggal_pemesanan: this.state.tanggal_pemesanan,
      tanggal_check_in: this.state.tanggal_check_in,
      tanggal_check_out: this.state.tanggal_check_out,
      nama_tamu: this.state.nama_tamu,
      total_kamar: this.state.total_kamar,
    };
    let url = "http://localhost:8080/booking/add";
    axios
      .post(url, form, this.headerConfig())
      .then((response) => {
        this.getBooking();
        this.handleClose();
        window.location = "/mybookings";
      })
      .catch((error) => {
        console.log("error add data", error);
        if (error.response.status === 500 || error.response.status === 404) {
          window.alert("Failed!!, cus the room not available");
        }
      });
  };

  _handleFilter = () => {
    let data = {
      tanggal_check_in: this.state.in,
      tanggal_check_out: this.state.out,
    };
    let url = "http://localhost:8080/kamar/find/available";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rooms: response.data.kamar,
          });
          console.log(response.data.kamar);
        } else {
          alert(response.data.message);
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log("error", error.response.status);
      });
  };

  getBooking = () => {
    let url = "http://localhost:8080/booking";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          room: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeRoom = () => {
    let url = "http://localhost:8080/kamar-type";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          typeroom: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = () => {
    let url = "http://localhost:8080/user/role/resepsionis";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          user: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showAlertMustLogin = () => {
    window.alert("You must Register or Login as Customer");
    window.location = "/logincust";
  };

  componentDidMount() {
    this.getBooking();
    this.getTypeRoom();
    this.getUser();
    if (this.state.token) {
      this.setState({
        isLogin: true,
      });
    }
  }

  render() {
    return (
      <div className="relative bg-krem min-h-screen">
        <Navbar />
        <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
          <div>
            <img
              className="mt-6 ml-32 mb-10 w-3/5 h-96"
              src="/assets/roomType1.png"
              alt="/"
            />
          </div>
          <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
            <p className="py-3 text-5xl md:text-5xl font-bold">
              Find <span className="text-main">Suitable</span> Room
            </p>
            <p className="text-5xl md:text-5xl font-bold mb-8">
              In AndesHotel.
            </p>
            <p className="text-md mr-12 mb-4">
              No more Suitable than NextHotel{" "}
            </p>
            {this.state.isLogin ? (
              <button
                className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-main border-main rounded-md text-lg font-semibold hover:bg-black hover:text-white"
                onClick={() => this.showModal()}
              >
                Booking Now
              </button>
            ) : (
              <button
                className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-main border-main rounded-md text-lg font-semibold hover:bg-black hover:text-white"
                onClick={() => this.showAlertMustLogin()}
              >
                Booking Now
              </button>
            )}
          </div>
        </div>

        <div className="ml-auto mr-auto mt-8 mb-8 w-3/5 bg-krem1 rounded-lg shadow-lg h-auto">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="pr-10 pl-10 pt-5 pb-6">
              <div className="flex items-center">
                <div className="mr-3 bg-main p-4 rounded-md h-auto">
                  <FontAwesomeIcon icon={faCalendar} size="2x" color="white" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">Check-In Date</h3>
                  <input
                    type="date"
                    name="in"
                    id="in"
                    className="border-2 border-main rounded-md p-1"
                    value={this.state.in}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="pr-10 pl-4 pt-5 pb-6">
              <div className="flex items-center">
                <div className="mr-3 bg-main p-4 rounded-md h-auto">
                  <FontAwesomeIcon icon={faCalendar} size="2x" color="white" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">Check-Out Date</h3>
                  <input
                    type="date"
                    name="out"
                    id="out"
                    className="border-2 border-main rounded-md p-1"
                    value={this.state.out}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="pr-2 pl-2 pt-4">
              <button
                className="bg-main hover:bg-black text-white font-semibold p-2 pr-8 pl-8 w-full rounded-3xl focus:outline-none focus:shadow-outline"
                onClick={this._handleFilter}
              >
                Booking Now
              </button>
            </div>
          </div>
        </div>

        {/* ini buat available room */}
        {this.state.rooms.length > 0 && (
          <div className="bg-krem m-6 pl-6 pt-6 min-h-screen flex flex-col items-center">
            {" "}
            {/* Menambahkan kelas flex-col dan items-center */}
            <p className="text-5xl font-bold mt-2">
              <span className="text-main">Available</span> Room{" "}
            </p>
            <div class="grid grid-cols-4 gap-4 mt-8">
              {this.state.rooms.map((item, index) => (
                <div class="col-span-1">
                  {/* Card untuk type room */}
                  <div class="CardEvent">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg border-2 border-gray-200 bg-gray-100">
                      <div className="container">
                        <img
                          class="w-full h-48"
                          src={
                            "http://localhost:8080/uploads/image/" + item.foto
                          }
                        />
                      </div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-2xl mb-2">
                          {item.nama_tipe_kamar}
                        </div>
                        <div class="font-bold text-xl mb-2 text-main">
                          Rp {item.harga}/night
                        </div>
                        <p class="text-gray-700 text-base">
                          <LinesEllipsis
                            text={item.deskripsi}
                            maxLine="3"
                            ellipsis="..."
                          />
                        </p>
                        <div class="px-2 py-0.5 text-base mt-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.kamar.length} room available
                        </div>
                      </div>
                      <div class="px-6 pt-4">
                        <button
                          class="mb-2 ml-40 bg-main hover:bg-blue-700 text-white font-bold p-2 w-1/3 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => this.handleDetail(item)}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* modal detail room */}
        <div
          id="modal_detail"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
            <div class="relative bg-white rounded-lg">
              <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                  {this.state.nama_tipe_kamar}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={() => this.handleClose()}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6">
                <div className="container">
                  <img
                    class="rounded-md w-200 h-100"
                    src={
                      "http://localhost:8080/uploads/image/" + this.state.foto
                    }
                  />
                </div>
                <div class="px-2 py-4">
                  <div class="font-bold text-2xl mb-2">
                    {this.state.nama_tipe_kamar}
                  </div>
                  <div class="font-bold text-xl mb-2 text-blue-600">
                    {this.state.harga}/night
                  </div>
                  <p class="text-black-700 text-base">{this.state.deskripsi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <div
          id="modal_booking"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
            <div class="relative bg-white rounded-lg">
              <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                  Booking Room
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={() => this.handleCloseBooking()}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="nama_tamu"
                  >
                    Guest's Name
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nama_tamu"
                    name="nama_tamu"
                    type="text"
                    placeholder="Guest's Name"
                    onChange={this.handleChange}
                    value={this.state.nama_tamu}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="total_kamar"
                  >
                    Total Rooms
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="total_kamar"
                    name="total_kamar"
                    type="number"
                    placeholder="Total Rooms"
                    onChange={this.handleChange}
                    value={this.state.total_kamar}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => this.handleAddBooking()}
                  >
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
