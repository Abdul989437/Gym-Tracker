"use client"

const Sidebar = ({ activeSection, setActiveSection }) => {
  const handleNavClick = (section) => {
    setActiveSection(section)
  }

  return (
    <>
      {/* Mobile Navigation */}
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
        </ul>
      </div>

      {/* Desktop Sidebar */}
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
        }}
      >
        <div className="text-center py-3">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-2"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              borderRadius: "10px",
            }}
          >
            <i className="fas fa-dumbbell text-white"></i>
          </div>
          <div className="text-white" style={{ fontSize: "10px", fontWeight: "600", lineHeight: "1.2" }}>
            AESTHETIC
            <br />
            ZONE
          </div>
        </div>
        <ul className="nav flex-column pt-2">
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
      </div>
    </>
  )
}

export default Sidebar