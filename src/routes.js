import {createBrowserRouter} from "react-router-dom";
import Home from "./components/cliente/home/Home";
import Favoritos from "./components/cliente/favorito/Favoritos";
import Layout from "./components/Layout";
import Carrinho from "./components/cliente/carrinho/Carrinho";
import Login from "./components/login/Login";
import DetalheProduto from "./components/cliente/home/produto/DetalheProduto";
import MenuAdmin from "./components/administrador/menu/Menu";
import MeusPedidos from "./components/cliente/pedidos/MeusPedidos";
import Avaliacao from "./components/cliente/avaliacao/Avaliacao";
import Pagamento from "./components/cliente/pagamento/Pagamento";
import Registrar from "./components/usuario/Registrar";
import Enderecos from "./components/cliente/endereco/Enderecos";
import HomeAdmin from "./components/administrador/HomeAdmin";
import DetalhesPedido from "./components/administrador/pedido/DetalhePedido";
import Menu from "./components/cliente/menu/Menu";
import Produtos from "./components/administrador/produto/Produtos";
import Cadastro from "./components/administrador/produto/Cadastro";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/registrar",
        element: <Registrar />,
    },
    {
        path: '/admin',
        element: <Layout />,
        children: [
            { path: '/admin', element: <HomeAdmin /> },
            { path: '/admin/menu', element: <MenuAdmin /> },
            { path: '/admin/pedido/:pedidoId', element: <DetalhesPedido /> },
            { path: '/admin/produtos', element: <Produtos /> },
            { path: '/admin/cadastro', element: <Cadastro /> },

        ]
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/favoritos', element: <Favoritos /> },
            { path: '/carrinho', element: <Carrinho /> },
            { path: '/carrinho/:carrinhoId', element: <Carrinho /> },
            { path: '/produto/:produtoId', element: <DetalheProduto /> },
            { path: '/menu', element: <Menu /> },
            { path: '/meus-pedidos', element: <MeusPedidos /> },
            { path: '/avaliacao', element: <Avaliacao /> },
            { path: '/enderecos', element: <Enderecos /> },
            { path: '/pagamento', element: <Pagamento /> }
        ]
    }
]);
