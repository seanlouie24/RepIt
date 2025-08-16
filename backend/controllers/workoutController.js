const Workout = require('../models/Workout')


const createWorkout = async (req, res) => {
    try {

        const{exercises,date} = req.body;

        if(!Array.isArray(exercises) || exercises.length === 0){
          return res.status(400).json({message: 'At least one exercise is required'});
        }

        const workout = await Workout.create({
        user: req.user || req.user,
        date: date || new Date(),
        exercises
      });
      res.status(201).json(workout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const getWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

  
const updateWorkout = async (req,res) => {
    try{
        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true }
        );
        if (!workout) return res.status(404).json({message:'Workout not found'});
        res.json(workout);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

const deleteWorkout = async (req,res) => {
    try{
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!workout) return res.status(404).json({message:'Workout not found'});
        res.json({message:'Workout deleted'});
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

const createTemplate = async (req,res) => {
  try{
    const{exercises,date} = req.body;

    if(!Array.isArray(exercises) || exercises.length === 0){
      return res.status(400).json({message: 'At least one exercise is required'});
    }
    
    const template = await workout.create({
      user: req.user,
      date: date || new Date(),
      exercises,
      isTemplate: true
    });
    res.status(201).json(template);
  }
  catch{
    res.status(400).json({ message: err.message });
  }
};

const getTemplates = async (req,res) => {
  try {
    const templates = await Workout.find({ user: req.user, isTemplate: true }).sort({ date: -1 });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {createWorkout, getWorkouts, updateWorkout, deleteWorkout, createTemplate, getTemplates};

        