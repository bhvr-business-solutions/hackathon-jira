import React, { Component } from 'react';
import emblemImage from './assets/images/emblem.png';
import './DashboardOverlay.css';

class DashboardOverlay extends Component {
    render() {
        const { totalIssues, completedIssues } = this.props;
        let width = '0%';
        if (typeof totalIssues === 'number' && totalIssues > 0) {
            width = `${completedIssues / totalIssues * 100}%`;
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
                                {this.props.teamName.toUpperCase()}
                            </div>
                            <div className="dashboard-overlay-team-progress-bar">
                                <div style={progressBarStyle} className="dashboard-overlay-team-progress-bar-fill">
                                    <div className="dashboard-overlay-team-progress-bar-fill-top"></div>
                                    <div className="dashboard-overlay-team-progress-bar-fill-bottom"></div>
                                </div>
                            </div>
                            <div className="dashboard-overlay-team-progress-text">
                                {typeof completedIssues === 'number' ? completedIssues : '?'} / {typeof totalIssues ? totalIssues : '?'} COMPLETED
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardOverlay;