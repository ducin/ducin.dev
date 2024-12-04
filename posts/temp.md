
## DDD terminology and jargon

Having said all of that, it's worthwhile to mention a minor "_bad practice_" related to all this jargon: it could be overwhelming. Especially for people not familiar with DDD. **And all those fancy terms and phrases are not the core themselves**. What matters way more is, again, collaboration with domain experts in order to understand the domain better.

In order to reduce the DDD jargon, you can substitute e.g. _domain_ with _business_ and _bounded context_ with _module_. Of course it's less precise, but does it matter, as long as we make developers shift their focus to understanding the... umm, _business_, in order to properly draw the... _modules_? Overusing the jargon is nothing but gatekeeping - be careful for that.

Kudos to [Oskar Dudycz](https://event-driven.io/en/) who convinced me that reducing jargon pays off.

----

> but... but I do understand how my product and business work. I know who the customers are, how does the company make the revenue, and all. I do create business-oriented software. Is that DDD?

Um, "*it depends*". It could be (to some extent at least), it could be not.

----

# plan

The aDDDvent calendar 2024:
- [X] day 1: DDD is not about technology
- [X] day 2: Talk to domain experts
- [X] day 3: Speaking ubiquitous language
- [~] day 4: Designing Bounded Contexts
- [ ] day 5: Exploring the Domain
- [ ] day 6: Context Maps - Cross-module relations
- [ ] day 7: 

- in practice: e.g. different semantic models
- overview: strategic and tactical
- exploring domains, heuristics
- MFE x Bounded Contexts
- Atomic Design x DDD
- mistakes:
  - jumping straight into tactical phase
  - canonical data models (ignoring different semantics)
  - database-driven development (reflect DB schema everywhere)
- practices:
  - event storming: https://www.youtube.com/watch?v=mLXQIYEwK24
  - domain storytelling
  - domain story mapping
  - Wardley mapping
- tactical

# input

- Damian
- Piotrek Wyczes
- Aleix Morgadas

----

#STRATEGIC-DDD #BOUNDED-CONTEXT
> Na poziomie strategicznym potrzebujesz autonomicznych modeli, czyli takich, gdzie zmiana jednego modelu nie pociąga za sobą potrzeby zmian w innych - mam na myśli zmianę modelu jako takiego a nie zmianę danych. Każdy z tych modeli będzie sobie później na poziomie taktycznym opracowywać przy pomocy odpowiednich building blocks - odpowiednich do klasy problemu, bo nie zawsze potrzebujesz np agregatów, kiedy nie masz ryzyka współbieżnej zmiany stanu. Ale wracając do autonomii modeli - jak ją zweryfikować? Prostokąciki ze strzałeczkami mogą ukrywać prawdę. Musisz sprawdzić jakie sygnały (komendy i zdarzenia) przesyłasz pomiędzy modeli, bo to one mogą naruszać granice, zdradzać wewnętrzne modele.
- Sławek Sobótka

#SUBDOMAINS
> 1. I caution against taking shortcuts and defining subdomains based solely on departments within the company. More often than not, such assumptions are incorrect, as processes usually cross several departments. If there is organizational chaos in your company, you will transfer it to your software"
>
#SUBDOMAINS #ARCHETYPES
> 2. Over time, as you gain more experience in distilling subdomains, you will spot recurring patterns. There are popular subdomains like invoicing or payments, which will appear in various domains, although they will not always be resolved in the same way. Sometimes, you can use an off-the-shelf solution; other times, you must implement it in-house due to the process’s complexity and uniqueness.
- MJ


#HOT-TAKE #UL
> 2. For many years, the DDD community was so focused on speaking the language of the business that it somehow forgot how to speak with developers. That created a chasm between the modelling output and the architecture. We should work as a community to bridge it back together.
- Oskar

#DOMAIN-EXPERTS #MODELLING
> 3. The goal of modelling is not to reflect reality but to solve the specific problem. It's a bit arrogant to believe we can become domain experts in a few weeks. Still, we don't have to. We can understand the use case well enough to build a model to solve the problem through software.
- Oskar

#COLLABO
> "When a man points at collaboration with tools, fools look at tools and not at collaboration"
- Damian Płaza

> "Each architecture starts in HR department - the way we set up teams, their members and interactions, already imply the modules that are going to be created. What's the best way of figuring out teams' organization?"
- Damian Płaza




#CONTEXT-MAPPING
> 2. Context mapping patterns help refine the boundaries of bounded contexts. These patterns are often an overlooked aspect of strategic design. Simply defining the boundaries of contexts in terms of functional scope, state, and business rules is not sufficient. If we do not define how individual contexts communicate with one another (e.g., which one emits events, which one accepts commands, and which one handles queries), it may turn out that contexts end up depending on each other’s functions or data. This, in turn, can lead to a loss of model autonomy and necessitate inter-team communication, synchronization of work, and coordinated deployments, ultimately reducing the teams’ productivity and operational performance.
> Context mapping patterns not only help clarify the boundaries between models but also establish methods for collaboration between teams.
- Bartłomiej Słota





#AGGREGATES #TACTICAL
> Rules are needed to protect us. When introducing a new pattern or principle, begin by analyzing its corresponding rules and the risks they are designed to mitigate. Work with your colleagues to reach an agreement that these risks are relevant in your specific context. Once there is alignment on the problem, securing buy-in for the solution will become orders of magnitude easier.
- Vlad Khononov



#TACTICAL
> DDD a procesy biznesowe
>
> Prostota DDD objawia się w tym jak łatwo mapuje się procesy biznesowe na kod.
>
> Jeśli spojrzymy na domeny jak na działy w biznesie, to dopiero współpraca tych działów tworzy procesy biznesowe. 
>
> Procesy biznesowe zebrane razem to model biznesowy.
>
> Takie myślenie o systemie ułatwia komunikację biznesu z programistami. 
>
> Ułatwia też pisanie procesów w kodzie (process managery, sagi, czasem prosty event handler mapujący event na komendę).
>
> Proces to najczęściej sekwencje zdarzeń z danych działów biznesowych skutkujące komendą do innego działu.
- Andrzej Krzywda


#AGGREGATE
> 1. "Aggregate pattern is not about state aggregation. It's about aggregating change. We are aggregating the changes of the things that should be changed together so we still get the correct state. What's the correct state? The one that fulfils the business rules."
- Oskar



#DDD-OR-NOT
> 1. Merely analyzing the application code does NOT allow us to directly determine whether DDD (Domain-Driven Design) was used in the project or not. It’s common during consulting projects or training sessions to hear statements like “we did DDD in this application” or “this application doesn’t have DDD.” A common cognitive bias among developers and architects is equating DDD with the use of tactical patterns and hexagonal architecture. As a result, CRUD-based applications are often treated as those where DDD wasn’t applied.
> However, the fact is that the essence of DDD lies in identifying the nature of the problem and selecting solutions appropriate to that discovery. This means that if we use a CRUD-based approach to implement a simple, generic subdomain, it is a correct decision. Conversely, using hexagonal architecture and DDD tactical patterns in such subdomains would be over-engineering, effectively slowing down further development—and thus would not be the correct decision.
> 
> We create autonomous models to optimize them for solving specific classes of problems.

#DDD-OR-NOT
> If not 'Domain' Driven, then actually driven by by what?
>
> "We're not doing DDD, because..." Is a frequent sentence that actually is hard to believe in these days. Yes, you're not following every aspect of DDD, but DDD is not 'take it or leave it'. You take parts that are relevant in your case, omit the others (yet understanding the consequences).
> 
> When you're not using every possible starter from Spring Framework, do you say, you're app is not on Spring? 
>
> It is hardly possible to find a place where Domain (a.k.a. Business) is not driving the IT. Actually it drives also the design. IT has not much of a choice in that matter, in fact. We can either:
> A) follow it and benefit from understanding the domain
> B) or reject it and pretend IT knows better. In the end people say that it is software that rules the world, isn't it? 
- Jacek Milewski




