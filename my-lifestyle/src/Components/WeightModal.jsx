"use client"
import Modal from "./Modal"
import ScrollPicker from "./ScrollPicker"

const WeightModal = ({
  show,
  onClose,
  weight,
  setWeight,
  hasSelectedWeight,
  setHasSelectedWeight,
  handleWeightSubmit,
}) => {
  const weightOptions = Array.from({ length: 151 }, (_, i) => 30 + i * 0.5)

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    const itemHeight = 50
    const centerIndex = Math.round(scrollTop / itemHeight)
    if (weightOptions[centerIndex]) {
      setWeight(weightOptions[centerIndex])
      setHasSelectedWeight(true)
    }
  }

  const handleValueChange = (weightValue) => {
    setWeight(weightValue)
    setHasSelectedWeight(true)
  }

  const handleSubmit = () => {
    handleWeightSubmit({ preventDefault: () => {} })
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Update Weight"
      icon="fas fa-weight"
      iconColor="#F59E0B"
      animationType="animate-pulse"
    >
      <h6 className="mb-3 text-center">Select Weight (kg)</h6>
      <ScrollPicker
        options={weightOptions}
        selectedValue={weight}
        onValueChange={handleValueChange}
        hasSelected={hasSelectedWeight}
        formatOption={(option) => `${option} kg`}
        onScroll={handleScroll}
      />
      <div className="mt-3 text-center">
        <p className="mb-2" style={{ color: "#F59E0B" }}>
          <i className="fas fa-weight me-2"></i>
          Selected: <strong>{weight > 0 ? `${weight} kg` : "None"}</strong>
        </p>
        <button className="btn-blitzit-orange w-100" onClick={handleSubmit}>
          <i className="fas fa-check me-2"></i>Update Weight to {weight} kg
        </button>
      </div>
    </Modal>
  )
}

export default WeightModal
