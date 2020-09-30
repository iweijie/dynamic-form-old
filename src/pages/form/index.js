import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/index';
import renderComponent from './decoration/renderComponent';
import JSON from './json';
import map from 'lodash/map';

export default () => {
    return <Form>{map(JSON, item => renderComponent(item))}</Form>;
};
