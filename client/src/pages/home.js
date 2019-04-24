import React, { Component } from "react";
import titleLogo from '../images/atlas-black-logo.png';
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import PassCard from '../components/Card';
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
            <PassCard />
          </GridColumn>
          <GridColumn>
            <PassCard />
          </GridColumn>
          <GridColumn>
            <PassCard />
          </GridColumn>
        </Grid.Row>
      </Grid>
    </Container>
      
    );
}
}

export default Home;
