import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

export default class MyComponent extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <FAB.Group
        open={this.state.open}
        icon={this.state.open ? 'close' : 'add'}
        actions={[
          {
            icon: 'event',
            label: 'Event',
            onPress: () => console.log('Pressed notifications'),
          },
          {
            icon: 'people',
            label: 'People',
            onPress: () => console.log('Pressed email'),
          },
        ]}
        onStateChange={({ open }) => this.setState({ open })}
        onPress={() => {
          if (this.state.open) {
            // do something if the speed dial is open
          }
        }}
      />
    );
  }
}
