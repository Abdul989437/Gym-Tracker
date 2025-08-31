"use client"

import Logo from "../images/logo.jpg"

const Sidebar = ({ activeSection, setActiveSection }) => {
  const handleNavClick = (section) => {
    setActiveSection(section)
  }

  return (
    <>
      <div className="d-block d-md-none sidebar-blitzit">
        <ul className="nav nav-pills nav-fill pt-2">
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              <i className="fas fa-home fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "workouts" ? "active" : ""}`}
              onClick={() => handleNavClick("workouts")}
            >
              <i className="fas fa-dumbbell fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "cardio" ? "active" : ""}`}
              onClick={() => handleNavClick("cardio")}
            >
              <i className="fas fa-running fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "weight" ? "active" : ""}`}
              onClick={() => handleNavClick("weight")}
            >
              <i className="fas fa-weight fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => handleNavClick("settings")}
            >
              <i className="fas fa-cog fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => handleNavClick("profile")}
            >
              <i className="fas fa-user-circle fa-lg"></i>
            </button>
          </li>
        </ul>
      </div>

      <div
        className="d-none d-md-block sidebar-blitzit"
        style={{
          width: "64px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
          background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="text-center py-3">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
            }}
          />
        </div>
        <ul className="nav flex-column pt-2" style={{ flex: "0 0 auto" }}>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              <i className="fas fa-home fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "workouts" ? "active" : ""}`}
              onClick={() => handleNavClick("workouts")}
            >
              <i className="fas fa-dumbbell fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "cardio" ? "active" : ""}`}
              onClick={() => handleNavClick("cardio")}
            >
              <i className="fas fa-running fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "weight" ? "active" : ""}`}
              onClick={() => handleNavClick("weight")}
            >
              <i className="fas fa-weight fa-lg"></i>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => handleNavClick("settings")}
            >
              <i className="fas fa-cog fa-lg"></i>
            </button>
          </li>
        </ul>
        <div style={{ flex: "1 0 auto" }}></div>
        <ul className="nav flex-column pb-3">
          <li className="nav-item" style={{ marginTop: "auto" }}>
            <button
              className={`nav-link nav-link-blitzit text-center ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => handleNavClick("profile")}
            >
              <i className="fas fa-user-circle fa-lg"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar