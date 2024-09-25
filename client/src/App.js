import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./pages/accounts/Accounts";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Create from "./pages/create-contact/Create";

// axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          exact
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          exact
          path="/create-contact"
          element={
            <Layout>
              <Create />
            </Layout>
          }
        />

        <Route
          exact
          path="/create-contact/:id"
          element={
            <Layout>
              <Create />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
