import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Helmet} from 'react-helmet';
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

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property='og:title' content='Users App' />
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.head()}
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