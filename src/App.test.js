// Simple fitness tracker tests using Jest
// Functions are defined here for simplicity

// Functions for adding, deleting workouts, and calculating total duration
function addWorkout(workouts, type, duration) {
  if (!type || !duration) return workouts;
  const newWorkout = { id: Date.now(), type, duration };
  return [...workouts, newWorkout];
}

function deleteWorkout(workouts, id) {
  return workouts.filter((w) => w.id !== id);
}

function totalDuration(workouts) {
  return workouts.reduce((sum, w) => sum + parseInt(w.duration), 0);
}

// Jest tests
describe("Mini Fitness Tracker Tests", () => {
  test("adds a workout", () => {
    let workouts = [];
    workouts = addWorkout(workouts, "Running", 30);

    expect(workouts.length).toBe(1);
    expect(workouts[0].type).toBe("Running");
    expect(workouts[0].duration).toBe(30);
  });

  test("does not add workout if type or duration is empty", () => {
    let workouts = [];
    workouts = addWorkout(workouts, "", 30);
    expect(workouts.length).toBe(0);

    workouts = addWorkout(workouts, "Cycling", "");
    expect(workouts.length).toBe(0);
  });

  test("deletes a workout", () => {
    let workouts = [{ id: 1, type: "Cycling", duration: 45 }];
    workouts = deleteWorkout(workouts, 1);
    expect(workouts.length).toBe(0);
  });

  test("calculates total duration", () => {
    const workouts = [
      { id: 1, type: "Running", duration: 30 },
      { id: 2, type: "Cycling", duration: 45 },
    ];
    expect(totalDuration(workouts)).toBe(75);
  });
});
