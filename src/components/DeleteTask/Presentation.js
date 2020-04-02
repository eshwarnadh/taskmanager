import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

const ModalExample = (props) => {
  const {
    onDelete,
    isDeleting,
    toggle,
    modal
  } = props;



  return (
    <div>
      <span className="c-pointer" onClick={toggle}>🗑</span>
      <Modal isOpen={modal} toggle={toggle} backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
        <ModalBody>
            You want to delete this task.
        </ModalBody>
        <ModalFooter>
            <Form onSubmit={onDelete} >
                {
                    !isDeleting ? <Button type="submit" color="primary" >Yes</Button> : <Button type="button" color="primary"  disabled >Deleting..</Button>
                }
                {' '}
                <Button color="secondary" onClick={toggle}>No</Button>
            </Form>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;