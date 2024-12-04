The aDDDvent calendar 2024:
- day 1: [DDD is not about technology](/ddd-is-not-about-technology)
- day 2: [Talk to domain experts](/ddd-talk-to-domain-experts)
- day 3: [Speaking ubiquitous language](/ddd-speaking-ubiquitous-language)
- day 4: [Autonomous Models in Bounded Contexts](/ddd-autonomous-models-in-bounded-contexts)
- **day 5: [Your Frontend itself is NOT a Bounded Context](/ddd-your-frontend-is-not-a-bounded-context)**
- day 6: (tomorrow)

> From my observations, development teams tend to become monolith-layered heavy structures consisting of subteams aligned by specializations. Much like tribes divided by geographical distance, culture, language, or dialect. They meet one time per two weeks on safe ground to market. They try to exchange their goods and not return to the cave with things they lugged there.
> 
> But the truth is that frontend and backend developers must go out of their caves, their comfort zones - and **collaboratively design a solution** because **frontend and backend constitute a value together**.

- [Artur Wojnar](https://www.linkedin.com/in/artur-wojnar-a19349a6), Solutions Architect

**TL;DR; 💡 Frontend and backend constitute a value together. They share some data that has the same semantics. Frontend cannot be treated as a separate Bounded Context in a typical app with FE and BE. Hence, applying DDD to Frontend only doesn't make sense.**

<% TOC %>

## Bounded Contexts and Backend/Frontend

[Yesterday we learned that each Bounded Context should have its own autonomous model](/ddd-autonomous-models-in-bounded-contexts). That's a direct implication of what a Bounded Context is: **it's a boundary where a specific domain model, defined using the Ubiquitous Language, exists and makes sense**.

It's all nice speaking about semantic and/or linguistic boundaries... But how does that translate to your actual codebase and the technology stack?

In particular - how does the backend-frontend separation plays with Bounded Contexts?

There's one particularly dangerous misconception, as if *the frontend could implement DDD in separation from the rest of the system*. Just as if frontend itself was a separate Bounded Context.

**It's not.** At least in roughly 99%, it's not.

And today we'll dive into the why.

# Frontend and Backend constitute a value together

> Frontend and backend developers must [...] collaboratively design a solution** because **frontend and backend constitute a value together.

This quote from Artur Wojnar perfectly outlines the essence: in modern systems, **most often we need both server-side and client-side code in order to provide the business value to the end user**. The frontend is responsible for handling user's interactions - and the backend deals with topics such as persistence, data consistency, guarding business rules and so on.

**They complement each other**.

The question is, however, how to organize their work together efficiently.

## Fullstack Teams

As an industry we've gone through an era where frontend devs, backend devs, SysAdmins and so on - all formed separate teams. The idea behind this split was to allocate the best people to certain tasks.

But it turned out that if a _feature_ requires to be developed by people from various teams - then communication cost slow down the process drastically. That's because people cooperating on a certain *feature* don't share the same knowledge. They might be working not only on totally different stacks, but also different systems. **The cost of unifying the understanding and making the communication effective in really, really high**.

As a consequence, many products have shifted towards **Fullstack teams**. That doesn't mean that each team member is a fullstack developer itself. No way - or at least that's not the point. The point is that the **team as a whole has competence in all layers/parts/pieces of the system** (let it be frontend, backend, cloud, QA, whatever it takes).

And the Fullstack teams prove to be way **more effective**. **Even though sometimes, for instance, a backend developer has to tweak something on frontend** (which is not the best resource allocation). Or vice versa. But they **move forward as a team**. And that's what matters. [TTM](https://en.wikipedia.org/wiki/Time_to_market) improves.

**Fullstack teams are focused on a business goal, not a technical goal**.

And that's where we can go back to Bounded Contexts...

## Bounded Context is tech-agnostic

Bounded Context, as said before, is a boundary in which a domain model exists and makes sense. It's a linguistic/semantic boundary. **Not a technical one**.

Bounded Contexts are also formed around **a business goal, not a technical one**.

Therefore, most often, a single Bounded Context would include solutions from any tech/layer that is needed in order to achieve the goal: some database, some infra, some server code, some client code, etc. Why? [Because all these parts, **combined together**, bring value](https://en.wikipedia.org/wiki/Captain_Planet_and_the_Planeteers).

## Frontend in Isolation

Again, there's this misconception that *DDD could be "implemented" on frontend, being unaligned with whatever the rest of the system is doing*.

Why is that wrong? Again - because of **semantics**.

Your frontend is - most probably - consuming some resources from the backend directly. **Do you think that the semantics of this very same data is different on frontend and on backend**? Especially that frontend and backend complement each other (UI and user interactions + data persistence and consistency)?

**Most probably, not**. However, there's an edgecase...

## Rare case of Frontend-only Bounded Context

There is an edgecase, where it's the frontend which is responsible not only for the UI/user interactions, but also for handling data persistence. For instance, **you have no server code whatsoever** - and instead, you're using some cloud JSON storage such as [firebase](https://firebase.google.com/) or [supabase](https://supabase.com/).

If that's the case, then yes, *kind of*, a frontend without backend could be responsible for delivering the solution for a given Bounded Context.

However, from my observation this is extremely uncommon, especially in complex domain-rich products.

## Wrap up: does DDD matter in frontend then?

YES! As long as the whole DDD approach makes sense in your system (e.g. it's not a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)-everywhere application, it doesn't rely on [Pipes and Filters architecture](https://learn.microsoft.com/en-us/azure/architecture/patterns/pipes-and-filters) etc - where DDD isn't really useful).

**It's important to modularize your app effectively.** And DDD's Bounded Context - and their semantic boundaries - prove to be extremely effective in maintaining complex frontend apps in the long run.

Tomorrow we'll dive into making practical use of Bounded Contexts on frontend, stay tuned 🎅.
