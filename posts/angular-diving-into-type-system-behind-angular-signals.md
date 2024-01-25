_Original version of this writing has been published as a [twitter thread](https://twitter.com/tomasz_ducin/status/1740150999770378592). However, I was convinced by @eneajaho to convert it into a blogpost_ 😎. _I decided to leave the original form: quick, easy-going and concise._

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🔥💪 dive into type system behind <a href="https://twitter.com/hashtag/angular?src=hash&amp;ref_src=twsrc%5Etfw">#angular</a> Signal Inputs 💪🔥<br><br>🛠️ first - examples<br>🥩 then - internals<br><br>🔨 TRY IT YOURSELF: <a href="https://t.co/JysdC74dE7">https://t.co/JysdC74dE7</a><br><br>🪄 the trick:<br>import { ɵinput as input } from &#39;@angular/core&#39;;<br><br>a 🧵 with explanation below 👇 <a href="https://t.co/PcBAdWe5Ip">pic.twitter.com/PcBAdWe5Ip</a></p>&mdash; Tomasz Ducin (@tomasz_ducin) <a href="https://twitter.com/tomasz_ducin/status/1740150999770378592?ref_src=twsrc%5Etfw">December 27, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

----

As you may know, **Signal Inputs** are coming to Angular in mid January 2024 in version 17.1. But we can actually play with them already, or at least, take a look at their _almost public_ API. In this post we'll take a deep dive into the type design of Signal Inputs internals, its consequences, and a lot of examples of Signal Inputs usage.

## Demo code

Just to make it more entertaining for people who want to see how things work under the hood, I'm going to keep using `ɵinput` even though the `input` is publicly available since the `v17.1` release. Perhaps you might want to do a similar play one day?

So we're gonna expose what the Angular Team has been hiding from us...

🪄 **the trick is**: 
```ts
import { ɵinput as input } from '@angular/core';
```

**don't do this at home 😈!**

Following stackblitz allows you to see Signal Input declarations. Note that there's no Signal Input implementation within angular as of now (`v17.1.0-next.5`), so we'll focus on declarations/public API only.

<iframe width="100%" height="500" src="https://stackblitz.com/edit/angular-signal-inputs?embed=1&file=src%2Fmain.ts&view=editor"></iframe>

## ToC

🛠️ first - examples
🥩 then - internals

We'll analyze the examples from above stackblitz one by one, and later we'll analyze the internals & types underneath.

## Examples

We'll start with lots of examples. Take a look at the first one:

🔍 initial value is used to infer the input's type, same as with ordinary signals:

![signal usage screen](images/blog/blog-screenshot-signals-1.png)

⚠️ Input Signals are **READONLY**, which makes sense, since it's the parent component who can put new values (via templates) into the input signal, not us 😉

![signal usage screen](images/blog/blog-screenshot-signals-2.png)

One of my favorite design decisions:
💪 taking advantage of (1) #typescript's possibilities and (2) applying best solutions from other frameworks. In this case: from React

💜🩷💜 love it 🩷💜🩷

![signal usage screen](images/blog/blog-screenshot-signals-3.png)

Less exciting - and **IMHO** it should be **_avoided as much as possible_** (since it decreases readability and the understanding of how components exchange data) - **aliasing** is allowed:

📡 aliased name is used by parent to pass the data
🔐 the prop name is used internally (obviously)

![signal usage screen](images/blog/blog-screenshot-signals-4.png)

Another logical design decision:
💪 since an input is **REQUIRED**, passing initial value makes no sense 😉 so it's removed from the signature

![signal usage screen](images/blog/blog-screenshot-signals-5.png)

Here the `initialValue` parameter is removed from the function (overload) signature. Or to be more precise - it's never added (never allowed) to be there 😉

So, technically speaking, TypeScript would try to pass your initial as options object which obviously fails.

![signal internals code](images/blog/blog-screenshot-signals-6.png)

And one more example - `transform` is allowed only when passing both `ReadT` and `WriteT` type parameters. More on this later...

![signal usage screen](images/blog/blog-screenshot-signals-7.png)

<% SUBSCRIBE %>

# Internals

Now let's see 🍖 some internals 🥩

![signal internals code](images/blog/blog-animation-meat.gif)

To get a broad overview of the direction, you might be interested in taking a look at the ➡️ [Angular Team's _Sub-RFC 3: Signal-based Components_](https://github.com/angular/angular/discussions/49682) which deals with, more or less, how to make use of signals in Angular Components. Also, you can ➡️ [take a look at the code itself](https://github.com/angular/angular/tree/main/packages/core/src/authoring). Anyway, let's dive into the internals!

We've got 2 new signal symbols:

![signal internals code](images/blog/blog-screenshot-signals-8.png)

it's the same usecase, as with the former unique Signal symbol - it allows to restrict compatibility across different (input) signals.

For instance:
✅ one can assign the `InputSignal<number, number>` to an ordinary `Signal<number>`

![signal internals code](images/blog/blog-screenshot-signals-9.png)

Proof:

1. need to make ordinary signal **READONLY** so that TS compares 2 readonly signals (input signals are **READONLY**)

2. where a string signal is expected, a string input signal is acceptable, since it has all required (needed) properties.

3. ❌ but the other way round it fails, since an ordinary string signal doesn't have the brand read/write signals.

![signal compatibility proof code](images/blog/blog-screenshot-signals-10.png)

Reassigning signals, however, is not going to be anyhow common 😉. But the Angular compiler also makes use of the symbols internally.

Now, this is where we get the signals API from. There's a completely **separate implementation** for optional and required inputs. It's just exposed as a convenient API:

```ts
s1 = input()
s2 = input.required()
```

![signal internals code](images/blog/blog-screenshot-signals-11.png)

The sad thing, however, is that currently we cannot see its runtime.

(_disclaimer: as mentioned above, ng v17.1 is expected very soon, this analysis uses `v17.0.1-next.5`_).

![signal internals code](images/blog/blog-screenshot-signals-12.png)

Now let's take a look back at input transform:

![signal usage code](images/blog/blog-screenshot-signals-13.png)

However, you might be wondering what the heck is going on with this function overload and the strange declaration at the bottom:

![Image description](images/blog/blog-screenshot-signals-14.png)

First of all, if we pass `<ReadT>` only, we **can't** pass the input transform (that's the same as with current 

```ts
@Input
({ transform: ... })
```

![signal internals code](images/blog/blog-screenshot-signals-15.png)

However, if we pass **both** `<ReadT, WriteT>`, we can additionally pass the transform. Note that:
- `ReadT` is the expression type you want to use inside your component
- `WriteT` is the expression type that is passed from outside

![signal internals code](images/blog/blog-screenshot-signals-16.png)

Another example:

![signal usage code](images/blog/blog-screenshot-signals-17.png)

Going back to our nice declaration 🥴 let's focus on `inputFunction` first:

![signal internals code](images/blog/blog-screenshot-signals-18.png)

It has 3 overloads on its own:
- take no initial value and extend inner value with undefined
- take the initial value with `ReadT` type param only (opts WITHOUT transform)
- take the initial value with both `ReadT, WriteT` type params (opts WITH transform)

All usecases seen before 😎💪

![signal internals code](images/blog/blog-screenshot-signals-19.png)

All in all we've got 3 overloads for the `prop = input()` (optional)
... and 2 overloads for the `prop = input.required()` (required)

![signal internals code](images/blog/blog-screenshot-signals-20.png)

Phew 😅 that was quite a lot. Hope you enjoyed that.

# Conclusion

We've seen quite a few examples on how certain usage of input signals affect underlying TypeScript types. Each usage depends on your specific needs in a specific situation. However, you should always pay attention to what types get declared/inferred in each case, as type-safety is one of the most important factors that form overall code quality.

Underlying Signal Input types are very well defined, but it's always your responsibility to verify, whether a given input should be optional or required in the long run. **Types should only reflect your design**.

Remember you can play with it [on this stackblitz](https://stackblitz.com/edit/angular-signal-inputs?file=src%2Fmain.ts). It includes the code of all examples.
