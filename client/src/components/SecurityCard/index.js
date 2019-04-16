import React from 'react'
import { Card, Image, Form } from 'semantic-ui-react'


const PassCard = () => (
    <Card centered>
        <Image src='https://via.placeholder.com/150x250' />
        <Card.Content>
            <Card.Header>Gmail</Card.Header>
            <Card.Meta>
                <Form>
                    <Form.Field required>
                        <label>Security question rendered here as prop</label>
                        <Form.Input required
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Answer"
                            type="security-question"
                        />
                    </Form.Field>
                </Form>
            </Card.Meta>
        </Card.Content>
    </Card>
)

export default PassCard;
