> *When you think about your system, don't think about your technology choice. Make sure you think about it in the desirable properties you want your system to have. And then the technology choice is just the incarnation of that.*

&dash; [Gregor Hohpe](https://youtu.be/w9a7eI6BlVc?t=1181)

----

**Disclaimer**: if you consider yourself a **coder**, close this page 😉

**We've got a problem in Frontend communities 😉** We tend to focus on libraries, frameworks, bundlers, numbers of github stars... and many other areas of little relevance. We tend to love a tool ([Redux, I'm looking at you, back in 2015-2016](https://www.youtube.com/watch?v=xsSnOQynTHs)) and significantly overuse it.

![JavaScript Frameworks](images/blog/blog-it-javascript-frameworks.png)

Then, we turn back and totally hate the same tool for the very same reasons ([Redux, now](https://www.reddit.com/r/reactjs/comments/buzlqc/why_all_the_sudden_hate_for_redux/)). Both the love and the hate was unjustified... so what happened? 🤨

The "_problem_" is that many of us Frontend Devs **lack skills and knowledge related to Software Architecture** as-is, as our focus is often somewhere else. And **these skills are absolutely required (but not sufficient) to make a project succeed long-term**. That's because architecture is the **invisible bridge between what's important from both the business and the tech perspectives**.

While running developer trainings, consultancy activities or recruiting team leaders, etc., I tend to ask: _how do you understand **what is Software Architecture**_? *What are the most important aspects, what to watch out for, how to provide proper/healthy System Architecture, and what is the role of an Architect?*

Before moving on, take a while and try to answer these yourself 😉...

Tick tock ⏰...

The question is deliberately very wide, so that my interlocutor can freely say whatever they consider important. I'm not suggesting anything. But when the answer starts something like: _(frontend) architecture is how we structure directories and files [...]_ - then it's an immediate red flag 🟥 to me. And yes, I got motivated to write this post by yet another person who said the above 😉.

My intention, dear Reader, is to **shift your focus**. Inspire you to think about architecture from a different perspective. **Detach** from the structure you see in your repo, or from the specific solutions in your code. And concentrate on **what characteristics you want your system to have**. What **capabilities** are you going to need in a **broader perspective**. **Detach from the tools and reattach to the tradeoffs they bring**. And, last but not least, what required software capabilities are **determined by your business**.

<% TOC %>

----

# What is (Frontend) Architecture?

So this tweet *happened* 😅:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">friendly reminder:<br><br>folder structure is NOT architecture (and never has been)</p>&mdash; Tomasz Ducin (@tomasz_ducin) <a href="https://twitter.com/tomasz_ducin/status/1834183544169451609?ref_src=twsrc%5Etfw">September 12, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Somewhere in the comments below, I got asked _What is Architecture in my view_. I tried to make the answer concise:

> *The decisions you make according to business requirements that shape your system today and that are difficult to change in the future.*

The truth is, there's no single definition of what Software Architecture is. I strongly recommend reading Martin Fowler's [Software Architecture Guide](https://martinfowler.com/architecture/). Some alternative definitions include:

> *The decisions **you wish you could** get right early in a project.*

or

> *Architecture is about the important stuff. Whatever that is.*

Notice the word: ***important***.

And notice another word: ***decisions***.

Before me move on to examples (later in the article) let's **start from the essentials**.

## Decisions

We need to decide on lots of things throughout the lifetime of a project: the language/platform, the libraries, the paradigm, coding style... tabs vs spaces... 🤔 but also: how do we ensure that business priorities and requirements are met, how do we enable dozens of developers to work on the same system, how do we enable frequent deploys (daily, hourly, Fridays included) and so on.

Yes, as you can see the topics range from not really relevant ones to absolutely essential ones. The aspects we analyze and the decisions we make are of **different relevance**. The more experienced developers are, the more likely they'll try to **avoid investing energy into things that don't really matter**.

Especially, if the decision can be easily **reverted**.

So how do we evaluate whether a certain decision is the right one?

### Drivers

Whenever in doubt, it's always a good idea to take a step back and see a wider perspective - and this includes:
- what are the top **priorities** for our business?
- what are the **limitations** we need to take into account?
- what can we **sacrifice** (optional goals) and what we cannot (mandatory goals)?

**Architecture drivers are the aspects that make us dive very deep into a very specific context of a very specific project**. Think of it as the project's **context** which **evaluates**, whether a theoretical advantage or disadvantage is important in a specific situation, or not.

Architectural drivers can be very different:
- **response time**: the system has to respond very quickly
- **traffic**: it needs to handle **massive** amount of **requests**
- **SLA/HA**: its uptime needs to be ~99,99%
- **organization scale**: it needs to be developed by dozens or even hundreds of developers
- **entry level**: it should be relatively easy to pick up by less skilled devs
- **TTM**: delivering features have to be very quick due to business situation (whatever it is)

In business environments, the drivers are almost always there. Most probably, your company's business representatives express them directly, just not using the "_drivers_" word literally. Failing to identify them significantly reduces the chances of your success, as you could concentrate on the wrong things.

So how do we shape system's design in order to achieve those high-level goals?

### Tradeoffs

We need to realize, that nothing comes for free. If we want to provide a nice characteristic for the system, it'll come with a price. We need to be aware of that price. Let's revisit the list of architectural drivers above and extend it with the probable downsides:
- the system has to respond very quickly **at the cost of increased complexity and worsened flexibility**
- it needs to handle massive amount of traffic via horizontal/auto scaling **at the cost of moving from monolithic to distributed systems**
- its uptime needs to be ~99,99% **at the cost of maintaining canary releases, blue/green deployment and other expensive techniques**
- it needs to be developed by dozens or even hundreds of developers via making smaller & independent teams **at the cost of code/effort duplication and way more complex infrastructure**
- it should be relatively easy to pick up by less skilled devs **at the cost of not using what our devs love the most**
- delivering features have to be very quick due to business **at the cost of increasing tech debt**
and so on...

Tradeoffs are _simple_ in a way, that we can **consciously decide** what are the **things** that we can carry on **without**. Example: *is 99,99% uptime really necessary? - Yes, because our contract obliges us to support it. - But is 80% Code Coverage really necessary? - It's nice to have, but no, it's not necessary. **We can carry on without it**.*

While making architectural decisions, it's necessary to **focus on drivers, while having tradeoffs in mind**. We aim to achieve our **goals**, but we also know what we might need to **sacrifice**.

### Limitations

One more truism: not everything is possible.

😉

Sometimes we cannot implement a decision even though all our considerations prove this is a good decision. External factors might collide:
- the system has to respond very quickly, at the cost of increased complexity and worsened flexibility, **but we cannot remodel our database _because of reasons_**
- it needs to handle massive amount of traffic via horizontal/auto scaling, at the cost of moving from monolithic to distributed systems, **but we cannot change the cloud provider _because of reasons_**
- delivering features have to be very quick, due to business, at the cost of increasing tech debt **but we cannot hire more developers to speed us up _because of reasons_**
etc.

This is the sad part. Just to make things slightly more challenging - we need to accept that our capabilities are limited _because of reasons_ 😉. But we still want to achieve our goals!

### Recap

Let's quickly summarize: we make architectural **decisions**, having **architectural drivers** in mind, being aware of the **tradeoffs** of these decisions and having to cope with the **limitations**.

**ZOOM OUT** from the code.

<% SUBSCRIBE %>

## So what constitutes architecture, again?

Let's revisit my *quick and dirty* definition:

> *The (**high-level, technical**) decisions you make according to business requirements that shape your system today and that are difficult to change in the future.*

Now let's confront what satisfies the definition and what does not:

*Architecture defined by*:
- ✅ Choosing to implement [MicroFrontends (MFEs)](https://martinfowler.com/articles/micro-frontends.html) or not (and how)
- ❌ Whether we use [webpack module federation](https://webpack.js.org/concepts/module-federation/) or something else

*Architecture defined by*:
- ✅ Does reusability matter more than isolation - or vice versa
- ❌ Whether you implement [barrel files](https://tkdodo.eu/blog/please-stop-using-barrel-files) (index.js/ts) in your codebase or not

*Architecture defined by*:
- ✅ Do *models* get shared across different *modules* or are they isolated, e.g. via [ACL](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)
- ❌ Whether we stick to classes/OOP or functions/FP

*Architecture defined by*:
- ✅ Whether your state is meant to be centralized/shared or distributed/local
- ❌ Whether you use a [redux-ish](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) store for this

*Architecture defined by*:
- ✅ Whether [PULL-based or PUSH-based](https://github.com/kriskowal/gtor#observables) fits your needs more
- ❌ Whether you use promises, async await or rxjs, really, WHATEVER

*Architecture defined by*:
- ✅ Does your UI rely heavily on [real-time data](https://en.wikipedia.org/wiki/Real-time_computing)
- ❌ Whether you use firebase vs supabase vs [...]

*Architecture defined by*:
- ✅ Who can change the [client-server API contract](https://www.geeksforgeeks.org/api-contracts-system-design/)?
- ❌ Whether you're using [GraphQL](https://graphql.org/), [REST](https://en.wikipedia.org/wiki/REST), [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), etc.

*Architecture defined by*:
- ✅ What architectural drivers are the most important ones?
- ❌ whether you claim you follow best practices or not

*Architecture defined by*:
- ✅ Whether highly optimized [LCP](https://web.dev/articles/lcp) is a nice-to-have or a must-have
- ❌ how big (LoC) your UI components are

*Architecture defined by*:
- ✅ Whether your system is [single or multi-tenant](https://en.wikipedia.org/wiki/Multitenancy)
- ❌ whether you keep authentication data in Redux, context, useState, whatever, Whatever, WHATEVER

*Architecture defined by*:
- ✅ How do you provide [Fault Tolerance](https://en.wikipedia.org/wiki/Fault_tolerance) to your UI
- ❌ that your CI pipeline requires 80% [Code Coverage](https://martinfowler.com/bliki/TestCoverage.html), otherwise it fails.

At this point I hope you get the point quite well 😅.

Also, notice that the above juxtaposition confronts **architectural decisions** with **technical decisions**.

## Why directory structure shouldn't be considered as architecture?

Directory structure is a result of some design work and conventions introduced. They are meant to help us move faster, deliver faster, deliver without breaking (or with breaking less) things.

Directory structure is not a goal itself. It is a means to achieve another, higher-level goal, such as:
- [MFE](https://martinfowler.com/articles/micro-frontends.html)/[Modulith](https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer) separation of bounded contexts
- allowing separate teams to deliver and [deploy independently](https://microservices.io/post/architecture/2022/05/04/microservice-architecture-essentials-deployability.html) on one another
- helping to isolate the local models via [ACL](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)
etc.

As we can clearly see, directory structure can fit a given architecture sometimes better, sometimes worse. But it is materializing a concept, it's an **implementation**. An implementation **detail**. It is a way to achieve our final goal.

## What directory structure will not tell us

There are tons of very important aspects, which we simply **cannot figure out from whatever the dir structure / convention is**. These include:
- you cannot tell whether you implemented some ["god classes"](https://en.wikipedia.org/wiki/God_object) or whether your modules are isolated, [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html)
- you cannot tell whether you [reuse the same model between the contract and your local frontend logic](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer) 
- you cannot tell whether [your state is shared/centralized or distributed](https://twitter.com/mathiasverraes/status/711168935798902785)
- you cannot tell where is the [troublesome coupling](https://en.wikipedia.org/wiki/Coupling_(computer_programming)#Types_of_coupling) within the codebase, did you apply [dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle) and how [cohesive](https://en.wikipedia.org/wiki/Cohesion_(computer_science)) is your codebase
etc.

To say it gently, the directory structure is _not important **enough**_ to be considered Architecture. Directory structure can **fulfill** an architecture (or not), but it is not architecture itself.

## Building the proper understanding of Frontend Architecture

Architecture is *not* something we want 😘, desire 🥰 or enforce 😤. It's *not* something we draw out of a sudden 😶‍🌫️. And is surely *not* something we should copy-paste across projects, because it worked well in the previous company 🥸.

Architecture is a **result of communication, detailed analysis and reasoning**. **It's an outcome**. Like a function producing **certain output for given input**. And, for sure, the inputs will change over time. The role of **an architect** is to gather the knowledge/experience to run this `input -> output` function **regularly**.

### What's the input and where to get it from?

The most important skill of an architect is **communication**, with all: management, business and development. Totally different groups, right? There are lots of information to be gathered, including:
- What the **product offers**, what are the **advantages**, what is the [**core domain**](https://martinfowler.com/bliki/DomainDrivenDesign.html) which allows us to have advantage over competition?
  - The modules/features/teams included within the core domain should *not* be outsourced to any third party
  - The quality should *not* get sacrificed
  - Discovering/modelling the domain might be driven by [DDD](https://martinfowler.com/bliki/DomainDrivenDesign.html) practices, such as [Event Storming](https://en.wikipedia.org/wiki/Event_storming)
  - Non-core domains are of secondary importance
- **Company structure** - and how does the [**Conway's Law**](https://en.wikipedia.org/wiki/Conway%27s_law) affect our software development and delivery
  - How big is the Development Dept.? How many teams we have?
  - Is the company product-oriented? Does each team take full responsibility for a (sub)product which they're developing, testing, deploying etc. 100% independently on other teams?
  - Are there any associate companies, shared tech, acquisitions or any other critical concerns which affect our organization now - or which could change soon and invalidate all our current reasoning about "*how we should structure our teams*"?
- **Business goals, customer expectations, market situation**
  - How soon solution deliveries are expected? Do we have the know-how to achieve them?
  - How frequently deployments/deliveries should happen? Is the company ready for it?

### Proceed to development aspects

On the technical level, we form the following questions:
- How much should we [**encourage/discourage code reuse**](https://softwareyoga.com/is-your-code-dry-or-wet/)?
  - The more we reuse, the [less code is needed](https://bit.ly/47GxRFC), but also the less independent the teams will become (!), especially when shared pieces change rather frequently than not (as *compared* with [**Shared Nothing Architecture**](https://en.wikipedia.org/wiki/Shared-nothing_architecture))
  - what would be the **consequences of changing a shared piece** (a file, a component library, an artifact, etc)? Would a rebuild be needed? If yes - rebuild of how many pieces? How much testing (hopefully automatic) would be needed? How many pieces get deployed? Sequentially or independently? How long would it all take? How much unnecessary effort / time loss gets introduced by this sharing?
    - and how does that affect our [uptime](https://en.wikipedia.org/wiki/Uptime)/[SLA](https://en.wikipedia.org/wiki/Service-level_agreement)?
- How flexible is your system and how do you [measure your architecture](https://dora.dev/research/)?
  - In short, what is the expected and current [TTM](https://en.wikipedia.org/wiki/Time_to_market)? But also:
  - How **often** application changes are **deployed to production** ([DF](https://www.cortex.io/post/deployment-frequency-why-and-how-to-measure-it))?
  - How **long** does it take between the point where a developer **starts coding** and when it **reaches production** ([CLT](https://www.sleuth.io/post/change-lead-time-explained/))?
  - How **often** do changes introduce a **failure** ([CFR](https://www.jit.io/blog/calculate-change-failure-rate))?
  - How much **time** it takes to **recover from a failure** ([MTTR/FDRT](https://help.swarmia.com/mean-time-to-recovery))?
- How do you ensure the **stability** of the system (*apart* from testing, code coverage, thresholds, etc):
  - What is the procedure in case of a failure? And how often do people need to reach out to it? 😄
  - How many/how big pieces need to be deployed synchronously/together? Does your product's deployment require unnecessary builds of its dependencies *only because* of how CI/CD and (overly granular) repositories are structured?
  - How much do the teams **trust** each other? Is it a good idea to trust that what they ship is ok? [Git-flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)-ish workflow or [trunk-based](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) development? CI/CD and the whole process will tremendously depend on these.
  - How [**fault tolerant**](https://en.wikipedia.org/wiki/Fault_tolerance) the system is? Is the [frontend app automatically tested against various scenarios of backend failures](https://en.wikipedia.org/wiki/Chaos_engineering)?
  - Can the developers effectively make use of [observability](https://learn.microsoft.com/en-us/data-engineering/playbook/capabilities/data-observability/)? E.g. how long does it take to:
    - Diagnose the source of the frontend issue?
    - Rollback?
    - Provide the fix?
    - or how/when do developers notice any regression in [Core Web Vitals](https://web.dev/articles/vitals)?
- What **distinct devices/environments** are the users using? Web, (native) mobile, both? Again:
  - which pieces should be reused, and which should be forked for the sake of less cross-team dependencies?
  - how the teams/codebases are organized? By platform or by bounded context? 😉 etc.
- What **specific characteristics** are expected/required?
  - example: **collaborative mode**. Currently the system allows a single user to apply changes, but the requirement is to allow multiple users to apply changes in real-time on the same data-set. If your code applies **direct state changes** (e.g. set, update, etc.) then there might be no convenient model to share across the users. But if your state changes **indirectly** (via the [Command Pattern](https://refactoring.guru/design-patterns/command), e.g. via [Redux actions](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)), then you already have the model which can be shared within the first iteration (of introducing collaborative features). Or reach to [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).
  - example: [**never show outdated data**](https://en.wikipedia.org/wiki/Strong_consistency). If you see an outdated number of *likes* under your post, nobody is going to suffer. Okay, hopefully, but still, you get the point 😉. However, in a banking system it's not a good idea to allow the UI to show outdated account balance e.g. when switching across tabs/sections.
  - example: **SDKs**. Do your customers implement their own custom features on top of the platform you provide? How often do you have **breaking changes** (and how often are your customers *f@@@@d up* because of it)? How do you find the balance between evolving your system and not spending enormous costs on older versions while having limited resources? For instance, redesigning your react component's props for a few [atoms](https://bradfrost.com/blog/post/atomic-web-design/) could have really huge consequences and, even though implemented, tested etc. could be - sadly - reverted due to **non-breaking changes** requirement.

As you can see, managing the architecture is all about **asking the right questions**. To [quote the classic](https://www.goodreads.com/quotes/1134331-i-would-rather-have-questions-that-can-t-be-answered-than):

> *I would rather have questions that can't be answered than answers that can't be questioned*

Thinking carefully about all the above concerns should lead us to making decision about the architectural style and important tool stack used.

## Tooling decisions vs Architecture decisions

Some might say:

> Hey, dude, but there are some decisions related to **tools, libraries, conventions, or code structure** which could have a significant impact on the project and that are difficult to change later. For instance, if I use Redux, it is an architectural decision!!!1 😉

**Well, yes, and nope. 😉**

It's fairly easy to stick to certain words and lose the context on what's important (i.e. **important from the business and/or overall perspective**).

It's true, that a coding convention decision might be (very) expensive to change after some years. A coding convention, or code structure, or directory structure (really, whatever) could speed up or slow down developers - sure! Some conventions will fit more, some will fit less. Some help us move faster, some don't, etc.

But once you zoom out from the team, where the decision was made, **it just DOESN'T MATTER** 🔥. It's an implementation detail. It's **irrelevant outside of your team**.
- Example: you decide to keep only one component per file. Totally **irrelevant** outside of your team.
- Example: you decide to use lodash or ramda for helpers or no helper library because not-invented-here (whatever). Still, **irrelevant** outside of your team.
- Example: you introduce a very specific file structure for each module you provide. The convention affects testing, storybook, and refactors. Still, **irrelevant** outside of your team. (BTW, storybook *would* matter if it was **regularly used *outside* of your team**)

Now please, don't get me wrong. **These decisions do matter**. They are **important for your team**. But **ONLY** for your team. They don't bring/enforce any **overall system characteristics**. If the decision was different, overall system characteristics wouldn't change. Let's analyze above quote further:

> *If I use Redux, it is an architectural decision.*

(sorry, Redux 😅)

Please watch out now: **the architectural decision is not about choosing Redux itself**! It's about **choosing a centralized state management solution**, as it could allow modules to cross-depend on each other (everyone has access to everything in a global store, right?), or in case of distributing a monolith into microfrontends - that task would be easier with multiple separate stores (like [mobx](https://mobx.js.org)). Also, **the architectural decision is about choosing a [client-side event sourcing solution](https://github.com/gaearon/ama/issues/110)**, as the business might require to implement [real-time collaboration features](https://en.wikipedia.org/wiki/Collaborative_real-time_editor).

So, does choosing Redux bring consequences? Of course. But again, it's not the library itself which I want you to **focus** on - it's the **high-level characteristics** that Redux brings. Both the **capabilities** it brings (mentioned few time before), as well as the **costs and limitations** in introduces, e.g. Redux is the **ONE and ONLY single source of truth**, definitely not a good thing if you ever consider [MFEs](https://martinfowler.com/articles/micro-frontends.html). Redux is inseparable from it's traits. But **it's the traits which build the architecture**, not the tools themselves.

Let's take one more, from Angular ecosystem this time:

> Disagree, it's really about the library itself if it's on a higher-level, for instance NGRX. There are multiple questions to answer:
> - How do we use NGRX?
> - Do we always go with effects?
> - Do we abstract it behind a facade?
> - With which layers do we associate it? 
> - How do we share the NGRX store between domains?
> etc.

So let's go one by one:

> How do we use NGRX?

That's a tricky question, as the *how* could relate to both high-level and low-level aspects. *Ambiguous question* 😉

> Do we always go with effects?

(context: [NGRX effects](https://ngrx.io/guide/effects) is the same concept as [redux-observable's epics](https://redux-observable.js.org/docs/basics/Epics.html): actions are dispatched, then processed reactively using rxjs reactive streams, anf often resulting in derivative new actions dispatched back into the store)

That's an implementation detail. Whether we go with imperative or reactive paradigm it's, well, programming (implementation) paradigm. Not architecture. We can change this decision later i.e. do things differently in future.

> Do we abstract it behind a facade?

That's encapsulation and/or design patterns and/or coding patterns... one level below architectural patterns, as you said. In [C4 model](https://c4model.com/) it's the **Code (Level 4)** (implementation detail). Again - is it important within the team? YES. Is it important outside? No.

> With which layers do we associate it? 

Sure, potentially architecture - but it has nothing to do with NGRX (or whatever). One would ask the very same question with other state management solutions, such as: how many / how specific custom hooks in React shall we create. Hypothetical layers (or lack of thereof) surely form our architecture. But they still would, if the libraries were different, right?

> How do we share the NGRX store between domains?

Absolutely, definitely architecture. But again, it has nothing to do with NGRX itself, as one would ask exactly the same question with all other centralized state management solutions. [Right?](https://www.youtube.com/watch?v=EmW74ZpGGOI).

Just a side comment: whether you use NGRX/redux-observables or not, certainly, affects the entry level of frontend developers, it affects their motivation (love vs hate relationship with tools 🥹), it certainly affects the way you write tests and so on and so forth. But, again, if you walk outside of your team/module/repo - does it really matter that much?

All in all, whether a decision is expensive to change or not **doesn't determine** whether it's anyhow relevant in the big picture and/or long-term. Also, what is super important locally within your team/repo **doesn't determine** whether it's relevant outside. It could, but it doesn't have to.

**In my humble opinion, it doesn't matter much whether we call choosing Redux an architectural decision or not, as long as we focus on the consequences this decision has.**

## Summary

Architecture is all about making **important decisions**. These should be **driven** by business priorities, **tradeoffs** should be taken into account, and existing **limitations** make it even more challenging.

In the face of all these difficulties, the role of an architect is to **balance between business priorities and requirements - and technical aspects and its complexity**.

**Don't confuse architecture** (the high-level decisions that are meant to help you fulfill your goal) **with how you're going to implement it**. Certain tools, libraries, conventions, APIs, etc - they're all low-level details, which can get you closer to reaching your goal or not. But from the perspective of business priorities, limitations (and so on), they're only details. Details of little relevance.

Hope you enjoyed it, thanks for reading 🤓.

Special thanks for [Damian](https://twitter.com/raimeyuu), [Mateusz](https://twitter.com/mat_ledzewicz) and [Manfred](https://x.com/ManfredSteyer) for valuable feedback.

### Recommended Read

There are several really good books on the topic, but before you get deeper into more specific topics, I'm recommend starting from the basics:

- [*Software Architecture for Developers*](https://simonbrown.je/#writing) by Simon Brown; this is a rather basic, yet **absolute must-read** for anyone **responsible** for any Software Architecture whatsoever
- [*Fundamentals of Software Architecture*](https://fundamentalsofsoftwarearchitecture.com/) by Mark Richards & Neal Ford; slightly going more in-depth

Also, you'll find good introductions to many aspects of architecture at [Martin Fowler's site](https://martinfowler.com/architecture/).
