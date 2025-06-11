// libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
// layout
import DefaultLayout from "./layout/Default";

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/compare"
            element={user ? <Compare /> : <Navigate to="/" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
