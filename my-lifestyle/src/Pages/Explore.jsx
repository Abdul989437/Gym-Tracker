import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/logo.jpg";
import mobile from "../images/mobile.jpg";
import desktop from "../images/desktop.png";
import GlobalStyles from "../Components/GlobalStyles";

const Explore = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="container-fluid p-2 d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0a0a1a, #1a2a3a)",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        overflowX: "hidden",
        position: "relative",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        animation: "gradientShift 10s ease infinite",
      }}
    >
      <GlobalStyles />
      <header className="text-center py-4" style={{ animation: "fadeIn 1s ease-in" }}>
        <img
          src={Logo}
          alt="Aesthetic Zone Logo"
          className="mb-3"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
            transition: "transform 0.3s ease",
            filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))",
            animation: "bounce 2s ease-in-out infinite",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <h1
          className="display-5 fw-bold"
          style={{ color: "#d4af37", textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", fontSize: "2.2rem" }}
        >
          Welcome to Aesthetic Zone
        </h1>
        <p
          className="lead"
          style={{ color: "#e0e0e0", maxWidth: "700px", margin: "0 auto", padding: "0 15px", fontSize: "1rem", lineHeight: "1.6" }}
        >
          Discover the ultimate gym tracker app designed to transform your fitness journey. Aesthetic Zone provides seamless monitoring of daily steps, workout durations, cardio distances, and weight, enhanced with insightful analytics to keep you motivated. Perfect for beginners and seasoned athletes alike, our premium experience offers personalized tracking and stunning progress visualizations.
        </p>
      </header>

      {/* Image and Description Section */}
      <div className="container py-5" style={{ animation: "fadeIn 2s ease-in 1s" }}>
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
          <div className="col-12">
            <div className="text-center position-relative" style={{ animation: "slideUp 1.5s ease-out 1.2s both" }}>
              <img
                src={desktop}
                alt="Aesthetic Zone Desktop Analytics"
                className="img-fluid rounded"
                style={{
                  maxHeight: "350px",
                  objectFit: "cover",
                  border: "3px solid #8B5CF6",
                  boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
                  transition: "transform 0.3s ease",
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <p
                className="mt-3"
                style={{ color: "#d3d3d3", fontSize: "0.95rem", maxWidth: "90%", margin: "0 auto", lineHeight: "1.5" }}
              >
                Unlock detailed desktop analytics with interactive charts for Steps, Workouts, Cardio, and Weight. Customize your data and visualize your progress with a premium, high-resolution interface.
              </p>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
          <div className="col-12">
            <div className="text-center position-relative" style={{ animation: "slideUp 1.5s ease-out 1.4s both" }}>
              <img
                src={mobile}
                alt="Aesthetic Zone Mobile Overview"
                className="img-fluid rounded"
                style={{
                  maxHeight: "350px",
                  objectFit: "cover",
                  border: "3px solid #8B5CF6",
                  boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
                  transition: "transform 0.3s ease",
                  position: "relative",
                  zIndex: "1",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <p
                className="mt-3"
                style={{ color: "#d3d3d3", fontSize: "0.95rem", maxWidth: "90%", margin: "0 auto", lineHeight: "1.5" }}
              >
                Experience the intuitive mobile dashboard, featuring vibrant cards for tracking steps, workouts, and cardio. With a tap-to-add feature, managing your fitness goals has never been easier.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-5" style={{ animation: "fadeIn 2s ease-in 1.6s" }}>
        <button
          className="btn btn-premium btn-lg"
          style={{
            background: "linear-gradient(90deg, #8B5CF6, #d4af37)",
            color: "#ffffff",
            padding: "12px 40px",
            fontSize: "1.2rem",
            fontWeight: "600",
            borderRadius: "25px",
            boxShadow: "0 5px 15px rgba(139, 92, 246, 0.5)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            animation: "pulse 2s infinite",
          }}
          onClick={handleExploreClick}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Begin Your Premium Journey</span>
        </button>
      </div>
    </div>
  );
};

export default Explore;