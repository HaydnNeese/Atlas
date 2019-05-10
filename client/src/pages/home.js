import React, { Component } from "react";
import titleLogo from '../images/atlas-black-logo.png';
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import { PassCard, LockedCard, SecurityCard, ExampleCard } from '../components/Card';
// we need to make a ternary expression or something like that that will help choose which of these will render
// you can just pass in the different card names and to see what they look like
import AddModal from '../components/AddModal';
import Banner from '../components/Banner';
import API from "../utils/api";
import swal from "sweetalert";
import Axios from "axios";
//import sendEmail from '../../../send-email';

const divStyle = {
  paddingTop: '30px',
  // background: 'linear-gradient(305deg, #B2EC5D, #DDFC74, #FFF697, #B2FFD6, #9FD8CB, #9FD8CB)'
};

let pinArray = [];
let placeholderArray = [];

class Home extends Component {

  state = {
    title: "",
    note: "",
    modal: [],
    isCorrect: false,
    locked: true,
    answer: '',
    modalOpen: false,
    clicked: false,
    selectedCardId: "",
    userPin: "",
    email: "",
    placeholder: "",
    value: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    const id = localStorage.getItem("userId").replace(/"/g, "");
    const userPin = localStorage.getItem("pin").replace(/"/g, "");
    const email = localStorage.getItem("email").replace(/"/g, "");
    this.setState({
      userPin,
      email
    })
    console.log(this.state.userPin);
    this.loadModals(id);
  }

  loadModals = (id) => {
    API.getModal(id)
      .then(res => {
        console.log('MODAL DEFINITION: ',res.data.modals);
        this.setState({ modal: res.data.modals });
      })
      .catch(err => console.log(err));
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  handleSubmit = () => {
    const id = localStorage.getItem("userId").replace(/"/g, "");

          API.addModal( id,
            {
              title: this.state.title,
              note: this.state.note
            }).then(data => {
              this.handleClose()
              this.loadModals(id)
              this.setState({
                title: "",
                note: ""
              })
            })
}

  handleLockButtonClick = (id) => {
    this.setState({
      locked: false,
      selectedCardId: id
    })
  }

  resetPinArrays = () => {
    pinArray = [];
    placeholderArray = [];
    console.log({ pinArray });
    this.setState({
      placeholder: ""
    })
  }
  createPlaceHolder = (string) => {
    this.setState({
      placeholder: string
    })
    console.log("Placeholder state: " + this.state.placeholder)
  }

  handleAnswerInput = event => {
    //add value of click to the pinArray
    pinArray.push(event.target.value);
    //in a separate array put a * each time a button is clicked
    placeholderArray.push('*');
    //convert this array to a string
    let placeholderString = placeholderArray.join('');
    //use the function to send this string to update the state of placeholderArray
    this.createPlaceHolder(placeholderString);
  }

  handleAnswerSubmit = event => {
    event.preventDefault();
    let pinString = pinArray.join('');
    console.log(pinString)
    this.setState({ answer: pinString }, () => {
      if (this.state.answer === this.state.userPin) {
        swal("User Verified", "", "success");
        let userEmail = this.state.email;
        //console.log('front end user email', userEmail);
        Axios.post('/api/email', userEmail)
          .then(response => {
            console.log('email response: ', response);
          })
          .catch(err => {
            console.log('email error: ', err);
          })
        this.setState({
          isCorrect: true
        });
        pinArray = [];
        placeholderArray = [];
        this.setState({
          placeholder: ""
        })
      } else if (this.state.answer === "") {
        swal("Error", "Enter your PIN to gain access", "warning");
        pinArray = [];
        placeholderArray = [];
        this.setState({
          placeholder: ""
        })
      } else {
        swal("Unable to Verify User", "", "error");
        pinArray = [];
        placeholderArray = [];
        this.setState({
          placeholder: ""
        })
      }
    });
  }

  // ---------------- delete ----------------
  handleDelete = modalId => {
    const id = localStorage.getItem("userId").replace(/"/g, "");
    swal("Deleting is permanent", "Do you wish to continue?", "warning", {
      buttons: {
        cancel: true,
        confirm: "Confirm"
      }
    })
      .then((cancel) => {
        if (cancel) {
          API.delete(modalId)
            .then(res => { this.loadModals(id) })
            .catch(err => console.log(err));
        }
      })
  }
//working on mapping the numpad
  // handleEventNumber = (event) => {
  //   let key = event.keyCode;
  //   switch (key) {
  //     case 49 || 97:
  //       this.setState({
  //         value: 1
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 50 || 98:
  //       this.setState({
  //         value: 2
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 51 || 99:
  //       this.setState({
  //         value: 3
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 52 || 100:
  //       this.setState({
  //         value: 4
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 53 || 101:
  //       this.setState({
  //         value: 5
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 54 || 102:
  //       this.setState({
  //         value: 6
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 55 || 103:
  //       this.setState({
  //         value: 7
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 56 || 104:
  //       this.setState({
  //         value: 8
  //       })
  //       console.log(`clicked`)
  //       break;
  //     case 57 || 105:
  //       this.setState({
  //         value: 9
  //       })
  //       console.log(`clicked`)
  //       break;
  //     default: 
  //       this.setState({
  //         value: undefined
  //       })
  //       console.log(`clicked`)
  //   }   
  //   let number = this.state.value;
  //   pinArray.push(number);
  //   placeholderArray.push('*');
  //   let placeholderString = placeholderArray.join('');
  //   this.createPlaceHolder(placeholderString);
  // }

  render() {
    return (
      <div>
        <Banner />
        <Container>
          <Grid stackable style={divStyle} textAlign='center'>
            <Grid.Row>
              <Grid.Column>
                <Image
                  id="main-logo"
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
                  handleClose={this.handleClose}
                />
              </Grid.Column>
            </Grid.Row>
<<<<<<< Updated upstream
            { this.state.modal.length > 0 ? ( 
=======
            {this.state.modal.length > 0 ? (
>>>>>>> Stashed changes
              this.state.locked ? (
                  <Grid.Row stackable columns={3}>
                    {this.state.modal.map((card) => {
                      return (
                        <GridColumn key={card._id}>
                          <LockedCard
                            handleLockButtonClick={() => { this.handleLockButtonClick(card._id) }}
                            title={card.title}
                            notes={this.state.noteTotal}
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
                            <GridColumn key={card._id}>
                              {
                                this.state.selectedCardId === card._id &&
                                <PassCard
                                  title={card.title}
                                  note={card.note}
                                  handleDelete={() => { this.handleDelete(card._id) }}
                                />
                              }
                              {
                                this.state.selectedCardId === card._id ||
                                <LockedCard
                                  handleLockButtonClick={() => { this.handleLockButtonClick(card._id) }}
                                  title={card.title}
                                  notes={this.state.noteTotal}
                                />
                              }
                            </GridColumn>
                          )
                        })}
                      </Grid.Row>
                    ) : (
                        <Grid.Row stackable columns={3}>
                          {this.state.modal.map((card) => {
                            return (
                              <GridColumn key={card._id}>
                                {
                                  this.state.selectedCardId === card._id &&
                                  <SecurityCard
                                    handleAnswerInput={this.handleAnswerInput}
                                    title={card.title}
                                    name="answer"
                                    value={card.value}
                                    handleAnswerSubmit={this.handleAnswerSubmit}
                                    attempts={this.state.attempts}
                                    placeholder={this.state.placeholder}
                                    handlePinReset={this.resetPinArrays}
<<<<<<< Updated upstream
                                    numPad={this.handleEventNumber}
=======
>>>>>>> Stashed changes
                                  />
                                }
                                {
                                  this.state.selectedCardId === card._id ||
                                  <LockedCard
                                    handleLockButtonClick={() => { this.handleLockButtonClick(card._id) }}
                                    title={card.title}
                                    notes={this.state.noteTotal}
                                  />
                                }
                              </GridColumn>
                            )
                          })}
                        </Grid.Row>
                      )
                  )
            ) : (
              <ExampleCard 
              title="Example"
              note="Create your first card!"
              />
            )}
          </Grid>
        </Container>
      </div>
    );
  }
}
export default Home;