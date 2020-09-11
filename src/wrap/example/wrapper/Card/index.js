import { hooksWrap } from '@/wrap/hooks';
import { wrap } from '@/wrap/index';
import * as RawCard from './Card';

export const wrappers = RawCard.defaultWrappers || {};
const Card = wrap(RawCard);

Object.assign(Card, wrappers);

export default Card;
