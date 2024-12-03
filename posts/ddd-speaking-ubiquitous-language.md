The aDDDvent calendar 2024:
- day 1: [DDD is not about technology](/ddd-is-not-about-technology)
- day 2: [Talk to domain experts](/ddd-talk-to-domain-experts)
- **day 3: [Speaking ubiquitous language](/ddd-speaking-ubiquitous-language)**
- day 4: [Autonomous Models in Bounded Contexts](/ddd-autonomous-models-in-bounded-contexts)
- day 5: (tomorrow)

**TL;DR; 💡 Ubiquitous Language is a shared language developed and used within a team of both devs and domain experts. It's a result of their collaboration on a certain part/context of the business - called a Bounded Context. The language provides specific meaning to some domain terms. These terms have a super precise meaning within the Bounded Context, yet they probably mean something different outside of it.**

<% TOC %>

## Different Meaning of the same Phrase

[Yesterday](ddd-talk-to-domain-experts) we've been speaking to three different domain experts and gathered quite some knowledge about how the warehousing business operates.

You must have noticed that all three people below were using the *stock item* phrase, but each with a different meaning:
- the Head of the Inventory Department: *something available in stock*,
- the Order Fulfillment Manager: *something to be sent away to the customer*,
- and the Returns and Claims Supervisor: *something returned by a customer*.

We must also realize all these three people probably work on different teams, maybe even departments, and certainly have different tasks and priorities.

## Speaking the same Language within a given business context

However, we're here to create a system which will help run our company. At some point certain development teams will have to start communicating with a certain domain experts. They will form a **multi-disciplinary teams including: development and domain expert - together**. Working on a specific part of the business.

The domain expert will answer tens or hundreds of questions related to . The **expert** will be using his professional terminology: the *business language*. On the other hand, **developers** might also use their own professional dev terminology. As a consequence, a **new language emerges** naturally.

The domain expert is the one who brings expertise. Most probably the *business language*, the *industry standards*, etc. would heavily influence this **common language**.

It's called the *Ubiquitous Language* (*UL*).

## What's the point of that new Lingo?

The point is that **each domain-relevant phrase, used within Ubiquitous Language, carries important meaning**.

It does take quite significant time until the domain expert transfers domain knowledge to developers. Once a complex topic is explained, a **new term** gets coined (or a business term is simply reused). **We use it to communicate faster**.

That's it - use 2-3 words without the need to explain the whole topic using 5 sentences. Without doing that **again**! We have already discussed that before, right? **Using highly specialized terminology makes communication more effective**.

In DDD we call that domain-related meaning: **semantics**.

## Bounded Context and Ubiquitous Language

We've said that the team of both developers and domain experts are working on a *specific part of the business*. This work includes understanding the business, designing the solution and often implementing it eventually (however, not always).

**This "*part of business*" is extremely important and in DDD is called a *Bounded Context***.

For the sake of the moment (just a temporary simplification), you can think of a *Bounded Context* as something that might get eventually **implemented as software *module*, but *bounded***. It's logically **separated** from the rest of the solution. **The boundary is semantics.**

Again, we've got totally different meanings (**semantics**) of what a *stock item* means in different **contexts**. **Different Bounded Contexts**.

The boundary is defined by the language used (**Ubiquitous Language**). If a given phrase carries the exact same meaning, it means it's within the same context:

> 🔥🔥🔥 same meaning <=> same context 🔥🔥🔥

And yet, if a given phrase could have different meanings, it means we're dealing with more than one Bounded Context:

> 🔥🔥🔥 different meaning <=> different context 🔥🔥🔥

The "*Bounded*" word denotes a boundary. Since all this is **about meaning and language**, the boundary is a **semantic boundary** or **linguistic boundary**.

You can think - and actually you should - that all these:
- **Ubiquitous Language** - the language used
- **Bounded Context** - the part of the business being worked on
- **semantic boundary / linguistic boundary** - the boundary separating the bounded context from the rest of the solution
they are all **very closely connected**.

**This is absolutely the core of DDD**. But don't worry if you haven't grasped it all at once. We will [tackle Bounded Contexts in DDD more tomorrow](/ddd-designing-bounded-context).

Anyway, let's get back to the hero of today - the Ubiquitous Language.

## Whether you want it or not

