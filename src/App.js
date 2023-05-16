import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./utils/AuthProvider";
import Login from "./Pages/User/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/User/Signup";
import Home from "./Pages/Home/Home";
import CarsForSale from "./Pages/CarsForSale/CarsForSale";
import AddCar from "./Pages/AddCar/AddCar";
import SoldCars from "./Pages/SoldCars/SoldCars";
import MyCollections from "./Pages/MyCollections/MyCollections";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars_for_sale" element={<CarsForSale />} />
          <Route path="/add_car" element={<AddCar />} />
          <Route path="/sold_cars" element={<SoldCars />} />
          <Route path="/my_collections" element={<MyCollections />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
