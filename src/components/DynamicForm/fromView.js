import React, { useEffect, useState } from 'react';
import './index.less';
import { mergeLinkages, removeLinkages } from './util/index';
import linkagesFunc from './util/linkages';
import formViewIstems from './fieldsItem/view';
import { List } from 'antd-mobile';
import {
    viewPropTypes,
    viewDefaultProps,
    getInitLinkagesData,
    getInitDataSource,
} from './util/data';

function renderFieldItem(value, label, field, formValue) {
    const item = formViewIstems[field.fieldType];
    return item && item(value, label, field, formValue);
}

const FormView = props => {
    const formValue = props.formValue || {};
    const formFields = props.formFields || {};
    const customControlRender = props.customControlRender || {};
    const [formatFormFields, setFormatFormFields] = useState(
        getInitDataSource(),
    );
    const [linkagesData, setLinkagesData] = useState(getInitLinkagesData());

    useEffect(() => {
        let payload = formFields;
        try {
            payload._linkages = JSON.parse(payload.linkages);
            if (payload.sectionList) {
                payload.sectionList = payload.sectionList.map(section => {
                    const { formFieldInfoList = [] } = section;
                    if (
                        section.labelShowTag === null ||
                        section.labelShowTag === undefined
                    ) {
                        section.labelShowTag = 1;
                    }
                    formFieldInfoList.forEach(item => {
                        item._config = JSON.parse(item.config);
                        if (item.initialValue === null) {
                            item.initialValue = undefined;
                        }
                        if (
                            item.labelShowTag === null ||
                            item.labelShowTag === undefined
                        ) {
                            item.labelShowTag = 1;
                        }
                    });
                    return section;
                });
            } else {
                payload.sectionList = [];
            }
        } catch (err) {
            payload = formFields;
        }
        setFormatFormFields(payload);
    }, [formFields, formValue]);

    useEffect(
        preState => {
            const linkages = formatFormFields._linkages || [];
            const values = formValue;
            const initLinkages = getInitLinkagesData();
            const { sectionList = [] } = formatFormFields;
            sectionList.forEach(item => {
                const formFieldInfoList = item.formFieldInfoList || [];
                if (item.hidden) {
                    return initLinkages.hiddenGroupNameList.push(item.name);
                }
                formFieldInfoList.forEach(formField => {
                    if (formField.hidden) {
                        initLinkages.hiddenList.push(formField.fieldKey);
                    }
                });
                return undefined;
            });
            linkages.forEach(item => {
                const { linkageType, src } = item;
                const value = values[src.fieldKey];
                if (!linkagesFunc[linkageType]) return;
                const list = linkagesFunc[linkageType](
                    src.fieldKey,
                    value,
                    item.dist || [],
                );
                if (['5.4', '5.3'].includes(linkageType)) {
                    removeLinkages(initLinkages, list);
                } else {
                    mergeLinkages(initLinkages, list);
                }
            });
            setLinkagesData(initLinkages);
        },
        [formValue, formatFormFields],
    );

    const { sectionList = [] } = formatFormFields;
    const { hiddenList, hiddenGroupNameList } = linkagesData;
    return (
        <div className="dynamic-form-module-wrap dynamic-form-module-view-wrap">
            {sectionList.map(item => {
                const { id, name, labelShowTag, formFieldInfoList } = item;
                if (hiddenGroupNameList.includes(name)) return null;
                const showList = formFieldInfoList.filter(field => {
                    const { fieldKey } = field;
                    return !hiddenList.includes(fieldKey);
                });
                return showList && showList.length ? (
                    <div key={id} className={'dynamic-form-list'}>
                        {labelShowTag ? (
                            <div className="dynamic-form-list-title">
                                <span className="important-title">{name}</span>
                            </div>
                        ) : null}
                        <List key={id}>
                            {showList.map((field, index) => {
                                const { fieldKey, label, labelShowTag } = field;
                                if (
                                    hiddenList.includes(fieldKey) ||
                                    formValue[fieldKey] === undefined
                                )
                                    return null;
                                return renderFieldItem(
                                    formValue[fieldKey],
                                    label,
                                    field,
                                    {
                                        customControlRender,
                                        formValue,
                                        labelShowTag,
                                    },
                                );
                            })}
                        </List>
                    </div>
                ) : null;
            })}
        </div>
    );
};

FormView.propTypes = viewPropTypes;
FormView.defaultProps = viewDefaultProps;

export default FormView;
