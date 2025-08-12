import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  
  const [totalExercises, setTotalExercises] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await API.get('/workouts');
        setWorkouts(res.data);

     
        const exerciseCount = res.data.reduce(
          (total, workout) => total + (workout.exercises?.length || 0),
          0
        );
        setTotalExercises(exerciseCount);

      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      await API.delete(`/workouts/${id}`);
      setWorkouts((prev) => {
        const updatedWorkouts = prev.filter((workout) => workout._id !== id);
  
        const exerciseCount = updatedWorkouts.reduce(
          (total, workout) => total + (workout.exercises?.length || 0),
          0
        );
        setTotalExercises(exerciseCount);
  
        return updatedWorkouts;
      });

    }
    catch (err) {
      console.error("Failed to delete workout: ", err.response?.data || err.message);
      alert("Failed to delete workout");
    }
  };

  return (
    <div className="w-full sm:max-w-xl lg:max-w-full mx-auto p-4 bg-gray-800">
      <Navbar />
      <br />
      <br />
      <h1 className="font-inter text-center text-6xl font-bold mt-4 mb-6 text-gray-100">Workouts</h1>

      
      <div className="bg-gray-700 text-gray-300 rounded-lg p-6 mb-8 max-w-sm mx-auto shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Workout Summary</h2>
        <p className="text-center">Total workouts logged: {workouts.length}</p>
        <p className="text-center">Total exercises completed: {totalExercises}</p>
      </div>


      {workouts.length === 0 ? (
        <div className="text-center text-gray-400 space-y-4">
          <p>No workouts yet.</p>
          <button
            onClick={() => navigate('/workoutCreator')}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl transition"
          >
            Create Your First Workout
          </button>
        </div>
      ) : (
        <div className="space-y-6 mx-auto max-w-sm">
          {workouts.map((workout) => (
            <div
              key={workout._id}
              className="p-3 border rounded bg-gray-800"
            >
              <h3 className="font-semibold mb-2 text-gray-100">
                {new Date(workout.date).toLocaleDateString()}
              </h3>

              {workout.exercises.map((ex, idx) => (
                <div key={idx} className="mb-1 text-gray-300">
                  <p>
                    <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps @ {ex.weight} lbs
                  </p>
                  {ex.notes && <p className="italic text-sm text-gray-400">Notes: {ex.notes}</p>}
                </div>
              ))}

              <button
                onClick={() => deleteWorkout(workout._id)}
                className="rounded-2xl mt-2 px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Delete Workout
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
