import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    return (
      <div className="app-container">
      <Dashboard application={this.props.application}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(getData())
  };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
