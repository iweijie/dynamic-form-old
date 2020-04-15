import React, { useCallback, useEffect, useState } from 'react';
import {
  FormContainer,
  RouteContainer,
  ReactComponnetContainer,
} from '../constant';
import { Input } from 'antd';
const { Textarea } = Input;
export default {
  title: '数字文本框',
  code: 'InputNumber',
  icon: 'iconinput',
  type: [FormContainer, ReactComponnetContainer],
  template: () => {},
  render: ({ form, config, linkage }) => {
    return <Textarea />;
  },
};
