import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import WorkoutCreator from './pages/WorkoutCreator';
import History from './pages/History';

function App(){
  return(
    <div className='bg-gray-800 min-h-screen'>
      <Router>
        <Routes>
          <Route path = "/" element={<Login/>}></Route>
          <Route path = "/signup" element={<Signup/>}></Route>
          <Route path = "/dashboard" element={<Dashboard/>}></Route>
          <Route path = "/progress" element={<Progress/>}></Route>
          <Route path = "/workoutCreator" element={<WorkoutCreator/>}></Route>
          <Route path = "/history" element={<History/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;