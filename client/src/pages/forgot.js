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

const divStyle = {
    paddingTop: '90px',
};

class Forgot extends Component {
    state = {
        email: ""
    }    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleReset = (e) => {
        e.preventDefault();
        // const token = localStorage.getItem("token");
        // console.log('this is front end token: ', token);
        // localStorage.removeItem("token");

        const loginData = { email: this.state.email};
        console.log("THIS IS THE LOGIN DATA",loginData);
        
        axios.post('/api/forgot', loginData)
             .then(response => {
                console.log('THIS IS MY RESPONSE: ', response);
                let backEndRes = response.data;
                console.log("Back End Response", backEndRes);
                
                // if (backEndRes.message === "none") {
                //     alert("That email does not exist. If you don't have an Account, sign up!");
                
                // }
                // else if (backEndRes.message === "Invalid Password/Username") {
                //     alert("Invalid email/password");
                // }
                // else{
                //     console.log("User is logged in")
                //     localStorage.setItem("token", JSON.stringify(backEndRes.token));
                //     console.log('login.js userId: ', backEndRes.userID);
                //     localStorage.setItem("userId", JSON.stringify(backEndRes.userID));
                //     this.setState({loggedIn: true});
                //     window.location.reload()
                // }  
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        // if (this.state.loggedIn) {
        //     return(
        //         <Redirect
        //             to={{
        //             pathname: "/home",
        //             //can pass more data here
        //             }}
        //         />
        //     );
        // }
        
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
                            Forgot Password? Enter in email address below:
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
                                <Button type="submit" color="blue" fluid size="large" onClick={this.handleReset}>
                                    Rest Password
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

export default Forgot;