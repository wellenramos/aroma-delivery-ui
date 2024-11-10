import {createBrowserRouter} from "react-router-dom";
import Home from "./components/home/Home";
import Favoritos from "./components/favorito/Favoritos";
import Layout from "./components/Layout";
import Carrinho from "./components/carrinho/Carrinho";
import Perfil from "./components/perfil/Perfil";
import Login from "./components/login/Login";
import DetalheProduto from "./components/home/produto/DetalheProduto";
import Menu from "./menu/Menu";
import EditarPerfil from "./components/perfil/EditarPerfil";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/favoritos', element: <Favoritos /> },
            { path: '/carrinho', element: <Carrinho /> },
            { path: '/perfil', element: <Perfil /> },
            { path: '/perfil/:perfilId', element: <EditarPerfil /> },
            { path: '/produto/:produtoId', element: <DetalheProduto /> },
            { path: '/menu', element: <Menu /> }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
]);
