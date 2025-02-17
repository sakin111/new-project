// import icons
import { FaAppleAlt,  FaTshirt, FaCrown, FaBook, FaMicrochip } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { GiFrozenOrb } from "react-icons/gi";


const Category = () => {
  return (
    <div className="flex-none bg-gradient-to-r from-teal-200 from-10% via-teal-300 via-50% to-teal-200 to-90% bg-opacity-15 rounded-md">
      <ul className="menu menu-horizontal p-0">
        <li className="relative group">
          {/* Hover Word */}
          <Link className="hover:text-cyan-600 text-teal-600 cursor-pointer text-base font-Roboto flex items-center gap-1">
            Category <IoIosArrowDown />
          </Link>

          {/* Dropdown Menu */}
          <ul className="absolute left-0 top-full hidden group-hover:grid grid-cols-3 bg-white shadow-lg rounded-lg p-5 w-[500px] z-10 font-Roboto text-gray-500">
            <li>
              <Link to="/" className=" p-2 rounded flex items-center gap-2">
                <FaAppleAlt /> Groceries
              </Link>
            </li>
            <li>
              <Link to="/" className=" p-2 rounded flex items-center gap-2">
              <GiFrozenOrb /> Frozen Items
              </Link>
            </li>
            <li>
              <Link to="/" className="  p-2 rounded flex items-center gap-2">
              <FaMicrochip /> Electronics
              </Link>
            </li>
            <li>
              <Link to="/" className=" p-2 rounded flex items-center gap-2">
                <FaTshirt /> Clothings
              </Link>
            </li>
            <li>
              <Link to="/" className=" p-2 rounded flex items-center gap-2">
                <FaCrown /> Luxury
              </Link>
            </li>
            <li>
              <Link to="/" className=" p-2 rounded flex items-center gap-2">
                <FaBook /> Books
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Category;
