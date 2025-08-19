import bgImage from "./assets/bg-logo.png";
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
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl bg-gray-800 bg-opacity-80 p-12 rounded-3xl shadow-2xl mt-12">
        {/* Hero Section */}
        <header className="text-center py-6 text-gray-100">
          <h1 className="text-6xl font-extrabold text-purple-400 mb-4">
            Fitness Tracker
          </h1>
          <p className="text-xl text-gray-200">
            Track your workouts, stay fit, and achieve your goals every day! 💪
          </p>
        </header>

        {/* Tip of the Day */}
        <div className="bg-purple-700 text-white text-center p-3 rounded mb-6 shadow-md text-lg">
          Tip of the Day: Stay consistent and challenge yourself! ⚡
        </div>

        {/* App Container */}
        <div className="bg-gray-700 bg-opacity-90 p-8 rounded-2xl shadow-xl">
          {/* Add Workout Inputs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Workout Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-600 text-gray-100 border border-gray-500 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
              />
              <PlusIcon className="w-6 h-6 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <input
              type="number"
              placeholder="Duration (min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-32 bg-gray-600 text-gray-100 border border-gray-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            />
            <button
              onClick={addWorkout}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition-transform transform hover:scale-105 flex items-center gap-2 text-lg"
            >
              Add <PlusIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Input */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Filter by workout type"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-gray-600 text-gray-100 border border-gray-500 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Workout List */}
          <ul className="mb-6 divide-y divide-gray-600 max-h-80 overflow-y-auto">
            {filteredWorkouts.map((w) => (
              <li
                key={w.id}
                className="flex justify-between items-center py-3 hover:bg-gray-600 transition px-3 rounded-lg text-lg"
              >
                <span className="text-gray-100 font-medium">
                  {w.type} - {w.duration} min
                </span>
                <button
                  onClick={() => deleteWorkout(w.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </li>
            ))}
          </ul>

          {/* Total Duration */}
          <div className="font-bold text-gray-100 text-center text-2xl">
            Total Duration: {totalDuration} min
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
