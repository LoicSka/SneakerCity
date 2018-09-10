import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <SelectfieldGroup
          error={this.getTranslation(combinedErrors.subject)}
          value={subject}
          onChange={this.onChange}
          field='subject'
          options={subjectOptions}
          type='text'
          label={translate('courseFields.language')}
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
  sizes: PropTypes.array
};

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, {})(CartForm);