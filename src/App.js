// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />} />
            <Route path="/1" element={<LoginPage />}/>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

