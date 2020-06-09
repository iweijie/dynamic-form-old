import Input from './components/Input';
import TextArea from './components/TextArea';
import InputNumber from './components/InputNumber';
import EditorText from './components/EditorText';
import { ContainerType } from './constant';

// 导出容器类型
export { ContainerType };

export default [
    {
        title: '布局组件',
        type: ContainerType.Wrap,
        children: [EditorText],
    },
    {
        title: '表单组件',
        type: ContainerType.Form,
        children: [Input, TextArea, InputNumber],
    },
];
