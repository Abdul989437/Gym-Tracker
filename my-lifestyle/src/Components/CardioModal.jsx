"use client"
import Modal from "./Modal"

const CardioModal = ({
  show,
  onClose,
  cardioFormStep,
  setCardioFormStep,
  selectedCardioType,
  setSelectedCardioType,
  handleCardioSubmit,
}) => {
  const cardioTypes = [
    { name: "Walking", icon: "fas fa-walking" },
    { name: "Running", icon: "fas fa-running" },
    { name: "Treadmill", icon: "fas fa-tachometer-alt" },
    { name: "Cycling", icon: "fas fa-bicycle" },
    { name: "Swimming", icon: "fas fa-swimmer" },
    { name: "Elliptical", icon: "fas fa-circle" },
  ]

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Cardio"
      icon="fas fa-running"
      iconColor="#10B981"
      animationType="animate-spin"
    >
      {cardioFormStep === 1 ? (
        <div>
          <h6 className="mb-3 text-center">Select Cardio Type</h6>
          <div className="d-flex flex-wrap justify-content-center">
            {cardioTypes.map((cardio) => (
              <button
                key={cardio.name}
                className={`btn-selection ${selectedCardioType === cardio.name ? "active" : ""}`}
                onClick={() => {
                  setSelectedCardioType(cardio.name)
                  setCardioFormStep(2)
                }}
              >
                <i className={`${cardio.icon} me-2`}></i>
                {cardio.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleCardioSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <i className="fas fa-running me-2"></i>
              {selectedCardioType} Distance/Duration
            </label>
            <input
              type="number"
              step="0.1"
              name="cardio"
              className="form-control form-control-blitzit"
              placeholder={
                selectedCardioType === "Walking" || selectedCardioType === "Running"
                  ? "Enter kilometers"
                  : "Enter duration (minutes)"
              }
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary flex-fill" onClick={() => setCardioFormStep(1)}>
              <i className="fas fa-arrow-left me-2"></i>Back
            </button>
            <button type="submit" className="btn-blitzit-green flex-fill">
              <i className="fas fa-check me-2"></i>Add Cardio
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}

export default CardioModal
