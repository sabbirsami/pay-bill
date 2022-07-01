import "./Style.css";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Components/Login";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import PageNotFount from "./Components/PageNotFount";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Routes>
                    <Route
                        path="/billing"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    ></Route>
                    <Route path="/registration" element={<SignUp />}></Route>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="*" element={<PageNotFount />}></Route>
                </Routes>
                <Toaster />;
            </div>
        </QueryClientProvider>
    );
}

export default App;
