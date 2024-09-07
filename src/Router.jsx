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







{/*  errorElement: <ErrorPage></ErrorPage>, */}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
       
        children: [
            {
                path: "/",
                element:<HomePage></HomePage>
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
                path:"/card",
                element:<Section1></Section1>
            },
            {
                path: "/card/:id",
                element: <Section1Details></Section1Details>,
                loader: ({ params }) => fetch(`http://localhost:5000/card/${params.id}`)
            },
           
            {
                path: "/cardMix/:id",
                element: <Section2Details></Section2Details>,
                loader: ({ params }) => fetch(`http://localhost:5000/cardMix/${params.id}`)
            },
            {
                path: "/cart",
                element: <CardOption></CardOption>,
             
            },
           
         
        

        ]
    },

    {
        path: '/dashboard',
        element:<Private><Dashboard></Dashboard></Private>,
        children: [
            {
                path: '/dashboard/',
                element: <HomePage></HomePage>
            },
            {
                path: '/dashboard/users',
                element:<AdminRoute><Users></Users></AdminRoute>
            },
           

        ]
           
    }
]);


export default router