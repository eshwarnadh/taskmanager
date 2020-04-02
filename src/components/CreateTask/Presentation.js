
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';

const ModalExample = (props) => {
  const {
    onCreate,
    handleChange,
    isCreating,
    toggle,
    created,
    modal
  } = props;



  return (
    <div>
      <Button color="danger" onClick={toggle}>Create task</Button>
      <Modal isOpen={modal} toggle={toggle} backdrop="static" keyboard={false} >
        <ModalHeader toggle={toggle}>New task</ModalHeader>
        <ModalBody>
            <Form onSubmit={onCreate} >
            <FormGroup>
                <Label for="taskTitle">Title:</Label>
                <Input type="text" id="taskTitle" name="title"  onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="taskPriority">Priority:</Label>
                <Input type="select" name="priority" id="taskPriority"  onChange={handleChange} required >
                <option value="" >----</option>
                <option value="Urgent" >Urgent</option>
                <option value="High" >High</option>
                <option value="Medium" >Medium</option>
                <option value="Low" >Low</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="taskDate">Date:</Label>
                <Input type="date" id="taskDate" name="date"  onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="taskDescription">Description:</Label>
                <Input type="textarea" name="description" id="taskDescription"  onChange={handleChange} required  />
            </FormGroup>
            {
                !isCreating ? <Button type="submit" color="primary">Create</Button> : <Button type="button" color="primary" disabled>Creating...</Button>
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