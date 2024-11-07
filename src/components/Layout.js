import {Outlet} from "react-router-dom";
import HomeNavigationBar from "./home/HomeNavigationBar";

const Layout = () => (
    <>
        <Outlet />
        <HomeNavigationBar />
    </>
);

export default Layout;