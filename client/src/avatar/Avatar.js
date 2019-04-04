import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component {

    getUsers(){
        return this.props.users.sort((a, b) => a.score - b.score).map(function(x){
            return <div key={x.id}>
            <img className="avatarImage" src={`http://localhost:8081/avatar/${x.avatar}`} alt="gif" />            
            <span className="avatarName">{x.name} : {x.score} </span>
            </div>;
        })

    }

    render() {
        console.log(this.props.users[0].avatar)
        return (
            <div className="avatar-list">
                {this.getUsers()}
            </div>
        );
    }
}

export default Avatar;