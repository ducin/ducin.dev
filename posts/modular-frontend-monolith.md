# Modular Frontend Monolith: design decisions that shape modularity

only **outline** as for now 😉

series of 4-5 posts:
1. Modular Frontend Monolith: design decisions that shape modularity
2. Modular Frontend Monolith: utils, core, shared and all the rest
3. Modular Frontend Monolith: database-oriented modularity
4. Modular Frontend Monolith: business functionalities oriented modularity
5. (?) summary

in order for each post to bring any value, it's broken down like the following:
- POST 1
  - I question that modularity is a subjective issue, because, as you wrote, it's an undeveloped topic on the front
  - we include measurable factors in the analysis, such as shallow, deep, etc.
- POST 2:
  - it's crap, you can see that. But where does this crap come from? That there's reuse abuse
- POST 3:
  - I question the entity orientation. That it's too data-centric. You know what I mean
- POST 4:
  - I present it as a new, default recommended approach

---

# POST 1

> If you can't build a modular monolith, what makes you think microservices is the answer?

― Simon Brown

---

- (starting with the quote)

---

disclaimer:
- if you're passionate about new features of your favorite framework, stop reading ;)
- you won't find the new stuff from react v19 or angular v18.2. If that's what you're excited about, you might want to see some recent tutorials instead :P
- yes, a typical frontend dev might be more interested in topics like to tailwind or not to tailwind...
- so this one is for you only if you care how is your application shaped from a higher-level perspective


---

- why modularity is important
  - modularity is an ambiguous term, different people assign it with different meaning, even the same individuals tend to attach different meanings to what "modularity" is, depending on what they want to prove at the moment
  - as a result, the vague term leads to high confidence of each codebase being highly modular. But in practice it turns out that, as applications grow, high coupling tends to prove that the codebase was often never really modular.
  - that's why I want to dive deeper into the topic. 
- what's the whole point of modularity - why should you even care about such abstract topic
  - adapt changes more easily

---

- motivation
  - as you'll be analyzing the 3 modularity styles in the upcoming posts of the series, is to make you recognize them from the projects you've worked in, I want you to focus on the challenges you've faced in the past
  - my goal is to make you take a huge zoom-out from the code perspective to the higher-level design perspective - and **connect the dots** between design decisions and the challenges you've been facing. I want you to realize that how you design your modules affects long-term maintenance crucially.
  - eventually, my goal is to spark reflection and challenge how you modularize your applications

---

- directory structure disclaimer
  - personally I don't find "directory structure" a critical aspect of an application architecture (more on this - link to _what is frontend architecture_) as I believe many other factors:
    - shape our app architecture in a more invasive way
    - and are more expensive to change (imagine you use redux for data loading throughout your entire app; what is cheaper to change: how you locate files or cut off redux-based-data-loading which is almost everywhere in thousands of LoC?).
  - but still:
    - this doesn't mean directory structure is totally irrelevant
    - many people find this topic important, as it does draw responsibility boundaries. **At least in theory (!)**.
  - stop talking, point me to the directory structure (internal link to where directory structures are discussed)

---

- first things first
  - **monolith**: briefly defined as software which is deployed as a whole. Single deployment unit per entire application. I.e. we don't focus on microfrontends in this post.
  - **frontend**: we're focusing mainly on frontend apps.
  - **modular**: aaand that's of the most vague and imprecise terms in software ever. That's what we focus on here.
    - of course we **don't discuss** ESM (ECMAScript Modules, per specification), TypeScript modules, or node "modules" (things we `npm install`)

---

- module quasi-definition
  - it's difficult to define what a module is exactly. And even if we do that, the definition is often not useful at all, e.g.
  - > A module is a self-contained unit of code that encapsulates specific functionality within a larger software system, allowing for easier maintenance and reuse.
  - told ya ;) anyway, since we don't have precise definition (above one is extremely wide and abstract), what's the point of saying that *a codebase is modular*, actually?

---

- modularity quasi-styles
  - by (building block) type - group by components, by services etc.
    - very bad
    - not explaining why so bad, mentioning maybe it'd become a separate post one day
  - by feature
    - at first it seems domain-wise
    - but people interpret "feature" in very different ways
  - all in all, this separation (type vs feature) is ultimately primitive and reflects state of art of early 2010s, we need something better
    - especially that it doesn't take into account important aspects, such as: cohesion, coupling, granularity, encapsulation and deep/shallow modules distinction (which we remind below)

---

software design characteristics recap

