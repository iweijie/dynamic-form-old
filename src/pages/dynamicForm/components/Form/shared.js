var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __rest =
    (this && this.__rest) ||
    function(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
            ) {
                if (
                    e.indexOf(p[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
var __spreadArrays =
    (this && this.__spreadArrays) ||
    function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
import React from 'react';
import { PreviewText } from '@formily/react-shared-components';
import { version } from 'antd';
import each from 'lodash/each';
export * from '@formily/shared';
export var isAntdV4 = /^4\./.test(version);
export var autoScrollInValidateFailed = function(formRef) {
    if (formRef.current) {
        setTimeout(function() {
            var elements = formRef.current.querySelectorAll(
                isAntdV4
                    ? '.ant-form-item-has-error'
                    : '.ant-form-item-control.has-error',
            );
            if (elements && elements.length) {
                if (!elements[0].scrollIntoView) return;
                elements[0].scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'center',
                });
            }
        }, 30);
    }
};
export var mapTextComponent = function(Target, props, fieldProps) {
    if (fieldProps === void 0) {
        fieldProps = {};
    }
    var editable = fieldProps.editable;
    if (editable !== undefined) {
        if (editable === false) {
            return PreviewText;
        }
    }
    return Target;
};
export var transformDataSourceKey = function(component, dataSourceKey) {
    return function(_a) {
        var _b;
        var dataSource = _a.dataSource,
            others = __rest(_a, ['dataSource']);
        return React.createElement(
            component,
            __assign(((_b = {}), (_b[dataSourceKey] = dataSource), _b), others),
        );
    };
};
export var normalizeCol = function(col, defaultValue) {
    if (!col) {
        return defaultValue;
    } else {
        return typeof col === 'object' ? col : { span: Number(col) };
    }
};
export var pickProps = function(object, targets) {
    var selected = {};
    var otherwise = {};
    each(object, function(value, key) {
        if (targets.includes(key)) {
            selected[key] = value;
        } else {
            otherwise[key] = value;
        }
    });
    return {
        selected: selected,
        otherwise: otherwise,
    };
};
var NextFormItemProps = [
    'colon',
    'htmlFor',
    'validateStatus',
    'prefixCls',
    'required',
    'labelAlign',
    'hasFeedback',
    'labelCol',
    'wrapperCol',
    'label',
    'help',
    'extra',
    'itemStyle',
    'itemClassName',
    'addonAfter',
];
export var pickFormItemProps = function(props) {
    var selected = pickProps(props, NextFormItemProps).selected;
    if (!props.label && props.title) {
        selected.label = props.title;
    }
    if (!props.help && props.description) {
        selected.help = props.description;
    }
    if (selected.itemStyle) {
        selected.style = selected.itemStyle;
        delete selected.itemStyle;
    }
    if (selected.itemClassName) {
        selected.className = selected.itemClassName;
        delete selected.itemClassName;
    }
    return selected;
};
export var pickNotFormItemProps = function(props) {
    return pickProps(props, NextFormItemProps).otherwise;
};
export var mapStyledProps = function(props, fieldProps) {
    var loading = fieldProps.loading,
        errors = fieldProps.errors;
    if (loading) {
        props.state = props.state || 'loading';
    } else if (errors && errors.length) {
        props.state = 'error';
    }
};
export var compose = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function(payload) {
        var extra = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extra[_i - 1] = arguments[_i];
        }
        return args.reduce(function(buf, fn) {
            return buf !== undefined
                ? fn.apply(void 0, __spreadArrays([buf], extra))
                : fn.apply(void 0, __spreadArrays([payload], extra));
        }, payload);
    };
};
