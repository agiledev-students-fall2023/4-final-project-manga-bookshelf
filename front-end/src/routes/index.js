import Login from "../pages/Auth/LogIn/login";
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
    const jwtToken = localStorage.getItem('jwtToken');

    const commonRoutes = [{ path: '/', element: <Login /> }];

    // Check to make sure we have our jwt (not set to null)
    const routes = (jwtToken !== "null" && jwtToken !== null) ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};