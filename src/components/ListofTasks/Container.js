import React, { Component } from 'react'
import Presentation from './Presentation'
import Axios from 'axios'
import firebase from '../../firebase_config'
import { ACTIONS } from '../../contexts/types'
import { Store } from  '../../contexts/data'
class Container extends Component {
    state = {
        tasks : []
    }
    static contextType = Store
    componentDidMount(){
        const [state, dispatch] = this.context
       firebase.firestore().collection("Tasks")
       .where("isExist","==",true)
       .onSnapshot(snap => {
           let tasks = snap.docs.map(doc => doc.data())
            dispatch({
                type : ACTIONS.TASK_LIST,
                payload : tasks
            })
       })
    }
    render() {
        return (
            <div>
                <Presentation />
            </div>
        )
    }
}

export default Container
