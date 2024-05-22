import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Ecommerce } from './pages';
export default function Home() {
  return (
    <div>
          <BrowserRouter>
          <Routes>
                  {/* dashboard  */}

                  <Route path="/" element={<Ecommerce />} />
                  <Route path="/ecommerce" element={<Ecommerce />} />

                </Routes>
</BrowserRouter>
    </div>
  )
}
