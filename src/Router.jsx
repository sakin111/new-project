import { createBrowserRouter } from "react-router-dom";
import Main from "./Component/Main/Main";
import HomePage from "./Component/Home/HomePage/HomePage";
import Login from "./Component/Shared/Login/Login";
import SignUp from "./Component/Shared/SignUp/SignUp";





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
           
         
        

        ]
    },

    // {
    //     path: '/dashboard',
    //     element:<Dashboard></Dashboard>,
    //     children: [
    //         {
    //             path: '/dashboard/',
    //             element: <Home></Home>
    //         },
    //         {
    //             path: '/dashboard/addItems',
    //             element: <AddItem></AddItem>
    //         },
    //         {
    //             path: '/dashboard/users',
    //             element: <AdminRoute><Users></Users></AdminRoute>  
    //         },
           

    //     ]
           
    // }
]);


export default router