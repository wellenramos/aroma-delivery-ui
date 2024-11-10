import { Outlet, useLocation } from 'react-router-dom';
import HomeNavigationBar from "./home/HomeNavigationBar";
import EditarPerfil from "./perfil/EditarPerfil";


const Layout = () => {
    const location = useLocation();

    const esconderBarraDeNavegacao  = location.pathname.includes('/produto/') || location.pathname.includes('/perfil/');

    return (
        <>
            <Outlet />
            {!esconderBarraDeNavegacao && <HomeNavigationBar />}
        </>
    );
};
0
export default Layout;
