import React from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import * as AIcons from '@ant-design/icons';
import EmptyComponent from '../EmptyComponent';
import { isFristCapitalized } from '@/utils/index';

const { createFromIconfontCN, ...Icons } = AIcons;

const scriptUrl = [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
];

let IconFont = EmptyComponent;

export const createIconFont = (scriptUrl = scriptUrl) => {
    IconFont = createFromIconfontCN({
        scriptUrl,
    });
};

const Icon = props => {
    const { type, ...other } = props;
    if (Icons[type]) {
        // if (!isFristCapitalized(type)) return null;
        const Com = Icons[type];
        return <Com {...other} />;
    }
    return <IconFont {...props} />;
};

Icon.propTypes = {
    size: PropTypes.number,
    type: PropTypes.string.isRequired,
};

export default Icon;
