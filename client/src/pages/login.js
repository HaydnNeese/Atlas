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
    Accordion,
} from 'semantic-ui-react';
import Home from './home';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
const token = localStorage.token;

//var md5 = require('md5');

const divStyle = {
    paddingTop: '90px',
};

class Login extends Component {
    state = {
        email: "",
        password: "",
        loggedIn: false
    }    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        console.log('you pressed the login btn');

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
                
            });
    
            let backEndRes = await response.json();
            console.log("Back End Response", backEndRes);
            localStorage.setItem("token", backEndRes.token);
            if (backEndRes.message === "none") {
                alert("That email does not exist. If you don't have an Account, sign up!");
            
            }
            else if (backEndRes.message === "Invalid Password/Username") {
                alert("Invalid email/password");
            }
            else{
                console.log("set to redirect HERE+++++++")
                this.setState({loggedIn: true});
            }
            
             
    }

    render() {
        if (this.state.loggedIn) {
            return(
                <Redirect
                    to={{
                    pathname: "/home",
                    //can pass more data here
                    }}
                />
            )
        }
        

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
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    type="email"
                                />
                                <Form.Input required
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />

                                <Button type="submit" color="blue" fluid size="large" onClick={this.handleLogin}>
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