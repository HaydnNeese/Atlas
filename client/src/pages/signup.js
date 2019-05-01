import React, { Component } from 'react';
import titleLogo from '../images/atlas-black-logo.png';
import Steps from '../components/Steps';
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

// const options = [
//     { key: '1', text: 'Security question example (drop down for info)', value: 'q1' },
//     { key: '2', text: 'For now lets have a single question', value: 'q2' },
//     { key: '3', text: 'Theyll use the question for all card access', value: 'q3' },
//     { key: '4', text: 'So we can get MVP functionality in the 2 weeks', value: 'q4' },
//     { key: '5', text: 'Then phone alerts then random security questions', value: 'q5' }
// ]

class Signup extends Component {
    state = {
        username: "",
        password: "",
        phone: "",
        email: "",
        pin: ""
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/world', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    phone: this.state.phone,
                    email: this.state.email,
                    pin: this.state.pin,
                }),
            });
            var body1 = await response.json();
            console.log("printed from signupJS", body1);
            this.setState({ responseToPost: body1 });
        } catch (err) {
            console.error(err.toString())
        }
    };

    // onOptionChange = event => {
    //     this.setState({
    //         question: event.target.textContent
    //     })
    //     //need this to write to the database
    // }

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
                            Signup for secure information storage.
                        </Header>
                        <Segment>
                            <Form size="large">
                                <Form.Field required>
                                    <label>Username</label>
                                    <Form.Input required
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.state.username}
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
                                        name="password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
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
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
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
                                        name="phone"
                                        onChange={this.handleChange}
                                        value={this.state.phone}
                                    />
                                </Form.Field>
                                {/* Security questions here */}
                                {/* <Form.Select required fluid 
                                label='Security Question' 
                                options={options} 
                                onChange={this.onOptionChange} 
                                placeholder='Choose your security question' 
                                /> */}
                                <Form.Field required>
                                    <label>Set Pin Number</label>
                                    <Form.Input required
                                        fluid
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Pin Number"
                                        type="number"
                                        name="pin"
                                        onChange={this.handleChange}
                                        value={this.state.pin}
                                    />
                                </Form.Field>
                                <Button type="submit" color="blue" value="Submit" fluid size="large" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Segment>
                        <Message>
                            Already have an account? <a href="/">Login</a>
                        </Message>
                    </Grid.Column>
                    <Steps />
                </Grid>
            </Container>
        )
    }
}

export default Signup;