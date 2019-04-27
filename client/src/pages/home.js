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
// const cardArray = [
//   {
//     title: "Gmail account",
//     note: "Password is my favorite food from that trip in california and security question answer is Ramen Bowls",
//     image: "https://assets.hardwarezone.com/img/2016/02/gmail.jpg"
//   },
//   {
//     title: "Facebook account",
//     note: "Password is my ex-wife's dogs name  and email is megalodon_007@msn.com",
//     image: "https://www.sketchappsources.com/resources/source-image/facebook-logo.jpg"
//   },
//   {
//     title: "NFL.com Fantasy Football",
//     note: "Password is Mahomes_69 and email is raiders_suck@chiefs.com",
//     image: "https://hd-report.com/wp-content/uploads/2018/09/nfl-logo-gradient-1980px.jpg"
//   }
// ]

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
    answer: '',
    noteTotal: 0,
    modalOpen: false
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
      .then(res  => { 
        
        console.log("THIS IS THE FRONT END RESPONSE", res.data.modals);
        this.setState({ modal: res.data.modals });
        console.log(this.state.modal);
        
     })
      .catch(err => console.log(err));
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ modalOpen: false })
    console.log("modal closed")
  }

  handleSubmit = () => {
    const id = localStorage.getItem("userId").replace(/"/g, "");

    // API.addModal( id,
    // {
    //   title: this.state.title,
    //   note: this.state.note
    // }).then(data => {
    //   console.log('DATA from the backend: ', data);
    //   this.handleClose()
    // })
    
    for (var i = 0 ; i < this.state.modal.length; i++){

    if(this.state.modal[i].title === this.state.title ) {

      alert("Note with this title already exists. Please create a unique Title")
      return;    
  
    } else {
      API.addModal( id,
        {
          title: this.state.title,
          note: this.state.note
        }).then(data => {
          console.log('DATA from the backend: ', data);
          this.handleClose()
        })
        
    }
    
  }
  window.location.reload();
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
    }else {
      this.setState({
        attempts: this.state.attempts - 1
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
                open={this.state.modalOpen}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleOpen={this.handleOpen}
              />
            </Grid.Column>
          </Grid.Row>
          {this.state.locked ? (
            <Grid.Row stackable columns={3}>
            {this.state.modal.map((card) => {
              return (
              <GridColumn>
                <LockedCard
                  handleLockButtonClick={this.handleLockButtonClick}
                  title = {card.title}
                  notes = {this.state.noteTotal}
                />
              </GridColumn>
              )
            })}
            </Grid.Row>
          ) : (
              this.state.isCorrect ? (
                <Grid.Row stackable columns={3}>
                  {this.state.modal.map((card) => {
                    return (
                      <GridColumn>
                        <PassCard
                          title={card.title}
                          note={card.note}
                        />
                      </GridColumn>
                    )
                  })}
                </Grid.Row>
              ) : (
                  <Grid.Row stackable columns={3}>
                    {this.state.modal.map((card) => {
                      return (
                        <GridColumn>
                          <SecurityCard
                            handleAnswerInput={this.handleAnswerInput}
                            title = {card.title}
                            name="answer"
                            value={this.state.answer}
                            handleAnswerSubmit={this.handleAnswerSubmit}
                            question={securityArray[0].question}
                            attempts = {this.state.attempts}
                          />
                        </GridColumn>
                      )
                    })}
                  </Grid.Row>
                  )
              )}
        </Grid>
      </Container>
    
        );
      }
    }
    //we need to have it read the total number of stored cards
    //on each card it should show the LockedCard component
    //click on the lock to reveal the SecurityCard component
    //then have the SecurityCard receive the stored security question and display it to the card
    //capture the answer and compare it with the stored answer
    //if it is correct then reveal the PassCard and maybe use the success tool that Semantic UI has
    //if it is incorrect use the incorrect tool that semantic UI has and have the total number of tries reduce by 1
    //after three failed tries have it lock the user out (optional)
    export default Home;