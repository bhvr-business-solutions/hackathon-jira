import React, { Component } from 'react';
import './DashboardOverlay.css';

import emblemImage from './assets/images/emblem.png';

class DashboardOverlay extends Component {
    render() {
        let width = '0%';

        if (this.props.totalIssues && this.props.totalIssues !== 0) {
            width = `${this.props.completedIssues / this.props.totalIssues * 100}%`;
        }

        const progressBarStyle = {
            width,
        };

        return (
            <div className="dashboard-overlay-container">
                <div className="dashboard-overlay-top">
                    <div className="dashboard-overlay-team">
                        <div className="dashboard-overlay-team-left">
                            <img src={emblemImage} alt="emblem" />
                        </div>
                        <div className="dashboard-overlay-team-right">
                            <div className="dashboard-overlay-team-name">
                                AWESOME TEAM
                            </div>
                            <div className="dashboard-overlay-team-progress-bar">
                                <div style={progressBarStyle} className="dashboard-overlay-team-progress-bar-fill">
                                    <div className="dashboard-overlay-team-progress-bar-fill-top"></div>
                                    <div className="dashboard-overlay-team-progress-bar-fill-bottom"></div>
                                </div>
                            </div>
                            <div className="dashboard-overlay-team-progress-text">
                                {typeof this.props.completedIssues === 'number' ? this.props.completedIssues : '?'} / {typeof this.props.totalIssues ? this.props.totalIssues : '?'} COMPLETED
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardOverlay;