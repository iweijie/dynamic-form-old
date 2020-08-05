import React, { useRef, useMemo, createContext, useContext } from 'react';
import { Form as AForm } from 'antd';
import { normalizeCol, autoScrollInValidateFailed, log } from './shared';
import { FormItemProvider } from './context';
const { useForm } = AForm;
const pickFields = [
    {
        field: 'colon',
        description:
            '配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)',
        fieldType: Boolean,
    },
];

const FormContext = createContext({});

// component	设置 Form 渲染元素，为 false 则不创建 DOM 节点	ComponentType | false	form
// colon	配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)	boolean	true
// fields	通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看示例	FieldData[]	-
// form	经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建	FormInstance	-
// hideRequiredMark	隐藏所有表单项的必选标记	boolean	false
// initialValues	表单默认值，只有初始化以及重置时生效	object	-
// labelAlign	label 标签的文本对齐方式	left | right	right
// labelCol	label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}	object	-
// layout	表单布局	horizontal | vertical | inline	horizontal
// name	表单名称，会作为表单字段 id 前缀使用	string	-
// preserve	当字段被删除时保留字段值	boolean	true	4.4.0
// scrollToFirstError	提交失败自动滚动到第一个错误字段	boolean	false
// size	设置字段组件的尺寸（仅限 antd 组件）	small | middle | large	-
// validateMessages	验证提示模板，说明见下	ValidateMessages	-
// validateTrigger	统一设置字段校验规则	string | string[]	onChange	4.3.0
// wrapperCol	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol	object	-
// onFinish	提交表单且数据验证成功后回调事件	Function(values)	-
// onFinishFailed	提交表单且数据验证失败后回调事件	Function({ values, errorFields, outOfDate })	-
// onFieldsChange	字段更新时触发回调事件	Function(changedFields, allFields)	-
// onValuesChange	字段值更新时触发回调事件	Function(changedValues, allValues)	-

export const Form = props => {
    const {
        children,
        prefixCls,
        labelAlign,
        labelCol,
        wrapperCol,
        inline,
        size,
        ...rest
    } = props;
    const [form] = useForm();

    const onSubmit = e => {
        if (e && e.preventDefault) e.preventDefault();
        form.submit().catch(e => log.warn(e));
    };
    const onReset = () => {
        form.reset({ validate: false, forceClear: false });
    };

    return (
        <FormItemProvider
            {...{
                prefixCls,
                labelAlign,
                labelCol,
                wrapperCol,
                inline,
                size,
                form,
            }}
        >
            <Form
                {...rest}
                form={form}
                onSubmit={onSubmit}
                onReset={onReset}
                labelCol={normalizeCol(props.labelCol)}
                wrapperCol={normalizeCol(props.wrapperCol)}
                layout={inline ? 'inline' : props.layout}
            >
                {children}
            </Form>
        </FormItemProvider>
    );
};
