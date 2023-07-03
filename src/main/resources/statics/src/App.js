import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MemberDashboard } from './pages/MemberDashboard';
import { CurrentBook } from "./pages/CurrentBook";
import { MemberSearchBook } from "./pages/MemberSearchBook";
import { LibrarianDashboard } from "./pages/LibrarianDashboard";
import { Reservation } from "./pages/Reservations";
import { AddBook } from "./pages/AddBook";
import { LibrarianSearchBook } from "./pages/LibrarianSearchBook";
import { UserSearch } from "./pages/SearchUser";
import { BorrowingSearch } from "./pages/BorrowingSearch";

function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="member/search-book" element={<MemberSearchBook/>}/>
              <Route path="member/current-book" element={<CurrentBook/>}/>
              <Route path="member" element={<MemberDashboard/>}/>
              <Route path="librarian/search-borrowing" element={<BorrowingSearch/>}/>
              <Route path="librarian/search-user" element={<UserSearch/>}/>
              <Route path="librarian/add-book" element={<AddBook/>}/>
              <Route path="librarian/search-book" element={<LibrarianSearchBook/>}/>
              <Route path="librarian/reservation" element={<Reservation/>}/>
              <Route path="librarian" element={<LibrarianDashboard/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
