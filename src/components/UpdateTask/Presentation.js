
import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import { Store } from '../../contexts/data'
const ModalExample = (props) => {
  const {
    onUpdate,
    handleChange,
    isUpdating,
    id,
    toggle,
    modal
  } = props;
  const [state] = useContext(Store)
  console.log(state,id)
  const task = state.tasks.filter(task => task.id === id)[0]
  let {title, priority, date, description} = task
  return (
    <div>
    <span  onClick={toggle} className="c-pointer" >&#9999;</span>
      <Modal isOpen={modal} toggle={toggle} backdrop="static" keyboard={false} >
        <ModalHeader toggle={toggle}><span ></span> </ModalHeader>
        <ModalBody>
            <Form onSubmit={onUpdate} >
            <FormGroup>
                <Label for="taskTitle">Title:</Label>
                <Input type="text" id="taskTitle" name="title" defaultValue={title}  onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="taskPriority">Priority:</Label>
                <Input type="select" name="priority" id="taskPriority" defaultValue={priority}  onChange={handleChange} >
                <option value="" >----</option>
                <option value="Urgent" >Urgent</option>
                <option value="High" >High</option>
                <option value="Medium" >Medium</option>
                <option value="Low" >Low</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="taskDate">Date:</Label>
                <Input type="date" id="taskDate" name="date" defaultValue={date}  onChange={handleChange}  />
            </FormGroup>
            <FormGroup>
                <Label for="taskDescription">Description:</Label>
                <Input type="textarea" name="description" id="taskDescription" defaultValue={description}  onChange={handleChange}  />
            </FormGroup>
            {
                !isUpdating ? <Button type="submit" color="primary">Update</Button> : <Button type="button" color="primary" disabled>Updating...</Button>
            }
            {' '}
            <Button type="button" color="secondary" onClick={toggle}>Cancel</Button>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalExample;