import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            avatarIcon: [],
          };
      }
    
      componentDidMount() {
        fetch('http://localhost:8081/')
          .then(response => response.json())
          .then(data => this.setState({ avatarIcon: data }));
      }

    render() {
        return (
            <div className="avatar-list">
                <div>
                    <img className="avatarImage" src={require('./avatarImages/barbarian_1_run.gif')} alt="gif" />
                </div>                   
                <div>
                    <img className="avatarImage" src={require('./avatarImages/barbarian_1_run.gif')} alt="gif" />
                </div>                   
                <div>
                    <img className="avatarImage" src={require('./avatarImages/barbarian_1_run.gif')} alt="gif" />
                </div>                   
                <div>
                    <img className="avatarImage" src={require('./avatarImages/barbarian_1_run.gif')} alt="gif" />
                </div>         
    
            </div>
        );
    }
}

export default Avatar;