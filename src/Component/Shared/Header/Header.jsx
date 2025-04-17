import { Link } from "react-router-dom";
import Search from "./Search";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "../../Hook/useCart";
import useCookiesData from "../../Hook/useCookiesData";
import useAuth from "../../Hook/useAuth";
import { CiUser } from "react-icons/ci";



const Header = () => {
  const { cartData,  } = useCart();
  const { cartCookies,  } = useCookiesData();
  const { user } = useAuth();

  const totalItems = user?.email ? cartData?.length : cartCookies.length || 0;





  return (
    <header className="bg-white   py-3 ">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-10 ">
        {/* Navbar Start */}
        <div className="flex items-center gap-8">
          {/* Logo */}
         
            <h4 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 via-purple-600 to-fuchsia-500 mb-4">ShopArt</h4>
         




        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-6">
          <Search />
          <Link to="/cart" aria-label="View Cart">
            <div className="relative">
              <CiShoppingCart className="text-black w-7 h-7" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-400 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

            {/* Profile */}
            <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full p-1">
              {user && user.displayName ? (
                <div className="text-base w-7 h-7 text-center  bg-gray-600 text-white">{user.displayName.charAt(0).toUpperCase()}</div>
              ) : (
                <CiUser  className="w-6 h-6"  />
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {/* <div className="lg:hidden bg-white px-4 py-2 border-t">
        <nav>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-base font-medium text-gray-700 hover:text-cyan-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div> */}
    </header>
  );
};

export default Header;
