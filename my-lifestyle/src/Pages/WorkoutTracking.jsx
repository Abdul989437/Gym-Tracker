"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { toast } from "react-toastify"
import ExerciseVariation from "./ExerciseVariation"

const WorkoutTracking = () => {
  const [workoutSessions, setWorkoutSessions] = useState([
    {
      id: 1,
      day: "Day 1",
      session: "Session 1",
      muscleGroups: ["Chest", "Triceps"],
      muscleExercises: { "Chest": [], "Triceps": [] },
    },
    {
      id: 2,
      day: "Day 2",
      session: "Session 1",
      muscleGroups: ["Back", "Biceps"],
      muscleExercises: { "Back": [], "Biceps": [] },
    },
    {
      id: 3,
      day: "Day 3",
      session: "Session 1",
      muscleGroups: ["Legs", "Glutes"],
      muscleExercises: { "Legs": [], "Glutes": [] },
    },
    {
      id: 4,
      day: "Day 4",
      session: "Session 1",
      muscleGroups: ["Shoulders", "Abs"],
      muscleExercises: { "Shoulders": [], "Abs": [] },
    },
    {
      id: 5,
      day: "Day 5",
      session: "Session 2",
      muscleGroups: ["Arms", "Core"],
      muscleExercises: { "Arms": [], "Core": [] },
    },
    {
      id: 6,
      day: "Day 6",
      session: "Session 2",
      muscleGroups: ["Cardio", "Full Body"],
      muscleExercises: { "Cardio": [], "Full Body": [] },
    },
    {
      id: 7,
      day: "Day 7",
      session: "Session 2",
      muscleGroups: ["Chest", "Shoulders"],
      muscleExercises: { "Chest": [], "Shoulders": [] },
    },
    {
      id: 8,
      day: "Day 8",
      session: "Session 2",
      muscleGroups: ["Back", "Core"],
      muscleExercises: { "Back": [], "Core": [] },
    },
  ])

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingSession, setEditingSession] = useState(null)
  const [newMuscleGroup, setNewMuscleGroup] = useState("")
  const [selectedSession, setSelectedSession] = useState(null)

  const muscleGroupOptions = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Biceps",
    "Triceps",
    "Legs",
    "Glutes",
    "Abs",
    "Core",
    "Cardio",
    "Full Body",
  ]

  const getCardClass = (index) => {
    const classes = ["card-blitzit-purple", "card-blitzit-teal", "card-blitzit-green", "card-blitzit-orange"]
    return classes[index % classes.length]
  }

  const getButtonClass = (index) => {
    const classes = ["btn-blitzit-purple", "btn-blitzit-teal", "btn-blitzit-green", "btn-blitzit-orange"]
    return classes[index % classes.length]
  }

  const getIconColor = (index) => {
    const colors = ["#8B5CF6", "#14B8A6", "#10B981", "#F59E0B"]
    return colors[index % colors.length]
  }

  const handleViewSession = (session) => {
    setSelectedSession(session)
  }

  const handleBackToList = () => {
    setSelectedSession(null)
  }

  const handleUpdateSession = (updated) => {
    setWorkoutSessions(prev => prev.map(s => s.id === updated.id ? updated : s))
  }

  const handleEditSession = (session) => {
    setEditingSession({ ...session })
    setShowEditModal(true)
  }

  const handleSaveSession = () => {
    if (editingSession) {
      setWorkoutSessions((prev) => prev.map((session) => (session.id === editingSession.id ? editingSession : session)))

      toast.success(`💪 Workout session for ${editingSession.day} updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-workout",
      })
    }
    setShowEditModal(false)
    setEditingSession(null)
  }

  const handleAddMuscleGroup = () => {
    if (newMuscleGroup && editingSession && !editingSession.muscleGroups.includes(newMuscleGroup)) {
      setEditingSession((prev) => ({
        ...prev,
        muscleGroups: [...prev.muscleGroups, newMuscleGroup],
        muscleExercises: {
          ...prev.muscleExercises,
          [newMuscleGroup]: []
        }
      }))
      setNewMuscleGroup("")
    }
  }

  const handleRemoveMuscleGroup = (muscleGroup) => {
    if (editingSession) {
      setEditingSession((prev) => {
        const newGroups = prev.muscleGroups.filter((mg) => mg !== muscleGroup)
        const newExercises = { ...prev.muscleExercises }
        delete newExercises[muscleGroup]
        const totalExercises = Object.values(newExercises).reduce((sum, arr) => sum + arr.length, 0)
        return {
          ...prev,
          muscleGroups: newGroups,
          muscleExercises: newExercises,
          exercises: totalExercises
        }
      })
    }
  }

  if (selectedSession) {
    return <ExerciseVariation session={selectedSession} onBack={handleBackToList} onUpdate={handleUpdateSession} />
  }

  const groupedSessions = workoutSessions.reduce((acc, session) => {
    if (!acc[session.session]) {
      acc[session.session] = []
    }
    acc[session.session].push(session)
    return acc
  }, {})

  return (
    <div className="workout-tracking-container">
      <style jsx>{`
        .icon-rotate:hover {
          animation: rotate 1s ease-in-out;
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white mb-0">
          <i className="fas fa-dumbbell me-3 icon-rotate" style={{ color: "#8B5CF6" }}></i>
          Workout Sessions
        </h2>
        <div className="text-white-50 d-none d-lg-block">
          <small>Track your weekly workout plan</small>
        </div>
      </div>

      {Object.entries(groupedSessions).map(([sessionName, sessions]) => (
        <div key={sessionName} className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <h3 className="text-white mb-0">
              <i
                className="fas fa-calendar-week me-2 icon-rotate"
                style={{ color: sessionName === "Session 1" ? "#8B5CF6" : "#14B8A6" }}
              ></i>
              {sessionName}
            </h3>
            <span
              className="badge ms-3"
              style={{
                backgroundColor: sessionName === "Session 1" ? "#8B5CF6" : "#14B8A6",
                fontSize: "0.8rem",
              }}
            >
              {sessions.length} days
            </span>
          </div>

          <div className="row g-4">
            {sessions.map((session, index) => (
              <div key={session.id} className="col-lg-4 col-md-6">
                <div
                  className={`card h-100 ${getCardClass(index)}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title text-white mb-0">
                        <i className="fas fa-calendar-day me-2 icon-rotate" style={{ color: getIconColor(index) }}></i>
                        {session.day}
                      </h5>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {session.muscleGroups.map((muscle, idx) => (
                          <span
                            key={idx}
                            className="badge"
                            style={{
                              backgroundColor: getIconColor(index),
                              fontSize: "0.7rem",
                            }}
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className={`btn ${getButtonClass(index)} btn-sm flex-fill`}
                        onClick={() => handleViewSession(session)}
                        style={{
                          borderRadius: "8px",
                          fontWeight: "500",
                        }}
                      >
                        <i className="fas fa-eye me-1 icon-rotate"></i>
                        View
                      </button>
                      <button
                        className={`btn btn-outline-secondary btn-sm`}
                        onClick={() => handleEditSession(session)}
                        style={{
                          borderRadius: "8px",
                          fontWeight: "500",
                        }}
                      >
                        <i className="fas fa-edit me-1 icon-rotate"></i>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                background: "rgba(26, 26, 26, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
              }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">
                  <i className="fas fa-edit me-2 icon-rotate" style={{ color: "#8B5CF6" }}></i>
                  Edit {editingSession?.day} Workout
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-white-50">Muscle Groups</label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {editingSession?.muscleGroups.map((muscle, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary d-flex align-items-center"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {muscle}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: "0.6rem" }}
                          onClick={() => handleRemoveMuscleGroup(muscle)}
                        ></button>
                      </span>
                    ))}
                  </div>

                  <div className="input-group">
                    <select
                      className="form-select"
                      value={newMuscleGroup}
                      onChange={(e) => setNewMuscleGroup(e.target.value)}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                        borderRadius: "8px 0 0 8px",
                      }}
                    >
                      <option value="">Select muscle group</option>
                      {muscleGroupOptions.map((option) => (
                        <option key={option} value={option} style={{ background: "#1a1a1a" }}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleAddMuscleGroup}
                      style={{ borderRadius: "0 8px 8px 0" }}
                    >
                      <i className="fas fa-plus icon-rotate"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                  style={{ borderRadius: "8px" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveSession}
                  style={{ borderRadius: "8px" }}
                >
                  <i className="fas fa-save me-1 icon-rotate"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutTracking