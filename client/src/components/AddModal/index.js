import React from 'react'
import './style.css';
import { Button, Header, Form, Modal } from 'semantic-ui-react'

const AddModal = () => (
    <Modal trigger={<Button content='Add New' icon='plus' color="blue" labelPosition='left' />}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Header>Add a new note</Header>
                <Form>
                    <Form.Field required>
                        <label>Title of Note</label>
                        <Form.Input required
                            fluid
                            placeholder="Secret Note/Password Hints..."
                            type="text"
                        />
                    </Form.Field>
                    <Form.TextArea required
                        label='Note Content'
                        placeholder='Keep your secrets here...' />
                    <Modal.Actions>
                        <Button.Group id="modalBtn" floated='right'>
                            <Button negative>Cancel</Button>
                            <Button.Or />
                            <Button color="blue" type="submit">Add</Button>
                        </Button.Group>
                    </Modal.Actions>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default AddModal
