This document briefly describes dozens of **important software architecture** topics, terms, acronyms, strategies, characteristics, and so on. It shows the **relations** between them and outlines **how endlessly interdisciplinary Software Architecture is**.

## Motivation

Why writing yet another pile of descriptions? 🤔

There's a quite a lot of high quality materials out there (as well as low quality, unfortunately). But software architecture is a multi-disciplinary field that integrates the knowledge from various domains... and when you want to learn one concept, 3 new ones pop up! Each of these bring more and more concepts we should learn first. And as we go down the rabbit hole, we get to [know our unknowns](https://en.wikipedia.org/wiki/There_are_unknown_unknowns). **But this can be intimidating**.

The purpose of this Pocketbook is to introduce each term in **the simplest possible form**.

**Each definition is just 1 sentence.** It's very far from a detailed analysis, it doesn't cover all possible usecases, especially it doesn't cover edge cases. It's just a very high-level description, often including the **WHY**: why would someone use a certain tool or adapt a technique.

I believe this will make it easier for developers to **enter the world of Software Architecture** in a less painful.

I hope that below you'll find lots of **inspirations for further learning**.

Enjoy the read!

> yours sincerely, the author 😉

<% SUBSCRIBE %>

## Software Architecture Terminology

<% TOC %>

### Abstraction Leak

An Abstraction Leak is when internal details, concepts and limitations **are being exposed instead of hidden away**; it occurs when the underlying implementation details of a module or component are unintentionally exposed to the outside world, breaking the abstraction barrier and leading to tight coupling, dependencies, and potential issues when making changes or updates.

