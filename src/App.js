import "./Style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Components/Login";

function App() {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                ></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
