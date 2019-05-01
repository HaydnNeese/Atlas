import React, { Component } from "react";
import titleLogo from "../images/atlas-black-logo.png";
import {
    Button, 
    Form, 
    Grid, 
    Image, 
    Message, 
    Segment, 
    Container, 
    Header
} from "semantic-ui-react";
import Steps from "../components/Steps";
import Home from "./home";
import axios from "axios";
import {
    BrowserRouter as Router,
    Route, 
    Switch, 
    Redirect
} from "react-router-dom";
import swal from "sweetalert";

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

    handleLogin = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log('this is front end token: ', token);
        localStorage.removeItem("token");
            // const response = await function() { 
            //     fetch('/api/login', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         }, 
            //         body: JSON.stringify({
            //             email: this.state.email,
            //             password: this.state.password
            //         })
            //     });
            // }
            const loginData = { email: this.state.email, password: this.state.password };
            //console.log(loginData);
        axios.post('/api/login', loginData)
            .then(response => {
                console.log('RESPONSE status: ', response.status);
                let backEndRes = response.data;
                console.log("Back End Response", backEndRes);
                console.log('message: ', backEndRes.message);
                if (backEndRes.message === "none") {
                    swal("Sorry!", "That email does not exist. If you don't have an Account, sign up!", "error");
                
                }
                else if (backEndRes.message === "Invalid Password/Username") {
                    swal("Oops!", "Invalid email/password combination", "warning");
                }
                else{
                    console.log("User is logged in")
                    localStorage.setItem("token", JSON.stringify(backEndRes.token));
                    console.log('login.js userId: ', backEndRes.userID);
                    localStorage.setItem("userId", JSON.stringify(backEndRes.userID));
                    this.setState({loggedIn: true});
                    //window.location.reload()
                }  
            })
            .catch(err => {
                console.log(err.status);
            })
    };

    render() {
        if (this.state.loggedIn) {
            return(
                <Redirect
                    to={{
                    pathname: "/home",
                    //can pass more data here
                    }}
                />
            );
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
                        <Header as="h2" textAlign="center">
                            Login for secure information storage.
                        </Header>
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
                    <Steps />
                </Grid>
            </Container>
        )
    }
}

export default Login;