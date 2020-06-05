/* eslint-disable */

import React from 'react';
import { TextareaItem } from 'antd-mobile';
import { UploadView } from '../components/Upload/index';
import { SelectPersonView } from '../components/SelectPerson/index';
import { SelectDepartmentView } from '../components/SelectDepartment/index';
import { MapView } from '../components/Map/index';
import { isMultiSelectDate, getClassName } from '../util/index';

export default {
    1: (value, label, field, { formValue, labelShowTag }) => {
        const {
            fieldKey,
            initialValue,
            placeholder,
            _disabled,
            _required,
            _config,
        } = field;
        // 单行文本
        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{value}</div>
            </div>
        );
    },
    2: (value, label, field, { formValue, labelShowTag }) => {
        // 多行文本
        const { fieldKey, _disabled, _config } = field;

        return (
            <TextareaItem
                key={fieldKey}
                disabled
                autoHeight
                title={
                    labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null
                }
                value={value}
            ></TextareaItem>
        );
    },
    3: (value, label, field, { formValue, labelShowTag }) => {
        // 单选|多选|单选异步|多选异步|关联异步
        // const { required } = options;
        const { fieldKey, _config } = field;
        const { mode } = _config;
        const labelKey = `${fieldKey}Label`;
        let labelValue = value;
        if (mode === 'multiple') {
            if (formValue[labelKey]) {
                labelValue = formValue[labelKey].join('，');
            } else {
                labelValue = formValue[fieldKey].join('，');
            }
        } else if (formValue[labelKey]) {
            labelValue = formValue[labelKey];
        }

        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{labelValue}</div>
            </div>
        );
    },
    4: (value, label, field, { formValue, labelShowTag }) => {
        const {
            fieldKey,
            initialValue,
            placeholder,
            _disabled,
            _required,
            _config,
        } = field;
        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{value}</div>
            </div>
        );
    },
    5: (value, label, field, { formValue, labelShowTag }) => {
        const {
            fieldKey,
            initialValue,
            placeholder,
            _disabled,
            _required,
            _config = {},
        } = field;
        const { format = 'YYYY-MM-DD HH:MM:SS' } = _config;
        const isMulti = isMultiSelectDate(format);
        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{isMulti ? value.join('~') : value}</div>
            </div>
        );
    },

    8: (value, label, field, { formValue, labelShowTag }) => {
        const { fieldKey, mode } = field;
        const labelKey = `${fieldKey}Label`;
        let labelValue = value;

        if (formValue[labelKey]) {
            // labelValue = formValue[labelKey].join();
            labelValue = formValue[labelKey];
        } else {
            labelValue = value;
        }

        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">
                    <div className="item-title item-radio-title">
                        <ul>
                            {labelValue &&
                                labelValue.map(data => {
                                    const className =
                                        'checkbox-icon-wrap-active';
                                    return (
                                        <li
                                            key={data}
                                            className={'item-radio-label'}
                                        >
                                            <div className={className}>
                                                <span></span>
                                            </div>
                                            <div>{data}</div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },
    9: (value, label, field, { formValue, labelShowTag }) => {
        const { fieldKey, mode } = field;
        const labelKey = `${fieldKey}Label`;
        const labelValue = formValue[labelKey] || value;

        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{labelValue}</div>
            </div>
        );
    },
    11: (values, label, field, options) => {
        const { fieldKey } = field;
        // 图片上传
        return (
            <UploadView
                key={fieldKey}
                values={values}
                label={label}
                field={field}
                options={options}
            />
        );
    },
    13: (values, label, field, options) => {
        return MapView({ values, label, field, options });
    },
    14: (
        values,
        label,
        field,
        { formValue, customControlRender, labelShowTag },
    ) => {
        const { fieldKey } = field;
        if (
            customControlRender[fieldKey] &&
            typeof customControlRender[fieldKey] === 'function'
        ) {
            return customControlRender[fieldKey](
                values,
                label,
                field,
                formValue,
            );
        }
        const labelValues = formValue[`${fieldKey}Label`];
        const value = labelValues
            ? Array.isArray(labelValues)
                ? labelValues.join('，')
                : labelValues
            : Array.isArray(values)
            ? values.join('，')
            : values;
        return (
            <div key={fieldKey} className="dynamic-form-view-item">
                <div className="left">
                    {labelShowTag ? (
                        <span className={getClassName(labelShowTag)}>
                            {label}
                        </span>
                    ) : null}
                </div>
                <div className="right">{value}</div>
            </div>
        );
    },
    21: (values, label, field, options) => {
        const { fieldKey, _config } = field;
        const { selectionClassify } = _config;
        return selectionClassify === 'organization' ? (
            <SelectDepartmentView
                key={fieldKey}
                values={values}
                label={label}
                field={field}
                options={options}
            />
        ) : (
            <SelectPersonView
                key={fieldKey}
                values={values}
                label={label}
                field={field}
                options={options}
            />
        );
    },
};
