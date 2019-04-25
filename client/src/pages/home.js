import React, { Component } from "react";
import titleLogo from '../images/atlas-black-logo.png';
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import { PassCard, LockedCard, SecurityCard } from '../components/Card';
// we need to make a ternary expression or something like that that will help choose which of these will render
// you can just pass in the different card names and to see what they look like
import AddModal from '../components/AddModal';
import API from "../utils/api"

const divStyle = {
  paddingTop: '90px',
};

//dummy information
const cardArray = [
  {
    id: 1,
    title: "Gmail",
    note: "Password is superfly55 and security question answer is Ramen Bowls"
  },
  {
    id: 2,
    title: "Facebook",
    note: "Password is superFly_65 and email is megalodon_007@msn.com"
  }
]

const securityArray = [
  {
    question: "2 + 2 = 4, true or false?",
    answer: "true"
  }
]

class Home extends Component {

  state = {
    title: "",
    note: "",
    modal: [],
    attempts: 3,
    isCorrect: false,
    locked: true,
    answer: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    const id = localStorage.getItem("userId").replace(/"/g, "");

    console.log('this is id in home.js: ', id);
    this.loadModals(id);
  }

  loadModals = (id) => {
    API.getModal(id)
      .then(res => this.setState({ modal: res.data }))
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

  handleLockButtonClick = () => {
    this.setState({
      locked: false
    })
  }

  handleAnswerInput = event => {
    this.setState({ answer: event.target.value });
  }

  handleAnswerSubmit = event => {
    event.preventDefault();
    console.log(securityArray[0].answer)
    console.log(this.state.answer);
    if (this.state.answer === securityArray[0].answer) {
      console.log("if-statement");
      this.setState({
        isCorrect: true
      })
    }
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
          {this.state.locked ? (
            <Grid.Row stackable columns={3}>
              <GridColumn>
                <LockedCard
                  handleLockButtonClick = {this.handleLockButtonClick}
                />
              </GridColumn>
            </Grid.Row>
          ) : (
              this.state.isCorrect ? (
                <Grid.Row stackable columns={3}>
                {cardArray.map((card, i) => {
                   return (
                   <GridColumn>
                      <PassCard 
                      title = {card.title}
                      note = {card.note}
                      />
                  </GridColumn>
                  )
                  })}
                </Grid.Row>
              ) : (
                  <Grid.Row stackable columns={3}>
                    <GridColumn>
                      <SecurityCard
                        handleAnswerInput = {this.handleAnswerInput}
                        name="answer"
                        value={this.state.answer}
                        handleAnswerSubmit={this.handleAnswerSubmit}
                        question={securityArray[0].question}
                      />
                    </GridColumn>
                  </Grid.Row>
                )
            )}
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
