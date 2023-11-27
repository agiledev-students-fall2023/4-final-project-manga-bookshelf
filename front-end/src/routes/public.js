
import Login from "../pages/Auth/LogIn/login";
import SignUp from "../pages/Auth/SignUp/signup";
import Error from "../pages/Error/Error";
import PasswordReset from "../pages/Auth/PasswordReset/PasswordReset";

export const publicRoutes = [
    {
        path: '/auth/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/auth/SignUp', 
        element: <SignUp/>,
        errorElement: <Error />,
    },
    {
        path: '/auth/reset-password', 
        element: <PasswordReset/>,
        errorElement: <Error />,
    }
];