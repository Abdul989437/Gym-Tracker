import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../images/logo.jpg";
import GlobalStyles from "../Components/GlobalStyles";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("LoginSignup: Checking auth state");
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          console.log("LoginSignup: User is authenticated, redirecting to /home");
          toast.success("Welcome back! Redirecting to dashboard...", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "toast-success",
          });
          navigate("/home");
        } else {
          console.log("LoginSignup: No user authenticated");
        }
      },
      (error) => {
        console.error("LoginSignup: Auth state error", error);
        setError("Authentication error. Please try again.");
      }
    );
    return () => {
      console.log("LoginSignup: Unsubscribing from auth state");
      unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("LoginSignup: Form submitted", { isLogin, email, password, name });

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      console.log("LoginSignup: Password mismatch");
      return;
    }

    try {
      if (isLogin) {
        console.log("LoginSignup: Attempting login");
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "toast-success",
        });
        navigate("/home");
      } else {
        console.log("LoginSignup: Attempting signup");
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "toast-success",
        });
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      console.error("LoginSignup: Authentication error", error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-error",
      });
    }
  };

  const toggleForm = () => {
    console.log("LoginSignup: Toggling form to", isLogin ? "signup" : "login");
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setError("");
  };

  console.log("LoginSignup: Rendering component");

  return (
    <div
      className="container-fluid p-0"
      style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh" }}
    >
      <GlobalStyles />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}
    >
        <div className="card card-blitzit-purple" style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "60px", height: "60px", borderRadius: "10px", marginBottom: "15px" }}
            />
            <h2 style={{ color: "#ffffff", fontWeight: "600" }}>
              {isLogin ? "Login to Aesthetic Zone" : "Join Aesthetic Zone"}
            </h2>
            <p style={{ color: "#ffffff", opacity: "0.8" }}>
              {isLogin ? "Welcome back! Sign in to continue." : "Create an account to start your journey."}
            </p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: "#ffffff" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    style={{ backgroundColor: "#2a2a2a", color: "#ffffff", borderColor: "#8B5CF6" }}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#ffffff" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ backgroundColor: "#2a2a2a", color: "#ffffff", borderColor: "#8B5CF6" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "#ffffff" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ backgroundColor: "#2a2a2a", color: "#ffffff", borderColor: "#8B5CF6" }}
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label" style={{ color: "#ffffff" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                    style={{ backgroundColor: "#2a2a2a", color: "#ffffff", borderColor: "#8B5CF6" }}
                  />
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
              <button
                type="submit"
                className="btn btn-blitzit-purple w-100"
                style={{ backgroundColor: "#8B5CF6", color: "#ffffff" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <div className="text-center mt-3">
              <p style={{ color: "#ffffff", opacity: "0.8" }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={toggleForm}
                  style={{ color: "#8B5CF6", cursor: "pointer", textDecoration: "underline" }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default LoginSignup;