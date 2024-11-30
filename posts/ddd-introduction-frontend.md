## DDD is not about technology

**TL;DR; 💡 DDD is first and foremost about understanding your business and your product. Practicing DDD means you're constantly exploring how your business works. It's mainly about collaboration and communication. If you think you're doing DDD by following a certain technology/framework/toolstack/pattern-based approach, you're doing it wrong.**

Let's remind that we developers are there to solve business problems. And this means making customers' and/or users' lives easier. We're not there to do technology for the sake of doing it. Especially nowadays there's less and less room for "coders". We should be problem solvers. **Business problem solvers**.

A question should arise: how can one solve business problems without understanding "the anatomy" of your business first? That's where DDD kicks in.

What does it mean to "*understand your business*"?

It's not what domain data is kept and how. It's not which patterns are used to implement business processes. It's not the user roles and credentials, not the pricing etc.

Understanding the business is understanding what value does your product bring to the customer. It's also what actually is your product.

Let's say we're working on a medical care system. We ask different people within the company: *what is the product that we sell*?
- A doctor would answer: _We sell my **appointments**_.
- An accountant would say: _We sell the things you can look up at **each invoice**, they vary a lot. It could be a specialized doctor **appointment**, it could be **treating an illness**, it could be **medicine** that we sold_
- A marketer would say: _Ignore invoices... we sell the **feeling of safety**! If you are our patient, even if something bad happens to your health, you are is in good hands 😇._ Of course, obviously 😛
- The CEO would say: _We sell availability of our **resources**._

Understanding the business is understanding different perspectives of different specialists. Different, so called, *domain experts*.

Understanding the business is eventually realizing, that, quite often, all above perspectives are strictly related (often in a linear sequence of events):
- first, there is customer's a need for safety so they sign up for the medical services
- the need for safety results in a doctor's appointment
- this means allocating resources
- which eventually results in issuing an invoice.

An individual customer's story often goes throughout the entire system. A desire for an appointment needs to check for a specific **resource's availability**. Run a query, let the user decide, then run a command. Eventually, the appointment **becomes** a position on an invoice. An object from one realm (appointment) becomes an object from another realm (invoice). Coupling throughout the system is extremely carefully analyzed.

DDD is about understanding the business you're working on. First and foremost. It "*[tackles the complexity at the heart of software](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)*" - at the **domain**.

It doesn't mean technology is not important - certainly not. Technology is there to make the business concepts get implemented correctly.

> When you talk about Domain Driven Design it's almost as if we've mastered the technology, so that **now we can look at the real problem** (👉 the domain 👈) and bring our tools to bear. So it's no kind of excuse to not be a master of technology and that means we have to keep up a breast of what's there and what's available.

― Eric Evans, Domain-Driven Design Europe Conf, 2016

We could say, very roughly, that DDD follows [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) in a way:
- 80% of the focus is put on business aspects
- only 20% is technology; system needs to be implemented after all

Of course it's rough (that's the essence of Pareto Principle). Of course you could nitpick the above statement a lot - feel free 😉. But I hope you get the point: we're proficient in tech, so **we shift our focus to understanding business**. "*Understanding the domain*".

Let me go through a different metaphor this time: there's an ongoing war (unfortunately we don't have to imagine that 😢). There's a high-level goal of each side, e.g. to liberate the country from the invaders. This could be achieved using politics, but it could also be achieved using the army and warfare. That's strategy. However, on a certain battlefield we need to use the troops somehow. For instance, we try to avoid a classic battlefield where two armies meet. We keep soldiers in very, very small groups, in order to make it more difficult for drones and missiles to attack larger groups of both soldiers and equipment. That's tactics.

If there's no plan for how to win the war, the best battlefield tactics is useless. More generally, the best tactics doesn't bring much value if the strategy is poorly planned. Yes, you guessed correctly - the same applies to DDD.

The value we want to bring to the customer... The business process that a customer would walk through... The good and bad experiences they would "*collect*" along the road... and finally how do we [*divide it* (into smaller modules) and *conquer*](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) the *problem area* - that's all strategy. And how all this would eventually get implemented - that's tactics.

**DDD is not about technology itself**. Technology (**tactical DDD**) is there *only* to implement and/or modularize the domain we are exploring (**strategic DDD**). And exploring the domain is what matter the most.
