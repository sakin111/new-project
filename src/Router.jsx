import { createBrowserRouter } from "react-router-dom";
import Main from "./Component/Main/Main";
import HomePage from "./Component/Home/HomePage/HomePage";
import Login from "./Component/Shared/Login/Login";
import SignUp from "./Component/Shared/SignUp/SignUp";
import Section1 from "./Component/Home/HomePage/Section1/Section1";
import Section1Details from "./Component/Home/HomePage/Section1/Section1Details/Section1Details";
import Dashboard from "./Component/Shared/Dashboard/Dashboard";
import Section2Details from "./Component/Home/HomePage/Section2/Section2Details";
import CardOption from "./Component/Shared/CardOption/CardOption";
import AdminRoute from "./Component/Shared/Secure/AdminRoute";
import Users from "./Component/Shared/Dashboard/Users";
import Private from "./Component/Shared/Secure/Private";
import EditAddress from "./Component/Shared/payment/MakeAddress/EditAddress";
import AllCart from "./Component/Shared/Dashboard/AllCart";
import MyCart from "./Component/Shared/Dashboard/MyCart";
import OrderConfirm from "./Component/Shared/payment/MakeAddress/OrderConfirm";
import Analytics from "./Component/Shared/Dashboard/Analytics";






// http://localhost:5000
// https://new-project-server-maliksakin53gmailcoms-projects.vercel.app

{/*  errorElement: <ErrorPage></ErrorPage>, */ }


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,

        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/card",
                element: <Section1></Section1>
            },
            {
                path: "/card/:id",
                element: <Section1Details></Section1Details>,
                loader: ({ params }) => fetch(`https://new-project-server-git-main-maliksakin53gmailcoms-projects.vercel.app//card/${params.id}`)
            },

            {
                path: "/cardMix/:id",
                element: <Section2Details></Section2Details>,
                loader: ({ params }) => fetch(`https://new-project-server-git-main-maliksakin53gmailcoms-projects.vercel.app//cardMix/${params.id}`)
            },
            {
                path: "/cart",
                element: <CardOption></CardOption>,

            },

            {
                path: "/checkout",
                element: <EditAddress></EditAddress>,

            },
            // {
            //     path: "/checkoutCookies", // Checkout page for guest users (cookies-based cart)
            //     element: <EditAddress></EditAddress>,  // Same component for both users
            // },
            {
                path: '/myCart',
                element: <MyCart></MyCart>
            },
            {
                path: "/order-confirmation",
                element: <OrderConfirm></OrderConfirm>
            },






        ]
    },

    {
        path: '/dashboard',
        element: <Private><Dashboard></Dashboard></Private>,
        children: [
            {
                path: '/dashboard/analytics',
                element: <AdminRoute><Analytics></Analytics></AdminRoute>
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: '/dashboard/allCart',
                element: <AdminRoute><AllCart></AllCart></AdminRoute>
            },
            // {
            //     path: '/dashboard/myCart',
            //     element:<MyCart></MyCart>
            // },


        ]

    }
]);


export default router