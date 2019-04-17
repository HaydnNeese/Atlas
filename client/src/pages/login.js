import React, { Component } from 'react';
import titleLogo from '../images/atlas-black-logo.png';
import {
    Button,
    Form,
    Grid,
    Image,
    Message,
    Segment,
    Container,
} from 'semantic-ui-react';

const divStyle = {
    paddingTop: '90px',
};

class Login extends Component {
    state = {
        stuff: ""
    }    


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
                        <Segment>
                            <Form size="large">
                                <Form.Input required
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email address"
                                    type="email"
                                />
                                <Form.Input required
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