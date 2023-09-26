import "./App.css";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./Component/Product";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import NotFound from "./Component/NotFound";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<Product />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
