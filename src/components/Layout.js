import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import HomeNavigationBar from "./shared/HomeNavigationBar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login')
  }

  const esconderBarraDeNavegacao = location.pathname.includes('/produto/');

  return (
      <>
        <Outlet/>
        {!esconderBarraDeNavegacao && <HomeNavigationBar/>}
      </>
  );
};

export default Layout;
