import { createElement } from 'react';
import Input from '../Layout/Input';
import Col from '../Layout/Col';
import Row from '../Layout/Row';

const components = {
    Input,
    Col,
    Row,
};

const getNativeTag = key => {
    createElement;
};

export const getComponent = key => {
    if (!key) throw new Error(`getComponent： key 为空`);
    if (key.slice(0, 1).test(/[A-Z]/)) {
        if (!components[key]) throw new Error(`getComponent： ${Key} 不存在`);
        return components[key];
    }
    return getNativeTag(key);
};
