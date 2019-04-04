import React, { Component } from 'react';
import './Dashboard.css';

let config = require('./config.json');

class Dashboard extends Component {
    render() {
        return (
            <div>
                { config.welcomeText }
            </div>
        );
    }
}

export default Dashboard;