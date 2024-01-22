<small><i>Photo by <a href="https://unsplash.com/@alinnnaaaa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alina Grubnyak</a> on <a href="https://unsplash.com/photos/low-angle-photography-of-metal-structure-ZiQkhI7417A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></i></small>

# Signals are VALUES, not EVENTS

Recent release of [Angular 17.1](https://github.com/angular/angular/releases/tag/17.1.0) (yesterday, 18th January 2024), introduces **Signal Inputs** ([read more about Angular Signal Input API here](https://dev.to/this-is-angular/diving-into-type-system-behind-angular-signal-inputs-2b88)):

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Signal Inputs coming soon to <a href="https://twitter.com/hashtag/angular?src=hash&amp;ref_src=twsrc%5Etfw">#angular</a> !!!!!1 <a href="https://t.co/aBuzH9lnaP">pic.twitter.com/aBuzH9lnaP</a></p>&mdash; Tomasz Ducin (@tomasz_ducin) <a href="https://twitter.com/tomasz_ducin/status/1740305588280574153?ref_src=twsrc%5Etfw">December 28, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It's a good opportunity to rethink **migrating from RxJS to Signals,** as more and more APIs are signal-based: the framework ([signals, computeds, effects](https://angular.io/guide/signals) and the [rxjs-interop](https://angular.io/guide/rxjs-interop)) and ecosystem ([NGRX signal store](https://ngrx.io/guide/signals/signal-store)), as well as tons of experiments ([such as this one](https://github.com/nartc/ngxtension-platform/pull/229)).

<% TOC %>

----

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/Angular?src=hash&amp;ref_src=twsrc%5Etfw">#Angular</a> Signals are VALUES, not EVENTS.<br>Don&#39;t replace all <a href="https://twitter.com/hashtag/rxjs?src=hash&amp;ref_src=twsrc%5Etfw">#rxjs</a> with signals.</p>&mdash; Tomasz Ducin (@tomasz_ducin) <a href="https://twitter.com/tomasz_ducin/status/1747952979326423309?ref_src=twsrc%5Etfw">January 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The amount of positive reception of above tweet made me realize this topic **needs more attention among the Angular community**.

On one hand, we've all heard that **signals won't _entirely_ replace RxJS** (especially that Angular is on the road to make RxJS optional in the future). On the other hand, the **new reactive primitive** is taking the ecosystem by storm and, no wonder, it's easy to lose touch with the design principles and start **overusing** signals everywhere. Just like redux used to be **abused** at some point. Or like Observable Streams used to be **abused**. Are we gonna share Georg Hegel's view, that:

> "_We learn from history that we don't learn from history._"

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;we learn from history that we don&#39;t learn from history&quot; <a href="https://t.co/mhDcXuyA9z">pic.twitter.com/mhDcXuyA9z</a></p>&mdash; Tomasz Ducin (@tomasz_ducin) <a href="https://twitter.com/tomasz_ducin/status/1748083824238485544?ref_src=twsrc%5Etfw">January 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<small>okay no more my tweets 😇</small>

## Micro disclaimer

I enjoy using signals, I enjoy using rxjs observables - so I'm no pro/against in any way. Also I enjoy using [MobX](https://mobx.js.org) (doesn't [MobX API](https://mobx.js.org/api.html) look familiar to you? 🙃), I enjoy [bacon](https://baconjs.github.io/)... I enjoy pretty much all the tools that help me get my job done. My intention in this post to emphasize, again, that **every tool has it's certain usecases**. And that **excitement is the worst factor that could drive decision making in software development**. Cool down 🥶

## Facts

Let's start with revisiting the fundamental characteristics of signals and observable streams (they're mostly well known, so I'll just list them down):
- sync/async
  - observables can do both **sync and async** processing
  - current signals implementation is capable of **sync processing only**
  - as a consequence, signals are **unaware of the passage of time**
- **some APIs will always be async** no matter what we prefer or believe in `¯\_(ツ)_/¯`, such as HTTP or browser events
  - replacing decorated `@Output()` with signal-based `output()` (not yet in v17.1) will be purely syntactic sugar, as events will be emitted underneath nevertheless
  - squashing async processing into sync signals generates [some non-trivial questions](https://twitter.com/tomasz_ducin/status/1746996356210684129)
- subscriptions
  - RxJS requires manual (un)subscription handling
  - signals handle (un)subscription 100% automatically
- late subscriptions
  - both APIs handle late subscriptions
- values/emissions
  - signal **always has a value** (like in `BehaviorSubject`)
  - observable streams **might have values**, but streams with no emissions whatsoever are absolutely valid(`------->` - no `next`, no `error`, no `complete`, nothing)
- **re-implementing** RxJS features as signals one by one (like operators, subjects etc.) **makes barely any sense**
- API
  - RxJS has ~100 operators, 4 subject types, 32 types of hot observables (expect a blogpost soon! 🔥), all unicasting/multicasting concepts, etc.
  - signals have barely ~10 functions (signal, set, update, computed, effect, untracked, asReadonly, toSignal, toObservable, perhaps something more). Order of magnitude difference...

## Readability

I'll be honest - when people say they find something readable or not... or easy... or simple... I tell you: I don't care much 😉 people often forget that we have different background and experience. That readability has no way to be measured, and is purely 100% subjective. Like, my mother tongue is Polish and, surprise surprise, I can understand quite a lot from other Slavic languages. So what? So nothing. It would be strange if I didn't 🤷.

And same here. I love signals from the first day. But that's mainly because I have commercial experience in MobX which is, conceptually, 1:1. For every person, a thing being readable or not is ultimately subjective and - my tiny recommendation here: don't pay too much attention to _readability_. Unless you like [bikeshedding](https://en.wikipedia.org/wiki/Law_of_triviality).

## Missing piece of understanding

[Alex](https://twitter.com/synalx) has once described signals the following way:

> _A signal is a source of value._

That makes perfect sense. However, if I asked you the following question:

> _What a signal is **NOT**? What shall **NOT** be represented as a signal?_

What would be your answer?

[Coding itself is rather simple, but software design is not](https://twitter.com/tomasz_ducin/status/1747610779065421843). If we pick a [wrong abstraction](https://twitter.com/tomasz_ducin/status/1747676969343373539) and keep on implementing things on top of it, then despite that our code might work as expected, we'd see things are unnecessarily harder than they should be. Within time we'd start fighting our code and design, more and more, and feel the need to refactor/rewrite some piece of an app.

**So what a signal is NOT**? I suggest one of the following:
- something that **doesn't have a current value**, e.g. user events, browser events
- something that **has a current value, but it's completely irrelevant**, an action that a user wants to reload a data-table

So I want to draw a boundary between **VALUES** and **EVENTS**.

All in all, I would rephrase the definition to:

> _A signal is a source of value, but NOT a source of events._

## Values are some DETAILS, characteristics that a thing can have

We can always ask (_pull-based_) what the value is. We can also be notified about a value which has changed (_push-based_). That's why RxJS is a valid abstraction around pretty much everything that exists 😉. But still, **if something has a value, you can always ask for it**.

## Events describe what has already HAPPENED or what will happen

The events, on the other hand, are meant to notify (_push-based_) others about something that happened. There is an important distinction between [**events**](https://en.wikipedia.org/wiki/Event_(computing)) (something has happened already) and [**commands**](https://en.wikipedia.org/wiki/Command_pattern) (something will happen and we pass a command to be executed) but it's a topic for another post.

The distinction between **VALUES** and **EVENTS** is very clearly expressed in the _original_ `redux` store API:
```js
store.getState(): STATE // pull-based value accessor
store.subscribe(FN): void // push-based value accessor
store.dispatch(ACTION): void // push-based event notification
```

## Couldn't events be values or vice versa?

Someone might deny:

> _Hey, but **events** are objects, they might have payloads, and what is a payload if not a **value**?! (object, primitive, whatever)_

Sure. Technically - yes, absolutely. But, taken to extreme, everything is a value. Even your mouse cursor's coordinate is a value. But when we do **design**, we want to create mental models that are **pragmatic**, help us **put things in order**, and **make other devs comfortable** within the design that we leave. Taking things to extreme doesn't help.

It all depends on the **terminology** we use and the **context** of our **reasoning**, so - _could events be values_ - both yes and both no.

My strong recommendation is to focus on what is the **intention** of how are we going to use a thing:
- are we going to access details of something (value)? or
- do we get notified that something has happened (or will happen)?

## Community-driven signals APIs

There would certainly be more and more signal-based APIs. It's worthwhile to consider which of the make sense and which don't. [Mike](https://twitter.com/mfpears) sums it up perfectly:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If you can come up with a good, accurate name for the thing, then go ahead. But if the name hides details you actually have to know about and you constantly have to renegotiate how you use that abstraction, you&#39;d be better typing the extra lines of code until you figure it out.</p>&mdash; Mike F. Pearson (@mfpears) <a href="https://twitter.com/mfpears/status/1748076923631059433?ref_src=twsrc%5Etfw">January 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Example: interval

I want to focus on just ONE example, but do it very deep. In the react world (where I come from 😜) one of the mindshifting blogposts is [Dan Abramov](https://twitter.com/dan_abramov2)'s [*Making setInterval Declarative with React Hooks*](https://overreacted.io/making-setinterval-declarative-with-react-hooks/). I decided to pick `setInterval` as well.

So, could you make an async interval signal? Technically, yes, of course:

```ts
function intervalSignal(interval){
  const idx = signal(0)
  const id = setInterval(() => {
    idx.update(value => value + 1)
  }, interval)
  return idx
}
```

But should you? No. **Totally No**.

**Why?** Because, although technically we could easily make things work, we're mixing abstractions badly. **Mixing abstractions will always have some shortcomings**. What are these?

### Missing support

We're also missing support for potentially important aspects. I hope many of you already thought: _why aren't you cleaning up the signal?!_ Great, so here we go:

```ts
function intervalSignal(interval){
  const idx = signal(0)
  const id = setInterval(() => {
    idx.update(value => value + 1)
  }, interval)
  return {
    cleanup(){ clearInterval(id) },
    signal: idx
  }
}
```

but hey, our implementation more complex and, as a consequence, longer.

### Fixes. Fixes everywhere.

Have you noticed, that if we expose a `WritableSignal` (signal still includes the `.set`) method, then we're leaking encapsulation - probably overwriting the current _tick_ shouldn't be possible from outside of the signal. So, instead, it should be:

```ts
  ...
  return {
    cleanup(){ clearInterval(id) },
    signal: idx.asReadonly()
  }
```

But, trust me, we haven't exhausted all edge cases yet 😈

### Signal Interval is pretending to be time-aware

In the last version of the signal (interval + cleanup + asReadonly) there's still no simple API that allows us to modify the interval (time) length. In RxJS we could simply use a `switchMap` which consumes the interval upstream:

```ts
intervalLength$.pipe(
  switchMap(timeLength => interval(timeLength))
)
```

Again, could we achieve the similar API with signals? Of course! (but I'm not falling down the rabbit hole 😏). Anyway, as the signal code gets more complex:
- we should take potential edge cases into account, right? And most probably we're bikeshedding and it's far away from the business solutions we're expected to work on...

### API design

We also need to [carefully design APIs (again)](https://twitter.com/tomasz_ducin/status/1747610779065421843). Potential breaking changes come into play. Also, how much of your application code should re responsible for platform-related things, like intervals, events, HTTP, etc?

In case of changing the interval length, should we go one more setter callback?

```ts
function intervalSignal(interval): {
  signal: Signal<number>
  cleanup: () => void,
  setIntervalTime: (time: number) => void
}
```

This seems simple, but the signal API has become rather callback-based. Perhaps wrapping interval with a signal would look better to use signals more:

```ts
function intervalSignal(interval): {
  valueSignal: Signal<number>
  cleanup: () => void,
  intervalTimeSignal: Signal<number>
}
```

which one is better?

### Wrong Abstractions, AGAIN

There's one important thing we will consider 😄 there might be situations, where we need to process values of the signals and a `signal`/`computed` fits here, since it can notify computeds further. But other times, it's fairly enough to make it an `effect`, as the consumption would be placed within the effect function and there would be no further dependencies (nobody would have to react to the effect taking place. Potentially that could have been a better choice from the beginning...

However, we can't guarantee that `effect`s would be better than `signal`s in all cases.

## Conclusion

Can you see, how many problems we're solving, which don't relate to our commercial project? 😐

I hope we all clearly see that: **if the problem-solution abstractions don't fit well, better not to implement the solution at all**.

What's the conclusion? If a concept is beyond signals (doesn't fit there), like time, or events - **don't make signals wrap it**.

So, to sum it all up - what is the most important factor that differentiates **VALUES** from **EVENTS**? It's **_TIME_**. **VALUES** don't care about time. **EVENTS** do.

Pay attention to time. As time is running out. ☠️

----

[Follow me on twitter](https://twitter.com/tomasz_ducin) for more frontend (js, ts, react, angular etc.) deep dives!