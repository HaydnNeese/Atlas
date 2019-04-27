import React from 'react'
import './style.css';
import { Button, Header, Form, Modal } from 'semantic-ui-react'


const AddModal = (props) => (
    <Modal 
        trigger={<Button content='Add New' icon='plus' color="blue" onClick={props.handleOpen} labelPosition='left' />}
        open={props.open}
        onClose={props.handleClose}
    >
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
                            name="title"
                            onChange={props.handleChange}
                            value={props.title}
                        />
                    </Form.Field>
                    <Form.TextArea required
                        label='Note Content'
                        placeholder='Keep your secrets here...' 
                        name="note"
                        onChange={props.handleChange}
                        value={props.note}/>
                    <Modal.Actions>
                        <Button.Group id="modalBtn" floated='right'>
                            <Button onClick={props.handleClose} negative>Cancel</Button>
                            <Button.Or />
                            <Button color="blue" type="submit"  onClick={props.handleSubmit}>Add</Button>
                        </Button.Group>
                    </Modal.Actions>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default AddModal
