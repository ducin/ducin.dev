# There are no "hot" Observables in RxJS

<small><i>Photo by <a href="https://unsplash.com/@pawel_czerwinski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pawel Czerwinski</a> on <a href="https://unsplash.com/photos/red-and-blue-wallpaper-6lQDFGOB1iw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></i></small>

So I caught your attention? Good! Because I want you to look at the _"HOT and COLD" Observables_ concept from a different perspective... it's one of the **most confusing oversimplifications** I've had to deconstruct over and over again since quite a long time.

Okay, to be fair... it is quite useful when we introduce RxJS to a **complete beginner**. But as soon as they dive into real project usecases, e.g. **late subscription** of a **newly rendered** component that **subscribes** to a (behavior? replay?) **subject** which had **already emitted something** - then the "_hot and cold_" concept is... harmful.

The [following aphorism](https://en.wikipedia.org/wiki/All_models_are_wrong) illustrates it quite well:

> _All models are wrong, but some are useful._

However, I would add: _useful, but **until a certain point!**_

<% TOC %>

## False dichotomy

The "problem" with the "_hot and cold_" concept is that it implicitly suggests that there are **two types** of Observables. Only two. And yes, when you read the explanations ([like this legendary one by Thoughtram](https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html)), you know that **reality is more complex** 🙂 but when I join a team in order to do some [frontend consultancy services](https://ducin.dev) (or run a [Angular/Rx training](https://ducin.dev/trainings)), **developers most often think in either-or**. Either hot or cold.

I hope you are one of those truly passionate devs who dig into things, dive really deep, seek for understanding. You might already know that there are dozens of completely different types of "hot". But the majority of the industry isn't like this. **We're all responsible for the concepts and metaphors we introduce**.

So it depends on how we count these things... but as much as we dive into Rx internals, we'd find out there are **at least 32 different types of hot streams**.

## 32 hot Observable types? 😲

Yep, you heard it right. In very short, 32 is a [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of:
- 4 types of subjects (4)
- reset on error, boolean (2)
- reset on complete, boolean (2)
- reset on ref count 0, boolean (2)

`
4*2*2*2 = 32
`

If we'd also take **connectable streams** into account ([as in _Understanding publish, refCount and connect_](https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html)), there'd be even more  😈.

## Sh*t, what are all those things?! 😐

These are separate characteristics of Subjects that have existed for a very long time already - and most probably you experienced them in some rather unclear circumstances, and haven't become aware of what's going on. For example, you might have noticed that, even though the **reference counter** (number of active subscribers) have **dropped to zero**, `share()` used to recreate the underlying stream (e.g. a new HTTP request) whenever a new active subscription happened. **But after replacing the `share()` operator with `shareReplay()`, it didn't**!. Even though the circumstances were the same... And this is NOT a specificity of either Subject or ReplaySubject. This is what so called "hot" is underneath. One term is just so wrong, if you want to get your head around it!

## What? Please, stop 😥

No worries, by the end you'd **understand all of that**. Stay with me. And I hope you'd see that, indeed, "hot and cold" is a seriously harmful oversimplification.

## First things first

We need to remind a couple of facts.

### Fact 1: Notification Types

Observable streams don't just emit values. Strictly speaking, there are 3 types of notifications:
- next(value)
- error(error)
- complete()
and all operators, subjects, etc - everything in Rx processes all of them. Sometimes they just pass the notification through down to the downstream, sometimes they do more interesting things - but all 3 notifications are always involved.

![3 types of notifications in RxJS](https://ducin.dev/images/blog-rxjs-3-types-of-notifications.svg)

### Fact 2: Unicasting and Multicasting

All streams can typically serve only one consumer - all operators, higher-order streams, etc. Being able to emit notifications only to one target is called **Unicasting**.

![RxJS Unicasting](https://ducin.dev/images/blog-rxjs-unicasting.svg)

... all, except for Subjects - these are the only ones which can serve multiple consumers (and it's actually the main point why they exist...). This "ability" is called **Multicasting**.

![RxJS Multicasting](https://ducin.dev/images/blog-rxjs-multicasting.svg)

### Fact 3: observables are lazy by default

It's a quite well known fact that, until an observable gets subscribed to, it doesn't emit a value. That's fair, since why producing items, if there'd be no one to consume them? Only when they're is some subscriber interested in the data, it makes sense to produce and emit the notifications.

![RxJS Multicasting](https://ducin.dev/images/blog-rxjs-no-subscriber-no-producer.svg)

Yep, **produce**...

### Fact 4: producer-consumer pattern

Let's take a look at the following stream:

```ts
second$ = interval(1000).pipe(
  map(x => x+1)
);
```

With no subscribers, the observable emits no events. But once the first subscriber arrives, a new interval (native `setInterval`) gets created. However, when another subscriber arrives, there'd be **a separate, competing** interval.

Certainly, observables are clearly lazy in this case. But what I also want to highlight is that a stream like this one:

```ts
second$ = interval(1000).pipe(
  map(x => x+1)
);
```

isn't actually something which is capable of emitting anything. **NOT YET**...

Now, be cautious. The difference is not only with **naming**, but also with **semantics**.

An **observable** - is something we can observe (subscribe to). Clear.

However, a stream is something that emits values. Now let's get back to the point in time when we had no subscribers: any interval hasn't been created **YET**. So we've got composition, we've got a stream - but it's **dead**. There's **nothing live that could actually turn the stream on**.

**Streams do implement the producer-consumer model**. Depending on the scenario, there might be either 1 producer per 1 subscriber (cold), or 1 producer per multiple subscribers (at least 32 types of hot). There could be even more complex, though very rare scenarios, where multiple producers use a common subject (sink, proxy) which then passed all notifications through to all subscribers (many-to-many).

A **producer** could be anything that is the source that start emitting anything: or could be an **interval or a timer**, but also **HTTP request, event listener, or a websocket connection**.

## Fact Summary

So a subject is **multicasting** events down to **multiple subscribers**. In a typical scenario there's **one shared producer underneath** (could be more, but that's rare).

**Without any subject, the stream will unicast**. For each subscriber, a new producer would be created instantly.

## Back to 🔥 hot 32 🔥

So far so good, we've got the knowledge to champion all the possibilities.

All these apply to situations where we do have a subject ("hot", after all).

### reset on error

![RxJS Subject receiving error notification](https://ducin.dev/images/blog-rxjs-subject-receiving-error.svg)

If **any of the producers emits an `ERROR` notification** down to the subject - **should it reset**? Reconnect? Or - in our terminology - should a new producer be recreated?

### reset on complete

![RxJS Subject receiving complete notification](https://ducin.dev/images/blog-rxjs-subject-receiving-complete.svg)

Similar as above, but applies to `COMPLETE` notification.

### reset on ref count zero

Imagine the subject initially had no subscribers. Then first subscriber came, then the second one. The subject counts all active subscribers all the time. Now, the subscribers go away, and as they unsubscribe, the counter (**ref count**) goes down.

![RxJS Subject with refcount zero](https://ducin.dev/images/blog-rxjs-subject-reaching-refcount-zero.svg)

And the question arises: **if the `refCount` drops to zero** (no active subscribers), **should we keep the connection to the producer active**? In other words - shall we keep the producer live?

Remember, of the producer is live, it will keep on emitting items according to its nature (e.g. interval will keep on doing its job).

## Where did you get these from?

Now comes my favorite part 😁 - source code: let's dive into RxJS `ShareReplay` sources. This one is especially good to look at, add it specifies config parameters exposed by the `share` operator:

![RxJS source code of shareReplay](https://ducin.dev/images/blog-screenshot-shareReplay.png)

`shareReplay` is just a specialized version of `share`. Apart from accepting config (as input parameters) and preparing the new config (to be passed to `share`) - apart from that, `shareReplay()` just calls `share()`.

`connector` is a function that returns a subject - with whatever type, potentially even having some subscribers already (not common, though possible).

And the `resetOnError`, `resetOnComplete` and `resetOnCountZero` are things we've already gone through 🙃All in all, we can determine all these.

# How important is reading the source code?

Sometimes not that much. But this time - extremely important! Imagine all these situations where you use `share()`/`shareReplay()` and you hope _it should be ok_. NO! Think about all these usecases, such as switching routes (navigation), potentially causing `refCount` zero for a short while. Or receiving `complete` which _might_ unintentionally break your app logic.

## How hot 🔥 are your streams?

Being hot is about **multicasting** (sharing the connection with the producer or, in practice, **sharing the producer**). But I hope your agree with me that the following scenarios:
- sharing the same producer no matter what
- and/or sharing the producer unless `RESET` emitted
- and/or sharing the producer unless `COMPLETE` emitted
- and/or sharing unless all subscribers are gone

... all have **completely different runtime behavior**. Failing to acknowledge the difference might lead to serious bugs and/or unintentional behavior.

## Conclusion

The terms **unicasting**/**multicasting** precisely define whether a subject is being used or not. Only this is way more precise than "_cold and hot_" distinction.

A **cold stream is a lazy, unicasted stream** which **creates a new producer per each subscriber.**

But when it comes to hot streams, they **could be lazy** or not (remember _Connectable_), they **could share the producer** unless some circumstances happen. Last but not least, **different subject types** apply completely different emission strategies. It's all so damn different that it's pure madness to throw it all into one bag. One bag that discourages many people from diving deeper.

So now, whenever you need to introduce a Subject, don't just choose between `share()` and `shareReplay` (also trying to figure out why is there no `shareBehavior()` one?!). Think about all 32 conditions - one of those is the one you're looking for, e.g

```ts
stream$.pipe(
  share({
    connector: new BehaviorSubject("INITIAL"),
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: false,
  })
)
```

**My strong recommendation**: as soon as one has grasped the idea of Observables, **stop using the _"hot" (and cold) streams_ metaphor**. It introduces false dichotomy and pretend that **things are simple**.

**The more we know, the more we understand they aren't.**

----

[Follow me on twitter](https://twitter.com/tomasz_ducin) for more frontend (js, ts, react, angular etc.) deep dives!
