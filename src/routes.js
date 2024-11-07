import {createBrowserRouter} from "react-router-dom";
import Home from "./components/home/Home";
import Favoritos from "./components/favorito/Favoritos";
import Layout from "./components/Layout";
import Carrinho from "./components/carrinho/Carrinho";
import Perfil from "./components/perfil/Perfil";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/favoritos', element: <Favoritos /> },
            { path: '/carrinho', element: <Carrinho /> },
            { path: '/perfil', element: <Perfil /> }
        ]
    }
]);
