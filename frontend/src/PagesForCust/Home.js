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
      <div className="relative bg-krem min-h-screen pb-40 ">
        <Navbar />
        <div className="grid md:grid-cols-2 max-w-[1240px] m-auto ">
          <div className="flex items-center justify-center md:justify-start">
            <img
              className="mt-6 md:ml-32 mb-10 w-3/5 h-96"
              src="/assets/roomType1.png"
              alt="/"
            />
          </div>
          <div className="flex flex-col items-center justify-center lg:items-start w-full px-2 py-8">
            <p className="py-3 text-5xl md:text-5xl text-center font-bold">
              Find <span className="text-main">Suitable</span> Room
            </p>
            <p className="text-5xl md:text-5xl text-center font-bold mb-8">
              In AndesHotel.
            </p>
            <p className="text-md   mb-4">No more Suitable than AndesHotel </p>
            {this.state.isLogin ? (
              <button
                className="py-2 px-1 md:w-[25%] text-center my-4 text-white border bg-main border-main rounded-md text-lg font-semibold hover:bg-black hover:text-white"
                onClick={() => this.showModal()}
              >
                Booking Now
              </button>
            ) : (
              <button
                className="py-2 px-1 md:w-[25%] my-4  text-white border bg-main border-main rounded-md text-lg font-semibold hover:bg-black hover:text-white"
                onClick={() => this.showAlertMustLogin()}
              >
                Booking Now
              </button>
            )}
          </div>
        </div>

        <div className="ml-auto mr-auto mt-8  xl:col-span-3  mb-18 w-4/5 bg-krem1 rounded-lg shadow-lg h-auto  ">
          <div className="grid  md:grid-cols-3 gap-8 p-4">
            <div className="flex items-center mx-auto xl:ml-8">
              <div className=" mx-auto   bg-main p-4 rounded-md h-auto">
                <FontAwesomeIcon icon={faCalendar} size="2x" color="white" />
              </div>
              <div>
                <h3 className="mb-1 ml-2 font-bold">Check-In Date</h3>
                <input
                  type="date"
                  name="in"
                  id="in"
                  className="border-2 ml-2 border-main mx-auto rounded-md p-1"
                  value={this.state.in}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="flex items-center mx-auto xl:mr-72">
              <div className="mx-auto md:ml-16 bg-main p-4 w-auto rounded-md h-auto">
                <FontAwesomeIcon icon={faCalendar} size="2x" color="white" />
              </div>
              <div>
                <h3 className="mb-1 ml-2 mx-auto font-bold">Check-Out Date</h3>
                <input
                  type="date"
                  name="out"
                  id="out"
                  className="border-2 ml-2 border-main rounded-md p-1"
                  value={this.state.out}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-center  ">
              <button
                className="bg-main hover:bg-black text-white md:ml-auto w-1/2 font-semibold p-2 pr-2 pl-2 rounded-3xl focus:outline-none focus:shadow-outline "
                onClick={this._handleFilter}
              >
                Booking Now
              </button>
            </div>
          </div>
        </div>
        {/* ini buat available room */}
        {this.state.rooms.length > 0 && (
          <div className="bg-krem m-6 pl-6 pt-6 min-h-screen">
            <p className="text-5xl font-bold mt-2 text-center">
              <span className="text-main">Available</span> Room
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {this.state.rooms.map((item, index) => (
                <div key={index} className="md:col-span-1">
                  {/* Card untuk type room */}
                  <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-gray-200 bg-gray-100">
                    <div className="container">
                      <img
                        className="w-full h-48"
                        src={"http://localhost:8080/uploads/image/" + item.foto}
                        alt={item.nama_tipe_kamar}
                      />
                    </div>
                    <div className="px-6 py-4">
                      <div className="font-bold text-2xl mb-2">
                        {item.nama_tipe_kamar}
                      </div>
                      <div className="font-bold text-xl mb-2 text-main">
                        Rp {item.harga}/night
                      </div>
                      <p className="text-gray-700 text-base">
                        <LinesEllipsis
                          text={item.deskripsi}
                          maxLine="3"
                          ellipsis="..."
                        />
                      </p>
                      <div className="px-2 py-0.5 text-base mt-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.kamar.length} room available
                      </div>
                    </div>
                    <div className="px-6 pt-4">
                      <button
                        className="mb-2 bg-main hover:bg-blue-700 text-white font-bold p-2 w-full rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => this.handleDetail(item)}
                      >
                        Detail
                      </button>
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
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10  h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center md:mx-auto">
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
                    class="rounded-md w-200 h-100 mx-auto"
                    src={
                      "http://localhost:8080/uploads/image/" + this.state.foto
                    }
                  />
                </div>
                <div class="px-2 py-4">
                  <div class="font-bold text-2xl mb-2 text-center">
                    {this.state.nama_tipe_kamar}
                  </div>
                  <div class="font-bold text-xl mb-2 text-center text-blue-600">
                    {this.state.harga}/night
                  </div>
                  <p class="text-black-700 text-base text-center">
                    {this.state.deskripsi}
                  </p>
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
                  Add Booking Room
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
              <div class="p-2">
                <div class="px-8 py-2 ">
                  <form
                    class="space-y-6"
                    onSubmit={(event) => this.handleAddBooking(event)}
                  >
                    <div>
                      <label
                        for="nama_tamu"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Guest Name
                      </label>
                      <input
                        type="text"
                        name="nama_tamu"
                        id="nama_tamu"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Name for guest"
                        value={this.state.nama_tamu}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="total_kamar"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Total Room{" "}
                      </label>
                      <input
                        type="number"
                        name="total_kamar"
                        id="total_kamar"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Total room your booked"
                        value={this.state.total_kamar}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="id_tipe_kamar"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Room Type
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                        placeholder="Jenis Room Type"
                        name="id_tipe_kamar"
                        value={this.state.id_tipe_kamar}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Choose Room Type</option>
                        {this.state.typeroom.map((item, index) => (
                          <option value={item.id_tipe_kamar}>
                            {item.nama_tipe_kamar}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        for="tanggal_pemesanan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Booking Date
                      </label>
                      <input
                        type="text"
                        name="tanggal_pemesanan"
                        id="tanggal_pemesanan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Booking Date"
                        value={moment().format("YYYY-MM-DD")}
                        onChange={this.handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="tanggal_check_in"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        name="tanggal_check_in"
                        id="tanggal_check_in"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check in date"
                        value={this.state.tanggal_check_in}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="tanggal_check_out"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        name="tanggal_check_out"
                        id="tanggal_check_out"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check out date"
                        value={this.state.tanggal_check_out}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="harga"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Harga
                      </label>
                      <input
                        type="text"
                        name="harga"
                        id="tanggal_pemesanan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Harga"
                        value={this.state.harga * this.state.total_kamar}
                        onChange={this.handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="id_user"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Resepsionis
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                        placeholder="Jenis Room Type"
                        name="id_user"
                        value={this.state.id_user}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Confirm your booking with</option>
                        {this.state.user.map((item, index) => (
                          <option value={item.id_user}>{item.nama_user}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
