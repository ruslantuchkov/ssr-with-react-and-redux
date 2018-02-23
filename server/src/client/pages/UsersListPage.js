import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUsers} from '../actions';

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
    );
  }
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    {fetchUsers}
  )(UsersList)
};