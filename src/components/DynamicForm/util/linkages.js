/* eslint-disable quote-props */
// 1、单选/多选控制其他控件禁用，
// 2、单选/多选控制其他控件必填，
// 3、单选/多选控制其控件非必填，
// 4、单选/多选 控制 其他单选/多选的选择项，
// 5.1、单选/多选控制一个组隐藏，
// 5.2、单选/多选控制其他控件隐藏，
// 6、身份证号取出生年月日，
// 7、单选联动异步请求选项，
// 8、地图选点取行政区划

function getSelectedList(value, rules = [], key = 'fieldKey') {
    const list = [];
    rules.forEach(rule => {
        const { srcValue, fields } = rule;
        if (
            srcValue === value ||
            (Array.isArray(value) && value.includes(srcValue))
        ) {
            fields.forEach(field => {
                if (field[key]) {
                    list.push(field[key]);
                }
            });
        }
    });
    return list;
}

export default {
    // 1、单选/多选控制其他控件禁用，
    1: (field, value, rules) => ({
        disabledList: getSelectedList(value, rules),
    }),
    // 2、单选/多选控制其他控件必填，
    2: (field, value, rules) => ({
        requiredList: getSelectedList(value, rules),
    }),
    // 3、单选/多选控制其控件非必填，
    3: (field, value, rules) => ({
        notRequiredList: getSelectedList(value, rules),
    }),
    // 4、单选/多选 控制 其他单选/多选的选择项，
    4: (field, value, rules = []) => {
        const linkItem = [];
        rules.forEach(rule => {
            const { srcValue, fields = [] } = rule;
            fields.forEach(item => {
                if (!item.options || !item.options.length) return;
                linkItem.push({
                    value: srcValue,
                    linkFieldKey: item.fieldKey,
                    options: item.options,
                    field,
                });
            });
        });
        return {
            showOptionList: linkItem,
        };
    },
    // "单选/多选控制组隐藏"
    '5.1': (field, value, rules) => ({
        hiddenGroupNameList: getSelectedList(value, rules, 'groupName'),
    }),
    // "单选/多选控制控件隐藏"
    '5.2': (field, value, rules) => ({
        hiddenList: getSelectedList(value, rules),
    }),
    // "单选/多选控制组不隐藏"
    '5.3': (field, value, rules) => ({
        hiddenGroupNameList: getSelectedList(value, rules, 'groupName'),
    }),
    // "单选/多选控制控件不隐藏"
    '5.4': (field, value, rules) => ({
        hiddenList: getSelectedList(value, rules),
    }),
    // 运算表达式  不在这计算
    // '10.1': (field, value, rules) => {
    //     debugger;
    //     // ({
    //     //     hiddenList: getSelectedList(value, rules),
    //     // })
    // },
};
