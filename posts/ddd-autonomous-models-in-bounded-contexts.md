The aDDDvent calendar 2024:
- day 1: [DDD is not about Technology](/ddd-is-not-about-technology)
- day 2: [Talk to Domain Experts](/ddd-talk-to-domain-experts)
- day 3: [Speaking Ubiquitous Language](/ddd-speaking-ubiquitous-language)
- **day 4: [Autonomous Models in Bounded Contexts](/ddd-autonomous-models-in-bounded-contexts)**
- day 5: [Your Frontend itself is NOT a Bounded Context](/ddd-your-frontend-is-not-a-bounded-context)
- day 6: (tomorrow)

**TL;DR; 💡 A Bounded Context is a boundary where a specific domain model exists and makes sense. The Ubiquitous Language provides terms and phrases with very specific meaning. Each domain model within its context is autonomous and doesn't depend on models from different contexts, to reduce unnecessary coupling. Don't let DRY principle cheat you.**

> At the strategic level, you need **autonomous models**, i.e. models where changing **one model does not entail the need for changes in others** - I mean changing the model itself, not changing the data. Each of these models will be developed later at the tactical level using appropriate building blocks - appropriate to the class of the problem, because you do not always need, for example, aggregates, when you do not have the risk of a concurrent change of state.
>
> But returning to the autonomy of models - how to verify it? Rectangles and arrows can trick you. **You need to check what signals (commands and events) you send between models, because they can violate boundaries, and leak internal models**.

