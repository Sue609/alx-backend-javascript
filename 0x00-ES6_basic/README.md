 
  * Arrow functions don't have their own bindings to `this`, `arguments`, or `super`, and should not be used as methods.
  * Arrow functions cannot be used as constructors. Calling them with `new` throws a `TypeError`. They also don't have access to the `new.target` keyword.
  * Arrow functions cannot use `yield` within their body and cannot be created as generator functions.

## Try it

## Syntax

js

    
    
    () => expression
    
    param => expression
    
    (param) => expression
    
    (param1, paramN) => expression
    
    () => {
      statements
    }
    
    param => {
      statements
    }
    
    (param1, paramN) => {
      statements
    }
    

Rest parameters, default parameters, and destructuring within params are
supported, and always require parentheses:

js

    
    
    (a, b, ...r) => expression
    (a = 400, b = 20, c) => expression
    ([a, b] = [10, 20]) => expression
    ({ a, b } = { a: 10, b: 20 }) => expression
    

Arrow functions can be `async` by prefixing the expression with the `async`
keyword.

js

    
    
    async param => expression
    async (param1, param2, ...paramN) => {
      statements
    }
    


Arrow functions are always unnamed. If the arrow function needs to call
itself, use a named function expression instead. You can also assign the arrow
function to a variable so it has a name.

js

    
    
    // Traditional Function
    function bob(a) {
      return a + 100;
    }
    
    // Arrow Function
    const bob2 = (a) => a + 100;
    

### Function body

Arrow functions can have either an _expression body_ or the usual _block
body_.

In an expression body, only a single expression is specified, which becomes
the implicit return value. In a block body, you must use an explicit `return`
statement.

js

    
    
    const func = (x) => x * x;
    // expression body syntax, implied "return"
    
    const func2 = (x, y) => {
      return x + y;
    };
    // with block body, explicit "return" needed
    

Returning object literals using the expression body syntax `(params) => {
object: literal }` does not work as expected.

js

    
    
    const func = () => { foo: 1 };
    // Calling func() returns undefined!
    
    const func2 = () => { foo: function () {} };
    // SyntaxError: function statement requires a name
    
    const func3 = () => { foo() {} };
    // SyntaxError: Unexpected token '{'
    

This is because JavaScript only sees the arrow function as having an
expression body if the token following the arrow is not a left brace, so the
code inside braces ({}) is parsed as a sequence of statements, where `foo` is
a label, not a key in an object literal.

To fix this, wrap the object literal in parentheses:

js

    
    
    const func = () => ({ foo: 1 });
    

### Cannot be used as methods

Arrow function expressions should only be used for non-method functions
because they do not have their own `this`. Let's see what happens when we try
to use them as methods:

js

    
    
    "use strict";
    
    const obj = {
      i: 10,
      b: () => console.log(this.i, this),
      c() {
        console.log(this.i, this);
      },
    };
    
    obj.b(); // logs undefined, Window { /* … */ } (or the global object)
    obj.c(); // logs 10, Object { /* … */ }
    

Another example involving `Object.defineProperty()`:

js

    
    
    "use strict";
    
    const obj = {
      a: 10,
    };
    
    Object.defineProperty(obj, "b", {
      get: () => {
        console.log(this.a, typeof this.a, this); // undefined 'undefined' Window { /* … */ } (or the global object)
        return this.a + 10; // represents global object 'Window', therefore 'this.a' returns 'undefined'
      },
    });
    

Because a class's body has a `this` context, arrow functions as class fields
close over the class's `this` context, and the `this` inside the arrow
function's body will correctly point to the instance (or the class itself, for
static fields). However, because it is a closure, not the function's own
binding, the value of `this` will not change based on the execution context.

js

    
    
    class C {
      a = 1;
      autoBoundMethod = () => {
        console.log(this.a);
      };
    }
    
    const c = new C();
    c.autoBoundMethod(); // 1
    const { autoBoundMethod } = c;
    autoBoundMethod(); // 1
    // If it were a normal method, it should be undefined in this case
    

Arrow function properties are often said to be "auto-bound methods", because
the equivalent with normal methods is:
