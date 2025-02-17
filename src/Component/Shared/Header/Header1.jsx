import { BsCart2 } from "react-icons/bs";
import { FaOrcid } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { motion } from 'framer-motion';
import { LuLayoutDashboard, LuLogIn, LuLogOut } from "react-icons/lu";
import { IoReorderThreeOutline, IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../../../Firebase/Firebase.config";
import { IoIosArrowDown } from "react-icons/io";
import { FaFireAlt } from "react-icons/fa";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Header1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext)

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Our Blogs", path: "/blogs" },
  ];




  return (
    <div>






      <div className="navbar h-14 bg-base-100 border-b-2 px-10">





      <div className="flex-1"></div>
        <div className="flex-none">
          {/* Dropdown */}
          <div className="dropdown dropdown-start z-30 mx-4">
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="menu"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle"
              >
                <motion.div
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                 <IoReorderThreeOutline className="w-9 h-9" />
                </motion.div>
              </motion.button>
              <motion.ul
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                variants={{
                  open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              >
                <motion.li variants={itemVariants} >
                  <Link to="/Dashboard" className="flex justify-start items-center gap-3">
                    <motion.div ><LuLayoutDashboard /></motion.div>
                    <motion.div >  Dashboard</motion.div>
                  </Link>
                </motion.li>


                <motion.li variants={itemVariants} >
                  <Link to="/myCart" className="flex justify-start items-center gap-3">
                    <motion.div ><BsCart2></BsCart2></motion.div>
                    <motion.div >My cart</motion.div>
                  </Link>
                </motion.li>






                <motion.li variants={itemVariants}>
                  <motion.div>
                    <FaOrcid />  Timeline
                  </motion.div>
                </motion.li>

                <motion.div>
                  {
                    user ? (
                      <motion.li variants={itemVariants}>
                        <motion.button onClick={logOut} >
                          <LuLogOut /> <motion.div>logout</motion.div>
                        </motion.button>
                      </motion.li>
                    ) : (

                      <motion.li variants={itemVariants}>
                        <motion.div>
                          <LuLogIn /> <Link to="/login">Login</Link>
                        </motion.div>
                      </motion.li>
                    )
                  }
                </motion.div>


                <motion.li variants={itemVariants}>
                  <motion.div>
                    <IoSettingsOutline />  Settings
                  </motion.div>
                </motion.li>

              </motion.ul>
            </motion.nav>
          </div>

        
        </div>






        {/* Navbar Links */}
        <nav className="hidden lg:flex justify- start w-full mx-10">
          <ul className="flex gap-7">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-base font-medium text-gray-700 font-Roboto hover:text-cyan-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>


          {/* this is hover  */}



          <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li className="relative group">
            {/* Hoverable Word */}
            <Link className="hover:text-cyan-600 text-gray-700 cursor-pointer text-base font-Roboto"> <FaFireAlt className=" text-orange-600 "/>  Best Deal <IoIosArrowDown /></Link>

            {/* Dropdown Menu */}
            <ul className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg p-2 w-40 z-10">
              <li>
                <Link to="/" className="hover:bg-gray-100 p-2 rounded">
                  Web Design
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:bg-gray-100 p-2 rounded">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:bg-gray-100 p-2 rounded">
                  Content Writing
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
        </nav>






      
      </div>
    </div>

  );
};

export default Header1;
