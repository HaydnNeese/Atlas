import React from 'react'
import titleLogo from '../images/atlas-black-logo.png';
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import PassCard from '../components/Card';
import AddModal from '../components/AddModal';

const divStyle = {
    paddingTop: '90px',
};

function Home() {
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

export default Home;
