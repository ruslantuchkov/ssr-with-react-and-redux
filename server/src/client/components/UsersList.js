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

export default connect(
  mapStateToProps,
  {fetchUsers}
)(UsersList);