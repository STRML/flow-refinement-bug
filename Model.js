// @flow

export class Model {
  static displayTypes = {
    bar: () => {},
    biz: () => {}
  };
}

export type DisplayModel<T> = {
  [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string;

  buzz: string;
};
