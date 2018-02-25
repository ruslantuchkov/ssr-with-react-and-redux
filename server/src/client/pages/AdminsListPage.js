import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchAdmins} from '../actions';
import requireAuth from '../components/hocs/requireAuth';

function mapStateToProps(state) {
  return {
    admins: state.admins
  };
}

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.admins.map(admin => <li key={admin.id}>{admin.name}</li>)}
        </ul>
      </div>
    );
  }
}

function loadData(store) {
  return store.dispatch(fetchAdmins());
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchAdmins})(requireAuth(AdminsListPage))
};