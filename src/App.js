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
          <Route path="/1" element={<HomePage />} />
            <Route path="/" element={<LoginPage />}/>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

