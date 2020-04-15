import React, { useCallback, useEffect, useState } from 'react';
import {
  FormContainer,
  RouteContainer,
  ReactComponnetContainer,
} from '../constant';
import { Input } from 'antd';
const { Textarea } = Input;
export default {
  title: '多行文本框',
  code: 'TextArea',
  icon: 'iconinput',
  type: [FormContainer, ReactComponnetContainer],
  template: () => {},
  render: ({ form, config, linkage }) => {
    return <Textarea />;
  },
};
