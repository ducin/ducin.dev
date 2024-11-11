# Motivation

As much as one can love a tool/methodology/approach, I love DDD. However, in recent months (years?) I'm observing [semantic diffusion](https://martinfowler.com/bliki/SemanticDiffusion.html) around **Domain-Driven Design** and **how it's being perceived by frontend developers**. To quote Martin Fowler:

> Semantic diffusion occurs when you have a word that is coined by a person or group, often with a pretty good definition, but then gets spread through the wider community in a way that weakens that definition. This weakening risks losing the definition entirely - and with it any usefulness to the term.

I'm worried that weakening the meaning (semantics 😉) of DDD within the frontend community could be destructive for DDD in the long run.

## What's the problem?

DDD is a very abstract and difficult "skill" to master. It requires us, developers, to think beyond the code and to focus on the business side, which is what we're usually not strong with. Or at least not strong from the beginning. It requires to get one's head around really complex concepts such as subdomains, bounded contexts, context mappings and dozens of other "things" that - at the first sight - seem to be the very same thing. One might think, after reading an over-simplified explanation, that we should just focus on the business... and... one just goes back to what they've been doing, e.g. creating anemic domain model, modelling modules around database tables, letting business logic leak (as they don't fit setters and getters) and so on.

The most critical aspects of DDD are actually invisible from the code's perspective. It's the models that you build while exploring your business domain. It's very, very easy to get it wrong. There are legions of backend developers claiming "*they're doing DDD*", as they create "**aggregates**" (probably the most important design pattern of **tactical DDD**), which share pretty much nothing with DDD's philosophy.

There's a big risk that you might find my post as a means of gate keeping, and I'm aware of it 😉. My motivation is to bring better understanding of DDD philosophy mainly to Frontend developers (but not only). I want to highlight things that are absolutely obvious for seasoned DDD practitioners. So if you consider yourself one, you can stop reading 😉 however, if you think "you're doing DDD" because you have a well-thought directory structure within your Angular or React monorepo, please stick with me. I've got tons of things to explain which will significantly broaden your horizons. 🤓

# Why Would Frontend Developers Care About DDD at All?

Domain-Driven Design is often viewed as a methodology primarily focused on organizing backend code. But its relevance goes far beyond backend and holds significant value for Frontend developers as well. Understanding DDD helps Frontend devs understand the reasons for certain architectural decisions, team organization and the rationale behind specific technical choices. It allows to quickly and effectively communicate with backend developers (obviously), software architects, but also with everybody else within the company (if the company applied DDD and its software is "driven by the domain").

Learning pretty much everything related to architecture broadens horizons, and it's not anyhow specific to DDD. But DDD is special in a way that it tries to "[*tackle complexity*](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)" of **your** company. Of **your** domain. Of **your** product. So it's really, really close to what you're working with on a daily basis (although, obviously, DDD isn't a universal tool and there are systems which wouldn't benefit from it).

What could Frontend devs learn from DDD? For instance, when teams define **isolation** strategies across modules — **even at the expense of code repetition** — Frontend developers can better understand (and appreciate) the **trade-offs** involved and how certain modules where extracted. No more "backend guys did it", instead, take part in the process.

Learning DDD - either your own hard way, or other people's hard way - allows to understand why do complex projects fail in terms of simplicity and maintenance. Obviously, a handful of `IF` statements here and there have never killed anybody. But at some point the critical mass could have been reached and a new approach needs to be embraced. That's where DDD kicks in - it teaches a new way of thinking about modularity.

Moreover, thanks to the fact that a domain (more on that later) is being tackled by both frontend and backend developers, the communication between them is improved, and most probably some shared (both domain and technical) vocabulary is introduced, which allows to communicate more effectively and way more precisely (e.g. imagine explaining Anti-Corruption Layer to a Frontend Developer who's got no idea about DDD and have always consumed JSONs directly in their UI components).

Hope I've made you interested in understanding DDD further, so let's move on!

# DDD is "*All About How Our Business Works*"

The above phrase is rather easy to say, but the issue with it is that everybody can understand it in quite different ways. Let's first highlight what DDD is **NOT** about:
- **we ignore frameworks/platforms and their features**. Of course we'd be using frameworks, but they play neither primary nor secondary role, they're even peripheral.
- **we ignore**, at least to some extent, **the schemas in our databases**. DDD excels when our software implements business processes - and is considered an overkill when a simple CRUD is needed.
- we don't focus on entities (nouns) that much; rather, we focus on business capabilities (verbs).

Business processes tend to reshape things within our systems, e.g. a product from an e-commerce catalogue becomes an item within a submitted order which in turn becomes a delivery shipped straight to the customer. In DDD we focus on the whole "journey" of what certain actors do within the system, and how that affects the state of business processes. There are underlying database tables and rows, of course. But it's the business events, command (and queries of course!) which shape the flow of these business processes and information. And in order to design these events, commands, queries etc. we need to talk to **domain experts** to understand the mechanics, the physics of our business.

At its core, DDD enforces us 😉 to gain a **deep understanding of how our business operates**, and this understanding should **drive our architectural decisions**. 

Rather than allowing frameworks, databases, or even specific methodologies like Agile or Waterfall to dictate the structure of our applications, DDD encourages us to focus on the intricacies of the business domain itself. This means diving into the nuances of business processes to uncover the value we deliver to users, identifying opportunities for revenue generation, and exploring ways to establish competitive advantages in the marketplace. By prioritizing these elements, we can create architectures that are not merely technical solutions but are instead closely aligned with the strategic goals of the organization.


# Example Library Domain

For the sake of simplicity, I'll introduce a **library domain**, which I'll be referencing later on. This would be our go-to example.

Let's say we're creating software dedicated to running multiple libraries which allow borrowing books for members. Registered users of the library (patrons / members) can search the books within the catalogue. They can borrow the books, renew the loans (if a reservation for this exact book was not done by someone else), return books obviously.

But there are also librarians who actually hand over the books to the patrons who borrow them. They also take care of the catalogue and update the inventory information, if necessary. They can also prelong/renew book loans.

We could introduce tens or even hundreds more rules, relations and definitions, but let's keep it simple.

One thing that should immediately bring your attention is:

## WHAT IS A BOOK ACTUALLY?

- When searching for a book, a patron is looking for a BOOK which is defined by a title and author.
- When collecting the book from the library building, the patron is holding a physical item, a BOOK, which is printed by a specific publisher, has a specific size, number of pages, etc. Obviously, there might be more multiple BOOK items for the same BOOK defined by title-author tuple.
- When issuing fines for patrons who didn't return the BOOK on time, the BOOK is just a resource. For the system it doesn't matter what was the book's author. It could matter however, if the book is frequently borrowed, or if it was a scarce book
etc.

Can you already see what's going on? 🙂 One thing could have totally different semantics (meaning) in totally different contexts. Can you see that totally different information are relevant in these different contexts? Can you see that totally different behaviors apply (e.g. a catalogue item book could be borrowed, but it can't be used to issue a fine in case of missed deadline)?

