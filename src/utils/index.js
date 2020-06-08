import { cloneDeep } from 'lodash';
import { v1 as uuid } from 'uuid';

export const getRandom = prefix => {
    const str =
        Math.random()
            .toString(16)
            .slice(2) + Date.now().toString(16);
    return prefix ? `${prefix}_${str}` : str;
};

export const className = (...classNames) => {
    const classNameList = [];
    classNames.forEach(className => {
        if (typeof className === 'string') {
            classNameList.push(className);
        } else if (typeof className === 'object') {
            Object.keys(className).forEach(key => {
                if (className[key]) {
                    classNameList.push(key);
                }
            });
        }
    });
    return classNameList.join(' ');
};

export const clone = obj => {
    return {
        ...obj,
        uuid: uuid(),
        config: cloneDeep(obj.config) || {},
    };
};

export const isFristCapitalized = str => {
    return /[A-Z]/.test(str.slice(0, 1));
};
