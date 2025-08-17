import React, { useState } from 'react';

function CardioTracking() {
  const [cardios, setCardios] = useState([]);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState('');

  const addCardio = () => {
    if (type && duration && date) {
      setCardios([...cardios, { type, duration: parseInt(duration), distance: parseFloat(distance) || 0, calories: parseInt(calories) || 0, date }]);
      setType('');
      setDuration('');
      setDistance('');
      setCalories('');
      setDate('');
    }
  };

  const calculateAverageDuration = () => {
    if (cardios.length === 0) return 0;
    const sum = cardios.reduce((acc, curr) => acc + curr.duration, 0);
    return (sum / cardios.length).toFixed(2);
  };

  return (
    <div className="">
      <h2>Cardio Tracking</h2>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Cardio Type</label>
        <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Walking">Walking</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="duration" className="form-label">Duration (minutes)</label>
        <input type="number" className="form-control" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="distance" className="form-label">Distance (km)</label>
        <input type="number" className="form-control" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="calories" className="form-label">Calories Burned</label>
        <input type="number" className="form-control" id="calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={addCardio}>Add Cardio</button>
      <h3 className="mt-4">Recorded Cardio Sessions</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {cardios.map((c, index) => (
            <tr key={index}>
              <td>{c.date}</td>
              <td>{c.type}</td>
              <td>{c.duration} min</td>
              <td>{c.distance} km</td>
              <td>{c.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3">Average Duration: {calculateAverageDuration()} min</p>
    </div>
  );
}

export default CardioTracking;