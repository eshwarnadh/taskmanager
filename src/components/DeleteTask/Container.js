import React, { Component } from 'react'
import Presentation from './Presentation'
import { ACTIONS } from '../../contexts/types'
import { Store } from '../../contexts/data'
class Container extends Component {
    state = {
        isDeleting : false,
        modal:false
    }
    static contextType = Store
    onDelete = (e) => {
        e.preventDefault()
        const [ state, dispatch ] = this.context
        this.setState({isDeleting:true})
        dispatch({
            type : ACTIONS.DELETE_TASK,
            payload : this.props.id,
            response : this.response
        })
    }

    response = () => {
        this.setState({isDeleting:false})
        this.setState({modal:false})
    }
    toggle = () => {
        this.setState({modal:!this.state.modal})
    }

    render() {
        return (
            <div>
                <Presentation
                    {...this.state}
                    onDelete={this.onDelete}
                    isDeleting={this.state.isDeleting}
                    toggle={this.toggle}
                />
            </div>
        )
    }
}

export default Container
