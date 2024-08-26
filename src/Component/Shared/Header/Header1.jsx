import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleUser, FaOrcid } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from 'framer-motion';
import { LuLayoutDashboard, LuLogIn } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

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

  return (
    <div>
      <div className="navbar h-14 bg-base-100">
        <div className="flex-1"></div>
        <div className="flex-none">
          {/* Dropdown */}
          <div className="dropdown dropdown-end z-30">
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
                  <BsThreeDotsVertical />
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


              



                <motion.li variants={itemVariants}>
                 <motion.div>
                 <FaOrcid />  Timeline
                 </motion.div>
                  </motion.li>

                <motion.li variants={itemVariants}>
                 <motion.div>
                 <LuLogIn /> Login
                 </motion.div>
                  </motion.li>

                <motion.li variants={itemVariants}>
                 <motion.div>
                 <IoSettingsOutline />  Settings
                 </motion.div>
                  </motion.li>
             
              </motion.ul>
            </motion.nav>
          </div>

          {/* Profile */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full">
              <FaCircleUser className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;
