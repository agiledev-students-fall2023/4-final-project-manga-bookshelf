//TODO: import protect and public routes 
//Do later when doing auth

// Uncomment these later: 
// import {useRoutes} from 'react-router-dom' 
// import {protectedRoutes} from './protected'; 
// import {publicroutes} from './public'; 
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Header from "../components/Layout/Header/Header";
import Profile from "../pages/Profile/profile";
import Login from "../pages/LogIn/login";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/home"
import Follow from "../pages/Follow/follow";
import Manga from "../pages/Works/Manga";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/',
        element: <Header />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <Home/>,
            },
            {
                path: "/profile/:profileId",
                element: <Profile />,
            },
            {
                path: "profile/:profileId/follower",
                element: <Follow title='Follower'/>,
            },
            {
                path: "profile/:profileId/following",
                element: <Follow title='Following'/>,
            },
            {
                path: "/manga/:mangaId",
                element: <Manga />,
            },
            {
                path: "/setting",
                element: <div>Configure Buncha Settings</div>,
            },
        ]
    }
]);

export const AppRoutes = () => {
    return(
        <RouterProvider router={router} />
    )
}

// From Bulletproof react: 

// import { useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

// import { protectedRoutes } from './protected';
// import { publicRoutes } from './public';

// export const AppRoutes = () => {
//     const auth = useAuth();

//     const commonRoutes = [{ path: '/', element: <Landing /> }];

//     const routes = auth.user ? protectedRoutes : publicRoutes;

//     const element = useRoutes([...routes, ...commonRoutes]);

//     return <>{element}</>;
// };