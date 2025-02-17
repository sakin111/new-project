import { Outlet, useLocation } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import Header1 from "../Shared/Header/Header1";
import HeaderUp from "../Shared/Header/HeaderUp";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || 
                         location.pathname.includes('signup');

  return (
    <div >
      {!noHeaderFooter && (
        <>
        <HeaderUp />
        <Header />
        <Header1 />
     
             
        </>
      )}
      <Outlet />
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
