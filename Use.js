// @flow
import type {Model, DisplayModel} from './Model';

type T = DisplayModel<Model>;

function losesRefinementInConditional(input:T) {
  const a:number = input.baz; // error: doesn't exist
  const b:number = input.foo; // error: exists, but string
  if (input.foo) {
    const c:number = input.baz; // BUG: should be an error!
    const d:number = input.biz; // BUG: should be an error!
  }
}

function doesntLoseRefinementOnDestructure(input:T) {
  const {foo} = input;
  if (foo) {
    const c:number = input.baz; // error: doesn't exist
    const d:number = input.biz; // error: exists, but string
  }
}

function doesntLoseRefinementOnBoolCast(input:T) {
  if (Boolean(input.foo)) {
    const c:number = input.baz; // error: doesn't exist
    const d:number = input.biz; // error: exists, but string
  }
}
