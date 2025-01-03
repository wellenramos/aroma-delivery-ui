import { createBrowserRouter } from "react-router-dom";
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
import Produto from "./components/administrador/produto/Produto";
import IntroPages from "./components/login/IntroPages";


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
            { path: '', element: <HomeAdmin /> }, // Rota de admin home
            { path: 'menu', element: <MenuAdmin /> },
            { path: 'pedido/:pedidoId', element: <DetalhesPedido /> },
            { path: 'produtos', element: <Produtos /> },
            { path: 'produtos/cadastrar', element: <Produto /> },
            { path: 'produtos/:produtoId/editar', element: <Produto /> },
        ]
    },
    {
        path: '/',
        element: <IntroPages />,
    },
    {
        path: '/home',
        element: <Layout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'favoritos', element: <Favoritos /> },
            { path: 'carrinho', element: <Carrinho /> },
            { path: 'carrinho/:carrinhoId', element: <Carrinho /> },
            { path: 'produto/:produtoId', element: <DetalheProduto /> },
            { path: 'menu', element: <Menu /> },
            { path: 'meus-pedidos', element: <MeusPedidos /> },
            { path: 'avaliacao', element: <Avaliacao /> },
            { path: 'enderecos', element: <Enderecos /> },
            { path: 'pagamento', element: <Pagamento /> },
        ]
    }
]);
