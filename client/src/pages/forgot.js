import React, { Component } from "react";
import titleLogo from "../images/atlas-black-logo.png";
import swal from "sweetalert";
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
import axios from "axios";

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

        const loginData = { email: this.state.email};
        console.log("THIS IS THE LOGIN DATA",loginData);
        
        axios.post('/api/forgot', loginData)
             .then(response => {
                console.log('THIS IS MY RESPONSE: ', response);
                let backEndRes = response.data;
                console.log("Back End Response", backEndRes);

                if(backEndRes === null) {
                    swal("No user found", "", "warning");
               
                }

            })
            .catch(err => {
                console.log(err);
            })

            swal(`Email sent to ${this.state.email}`, "", "success");
            window.location.href = "/";
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
                                    Reset Password
                                </Button>
                            </Form>
                        </Segment>
                        <Message>
                            Not registered yet? <a href="/signup">Sign Up</a>
                        </Message>
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

export default Forgot;