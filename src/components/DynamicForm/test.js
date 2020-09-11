export default {
    code: 0,
    msg: 'TradeOK',
    data: {
        id: 3610,
        name: '志愿者活动',
        code: 'szhd_volunteer_activity_form',
        version: 42,
        seq: 0,
        description: null,
        configuration: null,
        linkages:
            '[{"linkageType":"1","name":"单选/多选控制控件禁用","src":{"fieldKey":"isCancelableApply","label":"是否取消报名","fieldType":9},"dist":[{"srcKey":"isCancelableApply","srcValue":"0","valueLabel":"否","fields":[{"fieldKey":"cancelableStartTime","label":"取消报名开始时间","fieldType":5},{"fieldKey":"cancelableEndTime","label":"取消报名结束时间","fieldType":5}]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"applyStartTime","label":"报名开始时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerApplyActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerApplyActivityTime","expressionErrorMsg":"报名开始/结束时间无效"},"fields":[]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"applyEndTime","label":"报名结束时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerApplyActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerApplyActivityTime","expressionErrorMsg":"报名开始/结束时间无效"},"fields":[]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"cancelableStartTime","label":"取消报名开始时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerCancleActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerCancleActivityTime","expressionErrorMsg":"取消报名开始/结束时间无效"},"fields":[]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"cancelableEndTime","label":"取消报名结束时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerCancleActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerCancleActivityTime","expressionErrorMsg":"取消报名开始/结束时间无效"},"fields":[]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"activityStartTime","label":"活动开始时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerActivityTime","expressionErrorMsg":"活动开始和结束时间不能大于8小时"},"fields":[]}]},{"linkageType":"10.2","name":"校验表达式","src":{"fieldKey":"activityEndTime","label":"活动结束时间","fieldType":5},"dist":[{"expressionContent":{"expression":"checkVolunteerActivityTime","apiUrl":"/activity-manage-webapi/webapi/ct/v1.0/manage/volunteer/activity/checkVolunteerActivityTime","expressionErrorMsg":"活动开始和结束时间不能大于8小时"},"fields":[]}]}]',
        customOnChange: null,
        formTypeId: 8,
        requiredMsg: null,
        gmtCreate: '2020-05-20 19:01:39',
        gmtModified: '2020-05-20 19:01:39',
        sectionList: [
            {
                id: 8561,
                formId: 3610,
                name: '组名-1',
                seq: 1,
                hidden: 0,
                config: '{"labelWidth":"159px"}',
                description: null,
                gmtCreate: '2020-05-20 19:01:39',
                gmtModified: '2020-05-20 19:01:39',
                labelShowTag: 0,
                formFieldInfoList: [
                    {
                        id: 49281,
                        sectionId: 8561,
                        label: '项目名称',
                        fieldKey: 'title',
                        fieldType: 1,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":100,"type":"text","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 1,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49282,
                        sectionId: 8561,
                        label: '发布组织',
                        fieldKey: 'deptName',
                        fieldType: 22,
                        required: 0,
                        disabled: 1,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":100,"type":"text","hiddenRendering":0,"tagName":[],"keyString":"deptInfo.deptName"}',
                        hidden: 0,
                        initialValue: '',
                        seq: 2,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49283,
                        sectionId: 8561,
                        label: '活动开始时间',
                        fieldKey: 'activityStartTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 3,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49284,
                        sectionId: 8561,
                        label: '活动结束时间',
                        fieldKey: 'activityEndTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 4,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49285,
                        sectionId: 8561,
                        label: '志愿活动类型',
                        fieldKey: 'volunteerType',
                        fieldType: 3,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"notFoundContent":"无相关数据","selectionsType":1,"selectListFieldNames":{"label":"label","value":"value","children":"children"},"selectList":[{"id":"250878051586947020000","label":"帮困助弱","value":"0"},{"id":"993199681586947000000","label":"环境保护","value":"1"},{"id":"511359121586947000000","label":"医疗保健","value":"2"},{"id":"155217861586947050000","label":"文体科教","value":"3"},{"id":"642878231586947100000","label":"交通治安","value":"4"},{"id":"535416091586947060000","label":"专业技能","value":"5"},{"id":"101404221586947060000","label":"应急救援","value":"6"},{"id":"936300231586947000000","label":"法律援助","value":"7"},{"id":"618657311586947000000","label":"心理援助","value":"8"},{"id":"459795671586947100000","label":"禁毒防毒","value":"9"},{"id":"845363091586947100000","label":"旅游出行","value":"10"},{"id":"950783891586947100000","label":"大型活动","value":"98"},{"id":"256385531586947100000","label":"其他","value":"99"}],"selectionsQuery":{},"hiddenRendering":0,"mode":"single","tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 5,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49286,
                        sectionId: 8561,
                        label: '活动主题标签',
                        fieldKey: 'theme',
                        fieldType: 1,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":100,"type":"text","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 6,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49287,
                        sectionId: 8561,
                        label: '联系人',
                        fieldKey: 'contactName',
                        fieldType: 1,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":100,"type":"text","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 7,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49288,
                        sectionId: 8561,
                        label: '联系电话',
                        fieldKey: 'phone',
                        fieldType: 1,
                        required: 1,
                        disabled: 0,
                        regularExpression: '^1[3|4|5|6|7|8|9][0-9]\\d{8}$',
                        description: null,
                        errorMsg: '请输入合法的手机号',
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":100,"type":"text","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 8,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49289,
                        sectionId: 8561,
                        label: '活动地点',
                        fieldKey: 'coordinate',
                        fieldType: 13,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"mapType":"qqmap","secretKey":"63QBZ-B5GKV-46RPH-UCUF2-K5TUJ-OKBAK","webserviceUrlDO":{"urlMethod":"post","url":"/form-service/webapi/geography/webService"},"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 9,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49290,
                        sectionId: 8561,
                        label: '招募人数',
                        fieldKey: 'limitPeopleCount',
                        fieldType: 4,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config: '{"step":1,"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 10,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49291,
                        sectionId: 8561,
                        label: '仅招本组义工',
                        fieldKey: 'isRecruit',
                        fieldType: 9,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"notFoundContent":"无相关数据","selectionsType":1,"selectListFieldNames":{"label":"label","value":"value","children":"children"},"selectList":[{"id":"960967321586947300000","label":"否","value":"0"},{"id":"405419891586947350000","label":"是","value":"1"}],"selectionsQuery":{},"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: '0',
                        seq: 11,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49292,
                        sectionId: 8561,
                        label: '报名最小年龄',
                        fieldKey: 'ageMin',
                        fieldType: 4,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config: '{"step":1,"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 12,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49293,
                        sectionId: 8561,
                        label: '报名最大年龄',
                        fieldKey: 'ageMax',
                        fieldType: 4,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config: '{"step":1,"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 13,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49294,
                        sectionId: 8561,
                        label: '报名开始时间',
                        fieldKey: 'applyStartTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 14,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49295,
                        sectionId: 8561,
                        label: '报名结束时间',
                        fieldKey: 'applyEndTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 15,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49296,
                        sectionId: 8561,
                        label: '项目介绍',
                        fieldKey: 'introduce',
                        fieldType: 2,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"maxLength":200,"minLength":1,"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 16,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49297,
                        sectionId: 8561,
                        label: '是否取消报名',
                        fieldKey: 'isCancelableApply',
                        fieldType: 9,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"notFoundContent":"无相关数据","selectionsType":1,"selectListFieldNames":{"label":"label","value":"value","children":"children"},"selectList":[{"id":"884481841586947500000","label":"否","value":"0"},{"id":"192156851586947480000","label":"是","value":"1"}],"selectionsQuery":{},"hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: '0',
                        seq: 17,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49298,
                        sectionId: 8561,
                        label: '取消报名开始时间',
                        fieldKey: 'cancelableStartTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 18,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                    {
                        id: 49299,
                        sectionId: 8561,
                        label: '取消报名结束时间',
                        fieldKey: 'cancelableEndTime',
                        fieldType: 5,
                        required: 1,
                        disabled: 0,
                        regularExpression: null,
                        description: null,
                        errorMsg: null,
                        placeholder: null,
                        span: 24,
                        labelWidth: null,
                        config:
                            '{"format":"YYYY-MM-DD HH:mm","hiddenRendering":0,"tagName":[]}',
                        hidden: 0,
                        initialValue: null,
                        seq: 19,
                        gmtCreate: '2020-05-20 19:01:39',
                        gmtModified: '2020-05-20 19:01:39',
                        labelShowTag: 1,
                    },
                ],
            },
        ],
        buttonList: [],
        formSubmitTypeCode: 1,
        labelLayout: 'horizontal',
        config: '{"initialValueApi":{"urlMethod":"post","url":""}}',
    },
};
