import wrap from '@/wrap/hooks';
import * as RawCard from './Card';

export const wrappers = RawCard.defaultWrappers || {};
const Card = wrap(RawCard);

Object.assign(Card, wrappers);

export default Card;
