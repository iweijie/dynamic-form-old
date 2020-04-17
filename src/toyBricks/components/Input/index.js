import React, { useCallback, useEffect, useState } from 'react';

import { ContainerType, uuid } from '../../constant';

import { Input } from 'antd';

export default {
  title: '单行文本框',
  code: 'Input',
  icon: 'iconinput',
  ponput: [ContainerType.form, ContainerType.Component],
  template: () => {},
  render: ({ form, config, linkage }) => {
    return <Input />;
  },
};
