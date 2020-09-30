import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/index';
import JSON from './json';
import map from 'lodash/map';

export default () => {
    return <Form JSON={JSON}></Form>;
};
