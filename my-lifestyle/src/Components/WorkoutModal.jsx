"use client"
import Modal from "./Modal"

const WorkoutModal = ({
  show,
  onClose,
  workoutFormStep,
  setWorkoutFormStep,
  selectedMuscleGroup,
  setSelectedMuscleGroup,
  handleWorkoutSubmit,
}) => {
  const muscleGroups = [
    { name: "Chest", icon: "fas fa-heart" },
    { name: "Triceps", icon: "fas fa-fist-raised" },
    { name: "Biceps", icon: "fas fa-fist-raised" },
    { name: "Back", icon: "fas fa-user" },
    { name: "Legs", icon: "fas fa-walking" },
    { name: "Shoulders", icon: "fas fa-expand-arrows-alt" },
    { name: "Forearms", icon: "fas fa-hand-rock" },
  ]

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Workout"
      icon="fas fa-dumbbell"
      iconColor="#14B8A6"
      animationType="animate-pulse"
    >
      {workoutFormStep === 1 ? (
        <div>
          <h6 className="mb-3 text-center">Select Muscle Group</h6>
          <div className="d-flex flex-wrap justify-content-center">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle.name}
                className={`btn-selection ${selectedMuscleGroup === muscle.name ? "active" : ""}`}
                onClick={() => {
                  setSelectedMuscleGroup(muscle.name)
                  setWorkoutFormStep(2)
                }}
              >
                <i className={`${muscle.icon} me-2`}></i>
                {muscle.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleWorkoutSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-dumbbell me-2"></i>
              {selectedMuscleGroup} Workout Duration
            </label>
            <input
              type="number"
              name="workout"
              className="form-control form-control-blitzit"
              placeholder="Enter minutes"
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary flex-fill" onClick={() => setWorkoutFormStep(1)}>
              <i className="fas fa-arrow-left me-2"></i>Back
            </button>
            <button type="submit" className="btn-blitzit-teal flex-fill">
              <i className="fas fa-check me-2"></i>Add Workout
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}

export default WorkoutModal
