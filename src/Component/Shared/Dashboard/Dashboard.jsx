import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import { BsCart3 } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <span className="loading loading-spinner loading-md mx-auto my-auto"></span>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-teal-600 text-white min-h-screen overflow-y-auto">
        <ul className="menu p-6 space-y-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <ImStatsBars />
                  </div>
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <MdOutlinePlaylistAdd />
                  </div>
                  <span>Add Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allCart"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <BsCart3 />
                  </div>
                  <span>All Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/bookings"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <FaBook />
                  </div>
                  <span>Manage Bookings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <FaUsers />
                  </div>
                  <span>All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <FaHome />
                  <span>User Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/history"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <FaCalendar />
                  <span>Not History</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/review"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <FaAd />
                  <span>Add a Review</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
                >
                  <FaList />
                  <span>Real Payment History</span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-6"></div>
          {/* Shared Nav Links */}
          <li>
            <NavLink
              to="/"
              className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order/contact"
              className="flex items-center space-x-3 hover:bg-teal-700 p-3 rounded-md"
            >
              <FaEnvelope />
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-teal-600 text-3xl font-semibold">Dashboard</h2>
          <div className="text-teal-600">
            <FaHome />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
