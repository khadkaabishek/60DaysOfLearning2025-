import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/home_dash/Dashboard";
import Home from "./pages/home_dash/Home";
import MainLayout from "./layouts/MainLayout";
import AddItem from "./pages/Manipulate/AddItem";
import SingleItem from "./pages/SingleItem";
import Cart from "./pages/Cart";
import EditItemInfo from "./pages/Manipulate/EditItemInfo";
import MyItems from "./pages/MyItems";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login setIsAuthenticated={setIsAuthenticated} /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />

        <Route path="/add-item" element={isAuthenticated ? <MainLayout><AddItem /></MainLayout> : <Navigate to="/login" />} />
        
        <Route path="/dashboard" element={isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" />} />


        <Route path="/:id/my_items" element={<MainLayout><MyItems/></MainLayout>} />
        
        <Route path="/product/:id" element={<MainLayout><SingleItem/></MainLayout>} />
         <Route path="/:id/edit_item_info" element = { <MainLayout> <EditItemInfo/></MainLayout> }></Route>
        <Route path="/your_cart" element={<MainLayout><Cart/></MainLayout>} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
