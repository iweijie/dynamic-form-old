import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormButtonGroup,
    createFormActions,
    FormEffectHooks,
    Submit,
    Reset,
} from '@formily/antd'; // 或者 @formily/next
import { Input, Select } from '@formily/antd-components';
import 'antd/dist/antd.css';
import Form from './antd/Form';

const { onFieldValueChange$ } = FormEffectHooks;

const useOneToManyEffects = () => {
    const { setFieldState } = createFormActions();
    onFieldValueChange$('aa').subscribe(({ value }) => {
        setFieldState('*(bb,cc,dd)', state => {
            state.visible = value;
        });
    });
};

export default () => {
    return (
        <>
            <SchemaForm
                components={{ Input, Select }}
                onSubmit={values => {
                    console.log(values);
                }}
                effects={(...rest) => {
                    console.log(rest);
                    useOneToManyEffects();
                }}
                schema={{
                    type: 'object',
                    properties: {
                        aa: {
                            key: 'aa',
                            type: 'string',
                            enum: [
                                {
                                    label: 'visible',
                                    value: true,
                                },
                                {
                                    label: 'hidden',
                                    value: false,
                                },
                            ],
                            default: false,
                            name: 'aa',
                            title: 'AA',
                            'x-component': 'select',
                        },
                        bb: {
                            key: 'bb',
                            type: 'string',
                            name: 'bb',
                            title: 'BB',
                            'x-component': 'input',
                        },
                        cc: {
                            key: 'cc',
                            type: 'string',
                            name: 'cc',
                            title: 'CC',
                            'x-component': 'input',
                        },
                        dd: {
                            key: 'dd',
                            type: 'string',
                            name: 'dd',
                            title: 'DD',
                            'x-component': 'input',
                        },
                    },
                }}
            />
        </>
    );
};
