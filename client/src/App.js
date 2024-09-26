import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Create from "./pages/create-contact/Create";


function App() {
  return (
    <BrowserRouter>
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
