import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Home from "./Pages/home";
import LoginSignup from "./Pages/LoginSignup";
import Explore from "./Pages/Explore";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("App: Checking auth state");
    const unsubscribe = auth.onAuthStateChanged(
      (currentUser) => {
        console.log("App: Auth state changed", { user: currentUser });
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          console.log("App: User authenticated, showing toast");
          toast.success("Authenticated! Loading dashboard...", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "toast-success",
          });
        } else {
          console.log("App: No user authenticated");
        }
      },
      (error) => {
        console.error("App: Auth state error", error);
        setError("Failed to initialize authentication. Please refresh.");
        setLoading(false);
      }
    );
    return () => {
      console.log("App: Unsubscribing from auth state");
      unsubscribe();
    };
  }, []);

  if (error) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh", color: "#ffffff" }}
      >
        <div>
          <h2>Error</h2>
          <p>{error}</p>
          <button
            className="btn btn-blitzit-purple"
            style={{ backgroundColor: "#8B5CF6", color: "#ffffff" }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    console.log("App: Rendering loading state");
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh" }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log("App: Rendering main content", { user: !!user });

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Explore />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" replace /> : <LoginSignup />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/" replace />}
          />
          <Route
            path="*"
            element={
              <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh", color: "#ffffff" }}
              >
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;