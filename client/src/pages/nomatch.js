import React from "react";
import { Container } from "semantic-ui-react";

const nomatchStyle = {
  marginTop: "90px",
  textAlign: "center"
}

function NoMatch() {
  return (
    <Container style={nomatchStyle} centered>
      <h1>Uh oh, 404 Page Not Found!!!</h1> 
    </Container>
    
  );
}

export default NoMatch;
