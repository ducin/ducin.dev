This document briefly describes dozens of **important software architecture** topics, terms, acronyms, strategies, characteristics, and so on.

## Motivation

Why writing yet another pile of descriptions? 🤔

There's a quite a lot of high quality materials out there (as well as low quality, unfortunately). But software architecture is a multi-disciplinary field that integrates the knowledge from various domains... and when you want to learn one concept, 3 new ones pop up! Each of these bring more and more concepts we should learn first. And as we go down the rabbit hole, we get to [know our unknowns](https://en.wikipedia.org/wiki/There_are_unknown_unknowns). **But this can be intimidating**.

The purpose of this Pocketbook is to introduce each term in **the simplest possible form**.

**Each definition is just 1 sentence.** It's very far from a detailed analysis, it doesn't cover all possible usecases, especially it doesn't cover edge cases. It'ss just a very high-level description, often including the **WHY**: why would someone use a certain tool or adapt a technique.

I believe this will make it easier for developers to enter the world of Software Architecture in a less painful way. Enjoy the read!

> yours sincerely, the author 😉

<% SUBSCRIBE %>

## Software Architecture Terminology

<% TOC %>

### ADR (Architecture Decision Record)

An Architecture Decision Record (ADR) allows to **make future developers understand _WHY_ a decision has been made in a given context**; it is a document that captures an important architectural decision made along with its context and consequences, providing a record of the motivations behind the decision, the alternatives considered, and the trade-offs involved, to help maintain a shared understanding of the system design over time.

