import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export default (Component) => {
  class RequireAuth extends React.Component {
    render() {
      switch (this.props.auth) {
        case false: 
          return <Redirect to='/' />;
        case null: 
          return <div>Loading...</div>;
        default: 
          return <Component {...this.props} />;
      }
    }
  }
  function mapStateToProps({auth}) {
    return {auth};
  }
  return connect(mapStateToProps)(RequireAuth);
};