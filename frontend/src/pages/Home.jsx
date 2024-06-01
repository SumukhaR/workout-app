import { useEffect } from 'react'
import axios from 'axios'

//components
import WorkoutDetails from '../comopnents/WorkoutDetails'
import WorkoutForm from '../comopnents/WorkoutForm'

//hooks
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {

    const { workouts, dispatch} = useWorkoutContext()

    const { user } = useAuthContext()
    
    useEffect(() => {
        //using fetch api
        const fetchWorkouts = async () => {
            try{
                const response = await fetch("http://localhost:3000/api/workouts"  , {
                    mode: 'cors',
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify()
                  }  )
                const json = await response.json()
                //console.log(json)
                if(response.ok){
                    dispatch({type: 'SET_WORKOUTS', payload: json})
                }
            }catch(err){
                console.log(err)
            }  
        } 
        //using axios
        /* const fetchWorkouts = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/workouts")
                //console.log(response.data)
                if(response.ok){
                    setWorkouts(response.data)
                }

            } catch(error){
                console.log(error.request)
            }
        } */ 
        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
//                    <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home