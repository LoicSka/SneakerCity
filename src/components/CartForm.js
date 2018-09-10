import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProductToCart } from '../actions';

import { filter } from 'lodash';

import SelectfieldGroup from './SelectFieldGroup';

class CartForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null
    };
  };

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { size } = this.state;
    if (size) {
      const { product: { name, colorWay, price, id, permalink, imageUrls }, addProductToCart } = this.props;
      addProductToCart({ size, name, colorWay, price, id, permalink, image: imageUrls[0] });
    }
  }

  render() {
    const { size } = this.state;
    const { product: { stock = []} } = this.props;

    const sizeOptions = filter(stock, (el) => Number(stock.count) !== 0).map((element) => {
      return element.size
    });

    return (
      <form onSubmit={this.onSubmit}>
        <SelectfieldGroup
          value={size}
          onChange={this.onChange}
          field='size'
          type='text'
          options={sizeOptions}
          placeholder='Size'
          defaultValue={{name: 'Select a size'}}
        />
        <button
          type='submit'
          className='btn btn-primary btn-block'>
          Add to cart
        </button>
      </form>
    )
  }
}

CartForm.propTypes = {
  product: PropTypes.object
};

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, { addProductToCart })(CartForm);