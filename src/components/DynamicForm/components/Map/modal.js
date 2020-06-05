import React from 'react';
import ReactDOM from 'react-dom';
import { noop } from 'lodash';
import Map from './map';
import './index.less';

const body = document.body;
const id = '_dynamic_form_map_wrap';
const uid = `#${id}`;

const onCancel = () => {
    const mapWrap = document.querySelector(uid);
    ReactDOM.unmountComponentAtNode(mapWrap);
};

export default (props = {}) => {
    const {
        onSelected = noop,
        closePopUp,
        fieldKey,
        config = {},
        initValue = {},
        isView,
    } = props;
    let mapWrap = document.querySelector(uid);
    if (!mapWrap) {
        mapWrap = document.createElement('div');
        mapWrap.setAttribute('id', id);
        body.appendChild(mapWrap);
    }

    closePopUp.add(onCancel, fieldKey);
    ReactDOM.render(
        <Map
            onCancel={() => {
                onCancel();
                closePopUp.del(fieldKey);
            }}
            isView={isView}
            config={config}
            onSelected={onSelected}
            initValue={initValue}
        />,
        mapWrap,
    );
};
