import React from 'react';
import logo from '../../images/atlas-logo-only.png'
import {
    Segment,
    Container,
    Grid,
    Image,
    Button,
    Icon,
    Label,
    List
} from 'semantic-ui-react';
import './style.css';

const Footer = () => (
  <Segment id="footer" inverted>
      <Container>
        <Grid stackable textAlign='center'>
            <Grid.Row>
                <Grid.Column>
                    <Image
                        centered
                        size="mini"
                        src={logo}
                    />
                    <p>© 2019 Copyright: <a href="https://github.com/HaydnNeese/Project-3">Dream Team</a></p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row stackable columns={4}>
                <Grid.Column>
                    <Button as='div' labelPosition='right'>
                        <Button href="https://github.com/HaydnNeese/Project-3" color='green'>
                            <Icon name='github' />
                        </Button>
                        <Label as='a' href="https://github.com/HaydnNeese/Project-3" basic color='green' pointing='left'>
                            Code
                        </Label>
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <List divided inverted relaxed>
                        <List.Item href="https://github.com/mangodyl">
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>Dylan Bonds</List.Header>
                                <List.Description>Front-End and Logic</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item href="https://github.com/HaydnNeese">
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>Haydn Neese</List.Header>
                                <List.Description>More dead weight tbh</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <List divided inverted relaxed>
                        <List.Item href="https://github.com/djwasing">
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>Don Wasinger</List.Header>
                                <List.Description>Dead weight tbh</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item href="https://github.com/jstone074">
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>Jimmy Stone</List.Header>
                                <List.Description>Also dead weight tbh</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <Button as='div' labelPosition='right'>
                        <Button href="https://reactjs.org/" color='blue'>
                            <Icon name='react' />
                        </Button>
                        <Label href="https://reactjs.org/" as='a' basic color='blue' pointing='left'>
                            Power
                        </Label>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </Container>
  </Segment>
);

export default Footer;