import PropTypes from 'prop-types'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutContext()

    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user){
            return
        }

        const response = await fetch('http://localhost:3000/api/workouts/' + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`,
            }
        })

        const json = await response.json()

        if(response.ok){
            dispatch({ type: 'DELETE_WORKOUT', payload: json})
        }
    }


    return(
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>Load(kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

WorkoutDetails.propTypes = {
    title: PropTypes.string,
    load: PropTypes.number,
    reps: PropTypes.number
}

export default WorkoutDetails