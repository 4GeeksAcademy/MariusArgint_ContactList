import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"

export const Layout = () => {
    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    )
}