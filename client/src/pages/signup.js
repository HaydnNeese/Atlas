import React, { Component } from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Container,
} from 'semantic-ui-react';

class Signup extends Component {
    state = {
        stuff: "",
    };

    render() {
        return (
            <Container>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Header as="h1" textAlign="center">
                            Atlas
                        </Header>
                        <Header as="h2" textAlign="center">
                            Enter your signup details
                        </Header>
                        <Segment>
                            <Form size="large">
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    type="username"
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                />
                                <Form.Input
                                    fluid
                                    icon="envelope"
                                    iconPosition="left"
                                    placeholder="i-am-sick@frontend.com"
                                    type="email"
                                />
                                <Form.Input
                                    fluid
                                    icon="phone"
                                    iconPosition="left"
                                    placeholder="(123) 456-7890"
                                    type="phone"
                                />

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