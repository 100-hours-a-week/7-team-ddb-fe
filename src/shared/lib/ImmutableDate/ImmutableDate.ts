import { BaseImmutableDate } from './BaseImmutableDate';
import { FnsImmutableDate } from './FnsImmutableDate';

export class ImmutableDate
  extends FnsImmutableDate
  implements BaseImmutableDate
{
  constructor(date: Date | string = new Date()) {
    super(date);
  }
}
