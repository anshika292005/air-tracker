import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import FlightPage from './components/FlightPage';
import BookingPage from './components/BookingPage';
import DealsPage from './components/DealsPage';
import ContactPage from './components/ContactPage';
import SignInPage from './components/SignInPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flight/:id" element={<FlightPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;