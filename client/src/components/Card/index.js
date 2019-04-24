import React from 'react'
import { Card, Image, Icon, Form, Button } from 'semantic-ui-react'

//the card that will be shown after the security question is answered correctly
export const PassCard = () => (
  <Card centered>
    <Image src='https://via.placeholder.com/250x250' />
    <Card.Content>
      <Card.Header>Gmail</Card.Header>
      <Card.Meta>
        <span className='Gmail card'>Click the icon to access your login details</span>
      </Card.Meta>
    </Card.Content>
  </Card>
)

//the card that will be shown on load based on the number of notes are saved to the user
export const LockedCard = () => (
  <Card centered>
    <Card.Content header='Gmail' />
    <Card.Content className="fas fa-lock" description="Click the lock to answer a question and unlock this cards information" />
    <Card.Content extra>
      <Icon name='clipboard' />
      4 Notes
    </Card.Content>
  </Card>
)

export const SecurityCard = () => (
  <Card centered>
    <Card.Content header='Gmail' />
    <Card.Content>
      <Form>
        <Form.Input label='A super challenging security question for the user' placeholder='Answer goes here' />
        <Button>Submit</Button>
      </Form>
    </Card.Content>
    <Card.Content extra>
      <Icon name='question' />
      3 more tries
  </Card.Content>
  </Card>
)


// display the card with the title showing but not the note, in place of the note show a lock
// make the lock clickable and when you click on it reveal a 
