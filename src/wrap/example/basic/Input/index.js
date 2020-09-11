import { hooksWrap } from '@/wrap/hooks';
import { wrap } from '@/wrap/index';
import * as RawInput from './Input';

export const identifiers = RawInput.identifiers || {};
const Input = hooksWrap(RawInput);

Object.assign(Input, identifiers);

export default Input;
