import React from 'react'
import { Card, Image, Icon, Form, Button } from 'semantic-ui-react'

//the card that will be shown after the security question is answered correctly
export const PassCard = props => (
  <Card centered>
    <Image src= {props.image} max-width="250px" max-height="250px"/>
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>
        <span className='Gmail card' >{props.note}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
)

//the card that will be shown on load based on the number of notes are saved to the user
export const LockedCard = props => (
  <Card centered>
    <Image src= {props.image} />
    <Card.Content header={props.title} />
    <Card.Content  description="Click the lock to answer a question and unlock this cards information" />
    <button className="fas fa-lock lock-icon" onClick={props.handleLockButtonClick}></button>
    <Card.Content extra>
      <Icon name='clipboard' />
      {props.notes} Notes
    </Card.Content>
  </Card>
)

export const SecurityCard = props => (
  <Card centered>
    <Image src= {props.image} />
    <Card.Content header={props.title} />
    <Card.Content>
      <Form>
        <Form.Input onChange = {props.handleAnswerInput} label={props.question} placeholder='Answer goes here' />
        <Button onClick={props.handleAnswerSubmit}>Submit</Button>
      </Form>
    </Card.Content>
    <Card.Content extra>
      <Icon name='question' />
      {props.attempts} more tries
  </Card.Content>
  </Card>
)


// display the card with the title showing but not the note, in place of the note show a lock
// make the lock clickable and when you click on it reveal a 
