import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "./Component/Main/Main";
import HomePage from "./Component/Home/HomePage/HomePage";
import Login from "./Component/Shared/Login/Login";
import SignUp from "./Component/Shared/SignUp/SignUp";
import Section1 from "./Component/Home/HomePage/Section1/Section1";
import Section1Details from "./Component/Home/HomePage/Section1/Section1Details/Section1Details";
import Dashboard from "./Component/Shared/Dashboard/Dashboard";
import CardOption from "./Component/Shared/CardOption/CardOption";
import AdminRoute from "./Component/Shared/Secure/AdminRoute";
import Users from "./Component/Shared/Dashboard/Users";
import Private from "./Component/Shared/Secure/Private";
import EditAddress from "./Component/Shared/payment/MakeAddress/EditAddress";
import AllCart from "./Component/Shared/Dashboard/AllCart";
import MyCart from "./Component/Shared/Dashboard/MyCart";
import OrderConfirm from "./Component/Shared/payment/MakeAddress/OrderConfirm";
import Analytics from "./Component/Shared/Dashboard/Analytics";
import AddSlider from "./Component/Shared/Dashboard/AddSlider";
import MyOrder from "./Component/Shared/CardOption/MyOrder";
import SearchResults from "./Component/Shared/Header/SearchResult";
import ErrorPage from "./Component/Shared/ErrorPage";
import Shop from "./Component/Pages/Shop/Shop";
import BlackMarket from "./Component/Pages/bestDeal/BlackMarket";
import FridayNight from "./Component/Pages/bestDeal/FridayNight";
import Coupon from "./Component/Pages/bestDeal/Coupon";
import Blogs from "./Component/Pages/Blogs/Blogs";
import Payment from "./Component/Shared/payment/MakeCardPayment/Payment";


// Load environment variables
const linkParams = import.meta.env.PROD 
  ? import.meta.env.VITE_API_PROD_URL 
  : import.meta.env.VITE_API_BASE_URL;






const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,  // Error page for handling broken routes
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/card", element: <Section1 /> },
      {
        path: "/card/:id",
        element: <Section1Details />,
        loader: ({ params }) => fetch(`${linkParams}/card/${params.id}`),
      },
      { path: "/cart", element: <CardOption /> },
      { path: "/checkout", element: <EditAddress /> },
      { path: "/myCart", element: <MyCart /> },
      { path: "/order-confirmation", element: <OrderConfirm /> },
      { path: "/myOrder", element: <MyOrder /> },
      { path: "/products", element: <SearchResults /> },
      { path: "/shop", element: <Shop/>},
      { path: "/blackMarket", element: <BlackMarket></BlackMarket> },
      { path: "/fridayNight", element:<FridayNight></FridayNight> },
      { path: "/coupon", element:<Coupon></Coupon> },
      { path: "/blogs", element:<Blogs></Blogs> },
      { path: "/cardPay", element:<Payment></Payment>},
    ],
  },
  {
    path: "dashboard",
    element: <Private><Dashboard /></Private>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="userHome" replace /> }, // redirect to default
    
      // Admin
      { path: "analytics", element: <AdminRoute><Analytics /></AdminRoute> },
      { path: "users", element: <AdminRoute><Users /></AdminRoute> },
      { path: "allOrder", element: <AdminRoute><AllCart /></AdminRoute> },
      { path: "addSlider", element: <AdminRoute><AddSlider /></AdminRoute> },
    
      // User
      { path: "userHome", element: <Private><MyCart /></Private> },
      { path: "history", element:  <Private><MyOrder /> </Private> },
      { path: "review", element:  <Private><CardOption />  </Private>},
      { path: "paymentHistory", element:   <Private> <Payment /></Private> },
    ],
    
  },
]);

export default router;
