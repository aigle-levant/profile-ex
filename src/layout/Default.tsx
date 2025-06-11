import { Outlet } from "react-router-dom";
// components
import NavBar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
