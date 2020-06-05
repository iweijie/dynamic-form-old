import PropTypes from 'prop-types';
import { getDate } from './index';

export const refresh = '___refresh';

export const formatTimeMap = {
    1: 'YYYY-MM',
    2: 'YYYY-MM-DD',
    3: 'YYYY-MM-DD HH:MM',
    4: 'YYYY-MM-DD HH:MM:SS',
};

export const getInitDataSource = () => ({
    sectionList: [],
    linkages: [],
    _linkages: [],
});

export const getInitLinkagesData = () => ({
    // 关联 不禁用
    usableList: [],
    // 关联 禁用
    disabledList: [
        /** 字段 */
    ],
    // 关联 非必填
    notRequiredList: [
        /** 字段 */
    ],
    // 关联 必填
    requiredList: [
        /** 字段 */
    ],
    // 由其他项选择后关联，用于展展示组件的项；
    showOptionList: [
        /** 字段（fieldKey）  {fieldKey: "vacationType", label: "休假子类别", fieldType: 3}*/
    ],
    // 关联 隐藏组件
    hiddenList: [
        /** 字段（fieldKey）  {fieldKey: "vacationType", label: "休假子类别", fieldType: 3}*/
    ],
    //关联 隐藏组
    hiddenGroupNameList: [
        /** groupName  {groupId: 2668, groupName: "因私出国（境）备案事由"}*/
    ],
    // 表达式关联项
    expression: [],
    // 禁用下拉选项
    // showOptionList: [],
});
// 初始化状态数据
export const initState = () => ({
    first: true,
    calendar: {
        visible: false,
        timeType: 'startTime',
        // 9:00
        startTime: getDate('2010-01-01 09:00:00'),
        endTime: getDate('2010-01-01 18:00:00'),
    },
    // 表达式联动返回 的对象值
    expressionValue: {},
    expression: {},
    dataSource: getInitDataSource(),
    // 关联信息
    linkagesData: getInitLinkagesData(),
    modalContext: {
        modalVisible: false, // modal框是否展示
        value: '', // 单选/多选的值
        key: Math.random()
            .toString(32)
            .substr(2),
        parentIndex: 0, // 选中的第一层
        index: 0,
        header: '标题',
        visible: false, // 展示
        onClose: () => {
            // do nothing
        }, // 关闭回调
        afterClose: () => {
            // do nothing
        }, // 关闭之后回调
        content: [], // 模态框内容体
    },
});

/**
 * 处理状态reducer
 * @param state <Object> 最新的state
 * @param action <Object> 传入的参数 eg. { type: '', payload: {} }
 *
 * */
export function reducer(state, action) {
    const { type, payload = {} } = action;

    switch (type) {
        case 'initState':
            return initState();
        case 'modalContext':
            return {
                ...state,
                modalContext: payload.modalContext,
            };
        case 'modalContextValue':
            return {
                ...state,
                modalContext: {
                    ...state.modalContext,
                    value: payload.value,
                },
            };
        case 'modalContextContent':
            return {
                ...state,
                modalContext: {
                    ...state.modalContext,
                    content: payload.content,
                },
            };
        case 'setDataSource':
            return {
                ...state,
                dataSource: payload,
            };
        // 设置 关联信息
        case 'setLinkagesData':
            return {
                ...state,
                linkagesData: payload,
            };
        // 刷新
        case 'refresh':
            return {
                ...state,
            };

        // 设置 表达式
        case 'setExpression':
            return {
                ...state,
                expression: payload,
            };

        // 设置日期多选数据
        case 'setCalendar':
            return {
                ...state,
                calendar: {
                    ...state.calendar,
                    ...payload,
                },
            };

        // 设置表达式返回的关联值
        case 'setExpressionValue':
            return {
                ...state,
                expressionValue: payload,
            };

        case 'setFirst':
            return {
                ...state,
                first: false,
            };
        default:
            return state;
    }
}

// props值的类型定义
export const propTypes = {
    formFields: PropTypes.object.isRequired,
    fieldsValue: PropTypes.array,
    loading: PropTypes.bool,
    isGradual: PropTypes.bool,
    disabled: PropTypes.bool,
    isViewer: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onValidateError: PropTypes.func,
};

// props默认值
export const defaultProps = {
    formFields: {},
    formValue: {},
    onSubmit: () => {
        //
    },
};

// props值的类型定义
export const viewPropTypes = {
    formFields: PropTypes.object.isRequired,
    formValue: PropTypes.object,
};

// props默认值
export const viewDefaultProps = {
    formFields: {},
    formValue: {},
};
