const PieChart = ({ segments, size = "120px" }) => {
    return (
      <div className="text-center">
        <div
          className="mx-auto mb-3"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: segments.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.8)",
            }}
          ></div>
        </div>
        <div className="d-flex justify-content-center gap-3">
          {segments.legend.map((item, index) => (
            <div key={index} className="text-center">
              <div className="d-flex align-items-center mb-1">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: item.color,
                    borderRadius: "2px",
                    marginRight: "8px",
                  }}
                ></div>
                <small>{item.label}</small>
              </div>
              <small className="text-white-50">{item.value}</small>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default PieChart
  