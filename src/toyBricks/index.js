import Input from './Input';
import TextArea from './TextArea';
import InputNumber from './InputNumber';
import {
  FormContainer,
  RouteContainer,
  ReactComponnetContainer,
} from './constant';

export { FormContainer, RouteContainer, ReactComponnetContainer };

export default {
  title: '表单组件',
  icon: 'form-container-1',
  type: FormContainer,
  children: [Input, TextArea, InputNumber],
};
