import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SelectfieldGroup extends Component {
  render() {
    const { defaultValue = { value: null, name: null }, options, onChange, layout = null, type, value, error, classNames, field, placeholder } = this.props
    var optionValues = options.map((el) => {
      const name = typeof (el) === 'object' ? el.name : el
      const value = typeof (el) === 'object' ? el.value : el
      return (
        <option key={value} onChange={onChange} value={value}>{name}</option>
      );
    });

    optionValues.splice(0, 0, <option key={defaultValue.value} onChange={onChange} value={defaultValue.value}>{defaultValue.name}</option>);
    return (
      <div className={classnames('form-group', { [`col-md-${12 / layout}`]: typeof (layout) !== 'undefined' })}>
        <select
          type={type}
          value={value}
          onChange={onChange}
          className={classnames('form-control', classNames)}
          name={field}
          placeholder={placeholder}
        >
          {optionValues}
        </select>
      </div>
    );
  }
};

SelectfieldGroup.propTypes = {
  defaultValue: PropTypes.object,
  classNames: PropTypes.string,
  field: PropTypes.string.isRequired,
  layout: PropTypes.number,
  value: PropTypes.any,
  error: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectfieldGroup;