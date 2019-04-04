import React, { Component } from 'react';
import './Dashboard.css';

import Forest from './themes/forest/Forest';
import DashboardOverlay from './DashboardOverlay';
// let config = require('./config.json');

class Dashboard extends Component {
    render() {
        return (
            <div class="dashboard-container">
                <Forest />
                <DashboardOverlay />
            </div>
        );
    }
}

export default Dashboard;