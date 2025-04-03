import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import { BsCart3 } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { FaSliders } from "react-icons/fa6";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <span className="loading loading-spinner loading-md mx-auto my-auto"></span>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full overflow-hidden">
      {/* Sidebar */}
      <div className="bg-teal-600 text-white  lg:min-h-full flex sm:flex-row lg:flex-col sm:items-center lg:w-72 w-full">
        <ul className="flex sm:flex-row lg:flex-col w-full sm:justify-around lg:space-y-4 p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/analytics" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                    <ImStatsBars />
                  </div>
                  <span className="hidden lg:inline">Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                <MdOutlinePlaylistAdd />
                  </div>
                
                  <span className="hidden lg:inline">Add Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allOrder" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
              
                  <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                  <BsCart3 />
                  </div>
                  <span className="hidden lg:inline">All Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                <FaBook />
                  </div>
                
                  <span className="hidden lg:inline">Manage Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                <FaUsers />
                  </div>
                 
                  <span className="hidden lg:inline">All Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addSlider" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
                <FaSliders />
                  </div>
                  
                  <span className="hidden lg:inline">Add Slider</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                  <FaHome />
                  <span className="hidden lg:inline">User Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                  <FaCalendar />
                  <span className="hidden lg:inline">Not History</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                  <FaAd />
                  <span className="hidden lg:inline">Add a Review</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
                  <FaList />
                  <span className="hidden lg:inline">Real Payment History</span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-6 hidden lg:block"></div>
          {/* Shared Nav Links */}
          <li>
            <NavLink to="/" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
            <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
            <FaHome />
                  </div>
           
              <span className="hidden lg:inline">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact" className="flex flex-col items-center lg:flex-row lg:space-x-3 hover:bg-teal-700 p-3 rounded-md">
            <div className="bg-white rounded-md shadow-md p-2 text-teal-600">
            <FaEnvelope />
                  </div>
             
              <span className="hidden lg:inline">Contact</span>
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
