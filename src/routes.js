import {createBrowserRouter} from "react-router-dom";
import Home from "./components/home/Home";
import Favoritos from "./components/favorito/Favoritos";
import Layout from "./components/Layout";
import Carrinho from "./components/carrinho/Carrinho";
import Perfil from "./components/perfil/Perfil";
import Login from "./components/login/Login";
import DetalheProduto from "./components/home/produto/DetalheProduto";
import Menu from "./components/menu/Menu";
import EditarPerfil from "./components/perfil/EditarPerfil";
import MeusPedidos from "./components/meusPedidos/MeusPedidos";
import Avaliacao from "./components/avaliacao/Avaliacao";
import Endereco from "./components/endereco/Endereco";
import Pagamento from "./components/pagamento/Pagamento";
import Registrar from "./components/usuario/Registrar";
import AcompanhamentoPedido from "./components/meusPedidos/AcompanhantoPedido";

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
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/favoritos', element: <Favoritos /> },
            { path: '/carrinho', element: <Carrinho /> },
            { path: '/perfil', element: <Perfil /> },
            { path: '/perfil/:perfilId', element: <EditarPerfil /> },
            { path: '/produto/:produtoId', element: <DetalheProduto /> },
            { path: '/menu', element: <Menu /> },
            { path: '/meus-pedidos', element: <MeusPedidos /> },
            { path: '/avaliacao', element: <Avaliacao /> },
            { path: '/endereco', element: <Endereco /> },
            { path: '/pagamento', element: <Pagamento /> },
            { path: '/acompanhamento-pedido', element: <AcompanhamentoPedido /> }
        ]
    }
]);
