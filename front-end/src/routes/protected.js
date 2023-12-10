import Header from "../components/Layout/Header/Header";
import Profile from "../pages/Profile/profile";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/home"
import Follow from "../pages/Follow/follow";
import Works from "../pages/Works/Works";
import Forum from "../pages/Forum/forum";
import MangaWorks from "../pages/MangaWorks/MangaWorks";
import Edit from "../pages/Edit/edit";
import Settings from "../pages/Settings/Settings"
import ForumUser from '../pages/ForumUser/ForumUser';

export const protectedRoutes = [
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
                element: <Home />,
            },
            {
                path: "/profile/:profileId",
                element: <Profile />,
            },
            {
                path: "/forum",
                element: <Forum />,
            },
            {
                path: "/forum/:forumId",
                element: <ForumUser />
            },
            {
                path: "profile/:profileId/follower",
                element: <Follow title='Follower' />,
            },
            {
                path: "profile/:profileId/following",
                element: <Follow title='Following' />,
            },
            {
                path: "profile/:profileId/edit",
                element: <Edit title='Edit' />,
            },
            {
                path: "/manga",
                element: <MangaWorks />,
            },
            {
                path: "/manga/:mangaId",
                element: <Works />,
            },
            {
                path: "/setting",
                element: <Settings/>,
            },
        ]
    },
];