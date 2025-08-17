"use client"
import Modal from "./Modal"
import ScrollPicker from "./ScrollPicker"

const StepsModal = ({ show, onClose, steps, setSteps, hasSelectedSteps, setHasSelectedSteps, handleStepsSubmit }) => {
  const stepOptions = [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000,
    25000, 30000,
  ]

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    const itemHeight = 50
    const centerIndex = Math.round(scrollTop / itemHeight)
    if (stepOptions[centerIndex]) {
      setSteps(stepOptions[centerIndex])
      setHasSelectedSteps(true)
    }
  }

  const handleValueChange = (stepCount) => {
    setSteps(stepCount)
    setHasSelectedSteps(true)
  }

  const handleSubmit = () => {
    handleStepsSubmit({ preventDefault: () => {} })
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Steps"
      icon="fas fa-walking"
      iconColor="#8B5CF6"
      animationType="animate-bounce"
    >
      <h6 className="mb-3 text-center">Select Steps Target</h6>
      <ScrollPicker
        options={stepOptions}
        selectedValue={steps}
        onValueChange={handleValueChange}
        hasSelected={hasSelectedSteps}
        formatOption={(option) => `${option} steps`}
        onScroll={handleScroll}
      />
      <div className="mt-3 text-center">
        <p className="mb-2" style={{ color: "#8B5CF6" }}>
          <i className="fas fa-hand-point-up me-2"></i>
          Selected: <strong>{steps > 0 ? `${steps} steps` : "None"}</strong>
        </p>
        <button className="btn-blitzit-purple w-100" onClick={handleSubmit}>
          <i className="fas fa-check me-2"></i>Add {steps} Steps
        </button>
      </div>
    </Modal>
  )
}

export default StepsModal
