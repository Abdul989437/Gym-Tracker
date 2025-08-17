"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

const WorkoutProgress = ({ muscle, exerciseName, session, onBack, onUpdate }) => {
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'))
  const [sets, setSets] = useState([{ weight: "", reps: "" }])
  const [filter, setFilter] = useState("all")

  const progress = session.muscleExercises[muscle].find((ex) => ex.name === exerciseName)?.progress || []
  const sortedProgress = [...progress].sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('-')
    const dateB = b.date.split('/').reverse().join('-')
    return new Date(dateB) - new Date(dateA)
  })

  const getWeekStart = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    const d = new Date(`${year}-${month}-${day}`)
    const weekday = d.getDay()
    const diff = d.getDate() - weekday + (weekday === 0 ? -6 : 1)
    const weekStart = new Date(d.setDate(diff))
    return weekStart.toLocaleDateString('en-GB')
  }

  const weeklyGroups = {}
  sortedProgress.forEach((entry) => {
    const week = getWeekStart(entry.date)
    if (!weeklyGroups[week]) weeklyGroups[week] = []
    weeklyGroups[week].push(entry)
  })

  const monthlyGroups = {}
  sortedProgress.forEach((entry) => {
    const [day, month, year] = entry.date.split('/')
    const monthKey = `${month}/${year}`
    if (!monthlyGroups[monthKey]) monthlyGroups[monthKey] = []
    monthlyGroups[monthKey].push(entry)
  })

  const handleAddSet = () => {
    setSets([...sets, { weight: "", reps: "" }])
  }

  const handleRemoveSet = (index) => {
    setSets(sets.filter((_, i) => i !== index))
  }

  const handleSetChange = (index, field, value) => {
    const newSets = [...sets]
    newSets[index][field] = value
    setSets(newSets)
  }

  const handleOpenAdd = () => {
    setIsEdit(false)
    setDate(new Date().toLocaleDateString('en-GB'))
    setSets([{ weight: "", reps: "" }])
    setShowModal(true)
  }

  const handleOpenEdit = (entry) => {
    setIsEdit(true)
    setEditingEntry(entry)
    setDate(entry.date)
    setSets(entry.sets.map((s) => ({ ...s })))
    setShowModal(true)
  }

  const handleSave = () => {
    const newEntry = { date, sets: sets.filter((s) => s.weight && s.reps) }
    if (!newEntry.sets.length) {
      toast.error("Please add at least one valid set with weight and reps.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-workout",
      })
      return
    }

    let newProgress
    if (isEdit) {
      newProgress = progress.map((p) => (p.date === editingEntry.date ? newEntry : p))
    } else {
      newProgress = [...progress, newEntry]
    }

    const newEx = session.muscleExercises[muscle].map((ex) =>
      ex.name === exerciseName ? { ...ex, progress: newProgress } : ex
    )
    const newMuscleEx = { ...session.muscleExercises, [muscle]: newEx }
    const newSession = { ...session, muscleExercises: newMuscleEx }
    onUpdate(newSession)
    toast.success(isEdit ? `✏️ Entry updated for ${exerciseName}!` : `🏋️ Entry added for ${exerciseName}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "toast-workout",
    })
    setShowModal(false)
  }

  const handleDelete = (entryDate) => {
    const newProgress = progress.filter((p) => p.date !== entryDate)
    const newEx = session.muscleExercises[muscle].map((ex) =>
      ex.name === exerciseName ? { ...ex, progress: newProgress } : ex
    )
    const newMuscleEx = { ...session.muscleExercises, [muscle]: newEx }
    const newSession = { ...session, muscleExercises: newMuscleEx }
    onUpdate(newSession)
    toast.success(`🗑️ Entry deleted for ${exerciseName}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "toast-workout",
    })
  }

  const renderAllTable = () => (
    <div className="mb-4">
      <h3 className="text-white mb-3">
        <i className="fas fa-table me-2" style={{ color: "#8B5CF6" }}></i>All Progress
      </h3>
      {sortedProgress.length > 0 ? (
        <>
          <div
            className="card card-blitzit-purple d-none d-md-block"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
              borderRadius: "15px",
            }}
          >
            <div className="card-body p-3 p-md-4">
              <div className="table-responsive">
                <table
                  className="table table-dark table-hover mb-0"
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid",
                    borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid", borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1" }}>
                      <th
                        className="text-center"
                        style={{
                          width: "25%",
                          minWidth: "100px",
                          borderRight: "1px solid",
                          borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                        }}
                      >
                        Date
                      </th>
                      <th
                        className="text-center"
                        style={{
                          width: "20%",
                          minWidth: "80px",
                          borderRight: "1px solid",
                          borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                        }}
                      >
                        Actions
                      </th>
                      <th
                        className="text-center"
                        style={{
                          width: "15%",
                          minWidth: "60px",
                          borderRight: "1px solid",
                          borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                        }}
                      >
                        Set
                      </th>
                      <th
                        className="text-center"
                        style={{
                          width: "20%",
                          minWidth: "60px",
                          borderRight: "1px solid",
                          borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                        }}
                      >
                        Reps
                      </th>
                      <th className="text-center" style={{ width: "20%", minWidth: "80px" }}>
                        Weight (kg)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProgress.map((entry) =>
                      entry.sets.map((s, i) => (
                        <tr
                          key={`${entry.date}-${i}`}
                          className="align-middle"
                          style={{
                            borderBottom: "1px solid",
                            borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          {i === 0 && (
                            <td
                              rowSpan={entry.sets.length}
                              className="text-center text-truncate"
                              style={{
                                borderRight: "1px solid",
                                borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                              }}
                            >
                              {entry.date}
                            </td>
                          )}
                          {i === 0 && (
                            <td
                              rowSpan={entry.sets.length}
                              className="text-center"
                              style={{
                                borderRight: "1px solid",
                                borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                              }}
                            >
                              <div className="d-flex gap-1 gap-md-2 flex-nowrap justify-content-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleOpenEdit(entry)}
                                  style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDelete(entry.date)}
                                  style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          )}
                          <td
                            className="text-center"
                            style={{
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            {`${i + 1}${getOrdinalSuffix(i + 1)} set`}
                          </td>
                          <td
                            className="text-center"
                            style={{
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            {s.reps}
                          </td>
                          <td className="text-center">{s.weight}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="d-block d-md-none">
            <div className="table-responsive">
              <table
                className="table table-dark table-hover mb-0"
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid",
                  borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid", borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1" }}>
                    <th
                      className="text-center"
                      style={{
                        width: "25%",
                        minWidth: "100px",
                        borderRight: "1px solid",
                        borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                      }}
                    >
                      Date
                    </th>
                    <th
                      className="text-center"
                      style={{
                        width: "20%",
                        minWidth: "80px",
                        borderRight: "1px solid",
                        borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                      }}
                    >
                      Actions
                    </th>
                    <th
                      className="text-center"
                      style={{
                        width: "15%",
                        minWidth: "60px",
                        borderRight: "1px solid",
                        borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                      }}
                    >
                      Set
                    </th>
                    <th
                      className="text-center"
                      style={{
                        width: "20%",
                        minWidth: "60px",
                        borderRight: "1px solid",
                        borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                      }}
                    >
                      Reps
                    </th>
                    <th className="text-center" style={{ width: "20%", minWidth: "80px" }}>
                      Weight (kg)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProgress.map((entry) =>
                    entry.sets.map((s, i) => (
                      <tr
                        key={`${entry.date}-${i}`}
                        className="align-middle"
                        style={{
                          borderBottom: "1px solid",
                          borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                        }}
                      >
                        {i === 0 && (
                          <td
                            rowSpan={entry.sets.length}
                            className="text-center text-truncate"
                            style={{
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            {entry.date}
                          </td>
                        )}
                        {i === 0 && (
                          <td
                            rowSpan={entry.sets.length}
                            className="text-center"
                            style={{
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            <div className="d-flex gap-1 flex-nowrap justify-content-center">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleOpenEdit(entry)}
                                style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(entry.date)}
                                style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        )}
                        <td
                          className="text-center"
                          style={{
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          {`${i + 1}${getOrdinalSuffix(i + 1)} set`}
                        </td>
                        <td
                          className="text-center"
                          style={{
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          {s.reps}
                        </td>
                        <td className="text-center">{s.weight}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white-50">No progress data yet.</p>
      )}
    </div>
  )

  const renderGroupTable = (groups, titleKey) => {
    return Object.entries(groups)
      .sort((a, b) => {
        const dateA = a[0].split('/').reverse().join('-')
        const dateB = b[0].split('/').reverse().join('-')
        return new Date(dateB) - new Date(dateA)
      })
      .map(([groupKey, entries]) => (
        <div key={groupKey} className="mb-4">
          <h4 className="text-white mb-3">
            <i className="fas fa-table me-2" style={{ color: "#14B8A6" }}></i>
            {titleKey} {groupKey}
          </h4>
          {entries.length > 0 ? (
            <>
              <div
                className="card card-blitzit-teal d-none d-md-block"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid",
                  borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body p-3 p-md-4">
                  <div className="table-responsive">
                    <table
                      className="table table-dark table-hover mb-0"
                      style={{
                        borderCollapse: "collapse",
                        border: "1px solid",
                        borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "1px solid", borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1" }}>
                          <th
                            className="text-center"
                            style={{
                              width: "25%",
                              minWidth: "100px",
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            Date
                          </th>
                          <th
                            className="text-center"
                            style={{
                              width: "20%",
                              minWidth: "80px",
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            Actions
                          </th>
                          <th
                            className="text-center"
                            style={{
                              width: "15%",
                              minWidth: "60px",
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            Set
                          </th>
                          <th
                            className="text-center"
                            style={{
                              width: "20%",
                              minWidth: "60px",
                              borderRight: "1px solid",
                              borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            Reps
                          </th>
                          <th className="text-center" style={{ width: "20%", minWidth: "80px" }}>
                            Weight (kg)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry) =>
                          entry.sets.map((s, i) => (
                            <tr
                              key={`${entry.date}-${i}`}
                              className="align-middle"
                              style={{
                                borderBottom: "1px solid",
                                borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                              }}
                            >
                              {i === 0 && (
                                <td
                                  rowSpan={entry.sets.length}
                                  className="text-center text-truncate"
                                  style={{
                                    borderRight: "1px solid",
                                    borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                  }}
                                >
                                  {entry.date}
                                </td>
                              )}
                              {i === 0 && (
                                <td
                                  rowSpan={entry.sets.length}
                                  className="text-center"
                                  style={{
                                    borderRight: "1px solid",
                                    borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                  }}
                                >
                                  <div className="d-flex gap-1 gap-md-2 flex-nowrap justify-content-center">
                                    <button
                                      className="btn btn-outline-secondary btn-sm"
                                      onClick={() => handleOpenEdit(entry)}
                                      style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => handleDelete(entry.date)}
                                      style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              )}
                              <td
                                className="text-center"
                                style={{
                                  borderRight: "1px solid",
                                  borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                }}
                              >
                                {`${i + 1}${getOrdinalSuffix(i + 1)} set`}
                              </td>
                              <td
                                className="text-center"
                                style={{
                                  borderRight: "1px solid",
                                  borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                }}
                              >
                                {s.reps}
                              </td>
                              <td className="text-center">{s.weight}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-none">
                <div className="table-responsive">
                  <table
                    className="table table-dark table-hover mb-0"
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid", borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1" }}>
                        <th
                          className="text-center"
                          style={{
                            width: "25%",
                            minWidth: "100px",
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          Date
                        </th>
                        <th
                          className="text-center"
                          style={{
                            width: "20%",
                            minWidth: "80px",
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          Actions
                        </th>
                        <th
                          className="text-center"
                          style={{
                            width: "15%",
                            minWidth: "60px",
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          Set
                        </th>
                        <th
                          className="text-center"
                          style={{
                            width: "20%",
                            minWidth: "60px",
                            borderRight: "1px solid",
                            borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                          }}
                        >
                          Reps
                        </th>
                        <th className="text-center" style={{ width: "20%", minWidth: "80px" }}>
                          Weight (kg)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry) =>
                        entry.sets.map((s, i) => (
                          <tr
                            key={`${entry.date}-${i}`}
                            className="align-middle"
                            style={{
                              borderBottom: "1px solid",
                              borderImage: "linear-gradient(to right, #f43f5e, #3b82f6) 1",
                            }}
                          >
                            {i === 0 && (
                              <td
                                rowSpan={entry.sets.length}
                                className="text-center text-truncate"
                                style={{
                                  borderRight: "1px solid",
                                  borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                }}
                              >
                                {entry.date}
                              </td>
                            )}
                            {i === 0 && (
                              <td
                                rowSpan={entry.sets.length}
                                className="text-center"
                                style={{
                                  borderRight: "1px solid",
                                  borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                                }}
                              >
                                <div className="d-flex gap-1 flex-nowrap justify-content-center">
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => handleOpenEdit(entry)}
                                    style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(entry.date)}
                                    style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            )}
                            <td
                              className="text-center"
                              style={{
                                borderRight: "1px solid",
                                borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                              }}
                            >
                              {`${i + 1}${getOrdinalSuffix(i + 1)} set`}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                borderRight: "1px solid",
                                borderImage: "linear-gradient(to bottom, #f43f5e, #3b82f6) 1",
                              }}
                            >
                              {s.reps}
                            </td>
                            <td className="text-center">{s.weight}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white-50">No progress data yet.</p>
          )}
        </div>
      ))
  }

  const getOrdinalSuffix = (number) => {
    const j = number % 10,
      k = number % 100
    if (j === 1 && k !== 11) return "st"
    if (j === 2 && k !== 12) return "nd"
    if (j === 3 && k !== 13) return "rd"
    return "th"
  }

  return (
    <div
      className="container-fluid p-0"
      style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", minHeight: "100vh" }}
    >
      <div className="" style={{ padding: "10px 15px" }}>
        <Header />
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h2 className="text-white mb-2 mb-md-0">
            <i className="fas fa-chart-line me-2" style={{ color: "#8B5CF6" }}></i>
            {exerciseName} Progress
          </h2>
          <div className="d-flex gap-2 flex-wrap">
          <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onBack}
              style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
            >
              <i className="fas fa-arrow-left me-1"></i>
            </button>
            <div className="d-none d-md-flex gap-2">
              <button
                className={`btn btn-sm ${filter === "all" ? "btn-blitzit-purple" : "btn-outline-primary"}`}
                onClick={() => setFilter("all")}
                style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${filter === "weekly" ? "btn-blitzit-teal" : "btn-outline-primary"}`}
                onClick={() => setFilter("weekly")}
                style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
              >
                Weekly
              </button>
              <button
                className={`btn btn-sm ${filter === "monthly" ? "btn-blitzit-green" : "btn-outline-primary"}`}
                onClick={() => setFilter("monthly")}
                style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
              >
                Monthly
              </button>
            </div>
            <div className="d-md-none">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary btn-sm dropdown-toggle"
                  type="button"
                  id="filterDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
                >
                  <i className="fas fa-filter"></i> Filter
                </button>
                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                  <li>
                    <button
                      className={`dropdown-item ${filter === "all" ? "active" : ""}`}
                      onClick={() => setFilter("all")}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${filter === "weekly" ? "active" : ""}`}
                      onClick={() => setFilter("weekly")}
                    >
                      Weekly
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${filter === "monthly" ? "active" : ""}`}
                      onClick={() => setFilter("monthly")}
                    >
                      Monthly
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="btn btn-blitzit-purple btn-sm"
              onClick={handleOpenAdd}
              style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.75rem" }}
            >
              <i className="fas fa-plus me-1"></i> Add Entry
            </button>
           
          </div>
        </div>

        {filter === "all" && renderAllTable()}
        {filter === "weekly" && (
          <div className="mb-4">
            <h3 className="text-white mb-3">
              <i className="fas fa-table me-2" style={{ color: "#14B8A6" }}></i>Weekly Progress
            </h3>
            {Object.keys(weeklyGroups).length > 0 ? (
              renderGroupTable(weeklyGroups, "Week starting")
            ) : (
              <p className="text-white-50">No weekly progress data yet.</p>
            )}
          </div>
        )}
        {filter === "monthly" && (
          <div className="mb-4">
            <h3 className="text-white mb-3">
              <i className="fas fa-table me-2" style={{ color: "#10B981" }}></i>Monthly Progress
            </h3>
            {Object.keys(monthlyGroups).length > 0 ? (
              renderGroupTable(monthlyGroups, "Month")
            ) : (
              <p className="text-white-50">No monthly progress data yet.</p>
            )}
          </div>
        )}

        <Footer />
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content card-blitzit-purple"
              style={{
                background: "rgba(26, 26, 26, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
              }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">
                  <i className={`fas ${isEdit ? "fa-edit" : "fa-plus"} me-2`} style={{ color: "#8B5CF6" }}></i>
                  {isEdit ? "Edit" : "Add"} Entry for {exerciseName}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-white-50">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    pattern="\d{2}/\d{2}/\d{4}"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white-50">Sets</label>
                  {sets.map((s, i) => (
                    <div key={i} className="d-flex mb-2 align-items-center">
                      <span className="text-white me-2" style={{ fontWeight: "500" }}>
                        {`${i + 1}${getOrdinalSuffix(i + 1)} set`}
                      </span>
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Weight (kg)"
                        value={s.weight}
                        onChange={(e) => handleSetChange(i, "weight", e.target.value)}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "white",
                          borderRadius: "8px",
                          width: "100px",
                          backgroundImage: "linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                        onFocus={(e) => (e.target.style.color = "white")}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.style.color = "transparent"
                        }}
                      />
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Reps"
                        value={s.reps}
                        onChange={(e) => handleSetChange(i, "reps", e.target.value)}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "white",
                          borderRadius: "8px",
                          width: "100px",
                          backgroundImage: "linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                        onFocus={(e) => (e.target.style.color = "white")}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.style.color = "transparent"
                        }}
                      />
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveSet(i)}
                        style={{ borderRadius: "8px", fontWeight: "500", padding: "0.25rem 0.5rem" }}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={handleAddSet}
                    style={{ borderRadius: "8px", fontWeight: "500" }}
                  >
                    <i className="fas fa-plus me-1"></i> Add Set
                  </button>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-blitzit-purple"
                  onClick={handleSave}
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                >
                  <i className="fas fa-save me-1"></i>
                  {isEdit ? "Save Changes" : "Add Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default WorkoutProgress