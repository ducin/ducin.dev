
## Community-driven signals APIs

There would certainly be more and more signal-based APIs. It's worthwhile to consider which of the make sense and which don't. [Mike](https://twitter.com/mfpears) sums it up perfectly:

{% twitter 1748076923631059433 %} 

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

### Conclusion

Can you see, how many problems we're solving, which don't relate to our commercial project? 😐

I hope we all clearly see that: **if the problem-solution abstractions don't fit well, better not to implement the solution at all**.

What's the conclusion? If a concept is beyond signals (doesn't fit there), like time, or events - **don't make signals wrap it**.
