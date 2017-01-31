// @flow

export class Model {
  static displayTypes = {
    foo: () => {},
    biz: () => {}
  };
}

export type DisplayModel<T> = {
  [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string
};
