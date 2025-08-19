import React, { useState } from "react";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [filter, setFilter] = useState(""); // new filter state

  const addWorkout = () => {
    if (!type || !duration) return;
    const newWorkout = { id: Date.now(), type, duration };
    setWorkouts([...workouts, newWorkout]);
    setType("");
    setDuration("");
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const totalDuration = workouts.reduce(
    (sum, w) => sum + parseInt(w.duration),
    0
  );

  // Filter workouts by type
  const filteredWorkouts = workouts.filter((w) =>
    w.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Mini Fitness Tracker</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {/* Add Workout Inputs */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Workout Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-32 border p-2 rounded"
          />
          <button
            onClick={addWorkout}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Filter Input */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Filter by workout type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
        </div>

        {/* Workout List */}
        <ul className="mb-4">
          {filteredWorkouts.map((w) => (
            <li
              key={w.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>
                {w.type} - {w.duration} min
              </span>
              <button
                onClick={() => deleteWorkout(w.id)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {/* Total Duration */}
        <div className="font-bold">Total Duration: {totalDuration} min</div>
      </div>
    </div>
  );
}

export default App;
