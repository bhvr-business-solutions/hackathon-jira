import React, { Component } from 'react';
import './Dashboard.css';

import Forest from './themes/forest/Forest';
import Avatar from './avatar/Avatar';
import DashboardOverlay from './DashboardOverlay';

class Dashboard extends Component {   
    render() {
        return (
            <div class="dashboard-container">
                <Avatar users={this.props.application.topUsers}/>
                <Forest />
                <DashboardOverlay 
                    totalIssues={this.props.application.totalIssues}
                    completedIssues={this.props.application.completedIssues}
                />
            </div>
        );
    }
}

export default Dashboard;