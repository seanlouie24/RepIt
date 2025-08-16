const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    // Workout Functions
    createWorkout, 
    getWorkouts, 
    updateWorkout,
    deleteWorkout,
    createTemplate,
    getTemplates
} = require('../controllers/workoutController');

router.use(auth) // Protect all routes

router.post('/', createWorkout);
router.get('/', getWorkouts); // Gets all workouts thats why no id needed
router.put('/:id',updateWorkout); // Need id to find the workout we want to update
router.delete('/:id', deleteWorkout); // Once again need id to find the workout we wish to delete
router.post('/template', createTemplate); // Create a new template
router.get('/template', getTemplates); // Gets all templates thats why no id needed

module.exports = router
