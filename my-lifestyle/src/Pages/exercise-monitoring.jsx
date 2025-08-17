"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const ExerciseMonitoring = ({ exerciseHistory = [], onBack }) => {
  const dummyData = [
    {
      date: "12/20/2024",
      day: "Day 1",
      exerciseName: "Bench Press",
      muscleGroup: "Chest",
      sets: [
        { setNumber: 1, reps: "10", weight: "80" },
        { setNumber: 2, reps: "8", weight: "85" },
        { setNumber: 3, reps: "6", weight: "90" },
      ],
      completedAt: new Date().toISOString(),
    },
    {
      date: "12/20/2024",
      day: "Day 1",
      exerciseName: "Tricep Dips",
      muscleGroup: "Triceps",
      sets: [
        { setNumber: 1, reps: "12", weight: "0" },
        { setNumber: 2, reps: "10", weight: "0" },
        { setNumber: 3, reps: "8", weight: "0" },
      ],
      completedAt: new Date().toISOString(),
    },
    {
      date: "12/19/2024",
      day: "Day 2",
      exerciseName: "Pull Ups",
      muscleGroup: "Back",
      sets: [
        { setNumber: 1, reps: "8", weight: "0" },
        { setNumber: 2, reps: "6", weight: "0" },
        { setNumber: 3, reps: "5", weight: "0" },
      ],
      completedAt: new Date().toISOString(),
    },
    {
      date: "12/19/2024",
      day: "Day 2",
      exerciseName: "Bicep Curls",
      muscleGroup: "Biceps",
      sets: [
        { setNumber: 1, reps: "12", weight: "15" },
        { setNumber: 2, reps: "10", weight: "17.5" },
        { setNumber: 3, reps: "8", weight: "20" },
      ],
      completedAt: new Date().toISOString(),
    },
  ]

  const displayData = exerciseHistory.length > 0 ? exerciseHistory : dummyData
  const [filteredHistory, setFilteredHistory] = useState(displayData)
  const [filterMuscleGroup, setFilterMuscleGroup] = useState("All")
  const [filterExercise, setFilterExercise] = useState("All")

  useEffect(() => {
    setFilteredHistory(displayData)
  }, [exerciseHistory])

  const getCardClass = (index) => {
    const classes = ["card-blitzit-purple", "card-blitzit-teal", "card-blitzit-green", "card-blitzit-orange"]
    return classes[index % classes.length]
  }

  const getIconColor = (index) => {
    const colors = ["#8B5CF6", "#14B8A6", "#10B981", "#F59E0B"]
    return colors[index % colors.length]
  }

  const uniqueMuscleGroups = [...new Set(displayData.map((item) => item.muscleGroup))]
  const uniqueExercises = [...new Set(displayData.map((item) => item.exerciseName))]

  const handleFilter = () => {
    let filtered = displayData

    if (filterMuscleGroup !== "All") {
      filtered = filtered.filter((item) => item.muscleGroup === filterMuscleGroup)
    }

    if (filterExercise !== "All") {
      filtered = filtered.filter((item) => item.exerciseName === filterExercise)
    }

    setFilteredHistory(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [filterMuscleGroup, filterExercise, exerciseHistory])

  const getTotalVolume = (sets) => {
    return sets.reduce((total, set) => {
      const reps = Number.parseInt(set.reps) || 0
      const weight = Number.parseFloat(set.weight) || 0
      return total + reps * weight
    }, 0)
  }

  return (
    <div className="exercise-monitoring-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-light me-3"
            onClick={onBack}
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back
          </button>
          <h2 className="text-white mb-0">
            <i className="fas fa-chart-line me-3" style={{ color: "#8B5CF6" }}></i>
            Exercise Monitoring
          </h2>
        </div>
        <div className="text-white-50">
          <small>{displayData.length} total workouts logged</small>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label text-white-50">Filter by Muscle Group</label>
          <select
            className="form-select"
            value={filterMuscleGroup}
            onChange={(e) => setFilterMuscleGroup(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <option value="All">All Muscle Groups</option>
            {uniqueMuscleGroups.map((group) => (
              <option key={group} value={group} style={{ background: "#1a1a1a" }}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Filter by Exercise</label>
          <select
            className="form-select"
            value={filterExercise}
            onChange={(e) => setFilterExercise(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <option value="All">All Exercises</option>
            {uniqueExercises.map((exercise) => (
              <option key={exercise} value={exercise} style={{ background: "#1a1a1a" }}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise History */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-chart-line text-white-50" style={{ fontSize: "4rem" }}></i>
          <h4 className="text-white-50 mt-3">No Exercise Data Yet</h4>
          <p className="text-white-50">Complete some workouts to see your progress here!</p>
        </div>
      ) : (
        <div className="row g-3">
          {filteredHistory.map((workout, index) => (
            <div key={index} className="col-12">
              <div
                className={`card ${getCardClass(index)}`}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <i
                          className="fas fa-dumbbell me-3"
                          style={{ color: getIconColor(index), fontSize: "1.5rem" }}
                        ></i>
                        <div>
                          <h5 className="text-white mb-0">{workout.exerciseName}</h5>
                          <small className="text-white-50">{workout.muscleGroup}</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="text-center">
                        <div className="text-white-50 small">Date</div>
                        <div className="text-white fw-bold">{workout.date}</div>
                        <div className="text-white-50 small">{workout.day}</div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="text-center">
                        <div className="text-white-50 small">Sets</div>
                        <div className="text-white fw-bold">{workout.sets.length}</div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="text-center">
                        <div className="text-white-50 small">Total Volume</div>
                        <div className="text-white fw-bold">{getTotalVolume(workout.sets)} kg</div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="text-white-50 small mb-1">Set Details:</div>
                      <div className="d-flex flex-wrap gap-1">
                        {workout.sets.map((set, setIndex) => (
                          <span
                            key={setIndex}
                            className="badge"
                            style={{
                              backgroundColor: getIconColor(index),
                              fontSize: "0.7rem",
                              opacity: 0.8,
                            }}
                          >
                            {set.reps}×{set.weight}kg
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {displayData.length > 0 && (
        <div className="row mt-5">
          <div className="col-md-3">
            <div
              className="card text-center"
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                <i className="fas fa-calendar-check" style={{ color: "#8B5CF6", fontSize: "2rem" }}></i>
                <h4 className="text-white mt-2">{displayData.length}</h4>
                <p className="text-white-50 mb-0">Total Workouts</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card text-center"
              style={{
                background: "rgba(20, 184, 166, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                <i className="fas fa-weight-hanging" style={{ color: "#14B8A6", fontSize: "2rem" }}></i>
                <h4 className="text-white mt-2">
                  {displayData.reduce((total, workout) => total + getTotalVolume(workout.sets), 0)} kg
                </h4>
                <p className="text-white-50 mb-0">Total Volume</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card text-center"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                <i className="fas fa-layer-group" style={{ color: "#10B981", fontSize: "2rem" }}></i>
                <h4 className="text-white mt-2">{uniqueMuscleGroups.length}</h4>
                <p className="text-white-50 mb-0">Muscle Groups</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card text-center"
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                <i className="fas fa-list-ul" style={{ color: "#F59E0B", fontSize: "2rem" }}></i>
                <h4 className="text-white mt-2">{uniqueExercises.length}</h4>
                <p className="text-white-50 mb-0">Unique Exercises</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseMonitoring
