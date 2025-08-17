const AnalyticsCard = ({ title, icon, iconColor, children }) => {
    return (
      <div className="card analytics-card">
        <div className="card-body">
          <h6 className="mb-3">
            <i className={`${icon} me-2`} style={{ color: iconColor }}></i>
            {title}
          </h6>
          {children}
        </div>
      </div>
    )
  }
  
  export default AnalyticsCard
  