import React, { createContext, useReducer } from 'react'
import { ACTIONS } from './types'
import Axios from 'axios'
import firebase from '../firebase_config'
export const Store = createContext()

const initialState = {
    tasks : [],
    isLoggedIn : false
}

const reducer = (state, action) => {
    switch(action.type){          
        case ACTIONS.TASK_LIST : 
                        return {
                            ...state,
                            tasks : action.payload
                        }
        case ACTIONS.CREATE_TASK : createTask(state, action.payload, action.response)
                        return state  
        case ACTIONS.UPDATE_TASK : updateTask(state, action.payload, action.response)
                        return state
        case ACTIONS.DELETE_TASK : deleteTask(state, action.payload, action.response)   
                        return state                                           
    }
}

const StoreProvider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    return(
        <Store.Provider value={[state, dispatch]} >
            {props.children}
        </Store.Provider>
    )
}

export default StoreProvider



const createTask = async(state, newTask, response) => {
    let errCount = 0
    Object.entries(newTask).forEach(([key, value]) => {
        if(key === "date" && Date.parse(value) === NaN){
            errCount++
        }
        else if(value === "")
            errCount++
    })
    if(errCount > 0)
       return response()
    const res = await Axios.post("/createtask",newTask)
    const result = await res.data
    console.log(result)
    response()
}

const updateTask = async(state, updatedTask, response) => {
    let errCount = 0
    console.log(updateTask)
    Object.entries(updatedTask).forEach(([key, value]) => {
        if(key === "date" && Date.parse(value) === NaN){
            errCount++
        }
        else if(value === "")
            errCount++
    })
    if(errCount > 0)
       return response()
    const res = await Axios.post("/updatetask",updatedTask)
    const result = await res.data
    console.log(result) 
    response()
}

const deleteTask = async(state, id, response) => {
    console.log("deletetask")
    if(!state.tasks.filter(task => task.id === id).length)
        return response('no-task-found')
    const res = await Axios.post("/deletetask",{id})
    const result = await res.data
    response()
    console.log(result)     
}

