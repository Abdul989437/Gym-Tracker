"use client"

const StatsCard = ({
  icon,
  title,
  value,
  unit = "",
  description,
  buttonText,
  onButtonClick,
  cardClass,
  buttonClass,
  iconColor,
  animatingIcon,
  animationType,
}) => {
  return (
    <div className={cardClass}>
      <div className="text-center">
        <div className="mb-3">
          <i className={`${icon} fa-2x ${animatingIcon ? animationType : ""}`} style={{ color: iconColor }}></i>
        </div>
        <h6 className="mb-2">{title}</h6>
        <h3 className="mb-2">
          {value} {unit}
        </h3>
        <p className="text-white-50 small mb-3">{description}</p>
        <button className={buttonClass} onClick={onButtonClick}>
          <i className="fas fa-plus me-2"></i>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default StatsCard
