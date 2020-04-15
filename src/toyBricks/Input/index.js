import React, { useCallback, useEffect, useState } from 'react';
import {
  FormContainer,
  RouteContainer,
  ReactComponnetContainer,
} from '../constant';
import { Input } from 'antd';

export default {
  title: '单行文本框',
  code: 'Input',
  icon: 'iconinput',
  type: [FormContainer, ReactComponnetContainer],
  template: () => {},
  render: ({ form, config, linkage }) => {
    return <Input />;
  },
};
