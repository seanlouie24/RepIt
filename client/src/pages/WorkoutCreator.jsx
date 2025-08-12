import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from '../components/Navbar';

function WorkoutCreator() {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
    notes: ""
  });

  const handleChange = (e) => {
    setExercise((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addExercise = () => {
    if (!exercise.name) return alert("Exercise name is required");

    setExercises((prev) => [
      ...prev,
      {
        ...exercise,
        sets: Number(exercise.sets),
        reps: Number(exercise.reps),
        weight: Number(exercise.weight)
      }
    ]);

    setExercise({ name: "", sets: "", reps: "", weight: "", notes: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (exercises.length === 0) return alert("Add at least one exercise");

    const workoutData = { exercises };

    try {
      await API.post("/workouts", workoutData);
      alert("Workout created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create workout");
    }
  };

  const inputClasses = `
    bg-gray-700
    text-gray-100
    placeholder-gray-400
    border
    border-gray-600
    rounded-md
    px-3
    py-2
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition
    shadow-sm
    hover:shadow-md
  `;

  return (
    <div className="w-full sm:max-w-xl lg:max-w-full mx-auto p-4 bg-gray-800 min-h-screen">
      <Navbar />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <h2 className="text-center text-6xl font-bold mt-4 mb-6 text-gray-100">
          Create Workout
        </h2>

        <div className="space-y-4 p-3 padding border rounded mx-auto max-w-sm bg-gray-800">
          <input
            name="name"
            placeholder="Exercise Name"
            value={exercise.name}
            onChange={handleChange}
            className={inputClasses}
          />
          <br />
          <input
            name="sets"
            type="number"
            placeholder="Sets"
            value={exercise.sets}
            onChange={handleChange}
            className={inputClasses}
          />
          <br />
          <input
            name="reps"
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={handleChange}
            className={inputClasses}
          />
          <br />
          <input
            name="weight"
            type="number"
            placeholder="Weight (lbs)"
            value={exercise.weight}
            onChange={handleChange}
            className={inputClasses}
          />
          <br />
          <textarea
            name="notes"
            placeholder="Notes"
            value={exercise.notes}
            onChange={handleChange}
            className={inputClasses + " resize-none"}
            rows={3}
          />
          <br />
          <button
            className="rounded-2xl mt-2 px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition"
            type="button"
            onClick={addExercise}
          >
            Add Exercise
          </button>
        </div>

        <br />

        <div className="border space-y-4 p-3 padding rounded mx-auto max-w-sm bg-gray-800 text-gray-100">
          <h3>Exercises in Workout:</h3>
          {exercises.length === 0 ? (
            <p>No exercises added yet.</p>
          ) : (
            <ul>
              {exercises.map((ex, idx) => (
                <li key={idx}>
                  {ex.name} — {ex.sets}×{ex.reps} @ {ex.weight} lbs
                </li>
              ))}
            </ul>
          )}
          <button
            className="rounded-2xl mt-2 px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition"
            type="submit"
          >
            Save Workout
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}

export default WorkoutCreator;