It's pretty much impossible to discuss modularity without bringing back these good old friends:

- cohesion: the strength which ties data and function operating on that data together
- coupling: the number and the strength of cross-item (cross-module?) dependencies that make them rely on each other
  - different types of coupling are mentioned only by name (common coupling, content coupling, temporal coupling, communication coupling, etc)
- granularity: how big/small should a module be
- encapsulation: hiding what should not be exposed. Don't want to repeat tons of things that has been said about it. In short, you don't expose your stomach, liver, pancreas and other internal organs - but your mouth (among others 🫢) is the public API to the digestive system, which is highly complex, but encapsulated
- deep/shallow modules:
  - deep modules - exposing either a thin (!) API which encapsulates a lot underneath, rather well thought-out. Yes, digestive system is a deep module.
  - shallow modules - the opposite, no clear strategy or design, hence broad API is exposed, with potentially leaky abstractions. According to food/digestion metaphor, the shallow module could be nutrition/diet management - there's no simple way to follow a certain diet or nutrition plan (of course, unless you hire an experienced dietician!) - one needs to process **lots** of low-level data such as calories, ingredient list, plan the whole week, regularly buy groceries, prepare the meals, etc. I.e. you can't just execute a command "lose 10kg thanks to keto diet", it just doesn't work like this.

---

- modularity is bound to directory structure
- below we discuss modularity styles which I see repeating regularly in the wild
- the directory structures are obviously simplified, but hopefully are enough precise to give you a feeling on what were the design choices behind them
- of course there might be more styles than I have outlined below. And there might be lots of mixed approaches. A single aspect in one of the styles could be cherry-picked to another style. I've decided to keep things simple and present only 3 styles, mostly, to emphasize different design decisions.

TODO: in all examples below I'll prepare an example domain which illustrates directory names better, e.g. instead of "entity-A/entity-B" there'd be doctor, appointment, etc.
TODO: (follow-up) examples in redux, react query etc would relate to the medical domain
TODO: for each of 3 styles, "check the design" by simulating a hypothetical change/implementation - i.e. what will happen if you make the change X - how each approach "accepts" the change (the whole point of modularity)

disclaimer:
- if your application is rather smaller than bigger, then the design mistakes could not matter that much
- if your application is of little business relevance, then the design mistakes could not matter that much
- etc.

I assume we're speaking about an application that meets at least one of the following criteria:
- it's rather bigger than smaller (in terms of either LoC or devs working on it)
- it's important business-wise
- it's being taken care by someone (you, dear Reader) who cares about quality...

---

# POST 2

