
import { Link } from "react-router-dom";
import './Header.css';
import { CiShoppingCart } from "react-icons/ci";
import Search from "./Search";
import { useState } from "react";


const Header = () => {
    const [showNav, setShowNav] = useState(true);
  

    const handleSearchIconClick = (isSearchVisible) => {
        setShowNav(!isSearchVisible);
    };

    const nav = (
        <>
            <span className="gradient-text text-base font-sans gradient-border pb-2 active:text-white">
                <Link to="/">Home</Link>
                <span className="gradient-border"></span>
            </span>
            <span className="gradient-text font-sans gradient-border text-md text-base">
                <Link to="/shop">Shop</Link>
                <span className="gradient-border"></span>
            </span>
            <span className="gradient-text font-sans gradient-border text-md text-base">
                <Link to="/bestDeal">Best Deal</Link>
                <span className="gradient-border"></span>
            </span>
            <span className="gradient-text font-sans gradient-border text-md text-base">
                <Link to="/faq">FAQ</Link>
                <span className="gradient-border"></span>
            </span>
            <span className="gradient-text font-sans gradient-border text-md text-base">
                <Link to="/contact">Contact</Link>
                <span className="gradient-border"></span>
            </span>
            <span className="gradient-text font-sans gradient-border text-md text-base">
                <Link to="/blogs">Our Blogs</Link>
                <span className="gradient-border"></span>
            </span>
        </>
    );

    return (
        <div className="navbar bg-gradient-to-r sticky top-0 z-10 from-cyan-400 to-violet-700 border-none px-10 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {showNav && (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    )}
                </div>
                {showNav && (
                    <div>
                        <img src="https://i.ibb.co/mSC0cV4/Gemini-Generated-Image-6fnebt6fnebt6fne-removebg-preview.png" alt="logo" className="w-24 h-16" />
                       
                    </div>
                )}
            </div>
            <div className="navbar-center hidden lg:flex">
                {showNav && (
                    <ul className="menu menu-horizontal px-1 gap-6">
                        {nav}
                    </ul>
                )}
            </div>
            <div className="navbar-end gap-7" >
                <div>
                    <Search onSearchIconClick={handleSearchIconClick}  />
                </div>
             <div >
             {showNav && (
                    <Link to="/cart"><CiShoppingCart className="text-white font-bold w-7 h-7"  /></Link>
                )}
             </div>
            </div>
        </div>
    );
};

export default Header;
