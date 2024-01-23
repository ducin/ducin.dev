_Branded types_ (also called _Opaque Types_) is a rather simple, yet **powerful pattern** available within TypeScript's type system.

I've been using **Branded Types** successfully in many big projects. During conversations, I keep on referring to them over and over again, and so I decided to write a **very deep explanation of the pattern and its related concepts**.

<% TOC %>

## Part 1: Introduction

### Motivation

Let's imagine you're working on a financial application (let it be Frontend or Backend) and _amounts_ of money are displayed/processed in many places (hundreds? thousands?), like the following:

```ts
interface Payment {
  id: string
  orderId: string
  paymentMethod: PaymentType
  amount: number // 👈
  date: Date
  // ...
}
```

and we've got an example function processing _money_:

```ts
function submitRebate(payment: Payment, amount: number);
```

In such case we _might be_ practicioning [**Primitive Obsession**](https://refactoring.guru/pl/smells/primitive-obsession), a design anti-pattern, where our application's domain has to deal with **various and different datatypes**, but we technically stick only to few primitive types (such as `string`, `number` etc.)

## Why the problem is a problem?

In above case, all following calls are valid within the type system:

```ts
const id: number = entity.id; // number
submitRebate(payment, id); // compiles 😕

const numberOfLegsACowHas = 4;
submitRebate(payment, numberOfLegsACowHas); // compiles 😢🐮

const orderSubmittedAt = Number(new Date()); // timestamp
submitRebate(payment, orderSubmittedAt); // compiles 🥴

submitRebate(payment, Math.PI); // compiles 🤢
```

Why? Because _money_ have its **explicit meaning** in the domain. The number of cow's legs is indeed a `number`, but is not _money_ (had to make it extremely clear! 😜). **But from type system perspective, they are the same**. As if their meaning was the same. But we can clearly see, **it's not**.

Of course, nobody would ever `submitRebate(Math.PI)`. But it's a matter of time until a developer, being in a hurry, passes a non-money number to where money is expected... and a bug is there.

### Brandes Types

Branded Types are _extraordinary_ primitive types which make use of TypeScript's structural typing (more on that later). Example brand could look like this:

```ts
type Money = number & {
  __brand: "MONEY";
}
```

The main point is that it **limits type compatibility across primitive types**:

```ts
declare let money: Money
declare let n: number
```
- every `Money` value is a `number` value, we can pass `Money` where `number` is expected:
```ts
n = money // ✅
```
- but not the other way round (the `__brand` property is not guaranteed to exist on `number`, which is, of course, a primitive):
```ts
money = n // ❌ Type 'number' is not assignable to type '{ __brand: "MONEY"; }'.(2322)
```

([typescript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAsg9gOwiKBeKCCuBbARhAJygDIoBvAWACgooB9O3AgQwQBMAuKAIhgHkAcgFEAmtwDc1AL7VqbCAGMANswLQlEYFGyJkXeEhBzFKtVA1aEXLHkKyqCNNt0oA9K6iBQcmo7DTx+5QgDLk1EA))

You might be wondering what is `declare`, why do I use it here and how to create a `Money` value in a normal way. We'll get to this after we learn the fundamentals!

## Part 2: How it all works?

### TypeScript Type System

If you're not familiar with Structural Typing of TypeScript, the branded declaration might not make sense to you:

```ts
type Money = number & {
  __brand: "MONEY";
}
```

because how could something be **a primitive AND an object** at the same time? As usual, there's more to it than meets the eye - and there's a clear explanation - so let's get started!

### Auto-Boxing

First of all, we have to realize **WHY** does the following line compile:

```ts
var o: Object = 5;
```

So many people find this surprising! During my [TypeScript Trainings](http://ducin.it/trainings) we go through unobvious behaviors of TypeScript. It's nothing special about TypeScript itself, as usual - TS only resembles what JS is doing under the hood. And that is - whenever an object is expected, and we pass a primitive, **the language runtime will automatically cast** the value (auto-box) to an object representation (`number` -> `Number`, etc.):

```js
var n = 5.5
(n).toFixed() '5'
```
`toFixed` is a **method** after all, and it's available on the prototype:

```js
Number.prototype.toFixed // ƒ toFixed() { [native code] }
```

Exactly same mechanism kicks in, when you're asking for the `length` of a string. A string, being a primitive, cannot have properties. But once it's boxed to an object (`String`), it's prototype methods/properties become available:

```js
var s = 'brand'
s.length // 5
```

So all in all, the following declaration **implicitly** upcasts the number to an object:

```ts
type Money = number & {
  __brand: "MONEY";
}
```

because in an object was expected, that's what JS would do anyway. And hence, all works fine.

Sidenote - if you want to declere a **type which excludes primitives**, you know `Object` is NOT what you're looking for. Instead, use `object` - it's an _artificial type_ (have no representation in runtime JS, such as `Object` type has the `Object` prototype). Compare the following lines:

```ts
var o1: Object = 5 // ✅ 🤨
var o2: object = 5 // ❌ 😅
```

### Structural Typing

Another important topic to understand is how does TypeScript verify whether an expression is compatible with a type or not.

TypeScript implements a concept called **Structural Typing**. It boils down to **comparing the shapes** of objects, instead of checking whether they "_come from_" a certain interface/type or have been instantiated by a certain (sub)class. The latter is called **Nominal Typing** and is implemented by Java and C#. Many developers migrating from those backend technologies assume that static typing is the same (or at least very similar) everywhere and that if the create 2 different interfaces, no matter their content, they won't be compatible:

```ts
interface Human {
  name: string
}
let h: Human = { name: "John" }

interface Person {
  name: string
}
let p: Person = { name: "John" }
```

But we know, **they are compatible** both ways:
```ts
h = p // ✅
p = h // ✅
```

because **TypeScript doesn't care about the origin of a type**. It cares only about the shape.

([typescript playground](https://www.typescriptlang.org/play?ssl=12&ssc=11&pln=11&pc=1#code/JYOwLgpgTgZghgYwgAgBIFcC2cTIN4CwAUMsiHJhAFzIDOYUoA5sQL7EA2EYyAFjRmy4AvPjIVqyAEQApAPa8QU5OyLFQkWIhQAFaLTm5CJcZRr1GIFkVVceABxp6oBkWPJnp8xctXFeyKL2yAD0IciAoOTEwaIBYZFAA))

### What is an Object type then?

One of the most effective ways, i.e. a **mental model** which explain why does something (not) compile, is to think of a `type`/`interface`, as if it was **a list of requirements that an object has to meet**. Actually, in the _Object-Oriented Programming_ classic books you'd find the definition of an interface as a **contract**: it's, again, a list of requirements that has to be met. A server JSON API has a contract (high-level), but also an object has a contract (low-level). So when you see the following type:

```ts
interface Human {
  name: string
  age: number
}
```

then all TS will check is whether those 2 properties are there (in some cases the _excessive property check_ might kick in though):

```ts
let h1: Human = {
  name: "John",
  age: 40
}

// this object has more properties than needed
let moreThanHuman = {
  name: "Paul",
  lastName: "McCartney",
  age: 82
}

let h2: Human = moreThanHuman
```

([typescript playground](https://www.typescriptlang.org/play?ssl=17&ssc=30&pln=6&pc=1#code/JYOwLgpgTgZghgYwgAgBIFcC2cTIN4CwAUMsiHJhAFzIDOYUoA5saXE9WVgEbTEC+xYgBsIYZAAsAjDQzZcAXnysyFTgCIAUgHsJIdQBoV7TgBYADAKFFR4zNqgQAKhJxycyJYRKrKNdQAKcOjChirCcPQAcmr+ALIIAMJwUGAgEACeYT4mNAAcAExWRCJikgWyWB5K9o4ublUgQA))

So what is actually a **branded type**?

It's a contract, where something is **both a primitive and has a brand defined**:

```ts
type Money = number & {
  __brand: "MONEY";
}
```

TypeScript's `&` operator (Algebraic Data Types **Intersection**) is merging two data types into one. Logically, an intersection (the common part of both types) is actually the part that satisfies all requirements of both

![TypeScript Type Intersection](http://ducin.it/images/blog-ts-object-type-intersection.svg)

### `declare`-ing variables

Previously we've seen that a `Money` expression has been created using the `declare` keyword and I promised to get back to it - so here it is:
- `declare` does NOT actually create anything runtime related (see this [typescript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAsg9gOwiKBeKCCuBbARhAJygDIoBvAWACgooB9O3AgQwQBMAuKAIhgHkAcgFEAmtwDc1AL7VqbCAGMANswLQlEYFGyJkXeEhBA)), the runtime is empty for this line
- `declare` tells the compiler: _Hey, there is a thing like this, believe me 🥹_, really 😅. When is it useful? For instance, when, back in the old days, we've been loading JS code through `<script>` tags - TS couldn't access the script we've been loading **before** our code was run, but we had to tell TS: **believe me, it will be there**.
- another usecase for `declare` is learning/experimenting. With `declare` we **don't initialize the value** (we can't, because it's expected to be created elsewhere). So (1) sometimes it's convenient for us and, first and foremost (2) **TS cannot narrow the type**, like below:
```ts
let strOrNum: string | number
strOrNum = 1
strOrNum // number
```
Type Narrowing is often useful and improves type-safety, but sometimes we just want to verify how a certain type works. And we don't want an unintentional type narrowing to kick in and affect our investigation.

All in all, `declare` is very useful when you:
- want to skip initialization of an expression
- want to check compatibility between types
but it should (almost) never occur in your application's code, since you'd need your declarations to exist in runtime 😁.

## Part 3: Practical Usage

### Instantiating Branded Values by force

One trivial way, although **not recommended**, is to **enforce** it:

```ts
let m = 5 as Money
```

The `as` type assertion allows to enforce the compiler to **upcast** or **downcast** a type as if it was, respectively, a **supertype** or **subtype** of the original type. In the image below, we've got an expression of type `Human`, and we can assert it to `Mammal` supertype and/or `Dev` subtype.

![TypeScript Type Assertions](http://ducin.it/images/blog-ts-type-subtype-supertype.svg)
![TypeScript Type Assertions](http://ducin.it/images/blog-ts-tuype-subtype-supertype.svg)
![TypeScript Type Assertions](http://ducin.it/images/blog-ts-tyupe-subtype-supertype.svg)

But don't think we can cast everything to everything else - we can cast only vertically (up/down in hierarchy), but never aside (e.g. `number` to `string`, since these are unrelated types).

Going back to our example

```ts
let m = 5 as Money
```

we're **downcasting** (to a subtype), since . And this is quite _risky_ 😨. We're actually lying to the compiler, since the `__brand` property doesn't exist on `5`.

It's **very important do realize that upcasting is always safe and downcasting might be unsafe**. An example should be easy to illustrate it:
- a _human_ is always a _mammal_
- a _mammal_ **might be** a _human_, but doesn't have to be one, e.g. it could be a _dog_ (a different subtype)

When doing `as <SUBTYPE` it might happen, that we are **lying**. And in our case, **we are**.

There are better ways to instantiate a branded value, but first, we need to realize one important thing...

### Artificial Brand Property

The clue of _Branded Types_ is that our `__brand` property (or the symbol which we'd turn it into) **will exist only in compile-time**. It's only for the compiler to differentiate the types. But it will never exist in runtime.

Here are the pros and cons of the approach:
- _advantage_: super simple to use, once grasped the concept
- _advantage_: no garbage in runtime
- _advantage_: TS can check everything it needs to check
- _disadvantage_: kind of, well, we are lying (the property won't be there in runtime)

All in all, and from my experience, there's way more benefits than downsides.

## Instantiating Branded Values by Guards

A better (i.e. more type-safe) way is to use well known TypeScript **Type Guards**. A type guard is a function which checks whether a condition is met, in order to narrow down the type. It's a gentle check, and, if done right, there's no enforcing whatsoever. In pur simple `Money` example, a price, rebate, budget etc. could be represented by a **positive** number (a product cannot have negative price, order cannot cost negative money, etc):

```ts
function isMoney(maybeMoney: number): maybeMoney is Money {
  return maybeMoney > 0
}
```

Of course we could put more fine-grained validation logic there. But the whole point is - **design your type system and application model** in a way which **enforces the developer** (not the compiler!) **to check if all conditions are met**, before using a specialized domain value.

Now we can get rid of `as` type assertion and use Branded values gently:

```ts
declare function processMoney(money: Money): void;

let n = 5

processMoney(n) // ❌ Type 'number' is not assignable to type '{ __brand: "MONEY"; }

if (isMoney(n)){
  processMoney(n) // ✅
}
```

The error thrown above, outside the `IF`, is the same one we've seen at the very beginning: from **Structural Typing** perspective, TS cannot guarantee that **both requirements** (_number_, _brand_) would be satisfied when just a _number_ is passed. And if TS cannot guarantee it (soundness) -> compilation error (_yep, TS is not always sound, but that's a different story_).

### A `symbol` looks more pro 😏

Before I mentioned that we'd replace the `__brand` with a symbol. The reasons are:
- why should we call the branded property `__brand` and not `__type` or `TYPE` or whatever else? [Stupid bikeshedding conversations could kick in 😝](https://www.reddit.com/r/programming/comments/p1j1c/tabs_vs_spaces_vs_both/)...
- theoretically, whatever string property we choose, _we might_ actually overwrite it and manipulate it. Even if we create it as a `readonly` property - we can't change it - but we could create a literal value and do some dirty tricks with it
- you look more smart when using symbols 🤓... which is a **double-edged sword**: after you push this code, your team should also understand what the heck symbols are...

Although, as you can see, these are really nit-picks.

### Symbol brand

Replacing the string property with a symbol requires us to create a `unique` symbol:

```ts
declare const brand: unique symbol;
```

What's that? 😐 In very short words:
- symbols are primitives
- symbols are meant to be used as object keys
- symbols are considered an alternative to strings, when being an object key
- apart from being object keys, symbols don't make much sense
- all symbols are unique:
```js
var s1 = Symbol('type')
var s2 = Symbol('type')
var s1 == s2 // false
var s1 === s2 // false
```
- ... unless [`Symbol.for` is used](https://twitter.com/tomasz_ducin/status/1730007470301405489)
- symbols are meant to be kept private within a library or platform, developers seldom use them directly
- examples of symbols: JS iterables (`Symbol.iterable`), Angular Signals, RxJS Observables, [React/Angular/Tanstack Query](https://twitter.com/tomasz_ducin/status/1743290394811473991) and many, many more, including _branded types_!

![Example usage of unique symbol](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uonhydd4trk5nqvzo0t6.png)

The difference is the following lines:
```ts
declare const brand: unique symbol;
declare const brand: symbol;
```
is that with `unique` we tell typescript that the former symbol is _unique_, so the developer cannot have access to it. IF a library maintainer has **NOT exposed** (`export`) the symbol, and probably they shouldn't, then there's ([_almost_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)) no way you could ever access that symbol. And that's what `unique` symbol is about: **you can NEVER overwrite it, you can never manipulate it.**

All in all, we're making double safe: since we are, kind of, lying the compiler that the brand property would exist, we'd at least make sure that **branded expressions cannot be manipulated unintentionally**.

### Reusable Branded Types

All in all, we end up with following super-easy-to-use _branded type_ creator:

```ts
declare const brand: unique symbol
type Brand<TBase, TBrand> = TBase & {
  [brand]: TBrand;
}
type Money = Brand<number, "MONEY">
```

([typescript playground](https://www.typescriptlang.org/play?#code/CYUwxgNghgTiAEYD2A7AzgF3gIxlFwAXPAK4oCWAjiQmgJ4C22SEAsAFAZ0AOCAQngIAeACp8oaEABp4YwcAB88ALyzxk+ADJ4Abw7x4AbVz5gAXWJzTAbg4BfDl17wAsqhB0V8AaaEoSTCAwMgBELgDyAHIAogCaIQocQA))

## Part 4: real-life example

Imagine you've got an application 😏 where users register 😏 and they provide their emails 😏. Such a rare case 😉... I bet you're dealing with email addresses as `string`s. If there's no logic you do with those emails (e.g. fetch the from API and display, nothing more) then it's fine.

But if you send emails and need to make sure they are valid, or have any logic which processes emails, one issue arises:
- **before validation**, you have a **string**
- you run form validation, you know the string is a **valid email**
- **after validation**, you still have a **string** 😟
The type system is incapable of **remembering the information, that a check has already taken place**... So you end up remembering: _Hey, i've already validated that so I assume there's no need to validate that again_. But there's no check. And as the code grows and developers switch within the team, bugs will pop up.

... but HEY! **TS is capable of remembering that validation has taken place!**

```ts
declare const brand: unique symbol
type Brand<TBase, TBrand> = TBase & {
  [brand]: TBrand;
}
type Email = Brand<string, "EMAIL">

export function isEmail(maybeEmail: string): maybeEmail is Email {
  return /fancy-email-regex/.test(maybeEmail)
}

declare function sendEmail(email: Email, data: unknown): void;

let maybeEmail = 'tomasz at ducin dot it'

sendEmail(maybeEmail, 'content') // ❌ Type 'string' is not assignable to type '{ [brand]: "EMAIL"; }

if (isEmail(maybeEmail)){
  sendEmail(maybeEmail, 'content') // ✅
}
```

([typescript playground](https://www.typescriptlang.org/play?ssl=20&ssc=1&pln=1&pc=1#code/CYUwxgNghgTiAEYD2A7AzgF3gIxlFwAXPAK4oCWAjiQmgJ4C22SEAsAFAZ0AOCAQngIAeACp8oaEABp4YwcAB88ALyzxk+ADJ4Abw7x4AbVz5gAXWJzTAbg4BfDl17wAogyjkIK+ANNDMMOQoAOYyAEQuALIAggCSADJhChwcIAAe3EgwWABmZGAY5Kjw5GhuHhAAFO502CDlnsQBQcEAlMQ1dQ1epa7unrr68HAYJDAo8AD0OfhgdAC0IP0Q83DB6ZMAdBggmNVQtfXLrfYp7KCQsAh5KAVFE5IE3ZVLFcTdMsBQGFDEZADWKCQAHcUO14AA3JDkYC2dgcCAgLCdI4VbwAcgwSHcaAAXvBvvBgCQwEEiUgsOQMOizo9gM8UR94OjkCgdmz0a0ppN4IAZclkPAQ6OaIXRJTQ8CBWAkaHIwRQUGwiPgWJVguZOiMJgIFngERiCTC1ngDnh7HIOXglVKDIOXWOrT07AMdNthyZLNQ7OpXMmPMAoOSndhAA))

### Part 5: Recommendations

When starting an application, things look rather simple. But within time, as our application grows, and as business rules become more complex, we need to tackle issues we haven't seen in the beginning.

Imagine a situation where you work in a very big e-commerce app, the main one in your country. You've been using `number` type for _money_ everywhere. One day, a project owner comes and asks how much would it cost to introduce different currencies within our system... We've always been selling stuff in our local currency and now the board want to conquer markets abroad. **How much would it cost to replace all occurrences of `number`**? And only, when `number` has a _money_ domain meaning? How can you even search for those? 😐

### Use type aliases

Whenever you create a new data type and you see that a primitive type _might_ have a special meaning in your application domain, now or in the future, **start with a type alias**, so that - when the time comes, you can change it to a more specialized type:

- `Money` (runtime: number) has a special meaning an application where customers buy/pay for something
- `Skill` (runtime: string) has a special meaning in an HR application (e.g. filtering candidates for some contracts; not every string is a skill within the system)
```ts
export type Money = number
export type Skill = string
// etc.
```
and use `Money` instead of `number`. If you do
- you can search for `Money` in your codebase and **see all occurrences**, _just like this_ ™️
- no need to overcomplicate things if they're not needed (**don't use _branded types_ if problems don't arise**)
- until you change the alias, `Money` will remain `number`
- all your cost is introducing one additional line, but your team should be disciplined to use `Money` instead of `number` whenever in _money_ context.

On one hand, you might say that this is future proof, [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it), etc. And it's true. On the other hand - let's be **pragmatic**:
- introducing a **one-liner** will certainly cost you less than any discussion about whether it's worth or not
- whenever the product owner comes and asks you to do a cross-cutting change, you won't start looking for a new job, but actually give meaningful response, e.g. you've got ~500 occurrences, where ~100 might seem difficult, but ~400 are straightforward to adapt.
Certainly not all aliases will prove useful, but I guarantee, some of them will **save you enormous amounts of work, effort, and frustration**.

Anyway, most values will usually have no special meaning, e.g.:
- `firstName`, `lastName`
- `address`
etc. You just fetch and display them most of the time.

### Move to Branded Types, when problems arise

Once you find out that a non-money `number` has been passed where _money_ was expected, or when a non-email `string` was where _email_ was expected, etc - you have a proof that type safety could be improved. And that the current type design is leaky. **It's time to switch the alias to a _Branded Type_**!

```ts
export type Money = Brand<number, "MONEY">
export type Skill = Brand<string, "SKILL">
// etc.
```

Hope that was both interesting and useful 😉
