import React, { Component } from 'react';
import Avatar from './avatar/Avatar';
import './Dashboard.css';
import DashboardOverlay from './DashboardOverlay';
import Forest from './themes/forest/Forest';

class Dashboard extends Component {   
    render() {
        return (
            <div className="dashboard-container">
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