import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function mapStateToProps({auth}) {
  return {auth};
}

const Header = ({auth}) => {
  return (
    <div>
      <Link to ='/'>React SSR</Link>
      <div>
        <Link to='/users'>Users</Link>
        <Link to='admins'>Admins</Link>
        {auth ? <a href='/api/logout'>Logout</a> :
        <a href='/api/auth/google'>Login</a>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Header);