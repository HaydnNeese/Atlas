import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const style = {
    border: "none"
}

const stepStyle = {
    border: "1px lightgrey solid",
    marginTop: "20px"
}

const StepExampleGroup = () => (
  <Step.Group style={style}>
    <Step style={stepStyle}>
      <Icon name='edit' />
      <Step.Content>
        <Step.Title>Write Notes</Step.Title>
        <Step.Description>Store your sensitive info securely.</Step.Description>
      </Step.Content>
    </Step>

    <Step style={stepStyle}>
      <Icon name='user secret' />
      <Step.Content>
        <Step.Title>Personal Identification Number</Step.Title>
        <Step.Description>Personalized PIN for layered security.</Step.Description>
      </Step.Content>
    </Step>

    <Step style={stepStyle}>
      <Icon name='unlock' />
      <Step.Content>
        <Step.Title>Access Note Content</Step.Title>
        <Step.Description>View your sensitive info.</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
)

export default StepExampleGroup
