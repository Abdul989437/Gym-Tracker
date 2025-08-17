"use client"

const Modal = ({ show, onClose, title, icon, iconColor, animationType, children }) => {
  if (!show) return null

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered animate-fade-scale" role="document">
          <div className="modal-content modal-content-blitzit">
            <div className="modal-header border-0">
              <h5 className="modal-title">
                <i className={`${icon} me-2 ${animationType}`} style={{ color: iconColor }}></i>
                {title}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body animate-slide-up">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