― [Sławek Sobótka](https://www.linkedin.com/in/ssobot), DDD & Architecture expert, founder of [Bottega IT Minds](https://bottega.com.pl/)

<% TOC %>

## Bounded Context as a Semantic/Linguistic Boundary

[Yesterday we've been speaking the Ubiquitous Language](ddd-speaking-ubiquitous-language). We've mentioned that the language defines the boundary in which all domain concepts make sense. If this seems anyhow tangled, let's untangle it now. 🙂

Today we'll learn that **how we shape our domain models matter a lot**.

## Ranking request sent after a Purchase

Let's go back to the e-commerce domain. It could happen that after we buy something at an online shop, there'd be an email sent asking us to fill a form where we evaluate how happy we are with the product bought (BTW, *product* again 😅). The task is to design the solution which supports **product rankings**.

The first thing that some developers would think of is: *phew, create a ranking module, that's it!*

If we dive into the ranking lifecycle, we'll discover some interesting things:

1. When the customer enters a product offer page, they will see the *product ranking* which determines how people were happy with it, e.g. using star icons, a value from a 1-5 range, some text descriptions with images maybe.
2. The customer hypothetically chooses a product, buys it, pays for it, awaits the delivery, collects it - and only then (many days later, probably) the email with the request is sent, asking the customer to rate the product.

We might notice that from the customer's perspective, the product ranking's lifecycle is *somehow* inverted. The customer first uses (reads) the *product ranking*, only to create the *product ranking* themselves later.

Many misconceptions (such as the one above) could arise, as... there are two totally different meaning behind what a *product ranking* actually is!

## Different Meanings of the same phrase, AGAIN!

When the customer opens a product offer page, they see a preprocessed accumulation of all the evaluations of all customers who have bought this exact product before. That would probably include an average rate (number 1-5), a list of text descriptions, etc. This is a *product ranking*, right?

However, after a successful purchase and delivery collecting, the customer might fill in the product ranking form. The customer creates (and sends) their evaluation. Also a *product ranking*, right?

Yes, we have spot a **semantic boundary**. We're dealing with at least two different bounded contexts here.

## Modules bounded by entities

I'm pretty sure you've seen projects, which have their modular structure resembling something similar to this:

```
src/
  products/
  orders/
  customers/
  ratings/
  ...
```

Essentially, this design is drawn with respect to your data model. From backend's perspective, that model reflects the database schema: tables and their relations. For instance, the `Category` entity with all its related features could be located within `Product` module, as Category related only to a `Product` (has a foreign key inside the DB).

On Frontend level, the model would reflect the endpoints exposed from the server's API.

In both cases, the modularity is designed by the underlying data model, respective to each level. Quite often, if backend exposes a data model resembling the database structure through the API, then frontend would often do the same.

There are many things wrong with that. But I want to focus on two of them here. They might be non-obvious at first: **module coupling** and **model coupling**.

## Database-oriented `ratings` module

If the `ratings` module is designed this way, then:
- Product `offer` module (the one that displays the product along with its details) would depend on the `rating`, as it requires to fetch existing *product rating* to a potential customer
- However, the module which displays and handles the form which accepts customer's ranking also needs to depend on `rating`

Now if we take into account that the `rating` feature is one of the least important features of the whole application - yet it's required in at least two places, then the product `offer` module might depend on tens of different modules. A *god module*, we could say. **It requires everything and, probably, also orchestrates most of them.**

I can think of no **faster way to effectively increase tight coupling** between modules.

## Common `Rating` model

If we carry on with the database-oriented approach (continued further on frontend), then someone could also think of simply returning a list of `Report` objects straight to a JS client. The frontend layer would be responsible for calculating all the averages, total sums, etc. **The model could be shared among all `rating` module usecases**. It could even end up having only a single model.

*(spoiler: is it a good idea? Hell no!)*

Why would a developer think this is a good idea? Again, misunderstanding DRY has its place here: *why creating more than one model if I have only a single database table? Why would I create different models if one is enough?*

## Working with Shared Models

We need to realize that there might be totally different priorities coming from stakeholders regarding the product offer page and the ranking form. Each has its UX nuances. Most probably A/B tests are being run in order to optimize conversion rate. What is certain: **they would sooner or later diverge.** It's not a question of "*if*", but rather "*when*".

Providing a **single model** that fuels totally different usecases **increases coupling**. And this, in the long run, increases project maintenance significantly. Or even tremendously.

The coupling manifests itself when one party needs to change that model - and the other one doesn't have time for that. The other team might have different priorities. In such case we might have to wait... for undefined length of time... or it could even get rejected, e.g. "_we're happy with the model - why do you even need to change it? Can't you carry on with how it is right now?_"

The shared model could suffer from various *modelling diseases*, such as:
- **getting too many properties**. This could result in unnecessary data bing fetched from the DB and/or over the network to supply frontend. Example: the shared model includes rating images which are used only if the user walks into a specific tab on the UI.
- since too many properties are bad, let's **make the unnecessary ones optional** 🤡. In this case we are facing a situation where the above mentioned image property gets optional, so a component that needs the image might not get it (type-system wise it's okay for image not to be there). As a consequence, additional "if" statements (e.g. TypeScript type guards) are required.

Not sure, to be honest, which approach is worse. 😛

## Autonomous Models

> At the strategic level, you need **autonomous models**, i.e. models where changing one model does not entail the need for changes in others - I mean changing the model itself, not changing the data.

Here we've got the essence of strategic DDD: **autonomous models**.

The alternative, as Sławek Sobótka suggests - are **autonomous models**: each model for a certain usecase. **Each model within each Bounded Context**.

We don't want to share the model across Bounded Contexts, as this would enforce unnecessary synchronization between the teams who work on those features. It could theoretically happen that both Bounded Contexts would eventually get implemented by the same team. But that's not a good idea to hope for it 😛.

Introducing separate, autonomous models is not only no rocket science, but it also doesn't require that much effort.

What is crucial here is a mindset shift: **nobody said you can have only a single model which should be reused across the whole system.** You really don't have to limit yourself.

## Conclusion

Whenever you identify that **the meaning of a certain phrase differs across contexts, most probably you need to provide multiple models for each context.**

Treat the above as a useful [heuristic](https://en.wikipedia.org/wiki/Heuristic).

And, as business requirements (within a context) change, the models will follow. We don't need any unnecessary friction across contexts/teams.

Remember, that the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) is about knowledge. Different meaning, within a different context, is a different knowledge. **By providing multiple models for different contexts, you don't repeat the knowledge**.

Amen. 😉

[Tomorrow we'll tackle a misconception around Bounded Contexts and Frontend](/ddd-your-frontend-is-not-a-bounded-context) 🔥.