See: [Architecture Documentation](#architecture-documentation), [C4 Model](#c4-model), [RFC (Request For Comments)](#rfc-request-for-comments). 👉 [back to ToC](#table-of-contents)

### Architecture Documentation

Documenting architecture involves creating detailed representations and descriptions of a system's structure, components, and interactions to communicate design decisions, guide development, and facilitate future maintenance and understanding among stakeholders

See: [Software Architecture](#software-architecture). 👉 [back to ToC](#table-of-contents)

### Backoff

Backoff is waiting until you try again; it's a technique used to manage retries in an application control flow or network communication, where a system waits for an increasing amount of time after each failed attempt before trying again, helping to reduce network congestion and avoid overwhelming resources.

See: [Resilience](#resilience), [Backpressure](#backpressure). 👉 [back to ToC](#table-of-contents)

### Backpressure

Backpressure is a mechanism to control the flow of data being sent from the producer to the consumer from becoming overloaded, when the consumers cannot keep up, helping to prevent resource exhaustion and maintain overall system stability, in a lossy or lossless manner.

See: [Resilience](#resilience), [Reactivity](#reactivity), [Rate Limiting](#rate-limiting), [Backoff](#backoff), [Circuit Breaker](#circuit-breaker). 👉 [back to ToC](#table-of-contents)

### C4 Model

The C4 Model allows to document systems from **different perspectives** and for **different audiences**; it is a framework for visualizing software architecture via hierarchical diagrams on 4 different levels: Context, Containers, Components, and Code, in order to help teams understand and communicate the system's structure and relationships effectively.

See: [Architecture Documentation](#architecture-documentation), [ADR (Architecture Decision Record)](#adr-architecture-decision-record), [RFC (Request For Comments)](#rfc-request-for-comments). 👉 [back to ToC](#table-of-contents)

### Chaos Engineering

Chaos Engineering is about breaking things on purpose and seeing what has collapsed; it's a discipline that proactively introduces (repetetively) controlled failures and disruptions into a system to test its resilience, identify weaknesses, and improve recovery mechanisms, enabling teams to improve system robustness and reliability by understanding how the system behaves under adverse conditions.

See: [Resilience](#resilience), [Software Testing](#software-testing), [Fault Injection](#fault-injection). 👉 [back to ToC](#table-of-contents)

### Circuit Breaker Pattern

The Circuit Breaker Pattern disallows to kick someone who's currently down; it's a a Fault Tolerance mechanism which detects failures and prevents further requests from being sent to the failing service, thus avoiding overload while recovering, and retrying e.g. after a timeout (then passing requests normally).

See: [Microservices](#microservices), [Rate Limiting](#rate-limiting), [Backpressure](#backpressure), [Backoff](#backoff). 👉 [back to ToC](#table-of-contents)

### Consistency

Consistency is the state of a system where all data is the same across all nodes in a **distributed system**, ensuring that **all nodes see the same data at the same time**, and that changes are propagated correctly and in a timely manner, to maintain data integrity and reliability.

See: [Strong Consistency](#strong-consistency), [Eventual Consistency](#eventual-consistency), [CAP Theorem (Consistency, Availability, Partition Tolerance)](#cap-theorem-consistency-availability-partition-tolerance), [ACID Transactions (Atomicity, Consistency, Isolation, Durability)](#acid-transactions-atomicity-consistency-isolation-durability), [BASE Transactions (Basically Available, Soft State, Eventually Consistent)](#base-transactions-basically-available-soft-state-eventually-consistent). 👉 [back to ToC](#table-of-contents)

### Correlation ID

A Correlation ID is a **unique identifier** that gets **attached to each request** made to a distributed system, allowing for easier tracking and correlation of logs and events, and enabling the troubleshooting of issues across multiple services.

See: [Distributed Systems](#distributed-systems), [Microservices](#microservices), [Observability](#observability). 👉 [back to ToC](#table-of-contents)

### Databases

Databases are organized collections of structured information or data that are stored and managed electronically, allowing for efficient retrieval, manipulation, and updating of data through various query languages, with different types, e.g. **relational** (SQL) and **non-relational** (NoSQL) databases.

See: [HA (High Availability)](#ha-high-availability), [Clustering](#clustering), [Sharding](#sharding), [Replication](#replication), [CAP Theorem (Consistency, Availability, Partition Tolerance)](#cap-theorem-consistency-availability-partition-tolerance), [ACID Transactions (Atomicity, Consistency, Isolation, Durability)](#acid-transactions-atomicity-consistency-isolation-durability), [BASE Transactions (Basically Available, Soft State, Eventually Consistent)](#base-transactions-basically-available-soft-state-eventually-consistent). 👉 [back to ToC](#table-of-contents)

### Design For Failure

Designing for failure assumes that things will break inevitably and a system needs to be ready for it upfront; it is a proactive approach in software architecture where each element is expected to fail, and incorporates various strategies to maintain functionality and minimize downtime, such as: graceful degradation, failovers, redundancy, chaos engineering, observability and many more.

See: [Resilience](#resilience), [Graceful Degradation](#graceful-degradation), [Failover](#failover), [Redundancy](#redundancy), [Fault Tolerance](#fault-tolerance), [Chaos Engineering](#chaos-engineering), [Circuit Breaker Pattern](#circuit-breaker-pattern), [Monitoring](#monitoring), [Observability](#observability), [Distributed Tracing](#distributed-tracing). 👉 [back to ToC](#table-of-contents)

### DevOps

DevOps is caring not only about the **coding phase**, but also **everything that happens next**; it's a cultural and technical movement that combines development (Dev) and operations (Ops), aiming to automate and integrate software development, testing, deployment, and monitoring processes to enhance efficiency, accelerate delivery, and improve overall software quality.

See: [Continuous Integration](#continuous-integration), [Continuous Deployment](#continuous-deployment), [Continuous Delivery](#continuous-delivery), [Observability](#observability), [Monitoring](#monitoring), [DORA metrics](#dora-metrics). 👉 [back to ToC](#table-of-contents)

### Distributed Tracing

Distributed Tracing allows to see how a user's **request travels throughout the entire system**; it is a technique used to monitor and troubleshoot the flow of each requests across various Microservices in a Distributed System, capturing timing data and dependencies to identify performance bottlenecks and enhance overall system observability, where a single user's request gets identified and tracked across entire system using a Correlation ID.

See: [Distributed Systems](#distributed-systems), [Microservices](#microservices), [Observability](#observability), [Monitoring](#monitoring), [Correlation ID](#correlation-id). 👉 [back to ToC](#table-of-contents)

### DORA metrics

DORA metrics express **how fast can you ship or rollback**; they are key performance indicators used to assess the effectiveness of software delivery and operational performance, focusing on four dimensions: deployment frequency (DF), lead time for changes (LTC), mean time to restore service (MTTR), and change failure rate (CFR), helping teams improve their DevOps practices.

See: [DevOps](#devops), [Fitness Functions](#fitness-functions). 👉 [back to ToC](#table-of-contents)

### Dreyfus Model of Skill Acquisition

The Dreyfus Model of Skill Acquisition describes the five stages of learning a new skill: Novice, Advanced Beginner, Competent, Proficient, and Expert, highlighting the progression from following rules to intuitive decision-making, and the importance of experience, practice, and feedback in skill development.

See: [Kolb's Learning Cycle](#kolbs-learning-cycle), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding), [(Un)known (Un)knowns](#unknown-unknowns). 👉 [back to ToC](#table-of-contents)

### Fallacies of Distributed Computing

The Fallacies of Distributed Computing are a set of assumptions that developers often make about distributed systems, including beliefs like "the network is (always) reliable" and "latency is zero," which can lead to misdesign and failures; recognizing these fallacies helps in creating more resilient applications.

See: [Distributed Systems](#distributed-systems), [Resilience](#resilience). 👉 [back to ToC](#table-of-contents)

### Fault Injection

Fault injection is a testing technique where errors or failures are deliberately introduced into a system to evaluate its behavior under stress, helping developers identify vulnerabilities, assess recovery mechanisms, and improve overall system reliability and fault tolerance.

See: [Resilience](#resilience), [Software Testing](#software-testing), [Chaos Engineering](#chaos-engineering), [Fault Tolerance](#fault-tolerance). 👉 [back to ToC](#table-of-contents)

### Fault Tolerance

Fault Tolerance is the ability of a system to continue operating correctly even in the event of a failure or error, typically achieved through redundancy, error detection, and recovery mechanisms to ensure uninterrupted service.

See: [Resilience](#resilience), [Design For Failure](#design-for-failure). 👉 [back to ToC](#table-of-contents)

### Fitness Functions

Fitness functions allow to measure how a given system achieves **high-level goals**; they are metrics used to evaluate how well an existing system's architecture meets specified requirements or goals, guiding design and development decisions by providing quantitative feedback on performance, reliability, and other critical attributes.

See: [Software Architecture](#software-architecture), [DORA metrics](#dora-metrics). 👉 [back to ToC](#table-of-contents)

### Kolb's Learning Cycle

Kolb's Learning Cycle is a four-stage model of experiential learning that includes: Concrete Experience (having a direct experience), Reflective Observation (reviewing and reflecting on the experience), Abstract Conceptualization (learning from the experience), and Active Experimentation (applying the new knowledge), emphasizing learning through a continuous, iterative process.

See: [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding), [(Un)known (Un)knowns](#unknown-unknowns). 👉 [back to ToC](#table-of-contents)

### Law of Triviality (Bikeshedding)

Bikeshedding is the tendency to give disproportionate weight to trivial issues, focusing on minor details rather than important matters, often leading to lengthy discussions and delays in decision-making, due to the ease of understanding and debating simple problems compared to complex ones.

See: [Kolb's Learning Cycle](#kolbs-learning-cycle), [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition). 👉 [back to ToC](#table-of-contents)

### Lean Startup

The Lean Startup is a methodology for developing businesses and products that emphasizes rapid prototyping, validated learning, and iterative experimentation to efficiently discover what customers want and minimize waste, ultimately accelerating the product development process.

See: [MVP (Minimum Viable Product)](#mvp-minimum-viable-product). 👉 [back to ToC](#table-of-contents)

### Legacy Code

Everything we've written is already legacy 🥲

See: [Technical Debt](#technical-debt). 👉 [back to ToC](#table-of-contents)

### Monitoring

Monitoring allows to **constantly check if "all is fine"**; it involves continuously tracking and measuring system performance, availability, health, and resource usage, typically through the collection of predefined metrics, in order to detect issues, ensure reliability, and optimize application behavior, often utilizing additional tooling for real-time alerts and metrics analysis.

See: [Observability](#observability), [DevOps](#devops). 👉 [back to ToC](#table-of-contents)

### MVP (Minimum Viable Product)

A Minimum Viable Product (MVP) is a version of a new product that includes only the essential features, allowing to quickly validate the idea, gather feedback, and learn from real-world usage, while minimizing development costs and time-to-market.

See: [Lean Startup](#lean-startup), [TTM (Time To Market)](#ttm-time-to-market). 👉 [back to ToC](#table-of-contents)

### Observability

Observability is about understanding **what's happening inside a system** by looking at its outputs; it is the ability to measure and understand the internal state based on the data it generates, including logs, metrics, and traces, to gain insights into system behavior, diagnose issues, and improve performance, reliability, and maintainability.

See: [DevOps](#devops), [Monitoring](#monitoring). 👉 [back to ToC](#table-of-contents)

### Rate Limiting

Rate Limiting is a technique to control the rate of requests a user can send or receive, within a given time-frame, preventing abuse and overuse, ensuring the system remains responsive and available, and protecting against denial-of-service (DoS) attacks.

See: [Microservices](#microservices), [Resilience](#resilience), [Backpressure](#backpressure), [Backoff](#backoff), [Circuit Breaker](#circuit-breaker). 👉 [back to ToC](#table-of-contents)

### Resilience

Resilience is the ability of a system to **recover from failures and continue to function**, even when some of its components fail; it is achieved through various practices and patterns that help systems adapt to changing conditions, maintain functionality, and minimize downtime, ensuring reliability and availability.

See: [Fault Tolerance](#fault-tolerance), [Design For Failure](#design-for-failure), [Chaos Engineering](#chaos-engineering), [Monitoring](#monitoring), [Graceful Degradation](#graceful-degradation), [Failover](#failover), [Redundancy](#redundancy), [Backpressure](#backpressure), [Rate Limiting](#rate-limiting). 👉 [back to ToC](#table-of-contents)

### RFC (Request For Comments)

A Request for Comments (RFC) is a document used to **propose standards and/or gather feedback**, allowing architects to collect diverse opinions and insights before making important architectural decisions.

See: [Architecture Documentation](#architecture-documentation), [C4 Model](#c4-model), [ADR (Architecture Decision Record)](#adr-architecture-decision-record). 👉 [back to ToC](#table-of-contents)

### Software Architecture

_Software Architecture is all about the important stuff... whatever that is._

> &#45; Ralph Johnson

See: [Architecture Documentation](#architecture-documentation), [Architecture Styles](#architecture-styles). 👉 [back to ToC](#table-of-contents)

### Taxonomy

Taxonomy is how things are **categorized**; is the science of classification, organizing and naming things based on shared characteristics, properties, and relationships, to help understand and communicate complex systems, and guide design decisions.

See: [Architecture Styles](#architecture-styles). 👉 [back to ToC](#table-of-contents)

### Technical Debt

Technical Debt is the **cost of additional rework** caused by choosing an easy solution now instead of using a better approach that would take longer; it represents the cumulative consequences of cutting corners, making trade-offs, and postponing improvements, which can slow down development, increase complexity, and reduce maintainability over time.

See: [Legacy Code](#legacy-code). 👉 [back to ToC](#table-of-contents)

### TTM (Time To Market)

Time To Market (TTM) describes how fast can you ship stuff; it's the time it takes to develop and launch a new product or feature, from the initial idea to its availability to customers, and is a critical factor in a company's success, as it directly impacts competitiveness, revenue, and market share.

See: [MVP (Minimum Viable Product)](#mvp-minimum-viable-product). 👉 [back to ToC](#table-of-contents)

