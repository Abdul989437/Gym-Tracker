"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "../images/logo.jpg"

import GlobalStyles from "../Components/GlobalStyles"
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"
import StatsCard from "../Components/StatsCard"
import AnalyticsCard from "../Components/AnalyticsCard"
import BarChart from "../Components/BarChart"
import PieChart from "../Components/PieChart"
import StepsModal from "../Components/StepsModal"
import WorkoutModal from "../Components/WorkoutModal"
import CardioModal from "../Components/CardioModal"
import WeightModal from "../Components/WeightModal"
import Footer from "../Components/Footer"
import WorkoutTracking from "./WorkoutTracking"

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [steps, setSteps] = useState(0)
  const [workoutTime, setWorkoutTime] = useState(0)
  const [cardioDistance, setCardioDistance] = useState(0)
  const [weight, setWeight] = useState(0)
  const [showStepsModal, setShowStepsModal] = useState(false)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showCardioModal, setShowCardioModal] = useState(false)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [hasSelectedSteps, setHasSelectedSteps] = useState(false)
  const [hasSelectedWeight, setHasSelectedWeight] = useState(false)
  const [stepsFormStep, setStepsFormStep] = useState(1)
  const [workoutFormStep, setWorkoutFormStep] = useState(1)
  const [cardioFormStep, setCardioFormStep] = useState(1)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("")
  const [selectedCardioType, setSelectedCardioType] = useState("")
  const [animatingIcon, setAnimatingIcon] = useState("")
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const lastReset = localStorage.getItem("lastReset")
    const today = new Date().toDateString()
    if (lastReset !== today) {
      setSteps(0)
      setWorkoutTime(0)
      setCardioDistance(0)
      setWeight(0)
      localStorage.setItem("lastReset", today)
    }
  }, [])

  const handleStepsSubmit = (e) => {
    e.preventDefault()
    if (steps > 0) {
      setHasSelectedSteps(true)
      toast.success(`🎯 Steps target set to ${steps}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-steps",
      })
    }
    setShowStepsModal(false)
    setStepsFormStep(1)
    setAnimatingIcon("")
  }

  const handleWorkoutSubmit = (e) => {
    e.preventDefault()
    const newTime = Number.parseInt(e.target.workout.value)
    if (!isNaN(newTime)) {
      setWorkoutTime(newTime)
      toast.success(`💪 Successfully added ${newTime} minutes of ${selectedMuscleGroup || "workout"}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-workout",
      })
    }
    setShowWorkoutModal(false)
    setWorkoutFormStep(1)
    setSelectedMuscleGroup("")
    setAnimatingIcon("")
  }

  const handleCardioSubmit = (e) => {
    e.preventDefault()
    const newDistance = Number.parseFloat(e.target.cardio.value)
    if (!isNaN(newDistance)) {
      setCardioDistance(newDistance)
      const unit = selectedCardioType === "Walking" || selectedCardioType === "Running" ? "km" : "minutes"
      toast.success(`🏃‍♂️ Successfully added ${newDistance} ${unit} of ${selectedCardioType || "cardio"}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-cardio",
      })
    }
    setShowCardioModal(false)
    setCardioFormStep(1)
    setSelectedCardioType("")
    setAnimatingIcon("")
  }

  const handleWeightSubmit = (e) => {
    e.preventDefault()
    if (weight > 0) {
      setHasSelectedWeight(true)
      toast.success(`⚖️ Weight updated to ${weight} kg!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-weight",
      })
    }
    setShowWeightModal(false)
  }

  const openStepsModal = () => {
    setAnimatingIcon("steps")
    setShowStepsModal(true)
    setTimeout(() => setAnimatingIcon(""), 2000)
  }

  const openWorkoutModal = () => {
    setAnimatingIcon("workout")
    setActiveSection("workouts")
    setTimeout(() => setAnimatingIcon(""), 2000)
  }

  const openCardioModal = () => {
    setAnimatingIcon("cardio")
    setShowCardioModal(true)
    setTimeout(() => setAnimatingIcon(""), 2000)
  }

  const openWeightModal = () => {
    setAnimatingIcon("weight")
    setShowWeightModal(true)
    setTimeout(() => setAnimatingIcon(""), 2000)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "workouts":
        return <WorkoutTracking />
      case "cardio":
        return <div>Cardio Section</div>
      case "weight":
        return <div>Weight Section</div>
      case "settings":
        return <div>Settings Section</div>
      default:
        return (
          <div id="home">
            <Header />

            <div className="row g-0 g-md-4 mt-2">
              <style jsx>{`
                @media (max-width: 767.98px) {
                  .col-12 {
                    margin-bottom: 1.5rem;
                  }
                }
              `}</style>
              <div className="col-12 col-md-3">
                <StatsCard
                  icon="fas fa-walking"
                  title="Steps Tracking"
                  value={steps}
                  description={steps > 0 ? "Logged for today" : "Track your daily steps"}
                  buttonText="Add Steps"
                  onButtonClick={openStepsModal}
                  cardClass="card-blitzit-purple"
                  buttonClass="btn-blitzit-purple"
                  iconColor="#8B5CF6"
                  animatingIcon={animatingIcon === "steps"}
                  animationType="animate-bounce"
                />
              </div>

              <div className="col-12 col-md-3">
                <StatsCard
                  icon="fas fa-dumbbell"
                  title="Workout Time"
                  value={workoutTime}
                  unit="min"
                  description={workoutTime > 0 ? "Logged for today" : "Track workout duration"}
                  buttonText="Track Workout"
                  onButtonClick={openWorkoutModal}
                  cardClass="card-blitzit-teal"
                  buttonClass="btn-blitzit-teal"
                  iconColor="#14B8A6"
                  animatingIcon={animatingIcon === "workout"}
                  animationType="animate-pulse"
                />
              </div>

              <div className="col-12 col-md-3">
                <StatsCard
                  icon="fas fa-running"
                  title="Cardio Distance"
                  value={cardioDistance}
                  unit="km"
                  description={cardioDistance > 0 ? "Logged for today" : "Track running distance"}
                  buttonText="Add Cardio"
                  onButtonClick={openCardioModal}
                  cardClass="card-blitzit-green"
                  buttonClass="btn-blitzit-green"
                  iconColor="#10B981"
                  animatingIcon={animatingIcon === "cardio"}
                  animationType="animate-spin"
                />
              </div>

              <div className="col-12 col-md-3">
                <StatsCard
                  icon="fas fa-weight"
                  title="Weight"
                  value={weight}
                  unit="kg"
                  description="Current measurement"
                  buttonText="Update Weight"
                  onButtonClick={openWeightModal}
                  cardClass="card-blitzit-orange"
                  buttonClass="btn-blitzit-orange"
                  iconColor="#F59E0B"
                  animatingIcon={animatingIcon === "weight"}
                  animationType="animate-pulse"
                />
              </div>
            </div>

            <div className="row g-0 g-md-4 mt-4">
              <div className="col-12 col-md-6">
                <AnalyticsCard title="Steps Analytics" icon="fas fa-chart-bar" iconColor="#10B981">
                  <BarChart data={[20, 40, 60, 80, 50, 70, 90]} gradient="linear-gradient(to top, #10B981, #34D399)" />
                </AnalyticsCard>
              </div>

              <div className="col-12 col-md-6">
                <AnalyticsCard title="Workout Distribution" icon="fas fa-chart-pie" iconColor="#8B5CF6">
                  <PieChart
                    segments={{
                      gradient: "conic-gradient(#8B5CF6 0% 60%, #14B8A6 60% 100%)",
                      legend: [
                        { label: "Strength", value: "60%", color: "#8B5CF6" },
                        { label: "Cardio", value: "40%", color: "#14B8A6" },
                      ],
                    }}
                  />
                </AnalyticsCard>
              </div>
            </div>

            <div className="row g-0 g-md-4 mt-4">
              <div className="col-12 col-md-6">
                <AnalyticsCard title="Cardio Progress" icon="fas fa-chart-line" iconColor="#14B8A6">
                  <BarChart data={[30, 50, 70, 40, 60, 80, 90]} gradient="linear-gradient(to top, #14B8A6, #06B6D4)" />
                </AnalyticsCard>
              </div>

              <div className="col-12 col-md-6">
                <AnalyticsCard title="Weight Goal" icon="fas fa-bullseye" iconColor="#F59E0B">
                  <PieChart
                    segments={{
                      gradient: "conic-gradient(#F59E0B 0% 70%, #10B981 70% 100%)",
                      legend: [
                        { label: "Current", value: `${weight} kg`, color: "#F59E0B" },
                        { label: "Goal", value: "70 kg", color: "#10B981" },
                      ],
                    }}
                  />
                </AnalyticsCard>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className="container-fluid p-0"
      style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh" }}
    >
      <GlobalStyles />
      <div className="d-block d-md-none" style={{ padding: "15px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "40px", height: "40px", borderRadius: "10px", marginRight: "15px" }}
          />
          <div style={{ textAlign: "right", flex: 1 }}>
            <h2 style={{ fontSize: "1.2rem", color: "#ffffff", margin: 0, fontWeight: "600" }}>
              Welcome to Aesthetic Zone
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#ffffff", margin: 0 }}>
              Ready to Transform
            </p>
          </div>
        </div>
     
      </div>

      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div
        className="main-content pl-0 lg:ml-16 lg:w-[calc(100%-64px)] transition-all duration-300 ease-in-out"
        style={{ padding: "10px 15px" }}
      >
        {renderContent()}
        <Footer />
      </div>

      <StepsModal
        show={showStepsModal}
        onClose={() => setShowStepsModal(false)}
        steps={steps}
        setSteps={setSteps}
        hasSelectedSteps={hasSelectedSteps}
        setHasSelectedSteps={setHasSelectedSteps}
        handleStepsSubmit={handleStepsSubmit}
      />

      <WorkoutModal
        show={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        workoutFormStep={workoutFormStep}
        setWorkoutFormStep={setWorkoutFormStep}
        selectedMuscleGroup={selectedMuscleGroup}
        setSelectedMuscleGroup={setSelectedMuscleGroup}
        handleWorkoutSubmit={handleWorkoutSubmit}
      />

      <CardioModal
        show={showCardioModal}
        onClose={() => setShowCardioModal(false)}
        cardioFormStep={cardioFormStep}
        setCardioFormStep={setCardioFormStep}
        selectedCardioType={selectedCardioType}
        setSelectedCardioType={setSelectedCardioType}
        handleCardioSubmit={handleCardioSubmit}
      />

      <WeightModal
        show={showWeightModal}
        onClose={() => setShowWeightModal(false)}
        weight={weight}
        setWeight={setWeight}
        hasSelectedWeight={hasSelectedWeight}
        setHasSelectedWeight={setHasSelectedWeight}
        handleWeightSubmit={handleWeightSubmit}
      />

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
  )
}

export default Home