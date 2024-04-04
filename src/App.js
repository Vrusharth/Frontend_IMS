import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductDashboard from "./components/Products/ProductDashboard";
import ProductForm from "./components/Products/ProductForm";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./components/StoreOwner/ProductDetailsPage";
import Userview from "./components/Userview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/productdashboard" element={<ProductDashboard />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetailsPage />}
          />{" "}
          <Route path="//products/userview" element={<Userview />} />
          {/* Include productId parameter */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
