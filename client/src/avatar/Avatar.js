import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component {

    getUsers(){
        return this.props.users.sort((a, b) => a.score - b.score).map(function(x){
            return <div className="avatar-wrapper" key={x.id}>
                <img className="avatarImage" src={`/api/avatar/${x.avatar}`} alt="gif" />
                <span className="avatarName">{x.name}<br /><br />{x.score} </span>
            </div>;
        })

    }

    render() {
        return (
            <div className="avatar-list">
                {this.getUsers()}
            </div>
        );
    }
}

export default Avatar;