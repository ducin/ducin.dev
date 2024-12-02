The aDDDvent calendar 2024:
- day 1: [DDD is not about technology](/ddd-introduction-frontend)
- **day 2: [Talk to domain experts](/talk-to-domain-experts)**
- day 3: (tomorrow)

## TL;DR;

**💡 Gather domain knowledge from experts. Accept they have different perspectives and different priorities. That's what makes businesses thrive - but also makes them complex. Systems need to reflect that.**

## Same fact, different perspectives

[Yesterday](/ddd-introduction-frontend) we have put a great emphasis that "*understanding your business*" is the most important activity in DDD whatsoever. In today's post we'll dive deeper into what does it actually mean. We'll see it throughout an extensive example.

The key aspect to realize is that **in complex businesses there's no single truth**.

Different people from different teams have different tasks to perform. They focus on different quality characteristics, also have different priorities. Truism, isn't it?

Yet, still so many developers try to provide a single concept that matches the whole complexity of a business. 😢

Creating _a single model that explains everything_ is not only a simplification, but also guarantees that we're missing out some important aspects of our domain.

The key is to realize that there are **multiple perspectives at looking at the same fact**. Yesterday I brought a medical care domain example, in which the same fact is considered as follows:
- **doctor**: *I'm having an appointment now*
- **accountant**: *we've just made some income*
- **CEO**: *we've just utilized our resources effectively*
- **cleaning person**: *I've got another room to clean and disinfect now 🤨*
- and, actually, the **patient** is also there after all 😅: *I'm being taken care of, money does wonders!*

Today we'll take a closer look at another domain...

## Warehouse Management

Imagine we're working for a huge logistics company. Our task is to design a new system for **warehouse management**. It includes everything related to storing massive amounts of different types of items, knowing their count, organizing them effectively, being able to ship ordered items, avoiding waste etc. Quite a lot of things, if we think about it 😅 but still, everything is related to "*storing things*".

Depending on the situation, maybe there is *an Analyst* hired at the company, who have gathered functional requirements already. And maybe there is a huge 200 pages long PDF document which is awaiting our attention 😅. Still, sooner or later we'll need to discuss the document (if it exist) or gather the information on our own (otherwise).

## Talk to a domain expert

The first person to talk to turns out to be the Head of the Inventory Department. We ask what should the system be capable to do, and so we gather the following information:
- The system must allow for **recording changes** in inventory levels.
- It should support **registering deliveries**.
- The Head of the Department emphasizes the need for **accurate reports** on inventory levels and **notifications for low stock**.
- The system should also be able to **generate historical reports** regarding inventory movements.

At this point what we could think of is, basically, a **database** which includes all the relevant information. Perhaps a simple **CRUD on top of it** would do the job.

However, after some consideration, the Head of the dept. mentions that some **specific situations** take place from time to time. These include **goods being damaged**, or that they even **disappear** in unknown circumstances. It even happened once that, once considered lost, some goods were found within a totally unexpected area of the warehouse.

After a while he adds that depending on the value of the missing stock items, an appropriate manager has to (is obliged) to act and **verify whether the stock items might have been stolen**.

Also, as he mentions, deliveries are planned in advance and appropriate space is prepared to hold the received stock items. But it does happen, quite often, that a very **important delivery needs to be taken immediately** due to specific contracts with suppliers and unexpected situations on their end.

This doesn't look like a simple database-oriented system anymore...

And if that was not enough, he adds one more point: **it's very important to track real amounts of the stock items**, and the inventory in general. Especially, the system shall prevent situations when the system claims there's more items in stock than in the real warehouse. He goes omn with a story of the previous head of the department which has been fired because significant amounts of goods have been ordered and they were not in stock at all. He says that he doesn't want such situation to happen as long as he's the head.

Okay. 🙂‍↕️

At this point we list down the capabilities of the system:
- register a delivery
- prioritize delivery
- report damage
- report inventory shortage
- report found items
- check inventory level
- look up inventory history of specific goods

We're also considering whether verifying stolen goods fits into this system at all. But at the time being we're leaving it for later.

## Talk to another domain expert

The Head of Inventory dept. suggested to talk to the Order Fulfillment Manager. She's responsible for making sure that all goods that have been ordered from our warehouse are processed quickly and without mistakes. The requirements she mentions are the following:
- The system must be able to **reserve and cancel reservations** of items **immediately** upon order placement.
- She emphasizes the need for **rapid order processing**, which may lead to **reserving items before they are actually available** in stock. This happens when a delivery is expected, but the product has already been sold.
- She also stresses the importance of **minimizing delays in order fulfillment** as all costs.

During the conversation, new system functions are added:
- reserve stock item
- cancel reservation
- check given order
- check stock item availability

According to her, **quick order fulfillment** is absolutely critical in this business. Even at the cost of hypothetical mistakes in the inventory levels. She argues that nobody pays us for comprehensive inventory reports - but quick order fulfillment indeed brings income.

Clearly, the Head of the Inventory dept. and the Order Fulfillment Manager both have quite different priorities and expectations.

At the end she asks us if we've gone to Returns and Claims Manager already or not yet.

## Talk to yet another domain expert

Although Returns and Claims team has a Manager, fellow workers told us it's better to talk to the Supervisor, as he's easier to talk to. And so we've gathered even more requirements:
- The system needs to allow **handling returns quickly and effectively**. Accepting a return **cannot wait for the system approving new stock amount**. If a stock item is returned, then *it's returned!*, no matter what. Theoretically, he adds calmly, "*quick return handling*" may lead to outdated data about inventory levels... but as he mentions, it doesn't happen often. Though we can't eliminate such situation 😅
- Eventually the system needs to allow for **registering returns and updating inventory levels** upon receiving returned goods.
- Moreover, it's necessary to generate periodic reports on returns and analyzing their causes.

New capabilities of the system noted:
- register returns
- approve/disapprove return
- check return details
- check return history

Phew, that was quite a lot of talking! But don't worry, no more domain experts today.

We're not going to design the system today. Not yet 😅

## Domain Experts

We've met three so called *domain experts*. Neither of them has a job title that is named literally this way. They have different positions in company's hierarchy. They all differ a lot.

But what matters is that **they do possess the knowledge** which is absolutely critical for *understanding the domain*.

## Same thing, yet different meaning

We have quite a similar situation now, as we've had yesterday with medical care domain: the same *thing* is being perceived in different ways by different people.

In the Warehouse that thing is the *stock item*:
- the Head of Inventory dept. sees a *stock item* as something that is **available in stock**
- the Order Fulfillment Manager sees a *stock item* as something that **should be sent away to the customer as soon as possible**
- the Returns and Claims Team Supervisor sees a stock item as something that could have been **returned by a customer e.g. because of some damage**.

It seems that these three perspectives will overlap to some extent. We know that we'll have to provide some integration between **Inventory**, **Orders** and **Returns** in the system eventually designed. And, as a consequence, there would be *some coupling* between them.

But obviously we don't want that coupling to pop up unexpectedly (as it usually happens rather sooner than later 😅). We want to do our best to explore the domain and identify any potential points of integration across different areas.

Without detailed discussions with domain experts it's impossible to identify them.

## The Language

Talking to different domain experts allow us to realize that they all might be **using the same phrase** or word: a *stock item*. But each of them **use it in a slightly different context**. Does it matter? Oh, YES!

But that's a whole new topic, one of the most important concepts in DDD (if not *the* most important one). A topic for tomorrow. 
