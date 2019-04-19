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

    modal: []
    
  };

  componentDidMount() {
    this.loadModals();
  }

  loadModals = (id) => {
    API.getModal(id)
      .then(res => this.setState({modal:res.data}))
      .catch(err => console.log(err));
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
            <AddModal />
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
