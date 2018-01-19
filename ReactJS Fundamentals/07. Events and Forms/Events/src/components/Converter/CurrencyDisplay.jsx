import React from 'react';
import PropTypes from 'prop-types';

const CurrencyDisplay = (props) => {
    if (props.value < 0) return null;
    return (
        <div>
            {props.name.toUpperCase()}
            <input
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                type="number" />
        </div>
    );
};

CurrencyDisplay.propTypes = {
    onChange: PropTypes.func
}

export default CurrencyDisplay;