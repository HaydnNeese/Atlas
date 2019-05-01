import React, { Component } from 'react';
import titleLogo from '../images/atlas-black-logo.png';
import Steps from '../components/Steps';
import FormErrors from './formErrors';
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

class Signup extends Component {
    state = {
        username: "",
        password: "",
        phone: "",
        email: "",
        pin: "",
        formErrors: {username: '', password: '', phone: '', email: '', pin: ''},
        usernameValid: false,
        passwordValid: false,
        phoneValid: false,
        emailValid: false,
        pinValid: false,
        formValid: false
    }

    validateField(name, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let phoneValid = this.state.phoneValid;
        let pinValid = this.state.pinValid;
      
        switch(name) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6 && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/);
            fieldValidationErrors.password = passwordValid ? '': ' must contain 1 capital, 1 lowercase and a number';
            break;
          case 'username':
            usernameValid = value.length >= 4;
            fieldValidationErrors.username = usernameValid ? '': ' is too short';
            break;
          case 'phone':
            phoneValid = value.match(/\d/g).length===10;
            fieldValidationErrors.phone = phoneValid ? '': ' is invalid. Phone numbers should be entered with only digits.';
            break;
          case 'pin':
            pinValid = value.length >= 6;
            fieldValidationErrors.pin = pinValid ? '': ' is too short. Pin must consist of at least 6 digits.';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        usernameValid: usernameValid, 
                        phoneValid: phoneValid,
                        pinValid: pinValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid && this.state.phoneValid && this.state.pinValid});
      }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
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
            window.location.href = "/";
        } catch (err) {
            console.error(err.toString())
        }
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
                            Signup for secure information storage.
                        </Header>
                        <Segment>
                            <Form size="large">
                                {/* This is where our errors will be displayed */}
                                <FormErrors formErrors={this.state.formErrors} />
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
                                <Button type="submit" color="blue" value="Submit" fluid size="large" onClick={this.handleSubmit} disabled={!this.state.formValid}>
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