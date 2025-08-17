const BarChart = ({ data, gradient }) => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-end" style={{ height: "120px" }}>
          {data.map((height, index) => (
            <div
              key={index}
              className="bar"
              style={{
                width: "12%",
                height: `${height}%`,
                background: gradient,
                borderRadius: "4px 4px 0 0",
              }}
            ></div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-2 small text-white-50">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </>
    )
  }
  
  export default BarChart
  