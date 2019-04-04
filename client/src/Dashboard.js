import React, { Component } from 'react';
import './Dashboard.css';

import Forest from './themes/forest/Forest';
import DashboardOverlay from './DashboardOverlay';

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="dashboard-container">
                <Forest />
                <DashboardOverlay 
                    totalIssues={this.props.appState.totalIssues}
                    completedIssues={this.props.appState.completedIssues}
                />
            </div>
        );
    }
}

export default Dashboard;