See: [Anti-patterns](#anti-patterns), [Abstraction](#abstraction). 👉 [back to ToC](#table-of-contents)

### ADR (Architecture Decision Record)

An Architecture Decision Record (ADR) allows to **make future developers understand _WHY_ a decision has been made in a given context**; it is a document that captures an important architectural decision made along with its context and consequences, providing a record of the motivations behind the decision, the alternatives considered, and the trade-offs involved, to help maintain a shared understanding of the system design over time.

See: [Architecture Documentation](#architecture-documentation), [C4 Model](#c4-model), [RFC](#rfc-request-for-comments). 👉 [back to ToC](#table-of-contents)

### Amdahl's Law

Amdahl's Law is a formula that illustrates the **potential speedup** of a task from **parallel processing**, stating that the maximum improvement is limited by the fraction of the task that cannot be parallelized; as such, **improvements diminish as the non-parallelizable portion becomes more significant**.

See: [Parallelism](#parallelism), [Concurrency](#concurrency), [Performance](#performance). 👉 [back to ToC](#table-of-contents)

### Anti-patterns

_An antipattern is just like a pattern, except that instead of a solution it gives something that looks superficially like a solution but isn't one._

> &#45; Andrew Koenig

See: [God Class](#god-class), [Abstraction Leak](#abstraction-leak), [n+1 Problem](#n1-problem), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding). 👉 [back to ToC](#table-of-contents)

### Architecture Documentation

Documenting architecture involves creating detailed representations and descriptions of a system's structure, components, and interactions to communicate design decisions, guide development, and facilitate future maintenance and understanding among stakeholders

See: [Software Architecture](#software-architecture), [C4 Model](#c4-model), [ADR (Architecture Decision Record)](#adr-architecture-decision-record), [RFC](#rfc-request-for-comments). 👉 [back to ToC](#table-of-contents)

### Backoff

Backoff is waiting until you try again; it's a technique used to manage retries in an application control flow or network communication, where a system waits for an increasing amount of time after each failed attempt before trying again, helping to reduce network congestion and avoid overwhelming resources.

See: [Resilience](#resilience), [Backpressure](#backpressure). 👉 [back to ToC](#table-of-contents)

### Backpressure

Backpressure is a mechanism to control the flow of data being sent from the producer to the consumer from becoming overloaded, when the consumers cannot keep up, helping to prevent resource exhaustion and maintain overall system stability, in a lossy or lossless manner.

See: [Resilience](#resilience), [Reactivity](#reactivity), [Rate Limiting](#rate-limiting), [Backoff](#backoff), [Circuit Breaker](#circuit-breaker-pattern), [Client-Server Model](#client-server-model). 👉 [back to ToC](#table-of-contents)

### BI (Business Intelligence)

Business Intelligence (BI) refers to the technologies, tools, and practices used to collect, analyze, and present business data, enabling organizations to make informed decisions by providing insights through data visualization, reporting, and analytics, ultimately driving strategic planning and performance improvement.

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### Brooks' Law

_Adding manpower to a late software project makes it later._

> &#45; Fred Brooks

Brooks' Law states that adding more people to a late software project will only make it later, due to the time required for new team members to learn the project, communicate effectively, and coordinate work, leading to diminishing returns and increased complexity, rather than accelerating progress.

See: [Team Topologies](#team-topologies). 👉 [back to ToC](#table-of-contents)

### C4 Model

The C4 Model allows to document systems from **different perspectives** and for **different audiences**; it is a framework for visualizing software architecture via hierarchical diagrams on 4 different levels: Context, Containers, Components, and Code, in order to help teams understand and communicate the system's structure and relationships effectively.

See: [Architecture Documentation](#architecture-documentation), [ADR (Architecture Decision Record)](#adr-architecture-decision-record), [RFC](#rfc-request-for-comments). 👉 [back to ToC](#table-of-contents)

### Chaos Engineering

Chaos Engineering is about breaking things on purpose and seeing what has collapsed; it's a discipline that proactively introduces (repetetively) controlled failures and disruptions into a system to test its resilience, identify weaknesses, and improve recovery mechanisms, enabling teams to improve system robustness and reliability by understanding how the system behaves under adverse conditions.

See: [Resilience](#resilience), [Software Testing](#software-testing), [Fault Injection](#fault-injection). 👉 [back to ToC](#table-of-contents)

### Circuit Breaker Pattern

The Circuit Breaker Pattern disallows to kick someone who's currently down; it's a a Fault Tolerance mechanism which detects failures and prevents further requests from being sent to the failing service, thus avoiding overload while recovering, and retrying e.g. after a timeout (then passing requests normally).

See: [Microservices](#microservices), [Rate Limiting](#rate-limiting), [Backpressure](#backpressure), [Backoff](#backoff). 👉 [back to ToC](#table-of-contents)

### CMS (Content Management System)

A Content Management System (CMS) is a software application that allows users to create, manage, and publish digital content, such as websites, blogs, or documentation, without requiring technical expertise, providing tools for content editing, collaboration, and version control.

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### Consistency

Consistency is the state of a system where all data is the same across all nodes in a **distributed system**, ensuring that **all nodes see the same data at the same time**, and that changes are propagated correctly and in a timely manner, to maintain data integrity and reliability.

See: [Strong Consistency](#strong-consistency), [Eventual Consistency](#eventual-consistency), [CAP Theorem](#cap-theorem-consistency-availability-partition-tolerance), [ACID Transactions](#acid-transactions-atomicity-consistency-isolation-durability), [BASE Transactions](#base-transactions-basically-available-soft-state-eventually-consistent). 👉 [back to ToC](#table-of-contents)

### Correlation ID

A Correlation ID is a **unique identifier** that gets **attached to each request** made to a distributed system, allowing for easier tracking and correlation of logs and events, and enabling the troubleshooting of issues across multiple services.

See: [Distributed Systems](#distributed-systems), [Microservices](#microservices), [Observability](#observability). 👉 [back to ToC](#table-of-contents)

### CRM (Customer Relationship Management)

Customer Relationship Management (CRM) is a technology for managing a company's relationships and interactions with current customers and potential customers, typically using data analysis to improve business relationships, customer satisfaction, retention, and sales growth, through personalized communication and targeted marketing

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### Databases

_Data is a precious thing and will last longer than the systems themselves._

> &#45; Tim Berners-Lee

See: [HA](#ha-high-availability), [Clustering](#clustering), [Sharding](#sharding), [Replication](#replication), [CAP Theorem](#cap-theorem-consistency-availability-partition-tolerance), [ACID Transactions](#acid-transactions-atomicity-consistency-isolation-durability), [BASE Transactions](#base-transactions-basically-available-soft-state-eventually-consistent). 👉 [back to ToC](#table-of-contents)

### Defensive Programming

Defensive Programming is about **expecting the unexpected**; it is a coding practice that anticipates and guards against potential failures, errors, and exceptions, by validating inputs, handling edge cases, and implementing error-checking mechanisms, to ensure robustness, reliability, and fault tolerance in software applications.

See: [Resilience](#resilience), [Design For Failure](#design-for-failure), [Fault Tolerance](#fault-tolerance), [Chaos Engineering](#chaos-engineering), [Isolate Failure](#isolate-failure). 👉 [back to ToC](#table-of-contents)

### Derivation

Derivation is when you create something by using something that already exists; e.g. creating a concept, new entity, class, interface etc.

See: [Inheritance](#inheritance), [Abstraction](#abstraction), [Reactivity](#reactivity). 👉 [back to ToC](#table-of-contents)

### Design For Failure

Designing for failure assumes that things will break inevitably and a system needs to be ready for it upfront; it is a proactive approach in software architecture where each element is expected to fail, and incorporates various strategies to maintain functionality and minimize downtime, such as: graceful degradation, failovers, redundancy, chaos engineering, observability and many more.

See: [Resilience](#resilience), [Graceful Degradation](#graceful-degradation), [Failover](#failover), [Redundancy](#redundancy), [Fault Tolerance](#fault-tolerance), [Chaos Engineering](#chaos-engineering), [Circuit Breaker](#circuit-breaker-pattern), [Monitoring](#monitoring), [Observability](#observability), [Distributed Tracing](#distributed-tracing). 👉 [back to ToC](#table-of-contents)

### DevOps

DevOps is caring not only about the **coding phase**, but also **everything that happens next**; it's a cultural and technical movement that combines development (Dev) and operations (Ops), aiming to automate and integrate software development, testing, deployment, and monitoring processes to enhance efficiency, accelerate delivery, and improve overall software quality.

See: [Continuous Integration](#continuous-integration), [Continuous Deployment](#continuous-deployment), [Continuous Delivery](#continuous-delivery), [Observability](#observability), [Monitoring](#monitoring), [DORA metrics](#dora-metrics). 👉 [back to ToC](#table-of-contents)

### Distributed Monolith

A Distributed Monolith is an architectural anti-pattern which takes **the worst of both worlds** (Monoliths, Distributed Systems); it's a system that is **split into multiple services** (distributed) along with all its complexity and other downsides but still exhibits the same characteristics and problems as a monolith (usually unintentionally designed to be deployed as a whole) such as tight coupling, shared data, and dependencies, leading to complexity, performance issues, and maintainability challenges, despite being distributed across multiple services.

See: [Microservices](#microservices), [Monolith](#monolith), [Modulith](#modulith), [Anti-patterns](#anti-patterns), [Fallacies of Distributed Computing](#fallacies-of-distributed-computing). 👉 [back to ToC](#table-of-contents)

### Distributed Tracing

Distributed Tracing allows to see how a user's **request travels throughout the entire system**; it is a technique used to monitor and troubleshoot the flow of each requests across various Microservices in a Distributed System, capturing timing data and dependencies to identify performance bottlenecks and enhance overall system observability, where a single user's request gets identified and tracked across entire system using a Correlation ID.

See: [Distributed Systems](#distributed-systems), [Microservices](#microservices), [Performance](#performance), [Observability](#observability), [Monitoring](#monitoring), [Correlation ID](#correlation-id). 👉 [back to ToC](#table-of-contents)

### DORA metrics

DORA metrics express **how fast can you ship or rollback**; they are key performance indicators used to assess the effectiveness of software delivery and operational performance, focusing on four dimensions: deployment frequency (DF), lead time for changes (LTC), mean time to restore service (MTTR), and change failure rate (CFR), helping teams improve their DevOps practices.

See: [DevOps](#devops), [Fitness Functions](#fitness-functions). 👉 [back to ToC](#table-of-contents)

### Dreyfus Model of Skill Acquisition

The Dreyfus Model of Skill Acquisition describes the five stages of learning a new skill: Novice, Advanced Beginner, Competent, Proficient, and Expert, highlighting the progression from following rules to intuitive decision-making, and the importance of experience, practice, and feedback in skill development.

See: [Kolb's Learning Cycle](#kolbs-learning-cycle), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding), [Unknown Unknowns](#unknown-unknowns). 👉 [back to ToC](#table-of-contents)

### DTO (Data Transfer Object)

A Data Transfer Object (DTO) is an object with **only the data, and no logic** (methods); it carries data between processes or services, typically used to encapsulate and disallow leaking abstraction of one module to another.

See: [Web Services](#web-services), [DDD](#ddd-domain-driven-design), [Entity](#entity), [VO](#vo-value-object), [ACL](#acl-anti-corruption-layer), [Encapsulation](#encapsulation), [Abstraction Leak](#abstraction-leak). 👉 [back to ToC](#table-of-contents)

### ERP (Enterprise Resource Planning)

Enterprise Resource Planning (ERP) is a software system that integrates business processes and functions, such as accounting, human resources, inventory, and supply chain management, into a single unified platform, providing real-time data and insights to streamline operations, improve efficiency, and support decision-making.

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### ESB (Enterprise Service Bus)

An Enterprise Service Bus (ESB) is an **old-school** way to implement service-oriented architecture (SOA), relatively **expensive**, introduces a **centralized** bus which other services/applications can integrate e.g. through standardized data exchange, thus looses coupling between them, but also becomes a single point of failure and a bottleneck.

See: [SOA](#soa-service-oriented-architecture), [Single Point of Failure](#single-point-of-failure), [Bottleneck](#bottleneck). 👉 [back to ToC](#table-of-contents)

### Failover

Failover is the process of **switching to a redundant or standby system** when the primary system fails, ensuring continuous operation and minimal disruption to services.

See: [Resilience](#resilience), [Design For Failure](#design-for-failure), [Fault Tolerance](#fault-tolerance). 👉 [back to ToC](#table-of-contents)

### Fallacies of Distributed Computing

The Fallacies of Distributed Computing are a set of assumptions that developers often make about distributed systems, including beliefs like "the network is (always) reliable" and "latency is zero," which can lead to misdesign and failures; recognizing these fallacies helps in creating more resilient applications.

See: [Distributed Systems](#distributed-systems), [Resilience](#resilience), [Microservices](#microservices), [Network Protocols](#network-protocols), [Failover](#failover). 👉 [back to ToC](#table-of-contents)

### Fault Injection

Fault injection is a testing technique where errors or failures are deliberately introduced into a system to evaluate its behavior under stress, helping developers identify vulnerabilities, assess recovery mechanisms, and improve overall system reliability and fault tolerance.

See: [Resilience](#resilience), [Software Testing](#software-testing), [Chaos Engineering](#chaos-engineering), [Fault Tolerance](#fault-tolerance). 👉 [back to ToC](#table-of-contents)

### Fault Tolerance

Fault Tolerance is the ability of a system to continue operating correctly even in the event of a failure or error, typically achieved through redundancy, error detection, and recovery mechanisms to ensure uninterrupted service.

See: [Resilience](#resilience), [Design For Failure](#design-for-failure). 👉 [back to ToC](#table-of-contents)

### Fitness Functions

Fitness functions allow to measure how a given system achieves **high-level goals**; they are metrics used to evaluate how well an existing system's architecture meets specified requirements or goals, guiding design and development decisions by providing quantitative feedback on performance, reliability, and other critical attributes.

See: [Software Architecture](#software-architecture), [DORA metrics](#dora-metrics). 👉 [back to ToC](#table-of-contents)

### God Class

A God Class (also an object, component, interface etc) is a class that **knows too much or does too much**; it's an anti-pattern where a single class becomes overly complex, bloated, and takes on too many responsibilities (hence significantly strengthening **tight coupling**), violating the Single Responsibility Principle and making the codebase harder to maintain, test, and understand; e.g. a **User class being reused across various different modules**, yet supporting all of them, thus knowing a little bit about each module, eventually being unmanageable because of tight coupling.

See: [Anti-patterns](#anti-patterns), [Bounded Context](#bounded-context), [Domain Model](#domain-model), [Legacy Code](#legacy-code). 👉 [back to ToC](#table-of-contents)

### HTTP (Hypertext Transfer Protocol)

HTTP (Hypertext Transfer Protocol) is the foundation of web communication, defining how clients (like browsers) and servers exchange information over the internet, using requests and responses to retrieve or send data, typically operating over TCP and supporting methods like GET, POST, PUT, and DELETE for interacting with resources.

See: [Network Protocols](#network-protocols), [Web Services](#web-services), [Client-Server Model](#client-server-model), [REST](#rest-representational-state-transfer), [SOAP](#soap-simple-object-access-protocol), [RPC](#rpc-remote-procedure-call), [Webhook](#webhook). 👉 [back to ToC](#table-of-contents)

### Isolate Failure

Isolating failure is about **preventing a single failure from cascading**, even from taking the whole system down; it is a design principle that aims to contain and limit the impact of failures by isolating components, services, or processes, to prevent them from affecting the entire system, ensuring that failures are contained and do not propagate.

See: [Resilience](#resilience), [Defensive Programming](#defensive-programming), [Fault Tolerance](#fault-tolerance), [Microservices](#microservices). 👉 [back to ToC](#table-of-contents)

### ITSM (IT Service Management)

IT Service Management (ITSM) is a set of practices and tools for managing IT services and aligning them with business needs, focusing on delivering value to customers, optimizing processes, and ensuring service quality, typically using ITIL (Information Technology Infrastructure Library) as a framework.

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### Kolb's Learning Cycle

Kolb's Learning Cycle is a four-stage model of experiential learning that includes: Concrete Experience (having a direct experience), Reflective Observation (reviewing and reflecting on the experience), Abstract Conceptualization (learning from the experience), and Active Experimentation (applying the new knowledge), emphasizing learning through a continuous, iterative process.

See: [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding), [Unknown Unknowns](#unknown-unknowns). 👉 [back to ToC](#table-of-contents)

### Law of Triviality (Bikeshedding)

Bikeshedding is the tendency to give disproportionate weight to trivial issues, focusing on minor details rather than important matters, often leading to lengthy discussions and delays in decision-making, due to the ease of understanding and debating simple problems compared to complex ones.

See: [Kolb's Learning Cycle](#kolbs-learning-cycle), [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition), [Anti-patterns](#anti-patterns). 👉 [back to ToC](#table-of-contents)

### Lean Startup

The Lean Startup is a methodology for developing businesses and products that emphasizes rapid prototyping, validated learning, and iterative experimentation to efficiently discover what customers want and minimize waste, ultimately accelerating the product development process.

See: [MVP](#mvp-minimum-viable-product). 👉 [back to ToC](#table-of-contents)

### Legacy Code

Everything we've written is already legacy 🥲

See: [Technical Debt](#technical-debt). 👉 [back to ToC](#table-of-contents)

### Monitoring

Monitoring allows to **constantly check if "all is fine"**; it involves continuously tracking and measuring system performance, availability, health, and resource usage, typically through the collection of predefined metrics, in order to detect issues, ensure reliability, and optimize application behavior, often utilizing additional tooling for real-time alerts and metrics analysis.

See: [Observability](#observability), [DevOps](#devops), [Distributed Tracing](#distributed-tracing), [Performance](#performance). 👉 [back to ToC](#table-of-contents)

### MVP (Minimum Viable Product)

A Minimum Viable Product (MVP) is a version of a new product that includes only the essential features, allowing to quickly validate the idea, gather feedback, and learn from real-world usage, while minimizing development costs and time-to-market.

See: [Lean Startup](#lean-startup), [TTM](#ttm-time-to-market). 👉 [back to ToC](#table-of-contents)

### Observability

Observability is about understanding **what's happening inside a system** by looking at its outputs; it is the ability to measure and understand the internal state based on the data it generates, including logs, metrics, and traces, to gain insights into system behavior, diagnose issues, and improve performance, reliability, and maintainability.

See: [DevOps](#devops), [Monitoring](#monitoring). 👉 [back to ToC](#table-of-contents)

### Off-the-shelf Software

Off-the-shelf software refers to pre-built applications or programs that are readily available for purchase or download, designed to meet general user needs, offering a cost-effective and quick solution compared to custom software development but may lack specific features tailored to unique business requirements.

See: [CMS](#cms-content-management-system), [CRM](#crm-customer-relationship-management), [ERP](#erp-enterprise-resource-planning), [SCM](#scm-supply-chain-management), [ITSM](#itsm-it-service-management), [BI](#bi-business-intelligence). 👉 [back to ToC](#table-of-contents)

### Overfetching

Overfetching occurs when an API returns more data than necessary for a client's request, leading to inefficiencies by providing extra information that the client doesn't need or use, often seen in traditional REST APIs when the response can't be precisely tailored to the client’s requirements.

See: [Web Services](#web-services), [GraphQL](#graphql), [REST](#rest-representational-state-transfer), [Underfetching](#underfetching). 👉 [back to ToC](#table-of-contents)

### Parkinson's Law

_Work expands so as to fill the time available for its completion._

> &#45; Cyril Northcote Parkinson

Parkinson's Law suggests that work expands to fill the time available for its completion, meaning that tasks will often take longer to complete if more time is allocated, due to inefficiencies, procrastination, and lack of urgency, highlighting the importance of setting clear deadlines and time constraints to improve productivity and focus.

See: [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding), [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition). 👉 [back to ToC](#table-of-contents)

### Protocol

A protocol is a set of rules and conventions that define how data is transmitted and received between devices in a network, ensuring proper communication, synchronization, and error handling, with examples like HTTP, TCP/IP, and FTP.

See: [Taxonomy](#taxonomy), [Network Protocols](#network-protocols). 👉 [back to ToC](#table-of-contents)

### Rate Limiting

Rate Limiting is a technique to control the rate of requests a user can send or receive, within a given time-frame, preventing abuse and overuse, ensuring the system remains responsive and available, and protecting against denial-of-service (DoS) attacks.

See: [Microservices](#microservices), [Resilience](#resilience), [Backpressure](#backpressure), [Backoff](#backoff), [Circuit Breaker](#circuit-breaker-pattern). 👉 [back to ToC](#table-of-contents)

### Resilience

Resilience is the ability of a system to **recover from failures and continue to function**, even when some of its components fail; it is achieved through various practices and patterns that help systems adapt to changing conditions, maintain functionality, and minimize downtime, ensuring reliability and availability.

See: [Fault Tolerance](#fault-tolerance), [Design For Failure](#design-for-failure), [Chaos Engineering](#chaos-engineering), [Monitoring](#monitoring), [Graceful Degradation](#graceful-degradation), [Failover](#failover), [Redundancy](#redundancy), [Backpressure](#backpressure), [Rate Limiting](#rate-limiting). 👉 [back to ToC](#table-of-contents)

### RFC (Request For Comments)

A Request for Comments (RFC) is a document used to **propose standards and/or gather feedback**, allowing architects to collect diverse opinions and insights before making important architectural decisions.

See: [Architecture Documentation](#architecture-documentation), [C4 Model](#c4-model), [ADR (Architecture Decision Record)](#adr-architecture-decision-record). 👉 [back to ToC](#table-of-contents)

### Robustness Principle (Postel's Law)

_Be conservative in what you do, be liberal in what you accept from others._

> &#45; Jon Postel

Postel's Law (also known as the Robustness Principle) is a design guideline for software development that encourages **leniency and tolerance in handling input** and **strictness in generating output**, aiming to improve interoperability and robustness by allowing systems to work with a wide range of inputs and gracefully handle errors or unexpected data.

See: [Defensive Programming](#defensive-programming), [Web Services](#web-services). 👉 [back to ToC](#table-of-contents)

### SCM (Supply Chain Management)

Supply Chain Management (SCM) is the management of the flow of goods and services, involving the movement and storage of raw materials, work-in-progress inventory, and finished products, from the point of origin to the point of consumption, optimizing processes, reducing costs, and improving collaboration between suppliers, manufacturers, and customers.

See: [Off-the-shelf Software](#off-the-shelf-software). 👉 [back to ToC](#table-of-contents)

### Single Point of Failure

A Single Point of Failure (SPOF) is a piece of system which, if it fails, **will cause the entire system to fail**; it is a critical component or dependency that does not have redundancy or failover mechanisms, often centralized, making the system **vulnerable** to downtime and disruptions.

See: [Resilience](#resilience), [Fault Tolerance](#fault-tolerance), [Anti-patterns](#anti-patterns). 👉 [back to ToC](#table-of-contents)

### SOAP (Simple Object Access Protocol)

SOAP is a protocol for exchanging structured information over networks, enforcing pre-generating both client and server definitions upfront from a contract file (WSDL,Web Services Description Language), typically using XML and sent over HTTP

See: [Web Services](#web-services), [REST](#rest-representational-state-transfer), [RPC](#rpc-remote-procedure-call), [API](#api-application-programming-interface), [DTO](#dto-data-transfer-object). 👉 [back to ToC](#table-of-contents)

### Software Architecture

_Software Architecture is all about the important stuff... whatever that is._

> &#45; Ralph Johnson

See: [Architecture Documentation](#architecture-documentation), [Architecture Styles](#architecture-styles). 👉 [back to ToC](#table-of-contents)

### Taxonomy

Taxonomy is how things are **categorized**; is the science of classification, organizing and naming things based on shared characteristics, properties, and relationships, to help understand and communicate complex systems, and guide design decisions.

See: [Architecture Styles](#architecture-styles), [Network Protocols](#network-protocols). 👉 [back to ToC](#table-of-contents)

### Technical Debt

Technical Debt is the **cost of additional rework** caused by choosing an easy solution now instead of using a better approach that would take longer; it represents the cumulative consequences of cutting corners, making trade-offs, and postponing improvements, which can slow down development, increase complexity, and reduce maintainability over time.

See: [Legacy Code](#legacy-code). 👉 [back to ToC](#table-of-contents)

### TTM (Time To Market)

Time To Market (TTM) describes how fast can you ship stuff; it's the time it takes to develop and launch a new product or feature, from the initial idea to its availability to customers, and is a critical factor in a company's success, as it directly impacts competitiveness, revenue, and market share.

See: [MVP](#mvp-minimum-viable-product). 👉 [back to ToC](#table-of-contents)

### Underfetching

Underfetching happens when an API doesn't provide enough data in a single request, requiring the client to make additional requests to fetch the necessary information, leading to performance issues and increased latency, commonly seen in REST APIs when the response doesn't include all required data for a specific view or business operation.

See: [Web Services](#web-services), [GraphQL](#graphql), [Overfetching](#overfetching), [REST](#rest-representational-state-transfer), [Performance](#performance), [HTTP](#http-hypertext-transfer-protocol), [Latency](#latency). 👉 [back to ToC](#table-of-contents)

### Unknown Unknowns

_Reports that say that something hasn't happened are always interesting to me, because as we know, **there are known knowns**; there are things we know we know. We also know there are **known unknowns**; that is to say we know there are some things we do not know. But there are also **unknown unknowns** — the ones we don't know we don't know. And if one looks throughout the history of our country and other free countries, it is the latter category that tends to be the difficult ones._

> &#45; Donald Rumsfeld

See: [Kolb's Learning Cycle](#kolbs-learning-cycle), [Dreyfus Model of Skill Acquisition](#dreyfus-model-of-skill-acquisition), [Law of Triviality (Bikeshedding)](#law-of-triviality-bikeshedding). 👉 [back to ToC](#table-of-contents)

### Webhook

A webhook is like a _callback over the network_; it's user-defined (usually HTTP POST) callback that automatically sends real-time data or notifications from one system to another when a specific event occurs, enabling event-driven communication and automation between systems, such as triggering notifications, updates, or data synchronization.

See: [Web Services](#web-services), [HTTP](#http-hypertext-transfer-protocol). 👉 [back to ToC](#table-of-contents)

