import React, { Component } from 'react';
import titleLogo from '../images/atlas-black-logo.png';
import Steps from '../components/Steps';
import FormErrors from './formErrors';
import axios from "axios";
import API from "../utils/api";
import swal from "sweetalert";
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
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Axios from 'axios';

const divStyle = {
    paddingTop: '90px',
};

class Signup extends Component {
    state = {

        render: false,
        user: false,
        password: "",
        confirmPassword: "",
        formErrors: { password: '' },
        passwordValid: false,
        confirmPasswordValid: false,
        formValid: false
    }


    async componentWillMount() {
        
     await this.validateUser();
    //   console.log("THIS IS MY RESPOSNE FROM VALIDATE USER",this.state.user);

    }

    validateUser(){
        let token = this.props.match.params.token;
        // console.log("I AM HERE",token);

        axios.get('/api/reset/' + token)
        .then(response =>{
            let backEndRes = response.data;
            // console.log("Back End Response", backEndRes);
            

            if (backEndRes) {
                // console.log("I AM IN MY IF STATEMENT>>>>>",backEndRes)
                this.setState({ user: true });
               
            }             

        })

    }

    validateField(name, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;

        switch (name) {

            case 'password':
                passwordValid = value.length >= 6 && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/);
                fieldValidationErrors.password = passwordValid ? '' : ' must be at least 8 characters and contain 1 capital, 1 lowercase, a number';
                break;

            case 'confirmPassword':
                confirmPasswordValid = this.state.confirmPassword ===   this.state.password;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'must match';

                break;

            default:
                break;
        }
        this.setState({
            passwordValid: passwordValid,
            confirmPasswordValid: confirmPasswordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ 
            
            formValid: this.state.passwordValid && this.state.confirmPasswordValid 
            

        
        });
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let token = this.props.match.params.token;
       
    try {
        const response = await fetch('/api/passwordreset/'+token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                password: this.state.password,
            }),
        });
        var body1 = await response.json();
        this.setState({ responseToPost: body1 });
        // window.location.href = "/";
    } catch (err) {
        console.error(err.toString())
    }
    
};


    render() {

        console.log(this.state.user);
            

        // if (this.state.user !== true) {
        //     return (
        //         <Redirect
        //             to={{
        //                 pathname: "/login"
        //                 //can pass more data here
        //             }}
        //         />
        //     );
        // } else {

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
                                Reset Your Password
                        </Header>
                            <Segment>
                                <Form size="large">

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
                                        <label>Confirm Password</label>
                                        <Form.Input required
                                            fluid
                                            icon="key"
                                            iconPosition="left"
                                            placeholder="Password"
                                            type="password"
                                            name="confirmPassword"
                                            onChange={this.handleChange}
                                            value={this.state.confirmPassword}
                                        />
                                    </Form.Field>

                                    {/* This is where our errors will be displayed */}
                                    <Header as="h4" textAlign="center" color="red">
                                        <FormErrors formErrors={this.state.formErrors} />
                                    </Header>

                                    <Button type="submit" color="blue" value="Submit" fluid size="large" onClick={this.handleSubmit} 
                                    disabled={!this.state.formValid}
                                    >
                                        Reset Password
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
    // }

}

export default Signup;