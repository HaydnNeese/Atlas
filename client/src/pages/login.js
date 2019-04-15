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

class Login extends Component {
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
                        <Segment>
                            <Form size="large">
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email address"
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                />

                                <Button type="submit" color="blue" fluid size="large">
                                    Login
                            </Button>
                            </Form>
                        </Segment>
                        <Message>
                            Not registered yet? <a href="/signup">Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Login;