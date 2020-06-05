import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import { getClassName } from '../../util/index';
import { locationIcon } from '../../util/svg';

// 是否选择人员
// const isSelectedPerson = true;

const handleShowMap = (field, config, form, closePopUp) => {
    const { getFieldValue } = form;
    Modal({
        onSelected: area => {
            if (!area || !area.longitude) {
                area = undefined;
            }
            const { setFieldsValue } = form;
            setFieldsValue({
                [field]: area,
            });
        },
        config,
        closePopUp,
        fieldKey: field,
        initValue: getFieldValue(field) || [],
    });
};

const handleShowMapView = (config, values) => {
    Modal({
        isView: true,
        config,
        initValue: values,
    });
};

const MapCom = ({ field, form, expressionValue, closePopUp }) => {
    const { getFieldValue, getFieldProps } = form;
    const {
        fieldKey,
        label,
        labelShowTag,
        _required,
        _config,
        initialValue,
    } = field;
    getFieldProps(fieldKey, {
        initialValue: expressionValue[fieldKey] || initialValue,
        rules: [{ required: !!_required, message: `${label}为必填项` }],
    });

    const values = getFieldValue(fieldKey) || [];

    return (
        <div key={fieldKey} className="location-wrap dynamic-form-view-item">
            <div className={getClassName(labelShowTag, 'left color555')}>
                {_required ? <span style={{ color: 'red' }}>*</span> : null}
                {labelShowTag ? label : null}
            </div>
            <div
                className="right"
                onClick={handleShowMap.bind(
                    null,
                    fieldKey,
                    _config,
                    form,
                    closePopUp,
                )}
            >
                <div>
                    {(values && values.name) || (
                        <span style={{ color: 'rgb(187, 187, 187)' }}>
                            请选择
                        </span>
                    )}
                </div>
                <div className="location-icon">{locationIcon}</div>
            </div>
        </div>
    );
};

MapCom.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    expressionValue: PropTypes.object,
    closePopUp: PropTypes.object,
};

export const MapView = ({ values, label, field, options }) => {
    const { fieldKey, labelShowTag, _config } = field;
    return (
        <div key={fieldKey} className="location-wrap dynamic-form-view-item">
            <div className={getClassName(labelShowTag, 'left color555')}>
                {labelShowTag ? label : null}
            </div>
            <div
                className="right"
                onClick={handleShowMapView.bind(null, _config, values)}
            >
                <div>{values && values.name}</div>
                <div className="location-icon">{locationIcon}</div>
            </div>
        </div>
    );
};

MapView.propTypes = {
    values: PropTypes.array,
    label: PropTypes.string.isRequired,
    field: PropTypes.object,
    options: PropTypes.object,
    closePopUp: PropTypes.object,
};

export default MapCom;
