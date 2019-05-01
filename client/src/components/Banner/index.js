import React from 'react';
import Logo from '../../images/atlas-logo-only.png';
import { Segment, Button, Grid, Image, Icon } from 'semantic-ui-react';
import './style.css';

const bannerStyle = {
    backgroundColor: "#1B4965",
    color: "#CAE9FF",
    paddingTop: '90px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px'
}

const btnStyle = {
    margin: '20px',
    padding: '20px 30px',
    fontSize: '120%',
    border: '1px black solid'
}

const Banner = () => (
    <Segment style={bannerStyle}>
        <Grid stackable>
            <Grid.Row columns={3}>
                <Grid.Column width={4}>
                    <Image
                        centered
                        size="small"
                        src={Logo}
                    />
                </Grid.Column>
                <Grid.Column textAlign='center' width={8}>
                    <h1>Care about your security?</h1>
                    <h2>So do we.</h2>
                    <h3><Icon name='lock'/>Passcode protected, worry-free info storage with Atlas</h3>
                    <br/>
                    <a href='#main-logo'><Icon name='angle double down' size='large' /></a>
                </Grid.Column>
                <Grid.Column textAlign='center' width={4}>
                    <div>
                        <a href='#main-logo'><Button style={btnStyle} color='green'>Get Started</Button></a>
                    </div>
                    <div>
                        <Button style={btnStyle} color='pink'>Learn How</Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
)

export default Banner;