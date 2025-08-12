import { Link } from 'react-router-dom';

function Navbar(){
    return(
        
        <nav className='bg-gray-100 px-6 py-4 shadow-md fixed top-0 left-0 w-full bg-gray-800 z-50'>
            <div className='flex justify-between items-center'>
                <div className="font-anton text-gray-100 font-medium">
                    RepIt
                </div>
                <div className='flex space-x-4'>
                    <Link to="/dashboard" className="font-anton text-gray-300 hover:text-blue-600 font-medium">WORKOUTS</Link>
                    <Link to="/workoutCreator" className='font-anton text-gray-300 hover:text-blue-600 font-medium'>CREATE WORKOUT</Link>
                    {/* <Link to="/history" style={{marginRight:'10px'}}>History</Link> */}
                    {/* <Link to="/progress" style={{marginRight:'10px'}}>Progress</Link> */}
                    <Link to="/" className='font-anton text-gray-300 hover:text-red-500 font-medium'>LOGOUT</Link>
                </div>
            </div>
        </nav>
      
    );
}

export default Navbar;