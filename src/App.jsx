import React, { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [filter, setFilter] = useState("");

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

  const filteredWorkouts = workouts.filter((w) =>
    w.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 text-gray-100">
      {/* Hero Section */}
      <header className="w-full max-w-4xl text-center py-12">
        <h1 className="text-5xl font-extrabold text-purple-400 mb-4">
          Fitness Tracker
        </h1>
        <p className="text-lg text-gray-300">
          Track your workouts, monitor progress, and stay motivated every day.
        </p>
      </header>

      {/* App Container */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Add Workout Inputs */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Workout Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <PlusIcon className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-28 bg-gray-700 text-gray-100 border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addWorkout}
            className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 transition flex items-center gap-1"
          >
            Add
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Input */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Filter by workout type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Workout List */}
        <ul className="mb-4 divide-y divide-gray-700">
          {filteredWorkouts.map((w) => (
            <li
              key={w.id}
              className="flex justify-between items-center py-2 hover:bg-gray-700 transition px-2 rounded-lg"
            >
              <span className="text-gray-100 font-medium">
                {w.type} - {w.duration} min
              </span>
              <button
                onClick={() => deleteWorkout(w.id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>

        {/* Total Duration */}
        <div className="font-bold text-gray-100 text-center text-lg">
          Total Duration: {totalDuration} min
        </div>
      </div>
    </div>
  );
}

export default App;
