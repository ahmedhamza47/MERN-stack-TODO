import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import SignUp from "./Signup";
import Home from "./Home";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      if (location.pathname === "/signup") {
        navigate("/signup");
      } else {
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
