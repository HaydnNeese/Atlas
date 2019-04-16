import React from 'react'
import { Card, Image } from 'semantic-ui-react'


const PassCard = () => (
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

export default PassCard;