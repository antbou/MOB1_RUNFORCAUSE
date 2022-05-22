import React, { Component } from 'react';

import Providers from './src/navigation';


class App extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Providers />
    );
  }
}

export default App;
