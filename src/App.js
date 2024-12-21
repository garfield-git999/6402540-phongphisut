import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShoeList from './components/ShoeList';
import AddShoe from './components/AddShoe';
import EditShoe from './components/EditShoe';

function App() {
  return (
    <Router>
      <div>
        <nav className="nav-container">
          <div className="container mx-auto flex space-x-4">
            <Link to="/" className="nav-link">รายการรองเท้า</Link>
            <Link to="/add" className="nav-link">เพิ่มรองเท้า</Link>
          </div>
        </nav>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<ShoeList />} />
            <Route path="/add" element={<AddShoe />} />
            <Route path="/edit/:id" element={<EditShoe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;