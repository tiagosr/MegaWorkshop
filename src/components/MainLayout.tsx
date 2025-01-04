import { Outlet } from "react-router-dom";

import TopToolbar from "./TopToolbar";

const MainLayout: React.FC = () => {
    return (
        <>
            <TopToolbar />
            <Outlet />
        </>
    );
};

export default MainLayout;