import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getData } from './actions/Application';
import './App.css';

import Dashboard from './Dashboard';

class AppComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    this.props.getData().then(() => {
      this.setState({
        ready: true
      });
    });
  }

  render() {
    if (!this.state.ready) {
      return <div>Loading app...</div>;
    }
    else{
      
      return (
        <div class="app-container">
          <Dashboard application={this.props.application}/>
        </div>
      );
    }
  }
}

function mapStateToProps({application}) {
  return {application};
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(getData())
  };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
