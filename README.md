### Flow-Refinement-Bug

A bug report showing an issue with Flow incorrectly losing refinement on types that have been imported
from other files.

This repository was tested with Flow 0.38.

#### The Issue

When importing a type with an indexable signature from another file, Flow appears to lose refinement if any
conditional accesses a property.

The type:

```js
export type DisplayModel = {
  [key: string]: string;
};
```

Assume `foo` is of type `DisplayModel`.

```js
if (foo.bar) {
  // `foo` is now the `any` type
  const a:number = foo.bar; // Bug: not an error!
}
```

However, this *does not* happen in the following situations:

```js
const {bar} = foo;
if (bar) {
  // `foo` has maintained its type
  const a:number = foo.bar; // error as expected
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
Use.js:5
  5:   const a:number = input.baz; // error: doesn't exist
                        ^^^^^^^^^ string. This type is incompatible with
  5:   const a:number = input.baz; // error: doesn't exist
               ^^^^^^ number

Use.js:6
  6:   const b:number = input.bar; // error: exists, but string
                        ^^^^^^^^^ string. This type is incompatible with
  6:   const b:number = input.bar; // error: exists, but string
               ^^^^^^ number

Use.js:7
  7:   const f:number = input.buzz; // error: exists, but string
                        ^^^^^^^^^^ string. This type is incompatible with
  7:   const f:number = input.buzz; // error: exists, but string
               ^^^^^^ number

Use.js:18
 18:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ string. This type is incompatible with
 18:     const c:number = input.baz; // error: doesn't exist
                 ^^^^^^ number

Use.js:19
 19:     const d:number = input.biz; // error: exists, but string
                          ^^^^^^^^^ string. This type is incompatible with
 19:     const d:number = input.biz; // error: exists, but string
                 ^^^^^^ number

Use.js:20
 20:     const e:number = input.buzz; // error: exists, but string
                          ^^^^^^^^^^ string. This type is incompatible with
 20:     const e:number = input.buzz; // error: exists, but string
                 ^^^^^^ number

Use.js:26
 26:     const c:number = input.baz; // error: doesn't exist
                          ^^^^^^^^^ string. This type is incompatible with
 26:     const c:number = input.baz; // error: doesn't exist
                 ^^^^^^ number

Use.js:27
 27:     const d:number = input.biz; // error: exists, but string
                          ^^^^^^^^^ string. This type is incompatible with
 27:     const d:number = input.biz; // error: exists, but string
                 ^^^^^^ number

Use.js:28
 28:     const e:number = input.buzz; // error: exists, but string
                          ^^^^^^^^^^ string. This type is incompatible with
 28:     const e:number = input.buzz; // error: exists, but string
                 ^^^^^^ number


Found 9 errors
```