**It's not your choice to speak the language or not.**

While working on a team, you have to communicate with others *somehow*. The **domain-relevant phrases are being used anyway**.

Our duty is to make this language more universal - use it:
- while discussing stuff,
- while coding backend,
- while coding frontend,
- while writing or executing tests and so on.

The language is used everywhere: code, docs, discussions, etc. But watch out: **everywhere within the Bounded Context**.

## Ubiquitous Language is local, not global

A quite common **misconception** is treating Ubiquitous Language as something that is global to the whole company. That's essentially **not the case with Ubiquitous Language**.

Introducing a globally spoken set of domain relevant phrases would require potentially crazy amounts of effort to unify the language. A question arises: how big your company is? How many people would have to align? How many people would have to get trained in order to speak a globally-acclaimed language?

Imagine synchronizing terminology across codebases of different teams. Madness...

I hope you can see that'd be pure nonsense 😉.

> If you apply a single Ubiquitous Language to a whole enterprise or even multiple enterprises, you will fail.

― Vaughn Vernon, author of "*Implementing Domain-Driven Design*" and "*Domain-Driven Design Distilled*"

Ubiquitous Language - being spoken within the Bounded Context, and only within that Bounded Context - is something that happens naturally. You don't need to control the process. It will emerge anyway.

## Specific Language makes the team more Autonomous

Moreover, DDD makes sense especially when dealing with complex businesses. And scaling complex businesses is hard... That's also where a context-specific language helps.

**Using different Ubiquitous Languages, each within different context, makes them more autonomous**.

Also, since the business is not set in stone (it will change), then the Ubiquitous Language would evolve, within time. And that's great - the changes made to Ubiquitous Language of one context will affect another context in no way. 🥰

**That's the point.**

## Does it mean we'd have 3 different `StockItem` classes?

Potentially, yes. But **that's not a problem**.

If you're concerned about violating the DRY principle, please let me remind you that [DRY is not about code, but about knowledge](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (again, **semantics**!):

> "*Every piece of **knowledge** must have a single, unambiguous, authoritative representation within a system*".
― Andy Hunt, Dave Thomas in "*The Pragmatic Programmer*"

Hunt and Thomas didn't relate to DDD *explicitly*, but their **_knowledge_ is the same concept as *semantics* in DDD.**

Finally, **if the *stock item* means three different things in three different contexts, they're not the same things.** If you provide 3 `StockItem` classes, you're not copying semantics/knowledge. Essentially, **you're not violating the DRY principle**.

## Make the Language Ubiquitous

The only thing you should care is to **use it pragmatically**.

One way to be pragmatic with Ubiquitous Language is to use only one phrase for exactly one concept. **Don't introduce synonyms**. In Ubiquitous Language, if two different phrases are used - it has to mean two **semantically different** concepts. And vice versa, one phrase should relate to a single concept. Just this.

Again - only within the team. We don't care about terminology outside.

## How is that useful?

Each word we say carry meaning (**semantics**!). When naming a class, the **class name brings information** about its responsibility, usage, etc. Meaningful names make it easier to reason about the code.

These all are perfect places to use UL:
- if you're coding frontend components - use UL.
- if you're implementing E2E test, use UL.
- if you're writing docs - same, **use UL**, and so on.

## One more example

Let's switch to a different domain: **e-commerce** this time.

In a typical online shops we can buy *products*.

When we navigate through our account we can see our order history. There, we can see the *products* we bought.

The shop could have introduced some rebates or discounts, e.g. based on previous purchases. Wait, what did I buy? Yes, a *product*.

And finally, after I paid, the package has been successfully delivered (*product*!) to my place. The system sends an email notification asking me to rate... the *product*.

Oh, **products everywhere**! Yes, but in each context it has, again, different meaning:
- product as an *offer* (something I could buy)
- product as my *purchase* (something I pay for)
- product as *item in order history* (something I bought some time ago)
- product as something that cause a *rebate* to be generated for me
- product as something that *needs to be rated*
etc.

There's no need to over complicate the world by enforcing `Product` to be renamed to `ProductOffer`, `ProductHistoryItem` or anything like this.

## Contexts

We mentioned that the Ubiquitous Language provides some specific **meaning** within a specific team - but also within a specific **context**. And the context is what we're gonna read about tomorrow.