- utils, core, shared and all the rest
  - 
  ```
  src/
    utils/
      (some low-level tech utilities, math, ts helpers, etc.)
    core/ (or the exact name of what the core feature is)
      (the critical business module of the app)
      (most often filled with god components, god classes, god entities, hence the name)
    shared/
      shared (external) api
      shared state
      shared components
      random shared utilities, even business logic
    OTHER-BUSINESS-LOGIC/
      (potentially multiple directories)
      (placed in rather random structure, as they're not core)
  ```
  - **DESIGN FOCUS: REUSABILITY**
  - a style which emphasizes what is being shared, as opposed to what is rather local/private
  - lots of things placed in `shared` emphasize that authors value reusability over isolation, and probably are unaware of the costs that excessive reuse brings
  - core business functionality is colocated as the most important piece, but often poorly designed internally
    - the core has an open way to grow even bigger and become more tangled
    - most probably, the `core` is not what is important business-wise, but what is difficult implementation-wise
  - other business functionalities are not given enough attention
    - entropy causes _other business logic_ to become more chaotic and unmanaged (as it's outside of core)
  - extremely low repetition (but not for free)
  - reusable components could be well-designed (as they're highly reused)
  - most probably, this approach is done is isolation from whatever is going on on the backend side
  - most probably, there was no consideration around frontend data modelling
  - most probably, module lazy loading was never considered important (and it's too late/expensive to change it)
  - DESIGN AND MAINTENANCE:
    - if the application grows in size/complexity/team size, the codebase quickly becomes unmanageable
    - no cohesion within `utils`, little cohesion within `shared`, these are **shallow modules**
    - `core` could be a **deep module**, but there's extremely high coupling inside of it
    - `core`'s granularity is probably too low - it could be split into more fine-grained single-aspect (sub)modules
    - all in all, cohesion is low, as there's not much thinking about standalone business functionalities. Reusability drains attention from other aspects effectively, unfortunately.
  - TESTING:
    - you can expect hundreds of unit tests, which are very easy to introduce in this approach
      - obviously, they bring very little value
      - they relate to utils and shared mostly
    - you can expect hardly any UI integration tests
      - developers tried to implement them for core, but failed, and concluded that integrations tests don't fit their project, as _their project is really very specific, unike the rest of the industry_
    - you can expect few E2E tests for core
      - the costs of maintaining E2E tests is either "average" or "above average" - whenever something fails it takes quite a bit of time to identify the source of the issue
      - developers don't find E2E tests very helpful
    - all in all entire testing failed the expectations and probably the automated testing initiative is halted

---

# POST 3

- database-oriented modularity
  - 
  ```
  src/
    api/
      entityA-api
      entityB-api
      shared of course
    entityA/
      (lots of things exclusively related to A)
    entityB/
      (lots of things exclusively related to B)
    ...
      (these could be nested of course)
    shared/
      (now this is enormous, as there'd be tons of things that relate to both A and B)
      (and it's pretty much impossible to define determine whether it belongs to A or to B more)
      (not to mention there could be features that relate to A, B, C, D...)
      (it's a question of time until someone introduces `shared`, which will start growing rapidly from that moment.)
      (in short: all the things that "we don't know where to put™️")
    state-or-store/
      (since API is shared, and all entities are used globally, state is also managed globally)
  ```
  - **DESIGN FOCUS: BUSINESS OBJECTS**
  - this is a significant improvement over the previous approach
  - ADOPTION: it's good enough for highly CRUD-specific apps, these include: dashboard apps, heavy listings and tables apps, etc. All of them are JSON-in-JSON-out and hardly do anything besides loading and displaying data or simple CREATE/UPDATE/DELETE ops.
    - but it's not good enough, if the UI is not CRUD-oriented, e.g.
      - it implements business processes, such as multi-step forms which complete a business operation
      - the interface is domain-aware to some extent, e.g.
        - you can book an appointments to an internist immediately, but...
        - if you want to take a vaccine, then you first need to book the internist
        - if you want to book a psychiatrist that could be remote...
        - but only if you're on a premium plan. And if you are on a basic plan, some of the features get greyed out and a certain notification gets displayed... etc etc etc...
    - and all that we discuss further is in case our interface is anyhow domain-aware
  - DATA MODEL is a result of treating the database schema as the main design driver
    - most probably established by backend developers, yet unquestioned by frontend developers
    - canonical data models are used mostly
      - canonical data model explained
      - simple example given within an example domain
    - disadvantages of canonical data models:
      - increases tight coupling across modules which need to use the entity/ies
      - increases the risk that these entities become god classes
      - introduces a single point of synchronization across different teams
    - most probably, this approach is aligned with the backend side
      - especially, with how backend developers perceive entities and how they handle domain logic
  - DESIGN AND MAINTENANCE:
    - state sharing seems a good idea at first, but becomes more challenging as the application grows in both size (codebase, number of developers) and complexity
      - globally managed state tends to get normalized, which increases coupling across entity-oriented modules
        - explain data normalization briefly
      - within time it's more often that it's cheaper to add e.g. another redux slice than to extend/refactor the existing one, since it's already used in 3 totally different usecases - **even though** that would mean introducing data redundancy into a structure which expects normalized data
    - cohesion is average to low: could be satisfying within the entity-oriented modules, but could get devastated around anything that leaks into `shared`
      - for the same reasons coupling is average to high
      - even if `shared` gets dropped, then features from entity-B could get "swallowed" into entity-A, which:
        - literally gets rid of `shared` as-is (goal achieved)
        - but it's not necessarily clearer. And developers would feel that, but would probably be unable to explain why, or how to do better
    - module granularity is bound to the model (or, actually, database schema)
    - depending on luck, entity oriented modules tend to become rather *deep modules*, but anything that gets shared (including state management) is definitely a *shallow module*
  - COMMUNICATION:
    - communication happens most probably through the shared state
    - frontend frameworks are all more or less reactive nowadays, APIs like state selectors are common (e.g. whenever piece of my state changes, rerender the components that depend on this data). When the appropriate piece of the state is changed by component A, component B gets rerenderd
      - this works correctly
      - but coupling is the issue... state becomes the centralized point of synchronization for potentially all modules. This could lead to problems not only when we need to scale our app (in terms of development teams) or split into MFEs. It could also be a huge problem, if we wanted to modify anything related to the state (either its internal shape/structure, or the tooling around it). Since multiple parties depend on it, they all would have to update at the same time, which - in "big projects" could never happen, due to exclusive business priorities of distinct teams.
  - TESTING:
    - you can expect that UI integration tests play significantly more important role in this approach
      - it's easier to follow the direction behind the Testing Trophy (+ link to Kent Dodds)
      - UI Integration tests are grouped around business objects (entities)
      - however, shared state could be a challenge to properly create a robust setup for UI integration tests
    - unit and E2E tests could be added accordingly, but they are in no way favored in this modularity style
- dirty points, not yet included:
  - thesis: there's no modularity on FE in separation from BE/contract
  - database is raping backend devs' minds
  - front devs just carry on with the database-oriented approach since they don't care
  - wszyscy mają encja na twarz i pchasz

---

# POST 4

- business functionalities oriented
  - 
  ```
  src/
    user-feature-A/
      api/
      model/
      state/
      ui/
      utils/
    user-feature-B/
      api/
      state/
      model/
      ui/
      utils/
    lib/
      (deliberately the name `shared`/`utils` is avoided)
      (each dir here needs to have an exact responsibility, see "broken window theory")
      ui-library/
        (shared components here)
      collections/
        (shared utilities related to data collections)
      lang/
        (shared utilities related to language axtensions)
      

  ```
  - **DESIGN FOCUS: BUSINESS FUNCTIONALITIES**
  - ADOPTION: this is an approach that fits domain-aware interfaces better than previous alternatives
    - it could be unnecessarily too verbose or too granular for CRUD-oriented interfaces
  - from visual perspective: a user feature is very often strictly aligned to UI views/mockups
  - from business/domain perspective: a user feature is very often strictly aligned to DDD bounded contexts
  - clearly code isolation is more important than reusability
    - if there was ever (!) a need to:
      - grow the team in size (e.g. from 10 people up to 30 people, resuilting in 6 teams instead of just 2 - which could result in increased communication costs)
      - split the application into microfrontends (for any reasons, let's not walk into this topic here)
    - then the split is rather a matter of days, not months
  - DATA MODEL is a result treating user stories / business functionalities as the main design driver
    - a single entity could be reified (made concrete) in multiple different models
      - example
  - DESIGN AND MAINTENANCE:
    - this approach is optimized for extensibility and long-term maintenance
      - at the cost of potential code duplication
    - the biggest cost (and difficulty) is the mind shift
    - global state is avoided
      - it's technically acceptable to provide a single store (as the application is a monolith), but each module keeps its own separate state there, and there's no force to normalize the state. It's also explicitly known that a store is centralized only technically, not logically
        - example: react/tanstack query. Single QueryClient instance (and hence single QueryCache), but all modules can keep their querykeys totally independently on each other. Technically centralized, logically isolated.
      - various modules could be using different state management solutions
        - because of that, redux-based solutions make little sense. On the other hand, decentralized state management solutions, such as MobX fit this approach very well
    - lazy loading is at its finest in this approach, since we split code according to business functionalities, and so an entire module (or a part thereof) could be loaded only if the user runs this functionality
  - COMMUNICATION:
    - isolation is valued over code reusability. Therefore, modules communicate via events
    - event broker is centralized and available globally
    - data could be redundant, but who cares - isolation is more important than reuse
    - the ownership of the exposed event APIs is managed in a similar way as Context Mapping Patterns in Strategic DDD
      - very short explanation of OHS
      - very short explanation of Customer-Supplier
      - very short explanation of Shared Kernel
      - briefly mentioned that there is more...
    - ACL as a default choice (link to former article :P)
  - TESTING:
    - having business functionalities as the center of the design, the fundamental type of test is the UI integration test focused on... a certain business functionalities ;)
    - unit and E2E tests can be used accordingly, but play a peripherial role

---

# POST 5 (?)

conclusion

We've seen different approaches to tackle modularity in frontend applications. I'm not going to repeat the reasoning - but there's one thing I'd like to repeat anyway, and that is:
  - utils, core, shared and all the rest / DESIGN FOCUS: REUSABILITY
  - database-oriented modularity / DESIGN FOCUS: BUSINESS OBJECTS
  - business functionalities oriented / DESIGN FOCUS: BUSINESS FUNCTIONALITIES

What you focus on shapes not only your code and design, but also shapes **how you think of software**.

My goal is achieved if I managed to challenge how you've been designing your applications and, even if you disagree here or there (it's okay to disagree, right?), then there'd still be reflection around the topic f modularity.
