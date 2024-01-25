# Angular developer's Introduction to Angular Query

## TL;DR;

**Angular Query is a state management library highly specialized in synchronizing the server data with client applications. It does this one thing - but does it very well. It removes all concepts and abstractions that are not necessary to accomplish this job. As a consequence, developers become more productive**

If your application includes lots of datatables, grids, listings and other "_widgets_" which fetch and display server data - you must give Angular Query a try.

{% embed https://stackblitz.com/edit/tanstack-angular-query?file=src%2Fapp.ts %}

----

This post introduces **Angular Query** to Angular Developers: **why you should care**, what is the **mental model**, **how it works** and how your applications can **benefit** from it.

## Disclaimer 1: experimental

Angular Query is [in experimental phase](https://tanstack.com/query/v5/docs/angular/overview) ([npm](https://www.npmjs.com/package/@tanstack/angular-query-experimental)), though it's expected to land a stable release very soon. The current improvements (which I'm a small part of 😍) include providing the most convenient Angular-specific APIs to Angular developers.

However, all the concepts behind Query (core), React Query, Angular Query (and other adapters as well) **remain exactly the same**. The differences lie only in framework-specific adapters (such as React hooks, Angular signals, etc).

This post is just the first part of a long series I'm working on 🙃. Once the stable version is released, the content will get updated accordingly.

## Disclaimer 2: `@ngneat/query`

Oh, wait, but there already is [`@ngneat/query`](https://github.com/ngneat/query). Why would anybody create yet another library?

The answer is simple: the libraries are very similar to each other, serve the same purpose etc. But `@ngneat/query` creators decided, by design, to **diverge** from the core Tanstack Query codebase. Angular Query, on the other hand, is part of the Query monorepo and will get all (core) updates instantly. On one hand it's super cool (get all updates immediately), however on the other hand it introduces limitations (cannot move away from core too much). **A classical example of an architectural tradeoff**. Ngneat team chose more freedom at the cost of moving away, we chose being in-sync (at the cost of adjusting to the core API).

More detailed reasoning has been brought by [Dominik here](https://twitter.com/TkDodo/status/1738111152121393623).

## Why would you even care

I'm convincing you that **you should invest your time in learning Angular Query**, as it will become one of the **most important state management solutions** within the ecosystem. If not **the** most important.

Why?

Because it did in React ecosystem ⚡️. And since the concept is framework-agnostic and hugely simplifies development and improves DX, no matter what the framework is, same will happen with Angular 🤓. Once you get a grasp of how it works, you will ask yourself "_where have we all been all these years?!_" 🫢. And probably - for the state management of server's data - you will **not** want to go back to what you used before 😎.

## What is React/Angular/... Query good at?

**It's synchronizing the server data with the client app**. All query-family libraries are highly specialized in doing this one thing - but doing it right. And abstracted in a way that delivers magnificent DX. It's not (and will never be) a universal, multi-purpose Swiss knife. It's also not trying to be the only state solution within your architecture, e.g. if you need specialized local state solution - go for it! Let the best ones do their job!

So, in other words, React/Angular/... Query is:
- 🔥 **automatically fetching the server data**
- 🔥 **your currently existing components**
- 🔥 **need** (but not earlier)
- 🔥 and if the data could become hypothetically outdated (i.e. **stale**), it'll get **refetched automatically**
- 🔥 and, of course, **shared across all components** which need this data

## Comparison to Redux/NGRX

A bit of History... The library started as [**React Query**](https://tanstack.com/query/v3/docs/react/overview), created by [Tanner Linsley](https://twitter.com/tannerlinsley) (hence later name: [Tanstack](https://github.com/TanStack) 😉) and co-maintained by [Dominik Dorfmeister](https://twitter.com/tkdodo), both absolutely great and very friendly developers. Later, the **core** has been extracted away (great job guys! 🔥) so that multiple frameworks can provide very thin adapters to the core. 

 It was published during the Redux' era. For Angular developers it'd be convenient to relate to NGRX. Anyway, the main differences between Redux and React Query are:
- no reducers in React Query, hence, no action objects
- also, no reducer composition
- no gargantuan state objects
- no immutability obsession
Generally, React Query relieved developers from being bound to quite invasive approach of Functional Programming.

One could ask at this point:
- _oh but if we lose the centralized state object, we don't know where the data is stored!_ - don't worry:
1. There would be a **central cache** anyway.
2. Don't be afraid of **data duplication or redundancy**. If queries are done right, the problem won't exist.
3. If done right, queries would be **hierarchical**. It will just reflect your (hopefully) RESTful API's endpoints design.
- _we can't time-travel if we don't implement!_ [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) (that's what Redux/NGRX do) - but honestly tell me: how often do you use time-travel debugging thanks to redux architecture? Whenever you encounter a bug, do you export the `state.json` file and attach it to your issue/ticketing system, so that someone else would use it when trying to reproduce the bug? Isn't time-travel debugging actually [YAGNI](https://wikipedia.org/wiki/YAGNI)?
- Redux is multi-purpose



Ok, so what is Angular Query about?
