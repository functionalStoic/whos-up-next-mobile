import * as React from 'react';
import {
  Appbar,
  Button,
  Paragraph,
  Menu,
  Divider,
  Provider,
} from 'react-native-paper';
import { View } from 'react-native';
import styled from 'styled-components';
import { withRouter } from 'react-router';

class MyComponent extends React.Component {
  state = {
    visible: false,
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Appbar>
        <Appbar.Action
          icon="home"
          onPress={() => {
            this.props.history.push('/');
          }}
        />
        <Appbar.Action
          icon="people"
          onPress={() => {
            this.props.history.push('/people');
          }}
        />
        <Appbar.Action
          icon="event"
          onPress={() => {
            this.props.history.push('/events');
          }}
        />
      </Appbar>
    );
  }
}

export default withRouter(MyComponent);
