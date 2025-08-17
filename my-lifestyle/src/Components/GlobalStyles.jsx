"use client"

const GlobalStyles = () => {
  return (
    <style jsx>{`
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
      
      @keyframes grow {
        from { height: 0; }
        to { height: var(--height); }
      }
      .bar {
        animation: grow 1s ease-in-out forwards;
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes slideInUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes fadeInScale {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      .animate-bounce { animation: bounce 1s infinite; }
      .animate-pulse { animation: pulse 1s infinite; }
      .animate-spin { animation: spin 1s linear infinite; }
      .animate-slide-up { animation: slideInUp 0.5s ease-out; }
      .animate-fade-scale { animation: fadeInScale 0.3s ease-out; }
      
      .btn-blitzit-purple {
        background: linear-gradient(135deg, #8B5CF6, #EC4899);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 8px 16px;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      .btn-blitzit-purple:hover {
        background: linear-gradient(135deg, #7C3AED, #DB2777);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        color: white;
      }
      
      .btn-blitzit-teal {
        background: linear-gradient(135deg, #14B8A6, #06B6D4);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 8px 16px;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      .btn-blitzit-teal:hover {
        background: linear-gradient(135deg, #0D9488, #0891B2);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
        color: white;
      }
      
      .btn-blitzit-green {
        background: linear-gradient(135deg, #10B981, #34D399);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 8px 16px;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      .btn-blitzit-green:hover {
        background: linear-gradient(135deg, #059669, #10B981);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        color: white;
      }
      
      .btn-blitzit-orange {
        background: linear-gradient(135deg, #F59E0B, #F97316);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 8px 16px;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      .btn-blitzit-orange:hover {
        background: linear-gradient(135deg, #D97706, #EA580C);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        color: white;
      }
      
      .btn-selection {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        border-radius: 8px;
        padding: 10px 15px;
        margin: 5px;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .btn-selection:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
      .btn-selection.active {
        background: linear-gradient(135deg, #8B5CF6, #EC4899);
        border-color: #8B5CF6;
      }
      
      .card-blitzit-purple {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px;
        transition: all 0.3s ease;
      }
      .card-blitzit-purple:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.5);
      }
      
      .card-blitzit-teal {
        background: linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.15));
        border: 1px solid rgba(20, 184, 166, 0.3);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px;
        transition: all 0.3s ease;
      }
      .card-blitzit-teal:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(20, 184, 166, 0.2);
        border-color: rgba(20, 184, 166, 0.5);
      }
      
      .card-blitzit-green {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.15));
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px;
        transition: all 0.3s ease;
      }
      .card-blitzit-green:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
        border-color: rgba(16, 185, 129, 0.5);
      }
      
      .card-blitzit-orange {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15));
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px;
        transition: all 0.3s ease;
      }
      .card-blitzit-orange:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
        border-color: rgba(245, 158, 11, 0.5);
      }
      
      .sidebar-blitzit {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(26, 26, 26, 0.9));
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .nav-link-blitzit {
        color: rgba(255, 255, 255, 0.7) !important;
        border-radius: 12px;
        margin: 4px 8px;
        padding: 12px !important;
        transition: all 0.3s ease;
        text-decoration: none;
      }
      .nav-link-blitzit:hover {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
        color: white !important;
        transform: translateX(4px);
      }
      .nav-link-blitzit.active {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3));
        color: white !important;
      }
      
      .main-content {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        min-height: 100vh;
        margin-left: 0;
        width: 100%;
      }
      @media (min-width: 768px) {
        .main-content {
          margin-left: 64px;
          width: calc(100% - 64px);
          transition: all 0.3s ease-in-out;
        }
      }
      
      .analytics-card {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.8));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        color: white;
        transition: all 0.3s ease;
      }
      .analytics-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      }
      
      .welcome-text {
        text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
      }
      
      .modal-content-blitzit {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 26, 0.95));
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        color: white;
      }
      
      .form-control-blitzit {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: white;
      }
      .form-control-blitzit:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(139, 92, 246, 0.5);
        box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
        color: white;
      }
      .form-control-blitzit::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      
      .scroll-picker {
        height: 200px;
        overflow-y: scroll;
        border: 2px solid rgba(139, 92, 246, 0.3);
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.05);
        position: relative;
        scroll-behavior: smooth;
      }
      
      .scroll-picker::-webkit-scrollbar {
        width: 0px;
        display: none;
      }
      
      .scroll-picker {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
      }
      
      .picker-item {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .picker-item.selected {
        color: white;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
        font-size: 19px;
        font-weight: 600;
        border-radius: 8px;
        margin: 2px 8px;
      }
      
      .picker-item.active {
        color: white;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
        font-size: 20px;
        font-weight: 700;
        transform: scale(1.05);
        border-left: 4px solid #8B5CF6;
        border-radius: 8px;
        margin: 2px 8px;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
      }
      
      .picker-center-highlight {
        position: absolute;
        top: 50%;
        left: 8px;
        right: 8px;
        height: 54px;
        transform: translateY(-50%);
        background: rgba(139, 92, 246, 0.1);
        border-radius: 12px;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .picker-center-highlight.show {
        opacity: 1;
      }
      
      .Toastify__toast-container {
        z-index: 9999;
      }
      
      .toast-steps {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(168, 85, 247, 0.95)) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 12px;
        color: white;
      }
      
      .toast-steps .Toastify__progress-bar {
        background: linear-gradient(90deg, #8B5CF6, #A855F7) !important;
      }
      
      .toast-weight {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(251, 191, 36, 0.95)) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 12px;
        color: white;
      }
      
      .toast-weight .Toastify__progress-bar {
        background: linear-gradient(90deg, #F59E0B, #FBBF24) !important;
      }
      
      .toast-workout {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(96, 165, 250, 0.95)) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        color: white;
      }
      
      .toast-workout .Toastify__progress-bar {
        background: linear-gradient(90deg, #3B82F6, #60A5FA) !important;
      }
      
      .toast-cardio {
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 114, 182, 0.95)) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(236, 72, 153, 0.3);
        border-radius: 12px;
        color: white;
      }
      
      .toast-cardio .Toastify__progress-bar {
        background: linear-gradient(90deg, #EC4899, #F472B6) !important;
      }
      
      .Toastify__toast--success {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(52, 211, 153, 0.95));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        color: white;
      }
      
      .Toastify__progress-bar--success {
        background: linear-gradient(90deg, #10B981, #34D399);
      }
      
      .Toastify__close-button--light {
        color: white;
        opacity: 0.8;
      }
      
      .Toastify__close-button--light:hover {
        opacity: 1;
      }
    `}</style>
  )
}

export default GlobalStyles