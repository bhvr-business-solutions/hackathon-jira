import React, { Component } from 'react';
import Avatar from './avatar/Avatar';
import './Dashboard.css';
import DashboardOverlay from './DashboardOverlay';
import Forest from './themes/forest/Forest';

class Dashboard extends Component {   
    render() {
        const { topUsers, teamName, totalIssues, completedIssues } = this.props.application;
        return (
            <div className="dashboard-container">
                <Avatar users={topUsers}/>
                <Forest />
                <DashboardOverlay 
                    teamName={teamName}
                    totalIssues={totalIssues}
                    completedIssues={completedIssues}
                />
            </div>
        );
    }
}

export default Dashboard;