#FE-BE
> 1. From my observations, development teams tend to become monolith-layered heavy structures consisting of subteams aligned by specializations. Much like tribes divided by geographical distance, culture, language, or dialect. They meet one time per two weeks on safe ground to market. They try to exchange their goods and not return to the cave with things they lugged there. But the truth is that frontend and backend developers must go out of their caves, their comfort zones, and collaboratively design a solution because frontend and backend constitute a value together.
>
#FE-BE #AGGREGATES
> 2. Root Aggregates and Entities discovered during design sessions of backend teams don't translate into frontend.
> Frontends usually aggregate those Root Aggregates and Entities to render summary tables, e.g., an order summary. In fact, that view may consist of order positions, original prices, effective prices, applied discounts, or division of order positions into packages.
- Artur Wojnar



> One can say that software development in general is a highly sociotechnical enterprise; We are people working with people to create digital tools for people.
- Trond Hjorteland



## Bounded Contexts are agnostic to Deployment Architecture

Bounded Contexts are being **designed way before any coding takes place**. Essentially, Strategic DDD precedes Tactical DDD.

A concerns could arise: how can we design the contexts if we don't yet know whether we'll eventually go with Monolithic System or Distributed MicroServices/MicroFrontends architecture?




## How big is a Bounded Context?

At some point a question arises, regarding the size of a Bounded Context: how big should it be?

Similar questions have been asked about MicroServices. People used to give quite peculiar answers such as specific limit of LoC 😛. **Measuring correctness of a system component never made sense in terms of its size**. And probably never will.

The fact is that **Bounded Contexts should be rather small**. Most probably smaller than you initially think. Generally speaking: **the wider you draw the boundary around domain concepts, the bigger risk that their meaning will remain concise**.

The Context should be large enough to include all relevant concepts of a domain, formed into a Ubiquitous Language - but not larger than that.