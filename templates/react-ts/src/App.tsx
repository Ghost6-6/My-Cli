import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src="/logo.svg" className="app-logo" alt="logo" />
        <h1>{{projectName}}</h1>
      </header>
      
      <nav className="app-nav">
        <Link to="/">首页</Link> | <Link to="/about">关于</Link>
      </nav>
      
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
};

export default App; 