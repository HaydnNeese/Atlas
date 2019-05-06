import React from 'react';
import swal from 'sweetalert';
import Fade from 'react-reveal/Fade';
import Logo from '../../images/atlas-logo-only.png';
import AddSecretEx from '../../images/add-secret-ex.gif';
import ViewSecretEx from '../../images/view-secret-ex.gif';
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

const Swal = () => {
    swal({
        title: "Adding new secrets",
        text: "Hit the 'Add New' button on the home screen and input your secrets in the given fields.",
        icon: AddSecretEx,
      })
      .then((value) => {
        switch (value) {
          case true:
            swal({
                title: "Checking your secrets",
                text: "Click the lock button on the card and input the PIN you chose when signing up.",
                icon: ViewSecretEx,
              });
            break;
    
          default:
            break;
        }
      });
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
                    <Fade top>
                        <h1>Care about your security?</h1>
                        <h2>So do we.</h2>
                    </Fade>
                    <Fade bottom>
                        <h3><Icon name='lock'/>Passcode protected, worry-free info storage with Atlas</h3>
                    </Fade>
                    <br/>
                    <a href='#main-logo'><Icon name='angle double down' size='large' /></a>
                </Grid.Column>
                <Grid.Column textAlign='center' width={4}>
                    <div>
                        <a href='#main-logo'><Button style={btnStyle} color='green'>Get Started</Button></a>
                    </div>
                    <div>
                        <Button style={btnStyle} onClick={Swal} color='pink'>Learn How</Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
)

export default Banner;