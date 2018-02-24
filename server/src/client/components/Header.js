import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function mapStateToProps({auth}) {
  return {auth};
}

const Header = ({auth}) => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to ='/' className='brand-logo'>React SSR</Link>
        <ul className='right'>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/admins'>Admins</Link>
          </li>
          {auth ? 
          <li>
            <a href='/api/logout'>Logout</a>
          </li> :
          <li>
            <a href='/api/auth/google'>Login</a>
          </li>}
        </ul>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps)(Header);