import React from 'react'
import './style.css';
import { Button, Header, Form, Modal } from 'semantic-ui-react'

const AddModal = () => (
    <Modal trigger={<Button content='Add New' icon='plus' color="blue" labelPosition='left' />}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Header>Add a new login card</Header>
                <Form>
                    <Form.Field required>
                        <label>Website/App</label>
                        <Form.Input required
                            fluid
                            icon="globe"
                            iconPosition="left"
                            placeholder="Gmail, Instagram, Steam..."
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Account Username</label>
                        <Form.Input required
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="name@email.com/username10..."
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Account Password</label>
                        <Form.Input required
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                    </Form.Field>
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
