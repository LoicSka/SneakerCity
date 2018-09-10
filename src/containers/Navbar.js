import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { toggleListDisplayMode } from '../actions';

import logo from '../styles/images/logo.svg';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: null
    };
  }

  setActiveTabIndexForValue = (value) => {
    switch (value) {
      case 'latest':
      this.setState({ activeTabIndex: 1 });
      break;
      case 'upcoming':
      this.setState({ activeTabIndex: 2 });
      break;
      default:
      this.setState({ activeTabIndex: 0 });
      break;
    }
  }

  componentWillReceiveProps = (newProps) => {
    const { location: { search, pathname } } = newProps;
    const { s } = qs.parse(search);
    if(search !== this.props.location.search && pathname === '/') {
      this.setActiveTabIndexForValue(s);
    }
  }

  componentDidMount =  () => {
    const { location: { search, pathname } } = this.props;
    const { s } = qs.parse(search);
    if (pathname === '/') {
      this.setActiveTabIndexForValue(s)
    }
  }

  render() {
    const { activeTabIndex } = this.state;
    const { listDisplayMode = 'grid', toggleListDisplayMode, cartSize = 0 } = this.props;
    const cartLink = (
      <Link className='top-nav-link position-relative' to='/checkout'>
        <span className={`alert ${ cartSize > 0 ? 'd-flex' : 'd-none' } align-items-center justify-content-center`}><p className='mb-0'>{cartSize}</p></span>
        <i className='icon-cart'></i>
      </Link>
    );

    return (
      <div className='navbar-container'>
        <div className='top-nav d-flex flex-row mx-3 px-2'>
          <ul className='nav ml-auto'>
            <li className='nav-item p-2'>
              <Link className='top-nav-link' to='#'>Join / Login</Link>
            </li>
            <li className='nav-item p-2'>
              {cartLink}
            </li>
            <li className='nav-item p-2'>
              <Link className='top-nav-link' to='#'>Help</Link>
            </li>
          </ul>
        </div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between mx-3 py-0'>
          <div style={{ width: `${100/3}%` }}>
            <Link className='navbar-brand' to='/'>
              <img src={logo} width='auto' height='20' alt='logo' />
            </Link>
          </div>
          <div style={{ width: `${100/3}%` }} className='tabs-container d-flex justify-content-center align-items-stretch'>
            <ul className='nav tabs'>
              <li className='nav-item d-flex align-items-center'>
                <Link className={`${ activeTabIndex === 0 ? 'active' : '' }`} to='/'>In Stock</Link>
              </li>
              <li className='nav-item d-flex align-items-center'>
                <Link className={`${ activeTabIndex === 1 ? 'active' : '' }`} to='/?s=latest'>Latest</Link>
              </li>
              <li className='nav-item d-flex align-items-center'>
                <Link className={`${ activeTabIndex === 2 ? 'active' : '' }`} to='/?s=upcoming'>Up coming</Link>
              </li>
            </ul>
          </div>
          <div className='d-flex justify-content-end align-items-center' style={{ width: `${100/3}%` }}><button onClick={toggleListDisplayMode} className={`list-display-toggle ${listDisplayMode}-mode`}></button></div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  listDisplayMode: PropTypes.string
}

const mapStateToProps = (state) => {
  const { listDisplayMode, cart: { products } } = state
  return {
    listDisplayMode,
    cartSize: products.length
  }
}

export default withRouter(connect(mapStateToProps, {toggleListDisplayMode})(Navbar));