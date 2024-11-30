import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateQuotePage, LoginPage, Navbar, ProtractedRoute, QuoteListPage } from './components';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ToastContainer autoClose={2000} />
        <Navbar />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/quotes"
            element={
              <ProtractedRoute>
                <QuoteListPage />
              </ProtractedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtractedRoute>
                <CreateQuotePage />
              </ProtractedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
