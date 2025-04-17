// import { useState } from "react";
// import { FaAppleAlt, FaTshirt, FaCrown, FaBook, FaMicrochip, FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { GiFrozenOrb } from "react-icons/gi";

// const Category = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Hamburger Icon (Visible on Small & Medium Screens) */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="md:hidden flex items-center px-4 py-2 text-gray-700"
//       >
//         <FaBars className="text-2xl" />
//         <span className="ml-2">Categories</span>
//       </button>

//       {/* Category List (Visible on Large Screens & as a Dropdown on Small Screens) */}
//       <ul 
//         className={`bg-white shadow-lg rounded-lg p-5 font-Roboto text-gray-500 ml-9 
//           ${isOpen ? "absolute top-12 left-0 w-48 z-10" : "hidden"} md:block`}
//       >
//         <h4 className="hover:text-cyan-600 text-teal-600 cursor-pointer text-base font-Roboto text-start ml-4 mb-6">
//           Category
//         </h4>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <FaAppleAlt className="text-green-500"/> Groceries
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <GiFrozenOrb className="text-sky-300"/> Frozen Items
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <FaMicrochip className="text-stone-700"/> Electronics
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <FaTshirt className="text-amber-500"/> Clothings
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <FaCrown className="text-yellow-600"/> Luxury
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="p-2 rounded flex items-center gap-4 font-Lato">
//             <FaBook className="text-pink-900"/> Books
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Category;
