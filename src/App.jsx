import React, { Component } from 'react';

import './App.css';



class AppComponent extends Component {
  state = {
    user: {} ,
    active: false 
 }

  render () {
    const children = <ChildComponent avatarUrl={this.state.user.avatar_url} 
                                     user={this.state.user.name}
                                     location={this.state.user.location} 
                                     bio={this.state.user.bio}/>;

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
}

const ParentComponent = props => (
 
    <div className="mainDiv"> 
     <br/>
     <input type="text" id="userId"/>
      <button onClick={props.handleClick}>Click</button>
      <br/>
      <br/>

      <div id="children-pane" hidden>
      {props.children}
      </div>
     </div>
  
);

const ChildComponent = props => ( <div id="userInfo" className="user">
          <img className="portrait" src={props.avatarUrl} alt={props.user}/> 
            <h1>{props.user}</h1>
            <p>{props.location}</p>
            <p className="title">{props.bio}</p>
          </div> 
)

export default AppComponent;
