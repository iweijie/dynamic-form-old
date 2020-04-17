import React, { useCallback, useEffect, useState } from 'react';
import { ContainerType, uuid } from '../../constant';
import { Input } from 'antd';
const { Textarea } = Input;
export default {
  title: '多行文本框',
  code: 'TextArea',
  icon: 'iconinput',
  ponput: [ContainerType.Form, ContainerType.Component],
  template: () => {},
  render: ({ form, config, linkage }) => {
    return <Textarea />;
  },
};
