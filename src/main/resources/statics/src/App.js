import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/MemberDashboard';
import { CurrentBook } from "./pages/CurrentBook";

function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="Member/CurrentBook" element={<CurrentBook/>}/>
              <Route path="Member" element={<Dashboard/>}/>
              <Route path="Register" element={<Register/>}/>
              <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
