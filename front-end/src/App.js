import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Register from './components/Register';
import UserList from './components/UserList';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false,
      userList: []
    }
  }


  registerSubmit = regData => {
    axios
      .post('http://localhost:5000/api/register/', regData)
      .then(res => {
        this.loginSubmit(regData);
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      })
  };

  loginSubmit = loginData => {
    axios
      .post('http://localhost:5000/api/login/', loginData)
      .then(res => {
        console.log(res);
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.log(err);
      });
    };

    getUsers = () => {
      axios
        .get('http://localhost:5000/api/users/')
        .then(res => {
          console.log(res);
          this.setState({ userList: res })
        })
        .catch(err => {
          console.log(err);
        });
    };

  render() {

    if (this.state.loggedIn === false) {
      return (
        <div>
          <Register registerSubmit={this.registerSubmit} />
        </div>
      );
    } else {
        return (
          <UserList userList={this.state.userList}/>
        );
    }
  };
};

export default App;