Now imagine you're creating a Book class/entity which tries to address all above contexts. At the end of the day they all relate to a damn **book**, don't they?

```ts
// Enum to represent the status of a book
enum BookStatus {
    AVAILABLE = "available",
    CHECKED_OUT = "checked_out",
    RESERVED = "reserved",
    LOST = "lost",
}

// Interface representing a patron (borrower)
interface Patron {
    id: string; // Unique identifier for the patron
    firstName: string; // Patron's first name
    lastName: string; // Patron's last name
    email?: string; // Optional email address for communication
}

// Interface representing a physical copy of a book
interface BookCopy {
    id: string; // Unique identifier for the physical copy
    condition?: string; // Describing the condition of the book (e.g., new, used)
    location: string; // Location in the library (e.g., shelf number)
    status: BookStatus; // Current status of this specific copy
    borrowedBy?: Patron; // Track who borrowed the book
    borrowedDate?: Date; // When the book was borrowed
    dueDate?: Date; // When the book is due back
}

// Main Book interface representing the canonical model
interface Book {
    title: string; // Title of the book
    authors: string[]; // List of authors
    isbn: string; // ISBN number as a unique identifier
    publisher?: string; // Publisher information
    publicationDate?: Date; // Publication date
    totalCopies: number; // Total number of copies available in the library
    availableCopies: number; // Number of copies currently available for borrowing
    genre?: string; // Genre of the book
    description?: string; // Description or summary of the book
    copies: BookCopy[]; // Array to hold all physical copies
}
```

If we tried to get along with this, we'd quickly get to a point of absurd. Of course, this code is exaggerated, but it's easier to spot issues with this model:
- dozens of different ways to populate this model with data from the database.
- optional fields. Lots of optional fields!!!1 🤬
  - the problem with these is that they might be required in module A and useless in module B. But since module A requires them, and they're optional, you can't be sure whether they're indeed handed over to module A. You need to verify this within A.
  - you could also make all properties required. But in that case, each instance of the model would have to read a significant amount of the database. Users wouldn't like that 😏
  - all in all, whatever you do, it's gonna be a massive fail
  - and we can expect that, as our system grows, we'd have more and more optional fields which make matters even worse.

Let's highlight some examples of totally irrelevant data:
- when the Patron searches the catalogue, they need to know whether a given title-author is available. Perhaps they might want to know how many copies are available. But they DON'T NEED to know:
  - how many physical copies of the book are there in total
  - their locations (!!!), borrowing patrons, borrow and due dates... etc.
- the module which issues fines when patrons fail to return the book by the due date DOESN'T NEED to know about:
  - the publisher, genre, description
  - but also it doesn't need to know about the author and title, an ID would be enough
  - total copies? available copies? copy details?!
- when the patron returns the book and it's scanned by a librarian's device, there's probably a barcode identified. The book copy's ID and the patron information is way enough for the system to confirm the return.

Now, it's definitely easier to say that the above model is a catastrophe 😎.

But it's not obvious how to divide this complexity into certain modules. And what models would fit here. How many definitions of books should we have. And how would these modules communicate with each other. And what are the transactions, e.g. when a book is being borrowed (collected by a patron):
- the book copy's status is changed
- the patron's borrowed books are updated
- the due date is set
- available copies of the books should be updated accordingly etc.
Also, what type of consistency should we apply: would it be acceptable if for a small period of time the borrowed book would still be available for other patrons (eventual consistency) or not at all, as when the former patron borrowing the book should immediately flag this book as unavailable, even at a cost of longer processing of the transaction (strong consistency)?

Actually, how do we know whether it's acceptable to flag the borrowed book as unavailable with some delay or immediately? How do we know how due date gets calculated, e.g. is due date the same for children books, for adults books, for audio books, for CDs, etc. or are there different strategies? How do we know if a member, who has already crossed the borrowed book deadline multiple times, can prelong the due date? And many, many, MANY more questions...

How do we manage all this information? Is it "*all in the code*", just go and read it? How do we make sure that new business requirements are applied consistently to the system as a whole?

That's all where DDD comes into play. From a very simplified perspective, but still I hope it's a point that is easy to grasp. 
