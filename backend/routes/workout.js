const express = require('express')
const Workout = require('../models/Workout')
const router = express.Router()
const { 
    createWorkout,
    getWorkout, 
    getWorkouts, 
    deleteWorkout, 
    updateWorkout
} = require('../controller/workoutController')
const requireAuth = require('../middlewares/requireAuth')

//require auth for all routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//PATCH a workout
router.patch('/:id', updateWorkout)

module.exports = router