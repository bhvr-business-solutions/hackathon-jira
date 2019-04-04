import React, { Component } from 'react';
import './Dashboard.css';

import Forest from './themes/forest/Forest';
import Avatar from './avatar/Avatar';
import DashboardOverlay from './DashboardOverlay';
// let config = require('./config.json');

class Dashboard extends Component {   
    render() {
        console.log(this.props.application.topUsers)
        return (
            <div class="dashboard-container">
                <Avatar users={this.props.application.topUsers}/>
                <Forest />
                <DashboardOverlay />
            </div>
        );
    }
}

export default Dashboard;