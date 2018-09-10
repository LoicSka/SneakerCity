import React, { Component } from 'react';
import Navbar from './Navbar';

class Layout extends Component {
  render() {
    return (
      <div className='layout-container'>
        <Navbar/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;