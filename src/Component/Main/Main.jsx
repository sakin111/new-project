import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import Header1 from "../Shared/Header/Header1";


const Main = () => {
    return (
        <div>
          <Header1></Header1>
          <Header ></Header>  
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
    );
};

export default Main;