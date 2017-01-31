### Flow-Refinement-Bug

A bug report showing an issue with Flow incorrectly losing refinement on types that have been imported
from other files.

This repository was tested with Flow 0.38.

#### The Issue

When importing a type from another file, Flow appears to lose refinement if any conditional accesses
a property:

```js
if (foo.bar) {
  // `foo` is now the `any` type
}
```

However, this *does not* happen in the following situations:

```js
const {bar} = foo;
if (bar) {
  // `foo` has maintained its type
}
```

Or even when explicitly casting to Boolean:

```js
if (Boolean(foo.bar)) {
  // `foo` has maintained its type
}
```

#### Errors

```
Use.js:7
  7:   const a:number = input.baz; // error: doesn't exist
                        ^^^^^^^^^ property `baz`. Property not found in
 11:   [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ object literal. See: Model.js:11

Use.js:7
  7:   const a:number = input.baz; // error: doesn't exist
                        ^^^^^^^^^ string. This type is incompatible with
  7:   const a:number = input.baz; // error: doesn't exist
               ^^^^^^ number

Use.js:8
  8:   const b:number = input.foo; // error: exists, but string
                        ^^^^^^^^^ string. This type is incompatible with
  8:   const b:number = input.foo; // error: exists, but string
               ^^^^^^ number

```
