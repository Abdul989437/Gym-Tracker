import { Link } from "react-router-dom"

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 lg:w-64 lg:h-screen lg:fixed lg:top-0 lg:left-0">
      <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-none lg:rounded-r-2xl lg:h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Gym Tracker</span>
          </div>
          <button
            className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Brand */}
        <div className="hidden lg:flex items-center space-x-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Gym Tracker</span>
        </div>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse lg:block" id="navbarNav">
          <div className="flex flex-col p-4 lg:p-6 space-y-2">
            <Link
              to="/weight-tracking"
              className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Weight Tracking</span>
              </div>
            </Link>

            <Link
              to="/workout-tracking"
              className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/25"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">Workout Tracking</span>
              </div>
            </Link>

            <Link
              to="/cardio-tracking"
              className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">Cardio Tracking</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation