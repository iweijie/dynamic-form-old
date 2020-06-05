/* eslint-disable no-mixed-operators */
import React from 'react';
import Api from './apis';
import Observer from './Observer';

export const requireSpan = <span style={{ color: 'red' }}>*</span>;

/* eslint-disable indent */
export const getDateMode = str => {
    if (str === 'YYYY-MM-DD') return 'date';
    if (str === 'HH:mm') return 'time';
    if (str === 'YYYY-MM-DD HH:mm') return 'datetime';
    if (str === 'YYYY') return 'year';
    if (str === 'MM') return 'month';
    return 'datetime';
};

export const getDate = format => {
    if (format instanceof Date) return format;
    const arr = format.split(/[- : /]/).map(Number);
    while (arr.length <= 5) {
        arr.push(0);
    }
    return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
};

//日期格式化支持："YYYY-MM-DD","YYYY-MM","YYYY/MM/DD","YYYY/MM","YYYY.MM.DD","YYYY.MM","HH:mm"
export function formatIt(date, format) {
    if (!date) return '';
    let syml = '-';
    if (format && format.includes('/')) {
        syml = '/';
    } else if (format && format.includes('-')) {
        syml = '-';
    } else if (format && format.includes('.')) {
        syml = '.';
    }
    const pad = function pad(n) {
        return n < 10 ? `0${n}` : n;
    };
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(date.getHours());
    const mm = pad(date.getMinutes());
    if (format === 'YYYY') {
        return y;
    } else if (format === `YYYY${syml}MM`) {
        return `${y}${syml}${m}`;
    } else if (format === `YYYY${syml}MM${syml}DD`) {
        return `${y}${syml}${m}${syml}${d}`;
    } else if (format === 'HH:mm') {
        return `${h}:${mm}`;
    } else if (format === `YYYY${syml}MM${syml}DD HH:mm`) {
        return `${y}${syml}${m}${syml}${d} ${h}:${mm}`;
    }
    return `${y}${syml}${m}${syml}${d} ${h}:${mm}`;
}

const multiSelectDatekeys = [
    'YYYY-MM-DD HH:MM:SS - YYYY-MM-DD HH:MM:SS',
    'YYYY-MM-DD HH:MM - YYYY-MM-DD HH:MM',
    'YYYY-MM-DD - YYYY-MM-DD',
    // 'HH:MM - HH:MM',
    // 'HH:MM:SS - HH:MM:SS',
];

export const isMultiSelectDate = str => {
    const bool = str && multiSelectDatekeys.includes(str.toUpperCase());
    return bool ? (str.indexOf('HH') !== -1 ? 2 : 1) : 0;
};

export const getMultiDateValue = (date, format, isString = true) => {
    if (!date || !date.length || date.length < 2 || !format) return null;
    format = format.split(' - ')[0];
    if (!format) return null;
    return isString
        ? `${formatIt(date[0], format)}~${formatIt(date[1], format)}`
        : [formatIt(date[0], format), formatIt(date[1], format)];
};

export const noop = () => {};

export const formatFormFields = (data = {}) => {
    let obj = { ...data };
    try {
        obj._linkages = JSON.parse(data.linkages);
        obj.sectionList = data.sectionList
            ? data.sectionList.map(section => {
                  const { formFieldInfoList = [] } = section;
                  formFieldInfoList.forEach(item => {
                      item._config = JSON.parse(item.config);
                  });
                  return section;
              })
            : [];
    } catch (err) {
        obj = { ...data };
    }
    return obj;
};

export const getAsyncData = config => {
    const { selectionsQuery, selectListFieldNames, selectionsUrl } = config;
    const { selectionsUrlMethod, selectionsUrl: url } = selectionsUrl || {};
    return Api.fetchDynamicUri({
        url,
        method: selectionsUrlMethod,
        params: selectionsQuery,
    }).then(res => {
        // 请求回来的数据缓存起来，下次不用再请求
        // 数据缓存进_config里
        config.selectList = res.data.map(item => ({
            id: item.id,
            value: item[selectListFieldNames.value],
            label: item[selectListFieldNames.label],
            _ref: item,
        }));
        return config.selectList;
    });
};

export const getAutoImgSize = ({
    cWidth,
    cHeight,
    width,
    height,
    space = 0,
}) => {
    const w = width;
    const h = height;
    const sw = cWidth;
    const sh = cHeight;
    const obj = {};
    if (!(2 * space + w <= sw) || !(h + 2 * space <= sh)) {
        const wratio = w / sw;
        const hratio = h / sh;
        if (hratio > wratio) {
            // 宽
            obj.height = sh - 2 * space;
            const actualwidth = Math.floor((w / h) * obj.height);
            obj.width = actualwidth;
        } else {
            obj.width = sw - 2 * space;
            obj.height = Math.floor((h / w) * obj.width);
        }
    } else {
        obj.width = w;
        obj.height = h;
    }
    return obj;
};

export const handleChange = (value, field, form) => {
    const { setFieldsValue } = form;
    setFieldsValue({
        [field]: value,
    });
};

export const mergeLinkages = (obj1, obj2) => {
    if (!obj2) return obj1;
    Object.keys(obj2).forEach(key => {
        if (!obj1[key]) {
            obj1[key] = obj2[key];
            return;
        }
        obj1[key] = Array.from(new Set([...obj1[key], ...obj2[key]]));
    });

    return obj1;
};

export const removeLinkages = (obj1, obj2) => {
    if (!obj2) return obj1;
    Object.keys(obj2).forEach(key => {
        if (!obj1[key]) return;
        for (let i = obj1[key].length - 1; i >= 0; i--) {
            if (obj2[key].includes(obj1[key][i])) {
                obj1[key].splice(i, 1);
            }
        }
    });
    return obj1;
};

export const getRelateOptions = (field, options, form) => {
    let list;
    const { getFieldValue } = form;
    options
        .filter(option => field === option.linkFieldKey)
        .forEach(option => {
            if (getFieldValue(option.field) === option.value) {
                list = option.options;
            }
        });
    return list;
};

export const throttle = (fn, delay = 200) => {
    let timeId = null;
    const self = this || null;
    return () => {
        clearTimeout(timeId);
        timeId = setTimeout(fn.bind(self), delay);
    };
};

export const getTimeInit = (value, isMulti) =>
    value
        ? isMulti
            ? [getDate(value[0]), getDate(value[1])]
            : getDate(value)
        : undefined;

export const getClassName = (labelShowTag, ...other) => {
    const className = labelShowTag === 2 ? 'important-title' : '';
    return `${className} ${other.join(' ')}`;
};

export const isEmptyObject = obj => {
    const keys = Object.keys(obj);
    return !keys.length;
};

export const randomName = prefix => {
    const random = Math.random()
        .toString(32)
        .substr(2);
    return prefix ? prefix + random : random;
};

export const observer = new Observer();

// 获取时间范围
export const getTimeRange = (space = 20) => {
    const date = new Date();
    const year = date.getFullYear();
    return {
        minDate: new Date(year - space, 1, 1, 0, 0, 0),
        maxDate: new Date(year + space, 1, 1, 23, 59, 59),
    };
};
