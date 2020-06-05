import React from 'react';
import PropTypes from 'prop-types';
import SelectPerson from './modal';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;

// 是否选择人员
// const isSelectedPerson = true;

const handleShowPerson = (fieldKey, form, { isMultiple, closePopUp }) => {
    const { getFieldValue } = form;
    SelectPerson({
        onSelected: personList => {
            if (!personList || !Array.isArray(personList)) {
                personList = [];
            }
            const { setFieldsValue } = form;
            setFieldsValue({
                [fieldKey]: personList.map(person => ({
                    id: person.id,
                    userAccount: person.userAccount,
                    userName: person.name || person.userName,
                })),
            });
        },
        fieldKey,
        isMultiple,
        closePopUp,
        // isSelectedPerson: true,
        initValue: getFieldValue(fieldKey) || [],
    });
};

const handleDeletePerson = (field, value, form) => {
    const { getFieldValue, setFieldsValue } = form;
    alert('确认删除当前选中项?', '', [
        { text: '取消', style: 'default' },
        {
            text: '确认',
            onPress: () => {
                let values = getFieldValue(field);
                values = values.filter(v => v !== value);
                setFieldsValue({ [field]: values });
            },
        },
    ]);
};

const SelectPersonCom = ({ field, form, expressionValue, closePopUp }) => {
    const { getFieldValue, getFieldProps } = form;
    const {
        fieldKey,
        label,
        labelShowTag,
        _required,
        required,
        initialValue,
        _config = {},
    } = field;
    const isMultiple =
        _config.multiple === undefined ? true : !!_config.multiple;
    getFieldProps(fieldKey, {
        initialValue: expressionValue[fieldKey] || initialValue,
        rules: [{ required: !!_required, message: `${label}为必填项` }],
    });

    const values = getFieldValue(fieldKey) || [];

    return (
        <div>
            <div className="person-title">
                <span className={labelShowTag === 2 ? 'important-title' : ''}>
                    {required ? <span style={{ color: 'red' }}>*</span> : null}
                    {labelShowTag ? label : null}
                </span>
            </div>
            <ul key={fieldKey} className={'person-wrap'}>
                {values.map((value, index) => (
                    <li
                        key={value.id || value.userAccount}
                        onClick={() =>
                            handleDeletePerson(fieldKey, value, form)
                        }
                        className="person-item person-item-del"
                    >
                        <div className="person-item-round">
                            {value.userName}
                        </div>
                    </li>
                ))}
                <li
                    key="_personAddBtn"
                    onClick={handleShowPerson.bind(null, fieldKey, form, {
                        isMultiple,
                        closePopUp,
                    })}
                    className="person-item"
                >
                    <div className={'person-item-round person-add'}>
                        <span className="person-add-icon"></span> 添加
                    </div>
                </li>
            </ul>
        </div>
    );
};

SelectPersonCom.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    isView: PropTypes.bool,
    expressionValue: PropTypes.object,
    closePopUp: PropTypes.object,
};

export const SelectPersonView = ({ values, label, field, options }) => {
    const { fieldKey } = field;
    const { labelShowTag } = options;
    return (
        <div>
            <div className="person-title">
                <span className={labelShowTag === 2 ? 'important-title' : ''}>
                    {labelShowTag ? label : null}
                </span>
            </div>
            {Array.isArray(values) && values.length ? (
                <ul key={fieldKey} className={'person-wrap'}>
                    {values.map((value, index) => (
                        <li
                            key={value.id || value.userAccount}
                            className="person-item"
                        >
                            <div className="person-item-round">
                                {value.userName}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

SelectPersonView.propTypes = {
    values: PropTypes.array,
    label: PropTypes.string.isRequired,
    field: PropTypes.object,
    options: PropTypes.object,
};

export default SelectPersonCom;
