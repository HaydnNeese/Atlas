import React, { Component } from "react";
import titleLogo from '../images/atlas-black-logo.png';
<<<<<<< HEAD
import { 
  Grid, 
  GridColumn, 
  Image, 
  Container,
 } from 'semantic-ui-react'
import PassCard from '../components/Card';
=======
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import { PassCard, LockedCard, SecurityCard } from '../components/Card';
// we need to make a ternary expression or something like that that will help choose which of these will render
// you can just pass in the different card names and to see what they look like
>>>>>>> 6bc85d5c903974a666799a6a10a0a498edde5540
import AddModal from '../components/AddModal';
import API from "../utils/api"

const divStyle = {
    paddingTop: '90px',
};

class Home extends Component {

  state = {
    title: "",
    note: "",
    modal: []
    
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
}

  componentDidMount() {
    const id = localStorage.getItem("userId").replace(/"/g,"");

    console.log('this is id in home.js: ', id);
    this.loadModals(id);
  }

  loadModals = (id) => {
    API.getModal(id)
      .then(res => this.setState({modal:res.data}))
      .catch(err => console.log(err));
  }

  handleSubmit = () => {
    API.addModal({
      title: this.state.title,
      note: this.state.note
    }).then(data => {
      console.log('DATA from the backend: ', data);
    })
  }

render() {
    return (
    <Container>
      <Grid stackable style={divStyle} textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Image
              centered
              size="medium"
              src={titleLogo}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AddModal 
              title={this.state.title}
              note={this.state.note}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stackable columns={3}>
          <GridColumn>
            <SecurityCard />
          </GridColumn>
          <GridColumn>
            <SecurityCard />
          </GridColumn>
          <GridColumn>
            <SecurityCard />
          </GridColumn>
        </Grid.Row>
      </Grid>
    </Container>
      
    );
}
}
//we need to have it read the total number of stored notes
//on each note it should show the LockedCard component
//click on the lock to reveal the SecurityCard component
//then have the SecurityCard receive the stored security question and display it to the card
//capture the answer and compare it with the stored answer
//if it is correct then reveal the PassCard and maybe use the success tool that Semantic UI has
//if it is incorrect use the incorrect tool that semantic UI has and have the total number of tries reduce by 1
//after three failed tries have it lock the user out (optional)
export default Home;
