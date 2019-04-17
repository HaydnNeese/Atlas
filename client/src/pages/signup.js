import React, { Component } from 'react';
import titleLogo from '../images/atlas-black-logo.png';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Container,
} from 'semantic-ui-react';

const divStyle = {
    paddingTop: '90px',
};

const options = [
    {key: '1', text: 'Security question example (drop down for info)', value: 'q1'},
    {key: '2', text: 'For now lets have a single question', value: 'q2'},
    {key: '3', text: 'Theyll use the question for all card access', value: 'q3'},
    {key: '4', text: 'So we can get MVP functionality in the 2 weeks', value: 'q4'},
    {key: '5', text: 'Then phone alerts then random security questions', value: 'q5'}
]

class Signup extends Component {
    state = {
        
    };

    render() {
        return (
            <Container style={divStyle}>
                <Grid doubling centered columns={2}>
                    <Grid.Column>
                        <Image
                            centered
                            size="medium"
                            src={titleLogo}
                        />
                        <Header as="h2" textAlign="center">
                            Enter your signup details
                        </Header>
                        <Segment>
                            <Form size="large">
                                <Form.Field required>
                                    <label>Username</label>
                                    <Form.Input required
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Username"
                                        type="text"
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Password</label>
                                    <Form.Input required
                                        fluid
                                        icon="key"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Email</label>
                                    <Form.Input required
                                        fluid
                                        icon="envelope"
                                        iconPosition="left"
                                        placeholder="i-am-sick@frontend.com"
                                        type="email"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone</label>
                                    <Form.Input
                                        fluid
                                        icon="phone"
                                        iconPosition="left"
                                        placeholder="(123) 456-7890"
                                        type="tel"
                                    />
                                </Form.Field>
                                {/* Security questions here */}
                                <Form.Select required fluid label='Security Question' options={options} placeholder='Choose your security question' />
                                <Form.Field required>
                                    <label>Security Answer</label>
                                    <Form.Input required
                                        fluid
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Answer"
                                        type="text"
                                    />
                                </Form.Field>
                                <Button type="submit" color="blue" fluid size="large">
                                    Login
                                </Button>
                            </Form>
                        </Segment>
                        <Message>
                            Already have an account? <a href="/">Login</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Signup;