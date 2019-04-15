import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';

const Nav = () => (
  <Menu>
    <Container>
      <Menu.Item as="a" header href="/home">
        <Image
          size="small"
          src="https://via.placeholder.com/150x50"
        />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as="a" name="login" href="/">
          Login
        </Menu.Item>

        <Menu.Item as="a" name="sign-up" href="/signup">
          Sign Up
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Nav;