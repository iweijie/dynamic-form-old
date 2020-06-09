import Input from './components/Input';
import TextArea from './components/TextArea';
import InputNumber from './components/InputNumber';
import { ContainerType } from './constant';

// 导出容器类型
export { ContainerType };

export default [
    {
        title: '表单组件',
        type: ContainerType.Wrap,
        children: [Input, TextArea, InputNumber],
    },
];
