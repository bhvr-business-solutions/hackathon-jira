import React, { Component } from 'react';
import './Dashboard.css';

import Forest from './themes/forest/Forest';
// let config = require('./config.json');

class Dashboard extends Component {
    render() {
        return (
            <div class="dashboard-container">
                <Forest />
                
            </div>
        );
    }
}

export default Dashboard;