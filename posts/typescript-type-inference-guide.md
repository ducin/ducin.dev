# TypeScript Type Inference Guide

New Year is a good opportunity to start a new initiative - and here I go with the first post of a whole serie, where I explain mechanics of TypeScript and my experience of using it since late 2014 in big commercial projects (including sectors: finance, web analytics, ITIL, OSS).

After reading this post, you'll learn:

- what is type inference
- how to use it effectively
- what are key strengths and limitations of type inference
- good practices in real world projects

<% TOC %>

## Motivation

**Type Inference is one of the most important features we should master, as we progress with using TypeScript**. TS is not only about the different types we can declare - and the problems they address. It's also about the style of our code - and how much will TS codebase differ from its direct JS output.

One of the most useful resources when getting started with TypeScript is the [official handbook](https://www.typescriptlang.org/docs). However, it doesn't go too deep into [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) and doesn't provide practical tips on how to leverage it, and so I decided to cover the topic. Anyway, you should definitely check out the handbook.

## Implicit vs Explicit

Whenever we design a system or an API, there are lots of questions we should consider upfront. Some of the questions relate to the domain (the mechanics of the business we're working on), other ones just characterize our system and often can be represented by pairs of extremes. These include whether a service should be _centralized_ or _distributed_ (e.g. redux vs flux), whether the API should be _sync_ or _async_ (native Array methods vs [caolan/async](https://github.com/caolan/async)) and many, many more. In case of TypeScript, **we choose whether type definitions used throughout our codebase should be rather _implicit_ or _explicit_**:

- _implicit_ - is what we read from the context, hidden between the lines. The code is more concise, but sometimes takes more time to reason about
- _explicit_ - is plainly written down. The code is more verbose, but leaves less place for doubts

In TypeScript, **explicit typing** is just declaring what is the type of a variable, such as:

```ts
const number: number = 3 // explicit number
const numbers: number[] = [1,2,3] // explicit number[]
```

**Implicit typing**, however, is removing the responsibility of writing the types down from us and letting TypeScript reason about the types of variables and expressions:

```ts
const number = 3 // inferred as number (implicit)
const numbers = [1,2,3] // inferred as number[] (implicit)
```

## Inference basics

As I wrote, type inference is a powerful feature. If you're familiar with [C#, it's the `var` keyword](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/var). The idea is, basically, that **we keep the type safety of our codebase, but we declare types less. Less investment cost, same profit**.

TypeScript applies type inference in following scenarios:

#### Variable type inference

We declare a value and immediately assign a value to it:

```ts
const bandName = 'Pink Floyd' // inferred as string
```

Look out if you declare a variable that you don't assign any value to **within the same line**:

```ts
let myString // inferred as any
myString = 123 // not what you expected, huh?
```

**When inferring variable types, TypeScript takes into account only the line where the variable is declared**. Other lines, where you might assign some attributes are ignored. Only the first line, no exceptions. We'll get back to so called _implicit `any`_ and the TS compiler flags.

One important thing to note here is the object literal, specifically, empty object literal:

```ts
const obj = {}
```

The inferred type is `{}`. On one hand, JavaScript's native object is a [_dictionary_](https://en.wikipedia.org/wiki/Associative_array) (string -> VALUE_TYPE) which allows to assign any string key to it. On the other hand, there are no "predefined" attributes (known upfront), as we have in OOP class fields. As a result, with above declaration we can access a field with an array notation, but cannot access an arbitrary key:

```ts
const obj = {} // inferred as {}
obj['hello'] = "value" // OK
obj.hello = "value" // FAIL! hello doesn't exist on {}
```

If we want to extend the type definition, we need to type it explicitly (unless we can declare all fields upfront like `{ hello: "value" }`). Explicit type might look like:

```ts
type ObjWithFields = { hello?: string }
const obj: ObjWithFields = {}
```

The optional field (`?`) is required in above snippet, since there is a point in time when the object _doesn't have the field defined_ and it's logically ok in your application. If it's logically not ok, you should remove the `?` and update your codebase so that there's no such situation when the value is missing (and TS will help you find all of these). Basically, it's about [satisfying the predicates within your code](https://en.wikipedia.org/wiki/Predicate_(grammar)#In_modern_theories_of_syntax_and_grammar).

This will be important when be define the return type of `Array.prototype.reduce` later on.

#### Expression type inference

Using any expression we've got in our program, other expressions and variables will calculate their type upon it:

```ts
const bandNameDraft = bandName // inferred as typeof bandName
                               // string in this case
```

This can be applied multiple times within our codebase, thus creating a directed of expressions within our codebase. Cool and easy to use.

#### Runction return type inference

Let's take a look at this tiny function:

```ts
const hello = (firstName, lastName) =>
  `Hi there, ${firstName} ${lastName}!`

// no need to define return type:
// const hello = (firstName, lastName): string => ...
```

TS infers that the return type of the function is a string, since ES6 template string literal is used (would be the same, if we used `firstName + " "` etc, since it casts the expression down to a string). So `hello` is of type:

```ts
(firstName: any, lastName: any) => string
```

#### Compiler Flags

One of the bad practices TypeScript developers follow is ignoring the [`--noImplicitAny` and `--noImplicitThis` compiler flags](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for TypeScript compiler:

- `--noImplicitAny` will complain about each line where TS cannot infer anything better than `any`. Usually that's either lines like `var x;` or function parameters left alone.
- similarly, `--noImplicitThis` will complain about each line where we use the `this` reference within a function and TypeScript has no way to infer what it is precisely, leaving it as `any`, which open our codebase to nasty bugs.

In both cases we open our codebase for bugs. Always remember to set these flags in `tsconfig.json`. It won't take you much time to declare the types (or help type inference work), but it'll surely save you from many painful moments!

## Limitations

It's important to highlight that there are limitations to this language feature. The three most significant ones are:

#### Function parameters are not inferred

As we've seen in the last snippet above, **function parameters are never inferred. Never. Again, no exceptions. `any` is attached, if no explicit declaration.** This surely is a limitation, but if we wanted TS to infer what is the function parameter type, we'd have to go through all the places where the function is called and analyze the invocations. That's doable, of course, and we would get a list of types of all expressions passed as arguments to the function. But actually, the philosophy behind TypeScript is slightly different, more kind of _bottom-up_ approach. When we declare a function, we restrict how it can be used, so that all invocations are strictly checked if they're correct. We could say that when we type function parameters, we introduce a checkpoint.

So on one hand, no inference over function params is a different approach to solve the static typing problem, compared to analyzing all invocations and treating them as the base for determining function params. And on the other hand, it would introduce lots of complexity and potentially slow down the compilation. As for now, TypeScript team decided not to introduce inferring function parameters inference (contrary to [Flowtype (BTW, hence the name _flow_ LOL)](http://flowtype.org)).

**If we want to have strict types defined for function parameters, there's no way around it, we simply have to declare them explicitly**, no inference here:

```ts
(firstName: string, lastName: string) => string
```

Not a big effort, as you can see.

#### External data sources are not inferred

... because there's no way to do it! **External data sources include both asynchronous operations (websocket events, promises, async await, observables) and synchronous operations (e.g. reading JSON from a file)**. TypeScript controls all declarations and expresions within our codebase, but all external data is out of reach.

TypeScript capabilities are used only in compile-time, but once compiled, we've got JavaScript output - and it's JS that gets executed in runtime. So whether some external data would get fetched synchronously or asynchronously, there's no TypeScript in runtime anymore. And if there's no TS, there are also no TS types and no TS type checks.

Can you think of any way TypeScript could infer what is the shape of the JSONs we're about to receive from a remote system, as below?

```ts
http.get('https://my.api.com/users') // return a promise
  .then(result => consume(result))
```

What we can do is to arbitrarily and explicitly declare what we expect there:

```ts
type User = {
  firstName: string
  lastName: string
}

http.get('https://my.api.com/users') // return a promise
  .then((result: User[]) => consume(result))
```

or, preferably, wrap it in a function just to solve the problem once for all invocations:

```ts
// specialized promise-returning function
const getUsers = (): Promise<User[]> =>
  http.get('https://my.api.com/users')

// and usage:
getUsers().then((result: User[]) => consume(result))
```

TypeScript will take care about how do we use the `result` value within our code, for instance, following line would fail:

```ts
promise
  .then((result: User[]) => result.map(u => u.name)) // FAIL! name doesn't exist on User
  .then((result: string[]) => consume(result))
```

Additionally, an interesting question is if TypeScript is going to type check the result in the runtime, by injecting additional code into JavaScript output (raising an Error if the response shape is not as expected). This would be perfectly doable, just a couple of JS `typeof` statements. In order to answer it, the TS team had to answer another two questions:

- should a client application (the one sending the request) be **also** a tester for the server that it connects to? Shouldn't the server be responsible for testing itself?
- TS defines fundamental rules: _"valid JavaScript code is valid TypeScript code"_ and the other way round: _"TypeScript is just JavaScript + type definitions"_. The consequence of the latter is that TS output is just removing types and here you go your JavaScript. **No additional output** (except for transpilation such as ES6 -> ES5, which has to be done anyway, same with Babel). Thanks to it, getting started with TS (not becoming an expert) is very easy, since the difference between JS and TS is only types. Going back to webservices type checking - if async responses type checking would be transpiled into the JS output, this rule would be violated, i.e. JS output would be _something more than_ just TS without types. And that (the simplicity) was the point.

And so the TypeScript team decided not to do that.

#### Functional composition is not inferred

Finally, the limitation tht hits many FP-based implementations is that utility functions such as `compose` and `pipe` are not correctly typed out of the box. It's doable, however, it requires a hacky workaround.

In short, the `compose` operator (or `pipe`, the logic is the same, but the direction might be reverse according to some naming conventions) works the same as Unix-style pipe. That is, output of fn1 becomes the input of fn2, output of fn2 becomes input of fn3, etc. So there's _a value_ that travels through a _pipe_ of functions, each altering the result (each of the functions might be stateful or stateless). The result of the final function is the result of the whole composition invocation. The code looks pretty much like this:

```js
import { compose } from 'my-favourite-lib'

const process = compose(
  filter(x => x > 0),
  map(x => x**2),
  distinct()
)
const result = process([-2, -1, 0, 1, 2, 2])
// returns [1, 4] if each step processes arrays
```

So the bottomline is: TypeScript doesn't currently provide a neat way to type the `compose` (`pipe`) itself. The workaround is to provide [function signature overloads](https://www.typescriptlang.org/docs/handbook/functions.html). And these have to support each cases separately (1 function composed, 2 functions composed, 3 functions composed... and define as many as you can since [there's no induction included](https://en.wikipedia.org/wiki/Mathematical_induction) LOL). These declarations grow to really big size.

Take a look at these typedefs:

- [Ramda `compose` utility](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b470489bc1825274193db2734b59b95e7add857a/types/ramda/index.d.ts#L344-L382)
- [lodash `compose` utility](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0d851ec6994d2077ab06b79d4877a195396f4ef8/types/lodash/fp.d.ts#L4454), which links to internal [`LodashFlowRight`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0d851ec6994d2077ab06b79d4877a195396f4ef8/types/lodash/fp.d.ts#L309-L347)
- [RxJS `pipe` operator](https://github.com/ReactiveX/rxjs/blob/bd0b6ca0db5ff9f6050efe842a80e156f5272977/src/internal/util/pipe.ts#L5-L15)

For the lazy folks (or mobile readers) here you go what it looks like:

```ts
export function pipe<T>(): UnaryFunction<T, T>;
export function pipe<T, A>(fn1: UnaryFunction<T, A>): UnaryFunction<T, A>;
export function pipe<T, A, B>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>): UnaryFunction<T, B>;
export function pipe<T, A, B, C>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>): UnaryFunction<T, C>;
export function pipe<T, A, B, C, D>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>): UnaryFunction<T, D>;
export function pipe<T, A, B, C, D, E>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>): UnaryFunction<T, E>;
export function pipe<T, A, B, C, D, E, F>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>): UnaryFunction<T, F>;
export function pipe<T, A, B, C, D, E, F, G>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>): UnaryFunction<T, G>;
export function pipe<T, A, B, C, D, E, F, G, H>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>): UnaryFunction<T, H>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>): UnaryFunction<T, I>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>, ...fns: UnaryFunction<any, any>[]): UnaryFunction<T, {}>;
```

As said, it is a limitation, but **TypeScript libraries users don't suffer from it. Rather, TypeScript libraries/typedefs authors have to write it down. So the probability you'd fall into such situation is super small.**

## Example data structure

In the following sections we'll use the following data. We've got a collection of music bands with their names and genres assigned:

```ts
type Genre = 'psychedelic' | 'progressive rock' | 'rock n\'roll' | 'classic rock'

type Band = {
  id: string
  name: string
  genres: Genre[]
}

const bands: Band[] = [{
  id: '4cb87850-14e7-495d-99d6-50a2b09dfa2f',
  name: 'Pink Floyd',
  genres: ['psychedelic', 'progressive rock']
}, {
  id: 'dbdbb15a-b129-41c0-a9ce-df52bba6bcae',
  name: 'The Beatles',
  genres: ['rock n\'roll', 'psychedelic']
}, {
  id: 'befb6abb-8012-46de-a639-ebbc82c3fc8d',
  name: 'King Crimson',
  genres: ['progressive rock', 'classic rock']
}, {
  id: 'ffedad2c-c5ed-42fa-ba2e-a6091a4d7ad8',
  name: 'The Rolling Stones',
  genres: ['psychedelic', 'classic rock']
}, {
  id: 'e22ce329-f925-4020-9b61-f405e750fbf5',
  name: 'The Doors',
  genres: ['psychedelic', 'classic rock']
}]
```

We'll see them in action in a while.

## Prototype-based chaining

One of the super-useful features of TypeScript is the ability to apply the correct types in chained operations such as native `Array` methods or RxJS operators (until v5, where FP-based piping becomes the standard). The mechanics is pretty simple - given a well-defined structure and an operation which we know what it returns, we can perfectly determine what is the input of the next step.

Let's start with something simple:

```ts
const ids = bands.map(b => b.id)
```

We know that `bands` is of type `Band[]`. We also know, that `Array.prototype.map(cb)` will transform `T[] -> U[]` given a callback that can do: `T -> U`. In above case, `T` is `Band` and `U` is `Band["id"]`, that is, a string. So we're mapping an array of objects into array of strings. The `ids` variable is automatically assigned (inferred) to be `string` (or `Band["id"][]`, if we prefer it).

Let's query all genres that we've got accessible now:

```ts
const genres = bands.map(b => b.genres) // string[][]
```

After the first line we've got a list of genres of all bands, which is a list of list of genres. Let's chain the operations:

```ts
const genres = bands.map(b => b.genres) // string[][]
  .flat() // string[]
```

Now, the result is just flattened, so we have repetition. Which we now want to remove using ES6:

```ts
const unique = (genres: string[]) => Array.from(new Set(genres))
```

The `unique` function removs repetition according to the semantics of how do `Set` elements are stored (we'll ignore the `identity` function for now). But we can do better, using **generics**:

```ts
const unique = <T>(items: T[]) => Array.from(new Set(items))
```

And we've got a more generic function that will remove our genres repetition:

```ts
const genres = unique(
    bands.map(b => b.genres) // string[][]
    .flat() // string[]
  ) // string[]
```

The power of TypeScript is that above code doesn't have any explicit type definitions at all (no `: string`), but everything is type-safe.

## `array.reduce`` and the accumulator type problem

Let's carry on with Array methods, this time: `reduce`. Array reduce is special in a way that all other Higher-order functions can be implemented using it. In other words, reduce is the most general out of all HOFs on arrays. Reduce defines an iteration over a collection, where an accumulator (aggregate, whatever we call it) is passed between all steps. A single step of the loop is performing an operation of the item of the collection being iterated over, the aggregate is updated and returned to the next step. So the aggregate is passed through all the steps.

In following example we want to create a map of genres (map is a `key: value` data structure), where values will be a list of bands that play that genre:

```ts
const genreMap = bands.reduce((aggr, band: Band) => {
  band.genres.forEach(g => {
    if (!aggr[g]) {
      aggr[g] = []
    }
    aggr[g].push(band)
  })
  return aggr
}, {})
```

Above code has `band: Band` set and, deliberately, the `aggr` is left for implicit typing. In a single step we apply that certain genres do include the band we've got in this step.

The important part here is we've got the aggregate in a couple of places:

- `aggr` in the top line (left for inference)
- the initial value at the bottom line, `{}`
- used i few places internally

Using the TS typedef of the native `Array.prototype.reduce`, all these are the same thing (as a result, if we provide multiple explicit type declarations, they have to [be compatible](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)).

As we previously said, when we define an empty object, it's inferred just as an empty object: `{}`. We can access its keys using the array notation, but we can't access it with an arbitrary field:

```ts
genreMap['psychedelic'] // OK
genreMap.psychedelic // FAIL! psychedelic doesn't exist on {}
```

**In case you've ever solved that issue using `any`: don't do that! Ever.**

Another issue we've got is that `genreMap['psychedelic']` is inferred as `any`, since `{}` carries no information about the value type.

What we can do in this situation is to define an [index signature](https://www.typescriptlang.org/docs/handbook/interfaces.html):

```ts
type GenreMap = {
  [genre: string]: Band[]
}
```

Now `genreMap['psychedelic']` infers to `Band[]`. This is already better. Moreover, `genreMap.psychedelic` is correct. But sometimes we can go even further, if we know that **not all strings are allowed within the keys**, just as our genres are limited to distinct 4 values. An index signature based on string literal looks like the following:

```ts
type GenreMap = {
  [genre in Genre]: Band[]
}
```

Finally, we apply it to our reducer snippet: 

```ts
const genreMap = bands.reduce((aggr: GenreMap, band: Band): GenreMap => {
  band.genres.forEach(g => {
    if (!aggr[g]) {
      aggr[g] = []
    }
    aggr[g].push(band)
  })
  return aggr
}, {} as GenreMap)
```

As you can see, I've placed the type in three places, but that's not necessary (the bottom line would be enough). At the end of the article we'll cover how man places shall we _hammer_ with explicit types and which ones are good to left inferred automatically.

## Flexibility

One of the strongest points against TypeScript, stated by JavaScript developers, is that _"writing types down take time"_. Well, sure it does, JavaScript doesn't support static typing so that this **is** some extra cost. Whenever we choose to use TypeScript or not, we have to take into account that **software changes over time and the code that we just wrote will be different after few months or few years. And the benefits of TypeScript is not necessarily for today me, but for all the people who would work on my code**, including me after six months ;) ([who wrote this crap?](https://www.improgrammer.net/wp-content/uploads/2017/09/Who-wrote-this-crap-code.png)). So TypeScript is an investment in easier reasoning about the code in future.

Anyway, **when making good use of type inference we can singnificantly limit the cost and also gain flexibility**. We leave less critical expressions and variables for type inference (implicit types), usually somewhere deep inside a function implementation. For these non-critical places:

- we don't have to type _that_ much and our code is not _that_ verbose
- as code changes, we have less places ot update, when extending or refactoring

Basically, we reduce the cost. But we should also track these critical places, which we type explicitly. That's because, if anything important changes in our project (like a domain object structure change), we should also manually update any places we use it. TypeScript will find all the errors for us, but that's something we shouldn't necessarily leave for type inference. **Too much type inference makes too much types change, potentially, leaving us unaware of that.** If a compilation error appears, we'd have a longer path to follow until we find what should get updated.

## Type inference - Best Practices

Good candidates for explicit typing are:

- **All external operations (both sync and async)**. TypeScript won't check them in runtime, but we can make it check whether we consume them further correctly.
- **Data structures**. We are supposed to declare as many `type`s and `interface`s as our domain requires. Often, this can be automated in a _Contract-First Design approach_. Functions and objects that rely on the data structures should be full of data structures typedefs.
- **Function parameters and, initially, function return types**. Function parameter types has to be typed explicitly (since TS doesn't do that). **Function return explicit types are a mean to check if my implementation matches my intention**. Depending on the complexity of a function, you can leave the return type or remove it (e.g. if it's an obvious one-liner).

## Summary

The key points you should remember are:

- Type inference is one of the fundamental concepts one has to master, if TypeScript is to be used effectively.
- Type inference reduces the _cost of typing_ and at the same time type safety remains the same.
- We should keep a good balance between what we type explicitly and implicitly. Thanks to it, refactors are cheaper and more predictable.
- Too much type inference makes too much types changes, potentially, leaving us unaware of how far changes go.
- Finally, set at least the `--noImplicitAny` and `--noImplicitThis` compiler flags.
