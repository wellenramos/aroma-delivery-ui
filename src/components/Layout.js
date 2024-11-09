import { Outlet, useLocation } from 'react-router-dom';
import HomeNavigationBar from "./home/HomeNavigationBar";


const Layout = () => {
    const location = useLocation();

    const hideNavigationBar = location.pathname.includes('/produto/');

    return (
        <>
            <Outlet />
            {!hideNavigationBar && <HomeNavigationBar />}
        </>
    );
};

export default Layout;
