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
        isCreating : false,
        modal:false,
    }

    static contextType = Store

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onCreate = (e) => {
        e.preventDefault()
        this.setState({isCreating : true})
        const [state, dispatch ] = this.context
        const input = this.state
        const newTask = {
            title : input.title,
            priority : input.priority,
            date : input.date,
            description : input.description
        }
        dispatch({
            type : ACTIONS.CREATE_TASK,
            payload : newTask,
            response : this.response
        })
    }

    response = () => {
        this.setState({
            title : "",
            priority : "",
            date : "",
            description : "",
            isCreating : false,
            modal:false,
        })
    }

    toggle = () => {
        this.setState({modal:!this.state.modal})
    }


    render() {
        return (
            <div>
                <Presentation 
                    {...this.state}
                    isCreating = {this.state.isCreating}
                    onCreate = {this.onCreate}
                    handleChange = {this.handleChange}
                    toggle={this.toggle}
                    unMountBtn={this.unMountBtn}
                />
            </div>
        )
    }
}

export default Container
