import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBrush,
  faSignOut,
  faSignIn,
  faReceipt,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import $ from "jquery";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const PrintElement = (props) => {
  const { item } = props;

  return (
    <div className="mt-4" style={{ width: "1600px", height: "430px" }}>
      <div className="hotel-invoice">
        <h1 className="font-bold">Invoice Booking Room</h1>

        <div className="invoice-details">
          <div>
            <p>
              <span className="font-semibold">Hotel Name:</span> OYO
            </p>
            <p>
              <span className="font-semibold mt-2">Address:</span> Sawojajar Gg
              1
            </p>
            <p>
              <span className="font-semibold mt-2">Phone:</span> +62
              823278378223
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Date: </span>{" "}
              {moment(Date.now()).format("DD-MM-YYYY")}
            </p>
            <p>
              <span className="font-semibold">Invoice:</span>{" "}
            </p>
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
              <td className="p-4 text-left">
                {item.tipe_kamar.nama_tipe_kamar}
              </td>
              <td className="p-4 text-center">{item.total_kamar}</td>
              <td className="p-4 text-left">
                {moment(item.tanggal_check_in).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {moment(item.tanggal_check_out).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {item.tipe_kamar.harga * item.total_kamar}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Printhistory = (props) => {
  const { item } = props;

  return (
    <div className="mt-4" style={{ width: "1900px", height: "430px" }}>
      <div className="hotel-invoice">
        <h1 className="font-bold">History Transaksi</h1>

        <div className="invoice-details">
          <div>
            <p>
              <span className="font-semibold">Hotel Name:</span> OYO
            </p>
            <p>
              <span className="font-semibold mt-2">Address:</span> Sawojajar Gg
              1
            </p>
            <p>
              <span className="font-semibold mt-2">Phone:</span> +62
              823278378223
            </p>
          </div>
          <div></div>
        </div>

        <table className="invoice-items">
          <thead>
            <tr>
              <th className="p-4 text-left">NOMOR PESANAN</th>
              <th className="p-4 text-left">NAMA CUSTOMER</th>
              <th className="p-4 text-left">TIPE KAMAR</th>
              <th className="p-4 text-center">TOTAL KAMAR</th>
              <th className="p-4 text-left">PEMESANAN</th>
              <th className="p-4 text-left">CHECK IN</th>
              <th className="p-4 text-left">CHECK OUT</th>
              <th className="p-4 text-left">HARGA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-left">{item.nomor_pemesanan}</td>
              <td className="p-4 text-left">{item.nama_customer}</td>
              <td className="p-4 text-left">
                {item.tipe_kamar.nama_tipe_kamar}
              </td>
              <td className="p-4 text-center">{item.total_kamar}</td>
              <td className="p-4 text-left">
                {moment(item.tanggal_pemesanan).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {moment(item.tanggal_check_in).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {moment(item.tanggal_check_out).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {item.tipe_kamar.harga * item.total_kamar}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default class HistoryTransaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      booking: [],
      id_pemesanan: "",
      id_user: "",
      id_customer: "",
      id_tipe_kamar: "",
      nomor_pemesanan: "",
      nama_customer: "",
      email: "",
      tanggal_pemesanan: "",
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
      isPrint: false,
      isPrintFirst: true, // Tambahkan inisialisasi isPrintFirst
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        this.state.token = localStorage.getItem("token");
        this.state.role = localStorage.getItem("role");
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
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
    $("#modal_booking").hide();
  };

  handleEditStatus = (item, status) => {
    // $("#modal_booking").show()
    this.setState({
      id_pemesanan: item.id_pemesanan,
      status_pemesanan: item.status_pemesanan,
      action: "update",
    });
    let form = {
      id_pemesanan: item.id_pemesanan,
      status_pemesanan: status,
    };
    if (this.state.action === "update") {
      let url =
        "http://localhost:8080/booking/update/status/" +
        this.state.id_pemesanan;
      axios
        .put(url, form, this.headerConfig())
        .then((response) => {
          this.getBooking();
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleSave = (e) => {
    e.preventDefault();

    let form = {
      id_pemesanan: this.state.id_pemesanan,
      status_pemesanan: this.state.status_pemesanan,
    };
    if (this.state.action === "update") {
      let url =
        "http://localhost:8080/booking/update/status/" +
        this.state.id_pemesanan;
      axios
        .put(url, form, this.headerConfig())
        .then((response) => {
          this.getBooking();
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  _handleFilter = () => {
    let data = {
      keyword: this.state.keyword,
    };
    let url = "http://localhost:8080/booking/find/filter";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            booking: response.data.data,
          });
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
      .get(url)
      .then((response) => {
        this.setState({
          booking: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkRole = () => {
    if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
      localStorage.clear();
      window.alert("You're not admin or resepsionis!");
      window.location = "/";
    }
  };

  handlePrintElement = (item) => {
    let element = this.state.container.current;

    let printItem = item;

    this.setState({
      dataPrint: printItem,
      isPrint: true,
    });

    setTimeout(() => {
      savePDF(element, {
        fileName: `invoice-${item.nomor_pemesanan}`,
      });

      this.setState({
        isPrint: false,
      });
    }, 500);
  };

  handlePrintHistory = () => {
    let element = this.state.container.current; // Define 'element' variable here

    let printItem = this.state.booking;

    if (!printItem || printItem.length === 0) {
      console.error("Booking data is empty or invalid.");
      return;
    }

    this.setState({
      dataPrint: printItem,
      isPrint: true,
    });

    setTimeout(() => {
      savePDF(element, {
        fileName: `history-transaksi`,
      });

      this.setState({
        isPrint: false,
      });
    }, 500);
  };

  componentDidMount() {
    this.getBooking();
    this.checkRole();
  }

  render() {
    return (
      <div class="flex flex-row min-h-screen bg-krem text-gray-800">
        <Sidebar />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header />
          <div class="main-content flex flex-col flex-grow p-4">
            <h1 class="font-bold text-xl text-black-700">
              Daftar History Transaksi Customer
            </h1>
            <p class="text-gray-700">For History Booking Room</p>

            <div className="flex mt-2 flex-row-reverse">
              <div className="flex rounded w-1/3 mr-4">
                <input
                  type="text"
                  className="w-2/3 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 "
                  placeholder="Search..."
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleChange}
                />
                <button
                  className="w-1/3 ml-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={this._handleFilter}
                >
                  <FontAwesomeIcon icon={faSearch} size="" />
                </button>
                {this.state.role === "resepsionis" && (
                  <td
                    className="whitespace-nowrap"
                    name="status_pemesanan"
                    value={this.state.status_pemesanan}
                    onChange={this.handleChange}
                    required
                    onSubmit={(event) => this.handleSave(event)}
                  >
                    <button
                      className="ml-2 py-2 px-8 text-white bg-green-600 rounded hover:bg-green-700"
                      onClick={this.handlePrintHistory} // Mengubah onClick agar memanggil fungsi handlePrintHistory tanpa argument
                    >
                      <FontAwesomeIcon icon={faPrint} size="" />
                    </button>
                  </td>
                )}
              </div>
             
            </div>

            <div className="flex flex-col mt-2 mr-4">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nomor Pesanan
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nama Customer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tipe Kamar
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total Kamar
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Pemesanan
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
                          {this.state.role === "resepsionis" && (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Aksi
                            </th>
                          )}
                          {this.state.role === "resepsionis" && (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Print
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.booking.map((item, index) => {
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
                                <div className="text-sm text-gray-900">
                                  {item.nama_customer}
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
                                  {moment(item.tanggal_pemesanan).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(item.tanggal_check_in).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(item.tanggal_check_out).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.tipe_kamar.harga * item.total_kamar}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.status_pemesanan === "baru" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-indigo-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                                {item.status_pemesanan === "check_in" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-red-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                                {item.status_pemesanan === "check_out" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-gray-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                                {item.status_pemesanan === "services" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-gray-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                              </td>
                              {this.state.role === "resepsionis" && (
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  name="status_pemesanan"
                                  value={this.state.status_pemesanan}
                                  onChange={this.handleChange}
                                  required
                                  onSubmit={(event) => this.handleSave(event)}
                                >
                                  <button
                                    class="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2"
                                    onClick={() =>
                                      this.handleEditStatus(item, "baru")
                                    }
                                    type="submit"
                                    value="baru"
                                  >
                                    <FontAwesomeIcon
                                      icon={faReceipt}
                                      size="lg"
                                    />
                                  </button>
                                  <button
                                    class="bg-blue-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2"
                                    onClick={() =>
                                      this.handleEditStatus(item, "check_in")
                                    }
                                    type="submit"
                                    value="check_in"
                                  >
                                    <FontAwesomeIcon
                                      icon={faSignIn}
                                      size="lg"
                                    />
                                  </button>

                                  <button
                                    class="bg-red-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2"
                                    onClick={() =>
                                      this.handleEditStatus(item, "check_out")
                                    }
                                    type="submit"
                                    value="check_out"
                                  >
                                    <FontAwesomeIcon
                                      icon={faSignOut}
                                      size="lg"
                                    />
                                  </button>
                                  <button
                                    class="bg-yellow-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2"
                                    onClick={() =>
                                      this.handleEditStatus(item, "services")
                                    }
                                    type="submit"
                                    value="services"
                                  >
                                    <FontAwesomeIcon icon={faBrush} size="lg" />
                                  </button>
                                </td>
                              )}
                              {this.state.role === "resepsionis" && (
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  name="status_pemesanan"
                                  value={this.state.status_pemesanan}
                                  onChange={this.handleChange}
                                  required
                                  onSubmit={(event) => this.handleSave(event)}
                                >
                                  <button
                                    class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                                    onClick={() =>
                                      this.handlePrintElement(item)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faPrint} size="lg" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                        <div>
                          <PDFExport ref={this.state.pdfExportComponent}>
                            <div ref={this.state.container}>
                              {this.state.isPrint ? (
                                Array.isArray(this.state.dataPrint) ? (
                                  this.state.dataPrint.map((item, index) => (
                                    <Printhistory key={index} item={item} />
                                  ))
                                ) : (
                                  <PrintElement item={this.state.dataPrint} />
                                )
                              ) : null}
                            </div>
                          </PDFExport>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="footer px-4 py-2">
            <div class="footer-content">
              <p class="text-sm text-gray-600 text-center">
                © NextHotel 2023. All rights reserved.{" "}
                <a href="https://twitter.com/iaminos">by Matori</a>
              </p>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}
