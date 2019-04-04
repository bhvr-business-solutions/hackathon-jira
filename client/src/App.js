import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getData } from './actions/Application';
import './App.css';

import Dashboard from './Dashboard';

class AppComponent extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div class="app-container">
        <Dashboard appState={this.props} />
      </div>
    );
  }
}

function mapStateToProps({application}) {
  return {...application};
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(getData())
  };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
