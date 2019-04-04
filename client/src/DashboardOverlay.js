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
            <div class="dashboard-overlay-container">
                <div class="dashboard-overlay-top">
                    <div class="dashboard-overlay-team">
                        <div class="dashboard-overlay-team-left">
                            <img src={emblemImage} alt="emblem" />
                        </div>
                        <div class="dashboard-overlay-team-right">
                            <div class="dashboard-overlay-team-name">
                                AWESOME TEAM
                            </div>
                            <div class="dashboard-overlay-team-progress-bar">
                                <div style={progressBarStyle} class="dashboard-overlay-team-progress-bar-fill">
                                    <div class="dashboard-overlay-team-progress-bar-fill-top"></div>
                                    <div class="dashboard-overlay-team-progress-bar-fill-bottom"></div>
                                </div>
                            </div>
                            <div class="dashboard-overlay-team-progress-text">
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