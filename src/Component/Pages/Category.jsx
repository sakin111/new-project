// import icons
import { FaAppleAlt,  FaTshirt, FaCrown, FaBook, FaMicrochip } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiFrozenOrb } from "react-icons/gi";


const Category = () => {
  return (
    <div className="mx-auto">
    <ul className="bg-white shadow-lg rounded-lg p-5 z-10 font-Roboto text-gray-500  ml-9">

<h4 className="hover:text-cyan-600 text-teal-600 cursor-pointer text-base font-Roboto text-start ml-4 mb-6 ">Category</h4>
  <li>
    <Link to="/" className=" p-2 rounded flex items-center gap-4 font-Lato ">
      <FaAppleAlt className="text-green-500"/> Groceries
    </Link>
  </li>
  <li>
    <Link to="/" className=" p-2 rounded flex items-center gap-4 font-Lato" >
    <GiFrozenOrb  className="text-sky-300"/> Frozen Items
    </Link>
  </li>
  <li>
    <Link to="/" className="  p-2 rounded flex items-center gap-4 font-Lato">
    <FaMicrochip className="text-stone-700"/> Electronics
    </Link>
  </li>
  <li>
    <Link to="/" className=" p-2 rounded flex items-center gap-4 font-Lato">
      <FaTshirt className="text-amber-500"/> Clothings
    </Link>
  </li>
  <li>
    <Link to="/" className=" p-2 rounded flex items-center gap-4 font-Lato">
      <FaCrown className="text-yellow-600"/> Luxury
    </Link>
  </li>
  <li> 
    <Link to="/" className=" p-2 rounded flex items-center gap-4 font-Lato">
      <FaBook className="text-pink-900"/> Books
    </Link>
  </li>
</ul>
    </div>
  );
};

export default Category;
