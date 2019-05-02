import React from 'react'
import { Card, Image, Icon, Form, Button } from 'semantic-ui-react'
import Style from "./style.css"
//the card that will be shown after the security question is answered correctly
export const PassCard = props => (
  <Card centered>
    <Image src={props.image} max-width="250px" max-height="250px" />
    <Card.Content>
      <Card.Header className="card-header">{props.title}</Card.Header>
      <Card.Meta className="card-center">
        <span className='Gmail card' >{props.note}</span>
      </Card.Meta>
    </Card.Content >
    <Card.Content className="dark" extra>
      <div className="ui buttons">
        <button className="ui button" id="edit-btn">edit</button>
        <div className="or"></div>
        <button className="ui button" id="delete-btn">delete</button>
      </div>
    </Card.Content>
  </Card>
)

//the card that will be shown on load based on the number of notes are saved to the user
export const LockedCard = props => (
  <Card centered>
    <Image className="card-header" src={props.image} />
    <Card.Content header={props.title} />
    <Card.Content className="card-center" description="Click the lock to gain access" />
    <button id="lock-btn" className="ui primary button lock-button" onClick={props.handleLockButtonClick}><i className="fas fa-lock"></i></button>
    <Card.Content className="dark" extra>
      <Icon name='clipboard' />
      {props.notes} Notes
    </Card.Content>
  </Card>
)

//need this to become a pin input
export const SecurityCard = props => (
  <Card centered>
    <Image src={props.image} />
    <Card.Content className="card-header" header={props.title} />
    <Card.Content className="card-center">
      <Form>
        <Form.Input id="secure-input" onChange={props.handleAnswerInput} label={props.question} placeholder='PIN' />
        <Button id="submit-btn" onClick={props.handleAnswerSubmit}>Submit</Button>
      </Form>
    </Card.Content>
    <Card.Content className="dark" extra>
      <Icon name='question' />
      {props.attempts} more tries
  </Card.Content>
  </Card>
)


// display the card with the title showing but not the note, in place of the note show a lock
// make the lock clickable and when you click on it reveal a 
