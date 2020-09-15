import wrap from '@/wrap/hooks';
import * as RawInput from './Input';

export const identifiers = RawInput.identifiers || {};
const Input = wrap(RawInput);

Object.assign(Input, identifiers);

export default Input;
