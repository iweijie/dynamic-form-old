import { Component } from 'react';
import PropTypes from 'prop-types';
import { refresh } from '../../util/data';

class RefreshForm extends Component {
    state = {
        max: 3,
        current: 0,
    };

    componentDidUpdate(preProps) {
        const { current, max } = this.state;
        const { form } = this.props;
        if (form !== preProps.form && current <= max) {
            form.setFieldsValue({
                [refresh]: Math.random()
                    .toString()
                    .slice(2),
            });
            this.setState({
                current: current + 1,
            });
        }
    }
    render() {
        return null;
    }
}

RefreshForm.propTypes = {
    form: PropTypes.object,
    formValues: PropTypes.object,
};

export default RefreshForm;
