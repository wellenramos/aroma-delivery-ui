import {createBrowserRouter} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Favorito from "./components/favorito/Favorito";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/favoritos",
        element: <Favorito />,
    },
]);