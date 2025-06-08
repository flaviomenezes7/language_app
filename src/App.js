import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import MyWords from './pages/MyWords';
import Exercises from './pages/Exercises';
import About from './pages/About';
import Dictionary from './pages/Dictionary';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-words" element={<MyWords />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/about" element={<About />} />
            <Route path="/dicionario" element={<Dictionary />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
