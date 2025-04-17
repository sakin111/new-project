import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import { BsCart3 } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { FaSliders } from "react-icons/fa6";
import PropTypes from "prop-types";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <span className="loading loading-spinner loading-md mx-auto my-auto"></span>;
  }

  const NavItem = ({ to, icon, label }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-3 p-3 rounded-xl transition-all ${
            isActive ? "bg-white text-teal-600 shadow-md" : "hover:bg-teal-700"
          }`
        }
      >
        <div className="bg-white text-teal-600 p-2 rounded-lg shadow-md text-lg">{icon}</div>
        <span className="hidden lg:inline text-white font-medium">{label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Sidebar */}
      <aside className="bg-teal-600 lg:min-h-screen w-full lg:w-72 flex-shrink-0">
        <ul className="p-4 flex lg:flex-col sm:flex-row sm:justify-around gap-4 lg:gap-2">
          {isAdmin ? (
            <>
              <NavItem to="/dashboard/analytics" icon={<ImStatsBars />} label="Analytics" />
              <NavItem to="/dashboard/addItems" icon={<MdOutlinePlaylistAdd />} label="Add Items" />
              <NavItem to="/dashboard/allOrder" icon={<BsCart3 />} label="All Orders" />
              <NavItem to="/dashboard/bookings" icon={<FaBook />} label="Manage Cart" />
              <NavItem to="/dashboard/users" icon={<FaUsers />} label="All Users" />
              <NavItem to="/dashboard/addSlider" icon={<FaSliders />} label="Add Slider" />
            </>
          ) : (
            <>
              <NavItem to="/dashboard/userHome" icon={<FaHome />} label="User Home" />
              <NavItem to="/dashboard/history" icon={<FaCalendar />} label="Not History" />
              <NavItem to="/dashboard/review" icon={<FaAd />} label="Add a Review" />
              <NavItem to="/dashboard/paymentHistory" icon={<FaList />} label="Real Payment History" />
            </>
          )}
          <div className="divider my-6 hidden lg:block" />
          {/* Shared Nav */}
          <NavItem to="/" icon={<FaHome />} label="Home" />
          <NavItem to="/order/contact" icon={<FaEnvelope />} label="Contact" />
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600">Dashboard</h2>
          <div className="text-teal-600 text-2xl"><FaHome /></div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 min-h-[70vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


Dashboard.propTypes ={
  to: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
}

export default Dashboard;
