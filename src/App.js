import "./Style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div>
            <Home />
            <Toaster />
        </div>
    );
}

export default App;
