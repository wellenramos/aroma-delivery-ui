import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import HomeNavigationBar from "./home/HomeNavigationBar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login')
  }

  const esconderBarraDeNavegacao = location.pathname.includes('/produto/') || location.pathname.includes('/perfil/');

  return (
      <>
        <Outlet/>
        {!esconderBarraDeNavegacao && <HomeNavigationBar/>}
      </>
  );
};

export default Layout;
