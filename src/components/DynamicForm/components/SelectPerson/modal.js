import React from 'react';
import ReactDOM from 'react-dom';
import { noop } from 'lodash';
import SelectPerson from './selectPerson';
import './index.less';

const body = document.body;

const onCancel = () => {
    const selectPersonWrap = document.querySelector(
        '#_dynamic_form_select_person',
    );
    ReactDOM.unmountComponentAtNode(selectPersonWrap);
};

export default (props = {}) => {
    const {
        onSelected = noop,
        fieldKey,
        closePopUp,
        isMultiple = true,
        isSelectedPerson = true,
        initValue = [],
    } = props;
    let selectPersonWrap = document.querySelector(
        '#_dynamic_form_select_person',
    );
    if (!selectPersonWrap) {
        selectPersonWrap = document.createElement('div');
        selectPersonWrap.setAttribute('id', '_dynamic_form_select_person');
        body.appendChild(selectPersonWrap);
    }
    closePopUp && closePopUp.add(onCancel, fieldKey);
    ReactDOM.render(
        <SelectPerson
            onCancel={() => {
                onCancel();
                closePopUp && closePopUp.del(fieldKey);
                if (props.onCancel && typeof props.onCancel === 'function') {
                    props.onCancel();
                }
            }}
            isSelectedPerson={isSelectedPerson}
            onSelected={onSelected}
            initValue={initValue}
            isMultiple={!!isMultiple}
        />,
        selectPersonWrap,
    );
};
