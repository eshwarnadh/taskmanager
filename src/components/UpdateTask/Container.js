import React, { Component } from 'react'
import Presentation from './Presentation'
import { ACTIONS } from '../../contexts/types'
import { Store } from '../../contexts/data'
class Container extends Component {
    state = {
        title : "",
        priority : "",
        date : "",
        description : "",
        isUpdating : false,
        modal:false,
    }
    static contextType = Store
    componentDidMount = () => {
        const [state] = this.context
        const task = state.tasks.filter(task => task.id === this.props.id)[0]
        const {title, priority, date, description } = task
        this.setState({title,priority,date,description,id:this.props.id})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onUpdate = (e) => {
        e.preventDefault()
        this.setState({isUpdating : true})
        const [state, dispatch ] = this.context
        const input = this.state
        const updatedTask = {
            title : input.title,
            priority : input.priority,
            date : input.date,
            description : input.description,
            id : input.id
        }
        dispatch({
            type : ACTIONS.UPDATE_TASK,
            payload : updatedTask,
            response : this.response
        })
    }

    response = () => {
        this.setState({
            modal:false,
            title : "",
            priority : "",
            date : "",
            description : "",
            isUpdating : false,
        })
    }

    unMountBtn = () => {
        this.setState({isCreating:false})
    }

    toggle = () => {
        this.setState({modal:!this.state.modal})
    }

    render() {
        return (
            <div>
                    <Presentation 
                    {...this.state}
                    {...this.props}
                    isUpdating={this.state.isUpdating}
                    onUpdate={this.onUpdate}
                    handleChange={this.handleChange}
                    unMountBtn={this.unMountBtn}
                    toggle={this.toggle}
                />
                
            </div>
        )
    }
}

export default Container
