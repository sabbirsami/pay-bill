import "./Style.css";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Components/Login";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import PageNotFound from "./Components/PageNotFound";

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
          />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />;
      </div>
    </QueryClientProvider>
  );
}

export default App;
