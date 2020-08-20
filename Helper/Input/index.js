import react, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const ATest = (props, ref) => {
    const { id, value = '', onChange } = props;
    return (
        <input
            ref={ref}
            id={id}
            type="text"
            value={value}
            onChange={onChange}
        />
    );
};

ATest.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
ATest.defaultProps = {
    id: '',
    value: 'test',
    onChange: PropTypes.func.isRequired,
};
export default ATest;
