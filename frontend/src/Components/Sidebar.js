import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBed, faUsers, faUser, faHistory, faList, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768, // Mendeteksi apakah layar saat ini adalah layar mobile (ukuran <= 768)
      isSidebarOpen: true, // Menyimpan status sidebar (buka atau tutup)
      role: localStorage.getItem('role')
    };
    this.logOut = this.logOut.bind(this);
    this.checkRole = this.checkRole.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize); // Menambahkan event listener untuk mendeteksi perubahan ukuran layar
    this.checkRole();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize); // Membersihkan event listener saat komponen di-unmount
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;
    this.setState({
      isMobile: isMobile,
      isSidebarOpen: !isMobile // Jika mode mobile, sidebar akan selalu ditutup
    });
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }));
  }

  logOut() {
    if (window.confirm('Are you sure to logout')) {
      window.location = '/';
      localStorage.clear();
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
    }
  }

  checkRole() {
    if (this.state.role !== 'admin' && this.state.role !== 'resepsionis') {
      localStorage.clear();
      window.alert("You're not admin or resepsionis!");
      window.location = '/';
    }
  }

  render() {
    const { isMobile, isSidebarOpen } = this.state;

    return (
      <aside
        className={`sidebar w-64 lg:shadow transition-transform duration-150 ease-in bg-main ${isMobile && !isSidebarOpen ? '-translate-x-full lg:translate-x-0' : ''}`}
      >
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
              <img src="/assets/logo1.png" className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 20 20" />
            </a>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          {isMobile && (
            <div className="my-px">
              <button onClick={this.toggleSidebar} className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base">
                <span className="mr-2 flex items-center justify-center text-lg text-main-400">
                  <FontAwesomeIcon icon={isSidebarOpen ? faAngleDoubleLeft : faAngleDoubleRight} color="white" />
                </span>
                <span className="ml-3">{isSidebarOpen ? 'Minimize' : 'Maximize'}</span>
              </button>
            </div>
          )}
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <a
                href="/dashboard"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-2 flex items-center justify-center text-lg text-main-400">
                  <FontAwesomeIcon icon={faHome} color="white" />
                </span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="/typeRoom"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-2 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faBed} color="white" />
                </span>
                <span className="ml-3">Tipe Kamar</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="/Room"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faList} color="white" />
                </span>
                <span className="ml-3">Kamar</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="/user"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUser} color="white" />
                </span>
                <span className="ml-4">User</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="/customer"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUsers} color="white" />
                </span>
                <span className="ml-2">Customer</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="/historytransaksi"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800 font-base"
              >
                <span className="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faHistory} color="white" />
                </span>
                <span className="ml-3">History Transaksi</span>
              </a>
            </li>
            <li className="my-px" onClick={this.logOut}>
              <a
                href="/"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-blue-100 hover:text-blue-800"
              >
                <span className="mr-3 flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="ml-2" onClick={this.logOut}>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}
