//import logo from "./logo.svg";
//import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Contact Management System</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addcontact" element={<AddContact />} />
          <Route path="editcontact" element={<EditContact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
