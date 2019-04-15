import React from 'react'
import { Grid, GridColumn, Header, Button } from 'semantic-ui-react'
import PassCard from '../components/Card';

function Home() {
    return (
      <Grid textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">
              Atlas
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button content='Add New' icon='plus' color="blue" labelPosition='left' />
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
    );
}

export default Home;
