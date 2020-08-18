import React from 'react';
const OriginalLabels = [
    'div',
    'span',
    'p',
    'ul',
    'ol',
    'li',
    'i',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
];

export default props => {
    const { type, text } = props.config;
    return React.createElement(type || 'div', {}, text);
};
