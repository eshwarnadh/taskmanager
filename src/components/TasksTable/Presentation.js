import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import TasksTable from '../TasksTable'
import { Store } from  '../../contexts/data'
import UpdateTask from '../UpdateTask'
import DeleteTask from '../DeleteTask'
function Presentation(props) {
    const [state] = useContext(Store)
    const { tasks } = props
    return (
        <div>
            <Table hover>
            
            <thead>
                <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task => {
                       return( <tr>
                            <td>{task.title} </td>
                            <td>{task.priority} </td>
                            <td>{task.date.toString()} </td>
                            <td>{task.description} </td>
                            <td className="d-flex justify-content-around" ><UpdateTask id={task.id}  />{' '} <DeleteTask id={task.id} /></td>
                        </tr>)
                    })
                }
                
            </tbody>
            
            </Table>
            {
                !tasks.length ? <p className="text-center p-3 shadow border rounded w-75 ml-auto mr-auto" >No tasks to display create new one</p> : null
            }
        
        </div>
    )
}

export default Presentation
