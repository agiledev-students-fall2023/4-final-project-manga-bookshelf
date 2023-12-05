import Login from "../pages/Auth/LogIn/login";
// From Bulletproof react: 
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
    const jwtToken = localStorage.getItem('jwtToken');

    const commonRoutes = [{ path: '/', element: <Login /> }];

    // Check to make sure we have our jwt (not set to null)
    const routes = (jwtToken !== "null" && jwtToken !== null) ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);
    console.log(localStorage.getItem("user")) //checking if user is present (delete later) 
    return <>{element}</>;
};