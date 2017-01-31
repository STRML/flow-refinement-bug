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
 11:   [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string;
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ object literal. See: Model.js:11

Use.js:7
  7:   const a:number = input.baz; // error: doesn't exist
                        ^^^^^^^^^ string. This type is incompatible with
  7:   const a:number = input.baz; // error: doesn't exist
               ^^^^^^ number

Use.js:8
  8:   const b:number = input.bar; // error: exists, but string
                        ^^^^^^^^^ string. This type is incompatible with
  8:   const b:number = input.bar; // error: exists, but string
               ^^^^^^ number

Use.js:9
  9:   const f:number = input.buzz; // error: exists, but string
                        ^^^^^^^^^^ string. This type is incompatible with
  9:   const f:number = input.buzz; // error: exists, but string
               ^^^^^^ number

Use.js:20
 20:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ property `baz`. Property not found in
 11:   [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string;
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ object literal. See: Model.js:11

Use.js:20
 20:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ string. This type is incompatible with
 20:     const c:number = input.baz; // error: doesn't exist
                 ^^^^^^ number

Use.js:21
 21:     const d:number = input.biz; // error: exists, but string
                          ^^^^^^^^^ string. This type is incompatible with
 21:     const d:number = input.biz; // error: exists, but string
                 ^^^^^^ number

Use.js:22
 22:     const e:number = input.buzz; // error: exists, but string
                          ^^^^^^^^^^ string. This type is incompatible with
 22:     const e:number = input.buzz; // error: exists, but string
                 ^^^^^^ number

Use.js:28
 28:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ property `baz`. Property not found in
 11:   [$Keys<$PropertyType<Class<T>, 'displayTypes'>>]: string;
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ object literal. See: Model.js:11

Use.js:28
 28:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ string. This type is incompatible with
 28:     const c:number = input.baz; // error: doesn't exist
                 ^^^^^^ number

Use.js:29
 29:     const d:number = input.biz; // error: exists, but string
                          ^^^^^^^^^ string. This type is incompatible with
 29:     const d:number = input.biz; // error: exists, but string
                 ^^^^^^ number

Use.js:30
 30:     const e:number = input.buzz; // error: exists, but string
                          ^^^^^^^^^^ string. This type is incompatible with
 30:     const e:number = input.buzz; // error: exists, but string
                 ^^^^^^ number


Found 12 errors
```
