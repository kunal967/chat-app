/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModelState } from '../misc/Costom-hooks';
import { database } from '../misc/Firebase';

const INITIALVALUE = {
  name: '',
  Description: '',
};

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(' Name is Required'),
  Description: StringType().isRequired(' Description is Required'),
});

const CreateChatRoomBtn = () => {
  const { open, close, isOpen } = useModelState();
  const [formValue, setFormValue] = useState(INITIALVALUE);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref('rooms').push(newRoomdata);

      Alert.info(`${formValue.name} has been created`, 4000);
      setIsLoading(false);
      setFormValue(INITIALVALUE);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create New Chat-Room
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat-Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter Chat Room Name...." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="Description"
                placeholder="Enter Room description...."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create New Chat-Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateChatRoomBtn;
