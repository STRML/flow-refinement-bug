// @flow
import type {Model, DisplayModel} from './Model';

type T = DisplayModel<Model>;

function losesRefinementInConditional(input:T) {
  const a:number = input.baz; // error: doesn't exist
  const b:number = input.bar; // error: exists, but string
  const f:number = input.buzz; // error: exists, but string
  if (input.bar) {
    const c:number = input.baz; // BUG: should be an error!
    const d:number = input.biz; // BUG: should be an error!
    const e:number = input.buzz; // BUG: should be an error!
  }
}

function doesntLoseRefinementOnDestructure(input:T) {
  const {bar} = input;
  if (bar) {
    const c:number = input.baz; // error: doesn't exist
    const d:number = input.biz; // error: exists, but string
    const e:number = input.buzz; // error: exists, but string
  }
}

function doesntLoseRefinementOnBoolCast(input:T) {
  if (Boolean(input.bar)) {
    const c:number = input.baz; // error: doesn't exist
    const d:number = input.biz; // error: exists, but string
    const e:number = input.buzz; // error: exists, but string
  }
}
