import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Siswa from "./components/pages/Siswa";
import EditSiswa from "./components/pages/EditSiswa";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Siswa />} />
            <Route path="/edit-siswa/:id" element={<EditSiswa />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}


