"use client"

const ScrollPicker = ({ options, selectedValue, onValueChange, hasSelected, formatOption, onScroll }) => {
  return (
    <>
      <div className="scroll-picker" onScroll={onScroll}>
        <div className={`picker-center-highlight ${hasSelected ? "show" : ""}`}></div>
        {options.map((option, index) => (
          <div
            key={option}
            className={`picker-item ${
              hasSelected && selectedValue === option
                ? "active"
                : hasSelected && selectedValue !== option && selectedValue > 0
                  ? "selected"
                  : ""
            }`}
            onClick={() => onValueChange(option)}
          >
            {formatOption ? formatOption(option) : option}
          </div>
        ))}
      </div>
    </>
  )
}

export default ScrollPicker
