"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { toast } from "react-toastify"
import WorkoutProgress from "./WorkoutProgress"

const ExerciseVariation = ({ session, onBack, onUpdate }) => {
  const [currentSession, setCurrentSession] = useState({ ...session, muscleExercises: { ...session.muscleExercises } })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMuscle, setSelectedMuscle] = useState(null)
  const [newExerciseName, setNewExerciseName] = useState("")
  const [editingExercise, setEditingExercise] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState(null)

  const handleChildUpdate = (updated) => {
    setCurrentSession(updated)
    onUpdate(updated)
  }

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

  const handleAddClick = (muscle) => {
    setSelectedMuscle(muscle)
    setShowAddModal(true)
  }

  const handleEditClick = (muscle, exerciseName) => {
    setSelectedMuscle(muscle)
    setEditingExercise(exerciseName)
    setNewExerciseName(exerciseName)
    setShowEditModal(true)
  }

  const handleViewProgress = (muscle, exerciseName) => {
    setSelectedExercise({ muscle, exerciseName })
  }

  const handleRemoveExercise = (muscle, exerciseName) => {
    setCurrentSession((prev) => {
      const newMuscleExercises = {
        ...prev.muscleExercises,
        [muscle]: prev.muscleExercises[muscle].filter((ex) => ex.name !== exerciseName),
      }
      const totalExercises = Object.values(newMuscleExercises).reduce((sum, arr) => sum + arr.length, 0)
      const updatedSession = {
        ...prev,
        muscleExercises: newMuscleExercises,
        exercises: totalExercises,
      }
      onUpdate(updatedSession)
      toast.success(`🗑️ Exercise removed from ${muscle}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-workout",
      })
      return updatedSession
    })
  }

  const handleSaveExercise = () => {
    if (selectedMuscle && newExerciseName) {
      setCurrentSession((prev) => {
        const newMuscleExercises = {
          ...prev.muscleExercises,
          [selectedMuscle]: [...prev.muscleExercises[selectedMuscle], { name: newExerciseName, progress: [] }],
        }
        const totalExercises = Object.values(newMuscleExercises).reduce((sum, arr) => sum + arr.length, 0)
        const updatedSession = {
          ...prev,
          muscleExercises: newMuscleExercises,
          exercises: totalExercises,
        }
        onUpdate(updatedSession)
        toast.success(`🏋️ Exercise added to ${selectedMuscle}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "toast-workout",
        })
        return updatedSession
      })
      setShowAddModal(false)
      setNewExerciseName("")
    }
  }

  const handleSaveEditExercise = () => {
    if (selectedMuscle && newExerciseName && editingExercise) {
      setCurrentSession((prev) => {
        const newMuscleExercises = {
          ...prev.muscleExercises,
          [selectedMuscle]: prev.muscleExercises[selectedMuscle].map((ex) =>
            ex.name === editingExercise ? { ...ex, name: newExerciseName } : ex
          ),
        }
        const updatedSession = {
          ...prev,
          muscleExercises: newMuscleExercises,
        }
        onUpdate(updatedSession)
        toast.success(`✏️ Exercise updated in ${selectedMuscle}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "toast-workout",
        })
        return updatedSession
      })
      setShowEditModal(false)
      setNewExerciseName("")
      setEditingExercise(null)
    }
  }

  if (selectedExercise) {
    return (
      <WorkoutProgress
        muscle={selectedExercise.muscle}
        exerciseName={selectedExercise.exerciseName}
        session={currentSession}
        onBack={() => setSelectedExercise(null)}
        onUpdate={handleChildUpdate}
      />
    )
  }

  return (
    <div className="workout-tracking-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white mb-0">
          <i className="fas fa-dumbbell me-3" style={{ color: "#8B5CF6" }}></i>
          {currentSession.day} Workout Details
        </h2>
        <button
          className="btn btn-outline-secondary"
          onClick={onBack}
          style={{ borderRadius: "8px", fontWeight: "500" }}
        >
          <i className="fas fa-arrow-left me-1"></i> Back
        </button>
      </div>

      <div className="mb-4">
        <div className="text-white-50 small mb-2">Muscle Groups</div>
        <div className="d-flex flex-wrap gap-1">
          {currentSession.muscleGroups.map((muscle, idx) => (
            <span
              key={idx}
              className="badge"
              style={{
                backgroundColor: getIconColor(idx),
                fontSize: "0.8rem",
              }}
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {currentSession.muscleGroups.map((muscle, index) => (
        <div key={muscle} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-white mb-0">
              <i className="fas fa-dumbbell me-2" style={{ color: getIconColor(index) }}></i>
              {muscle}
            </h3>
            <button
              className={`btn ${getButtonClass(index)} btn-sm`}
              onClick={() => handleAddClick(muscle)}
              style={{ borderRadius: "8px", fontWeight: "500" }}
            >
              <i className="fas fa-plus me-1"></i> Add Exercise
            </button>
          </div>

          <div className="row g-4">
            {currentSession.muscleExercises[muscle].length > 0 ? (
              currentSession.muscleExercises[muscle].map((exObj, idx) => (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div
                    className={`card h-100 ${getCardClass(idx)}`}
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
                          <i className="fas fa-dumbbell me-2" style={{ color: getIconColor(idx) }}></i>
                          {exObj.name}
                        </h5>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleViewProgress(muscle, exObj.name)}
                          style={{ borderRadius: "8px", fontWeight: "500" }}
                        >
                          <i className="fas fa-chart-line me-1"></i> Progress
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleEditClick(muscle, exObj.name)}
                          style={{ borderRadius: "8px", fontWeight: "500" }}
                        >
                          <i className="fas fa-edit me-1"></i> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveExercise(muscle, exObj.name)}
                          style={{ borderRadius: "8px", fontWeight: "500" }}
                        >
                          <i className="fas fa-trash me-1"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white-50">No exercises added yet.</p>
            )}
          </div>
        </div>
      ))}

      {showAddModal && (
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
                  <i className="fas fa-plus me-2" style={{ color: "#8B5CF6" }}></i>
                  Add Exercise for {selectedMuscle}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-white-50">Exercise Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                  style={{ borderRadius: "8px" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveExercise}
                  style={{ borderRadius: "8px" }}
                >
                  <i className="fas fa-save me-1"></i>
                  Add Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <i className="fas fa-edit me-2" style={{ color: "#8B5CF6" }}></i>
                  Edit Exercise for {selectedMuscle}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-white-50">Exercise Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  />
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
                  onClick={handleSaveEditExercise}
                  style={{ borderRadius: "8px" }}
                >
                  <i className="fas fa-save me-1"></i>
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

export default ExerciseVariation