import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import Header1 from "../Shared/Header/Header1";


const Main = () => {

const NoHeaderFooter = location.pathname.includes('login') || 
 location.pathname.includes('signup');




    return (
        <div>
         {NoHeaderFooter || <Header1></Header1>}
          {NoHeaderFooter ||<Header ></Header>  }
          <Outlet></Outlet>
         {NoHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;