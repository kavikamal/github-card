import React, { Component } from 'react';

import './App.css';



class AppComponent extends Component {
  state = {
    user: {} ,
    active: true 
 }

  render () {
    const children = <ChildComponent avatarUrl={this.state.user.avatar_url} 
                                     user={this.state.user.name}
                                     location={this.state.user.location} 
                                     bio={this.state.user.bio}
                                     company={this.state.user.company}
                                     toggleUser={this.toggleUser}
                                     active={this.state.active} />;

    return (
      <ParentComponent handleClick={this.handleClick}>
        {children}
      </ParentComponent>
    );
  }

  handleClick = () => {
    console.log('Text box value',document.getElementById("userId").value);
    fetch("https://api.github.com/users/"+document.getElementById("userId").value)
      .then((res) => { return res.json() })
            .then((data) => { 
                this.setState({user : data}) 
                document.getElementById("children-pane").hidden=false;
                console.log(this.state.user); 
      });
    }
  toggleUser=()=>{
      let isActive = this.state.active? false:true;
      this.setState({active : isActive})
    }   
}

const ParentComponent = props => (
 
    <div className="mainDiv"> 
     <br/>
     <input type="text" id="userId"/>
      <button onClick={props.handleClick}>Find User</button>
      <br/>
      <br/>
      <div id="children-pane" hidden>
      {props.children}
      </div>
     </div>
  
);

const ChildComponent = props => ( <div id="userInfo" className="user">
          <button onClick={props.toggleUser}>Toggle User</button>
          <br/>
          <br/>
          {props.active && <div >
          <img className="portrait" src={props.avatarUrl} alt={props.user}/> 
            <h1>{props.user}</h1>
            <p>{props.location}</p>
            <p>{props.company}</p>
            <p className="title">{props.bio}</p>
          </div>  
          }
          </div> 
)
export default AppComponent;
