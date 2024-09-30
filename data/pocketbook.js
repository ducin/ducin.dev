/**
 * @typedef {Object} Entry
 * @property {string} name
 * @property {boolean} group
 * @property {string} [description]
 * @property {string[]} [tags]
 * @property {string[]} [seeAlso]
 */

/**
 * @type {Entry[]}
 */
const entries = [
  {
    "name": "Software Architecture",
    "group": true,
    "description": "_Software Architecture is all about the important stuff... whatever that is._\n\n> &#45; Ralph Johnson",
    "seeAlso": [
      "Architecture Documentation",
      "Architecture Styles"
    ]
  },
  {
    "name": "Architecture Styles",
    "group": true,
    "seeAlso": [
      "Software Architecture",
      "Taxonomy"
    ]
  },
  {
    "name": "Taxonomy",
    "description": "Taxonomy is how things are categorized; is the science of classification, organizing and naming things based on shared characteristics, properties, and relationships, to help understand and communicate complex systems, and guide design decisions.",
    "seeAlso": [
      "Architecture Styles",
    ]
  },
  {
    "name": "Fitness Functions",
    "description": "Fitness functions allow to measure how a given system achieves high-level goals; they are metrics used to evaluate how well an existing system's architecture meets specified requirements or goals, guiding design and development decisions by providing quantitative feedback on performance, reliability, and other critical attributes.",
    "tags": [
      "Software Architecture",
    ],
    "seeAlso": [
      "DORA metrics",
    ]
  },
  {
    "name": "Architecture Documentation",
    "group": true,
    "description": "Documenting architecture involves creating detailed representations and descriptions of a system's structure, components, and interactions to communicate design decisions, guide development, and facilitate future maintenance and understanding among stakeholders",
    "seeAlso": [
      "Software Architecture",
    ]
  },
  {
    "name": "C4 Model",
    "description": "The C4 Model allows to document systems from different perspectives and for different audiences; it is a framework for visualizing software architecture via hierarchical diagrams on 4 different levels: Context, Containers, Components, and Code, in order to help teams understand and communicate the system's structure and relationships effectively.",
    "tags": [
      "Architecture Documentation",
    ],
    "seeAlso": [
      "ADR (Architecture Decision Record)",
      "RFC (Request For Comments)",
    ]
  },
  {
    "name": "ADR (Architecture Decision Record)",
    "description": "An Architecture Decision Record (ADR) allows to make future developers understand WHY a decision has been made in a given context; it is a document that captures an important architectural decision made along with its context and consequences, providing a record of the motivations behind the decision, the alternatives considered, and the trade-offs involved, to help maintain a shared understanding of the system design over time.",
    "tags": [
      "Architecture Documentation",
    ],
    "seeAlso": [
      "C4 Model",
      "RFC (Request For Comments)",
    ]
  },
  {
    "name": "RFC (Request For Comments)",
    "description": "A Request for Comments (RFC) is a document used to propose standards and/or gather feedback, allowing architects to collect diverse opinions and insights before making important architectural decisions.",
    "tags": [
      "Architecture Documentation",
    ],
    "seeAlso": [
      "C4 Model",
      "ADR (Architecture Decision Record)",
    ]
  },


  {
    "name": "Divide and Conquer"
  },
  {
    "name": "Separation of Concerns"
  },

  





  {
    "name": "On-premise"
  },
  {
    "name": "Cloud-native"
  },
  {
    "name": "Cloud Computing"
  },
  {
    "name": "Serverless"
  },




  {
    "name": "DevOps",
    "group": true,
    "description": "DevOps is caring not only about the coding phase, but also everything that happens next; it's a cultural and technical movement that combines development (Dev) and operations (Ops), aiming to automate and integrate software development, testing, deployment, and monitoring processes to enhance efficiency, accelerate delivery, and improve overall software quality."
  },
  {
    "name": "DORA metrics",
    "description": "DORA metrics express how fast can you ship or rollback; they are key performance indicators used to assess the effectiveness of software delivery and operational performance, focusing on four dimensions: deployment frequency (DF), lead time for changes (LTC), mean time to restore service (MTTR), and change failure rate (CFR), helping teams improve their DevOps practices.",
    "tags": [
      "DevOps",
    ],
    "seeAlso": [
      "Fitness Functions",
    ]
  },
  {
    "name": "Observability",
    "description": "Observability is about understanding what's happening inside a system by looking at its outputs; it is the ability to measure and understand the internal state based on the data it generates, including logs, metrics, and traces, to gain insights into system behavior, diagnose issues, and improve performance, reliability, and maintainability.",
    "tags": [
      "DevOps",
    ],
    "seeAlso": [
      "Monitoring",
    ]
  },
  {
    "name": "Monitoring",
    "description": "Monitoring allows to constantly check if \"all is fine\"; it involves continuously tracking and measuring system performance, availability, health, and resource usage, typically through the collection of predefined metrics, in order to detect issues, ensure reliability, and optimize application behavior, often utilizing additional tooling for real-time alerts and metrics analysis.",
    "tags": [
      "Observability",
      "DevOps",
    ],
  },
  {
    "name": "Distributed Tracing",
    "description": "Distributed Tracing allows to see how a user's request travels through the entire system; it is a technique used to monitor and troubleshoot the flow of each requests across various Microservices in a Distributed System, capturing timing data and dependencies to identify performance bottlenecks and enhance overall system observability, where a single user's request gets identified and tracked across entire system using a Correlation ID.",
    "tags": [
      "Distributed Systems",
      "Microservices",
    ],
    "seeAlso": [
      "Observability",
      "Monitoring",
      "Correlation ID",
    ]
  },
  {
    "name": "Correlation ID",
    "description": "A Correlation ID is a unique identifier that gets attached to each request made to a distributed system, allowing for easier tracking and correlation of logs and events, and enabling the troubleshooting of issues across multiple services.",
    "tags": [
      "Distributed Systems",
      "Microservices",
      "Observability",
    ]
  },
  {
    "name": "Continuous Integration",
  },
  {
    "name": "Continuous Deployment",
  },
  {
    "name": "Continuous Delivery",
  },



  {
    "name": "Distributed Systems",
    "group": true,
    "seeAlso": [
      "Fallacies of Distributed Computing",
    ]
  },
  {
    "name": "Fallacies of Distributed Computing",
    "description": "The Fallacies of Distributed Computing are a set of assumptions that developers often make about distributed systems, including beliefs like \"the network is (always) reliable\" and \"latency is zero,\" which can lead to misdesign and failures; recognizing these fallacies helps in creating more resilient applications.",
    "tags": [
      "Distributed Systems",
      "Resilience",
    ],
  },
  {
    "name": "Resilience",
    "group": true,
    "description": "Resilience is the ability of a system to recover from failures and continue to function, even when some of its components fail; it is achieved through various practices and patterns that help systems adapt to changing conditions, maintain functionality, and minimize downtime, ensuring reliability and availability.",
  },
  {
    "name": "Fault Tolerance",
    "description": "Fault Tolerance is the ability of a system to continue operating correctly even in the event of a failure or error, typically achieved through redundancy, error detection, and recovery mechanisms to ensure uninterrupted service.",
    "tags": [
      "Resilience",
    ],
    "seeAlso": [
      "Design For Failure"
    ]
  },
  {
    "name": "Design For Failure",
    "description": "Designing for failure assumes that things will break inevitably and a system needs to be ready for it upfront; it is a proactive approach in software architecture where each element is expected to fail, and incorporates various strategies to maintain functionality and minimize downtime, such as: graceful degradation, failovers, redundancy, chaos engineering, observability and many more.",
    "tags": [
      "Resilience",
    ],
    "seeAlso": [
      "Graceful Degradation",
      "Failover",
      "Redundancy",
      "Fault Tolerance",
      "Chaos Engineering",
      "Circuit Breaker Pattern",
      "Monitoring",
      "Observability",
      "Distributed Tracing",
    ]
  },



  
  {
    "name": "Software Testing",
    "seeAlso": [
      "Chaos Engineering",
    ]
  },
  {
    "name": "Fault Injection",
    "description": "Fault injection is a testing technique where errors or failures are deliberately introduced into a system to evaluate its behavior under stress, helping developers identify vulnerabilities, assess recovery mechanisms, and improve overall system reliability and fault tolerance.",
    "tags": [
      "Resilience",
    ],
    "seeAlso": [
      "Software Testing",
      "Chaos Engineering",
      "Fault Tolerance",
    ]
  },
  {
    "name": "Chaos Engineering",
    "description": "Chaos Engineering is about breaking things on purpose and seeing what has collapsed; it's a discipline that proactively introduces (repetetively) controlled failures and disruptions into a system to test its resilience, identify weaknesses, and improve recovery mechanisms, enabling teams to improve system robustness and reliability by understanding how the system behaves under adverse conditions.",
    "tags": [
      "Resilience",
    ],
    "seeAlso": [
      "Software Testing",
      "Fault Injection",
    ]
  },
  {
    "name": "Backoff",
    "description": "Backoff is waiting until you try again; it's a technique used to manage retries in an application control flow or network communication, where a system waits for an increasing amount of time after each failed attempt before trying again, helping to reduce network congestion and avoid overwhelming resources.",
    "tags": [
      "Resilience",
    ],
    "seeAlso": [
      "Backpressure",
    ]
  },
  {
    "name": "Backpressure",
    "description": "Backpressure is a mechanism to control the flow of data being sent from the producer to the consumer from becoming overloaded, when the consumers cannot keep up, helping to prevent resource exhaustion and maintain overall system stability, in a lossy or lossless manner.",
    "tags": [
      "Resilience",
      "Reactivity"
    ],
    "seeAlso": [
      "Rate Limiting",
      "Backoff",
      "Circuit Breaker"
    ]
  },
  {
    "name": "Rate Limiting",
    "description": "Rate Limiting is a technique to control the rate of requests a user can send or receive, within a given time-frame, preventing abuse and overuse, ensuring the system remains responsive and available, and protecting against denial-of-service (DoS) attacks.",
    "tags": [
      "Microservices",
      "Resilience",
    ],
    "seeAlso": [
      "Backpressure",
      "Backoff",
      "Circuit Breaker"
    ]
  },
  {
    "name": "Graceful Degradation",
  },


  
  {
    "name": "Circuit Breaker Pattern",
    "description": "The Circuit Breaker Pattern disallows to kick someone who's currently down; it's a a Fault Tolerance mechanism which detects failures and prevents further requests from being sent to the failing service, thus avoiding overload while recovering, and retrying e.g. after a timeout (then passing requests normally).",
    "tags": [
      "Microservices",
    ],
    "seeAlso": [
      "Rate Limiting",
      "Backpressure",
      "Backoff",
    ]
  },
  {
    "name": "Inbox Pattern"
  },
  {
    "name": "Outbox Pattern"
  },
  {
    "name": "Bulkhead Pattern"
  },
  {
    "name": "Retry Pattern"
  },
  {
    "name": "Sidecar Pattern"
  },
  {
    "name": "Leader Election"
  },
  {
    "name": "Consensus Algorithm"
  },
  {
    "name": "API Gateway"
  },
  {
    "name": "Service Mesh"
  },
  {
    "name": "Load Balancer"
  },
  {
    "name": "Service Discovery"
  },




  {
    "name": "Anti-Corruption Layer"
  },
  {
    "name": "Sticky Sessions"
  },
  {
    "name": "Blue-Green Deployment"
  },
  {
    "name": "Canary Releases"
  },
  {
    "name": "Feature Flags",
    "seeAlso": [
      "Trunk Based Development",
    ]
  },
  {
    "name": "Dark Launch"
  },
  {
    "name": "Rolling Deployment"
  },
  {
    "name": "A/B Testing"
  },
  {
    "name": "Multitenancy"
  },
  {
    "name": "Fail Fast"
  },
  {
    "name": "Fail Safe"
  },
  {
    "name": "SLA (Service Level Agreement)"
  },
  {
    "name": "SLO (Service Level Objective)"
  },
  {
    "name": "SLI (Service Level Indicator)"
  },
  {
    "name": "MTTR (Mean Time To Recovery)"
  },
  {
    "name": "IaaS (Infrastructure as a Service)"
  },
  {
    "name": "PaaS (Platform as a Service)"
  },
  {
    "name": "SaaS (Software as a Service)"
  },
  {
    "name": "FaaS (Function as a Service)"
  },
  {
    "name": "Serverless"
  },
  {
    "name": "Container (ambiguous)"
  },



  {
    "name": "Coupling"
  },
  {
    "name": "Temporal Coupling"
  },
  {
    "name": "Spatial Coupling"
  },
  {
    "name": "Content Coupling"
  },
  {
    "name": "Control Coupling"
  },
  {
    "name": "Cohesion"
  },
  {
    "name": "Decoupling"
  },



  {
    "name": "Consistency (ambiguous)"
  },
  {
    "name": "Strong Consistency"
  },
  {
    "name": "Eventual Consistency"
  },


  {
    "name": "HA (High Availability)"
  },
  {
    "name": "Clustering"
  },
  {
    "name": "Sharding"
  },
  {
    "name": "Replication"
  },
  {
    "name": "CAP Theorem (Consistency, Availability, Partition Tolerance)"
  },
  {
    "name": "ACID Transactions (Atomicity, Consistency, Isolation, Durability)"
  },
  {
    "name": "BASE Transactions (Basically Available, Soft State, Eventually Consistent)"
  },





  {
    "name": "Encapsulation"
  },
  {
    "name": "Abstraction"
  },
  {
    "name": "Polymorphism"
  },
  {
    "name": "Inheritance"
  },
  {
    "name": "Derivation"
  },
  {
    "name": "Composition"
  },
  {
    "name": "Composition Over Inheritance"
  },
  {
    "name": "Law of Demeter"
  },
  {
    "name": "Dependency Injection"
  },
  {
    "name": "Inversion of Control"
  },
  {
    "name": "Aggregation"
  },



  {
    "name": "Latency"
  },
  {
    "name": "Throughput"
  },
  {
    "name": "Bandwidth"
  },
  {
    "name": "Concurrency"
  },
  {
    "name": "Parallelism"
  },



  {
    "name": "Trunk Based Development"
  },
  {
    "name": "Git Flow"
  },
  {
    "name": "Optimistic Locking"
  },
  {
    "name": "Pessimistic Locking"
  },
  {
    "name": "Deadlock"
  },
  {
    "name": "Command"
  },
  {
    "name": "Event"
  },
  {
    "name": "Query"
  },



  {
    "name": "Saga Pattern"
  },
  {
    "name": "Strangler Pattern"
  },



  {
    "name": "Choreography"
  },
  {
    "name": "Orchestration"
  },
  {
    "name": "Synchronous Communication"
  },
  {
    "name": "Asynchronous Communication"
  },
  {
    "name": "Idempotency"
  },



  {
    "name": "Webhook"
  },



  {
    "name": "Event Driven Architecture"
  },
  {
    "name": "Event Bus"
  },
  {
    "name": "Message Broker"
  },
  {
    "name": "Message Queue"
  },
  {
    "name": "Pub/Sub (Publish/Subscribe)"
  },



  {
    "name": "Microservices",
    "group": true,
  },
  {
    "name": "Monolith"
  },
  {
    "name": "Modulith"
  },
  {
    "name": "Distributed Monolith"
  },
  {
    "name": "SOA (Service Oriented Architecture)"
  },
  {
    "name": "BFF (Backend For Frontend)"
  },
  {
    "name": "API (Application Programming Interface)"
  },
  {
    "name": "REST (Representational State Transfer)"
  },
  {
    "name": "Overfetching"
  },
  {
    "name": "Underfetching"
  },
  {
    "name": "GraphQL"
  },
  {
    "name": "RPC (Remote Procedure Call)"
  },
  {
    "name": "WebService"
  },
  {
    "name": "Hexagonal Architecture"
  },
  {
    "name": "Onion Architecture"
  },
  {
    "name": "Monolith First"
  },
  {
    "name": "Share Nothing Architecture"
  },
  {
    "name": "Pipes and Filters"
  },
  {
    "name": "Lambda Architecture"
  },



  {
    "name": "P2P (Peer to Peer)"
  },



  {
    "name": "Server Side Rendering"
  },
  {
    "name": "Client Side Rendering"
  },
  {
    "name": "Single Page Application"
  },
  {
    "name": "Progressive Web App"
  },
  {
    "name": "Static Site Generator"
  },
  {
    "name": "JAMstack"
  },
  {
    "name": "SEO (Search Engine Optimization)"
  },
  {
    "name": "Micro Frontends"
  },



  {
    "name": "Reactivity",
    "group": true,
  },


  {
    "name": "Frozen Caveman Antipattern"
  },

  
  {
    "name": "DDD (Domain Driven Design)",
    "group": true,
  },
  {
    "name": "Bounded Context"
  },
  {
    "name": "Ubiquitous Language"
  },
  {
    "name": "Context Mapping"
  },
  {
    "name": "Core Domain"
  },
  {
    "name": "Subdomain"
  },
  {
    "name": "Generic Subdomain"
  },
  {
    "name": "Supporting Subdomain"
  },
  {
    "name": "Entity"
  },
  {
    "name": "Anemic Domain Model"
  },
  {
    "name": "Value Object"
  },
  {
    "name": "Aggregate"
  },
  {
    "name": "Aggregate Root"
  },
  {
    "name": "Domain Event"
  },
  {
    "name": "Domain Service"
  },
  {
    "name": "Repository"
  },
  {
    "name": "Policy"
  },
  {
    "name": "Anti-Corruption Layer"
  },
  {
    "name": "Shared Kernel"
  },
  {
    "name": "Business Archetype"
  },
  {
    "name": "Business Process"
  },
  {
    "name": "Business Rule"
  },


  {
    "name": "Event Sourcing",
  },
  {
    "name": "Event Storming",
  },
  {
    "name": "CQRS (Command Query Responsibility Segregation)"
  },
  {
    "name": "Read Model",
  },
  {
    "name": "Write Model"
  },



  {
    "name": "Redundancy"
  },
  {
    "name": "Scalability"
  },
  {
    "name": "Messaging System"
  },













  {
    "name": "MVP (Minimum Viable Product)",
    "description": "A Minimum Viable Product (MVP) is a version of a new product that includes only the essential features, allowing to quickly validate the idea, gather feedback, and learn from real-world usage, while minimizing development costs and time-to-market.",
    "seeAlso": [
      "Lean Startup",
      "TTM (Time To Market)",
    ]
  },
  {
    "name": "TTM (Time To Market)",
    "description": "Time To Market (TTM) describes how fast can you ship stuff; it's the time it takes to develop and launch a new product or feature, from the initial idea to its availability to customers, and is a critical factor in a company's success, as it directly impacts competitiveness, revenue, and market share.",
    "seeAlso": [
      "MVP (Minimum Viable Product)",
    ]
  },
  {
    "name": "Off-the-shelf Software",
    "description": "Off-the-shelf software refers to pre-built applications or programs that are readily available for purchase or download, designed to meet general user needs, offering a cost-effective and quick solution compared to custom software development but may lack specific features tailored to unique business requirements.",
  },
  {
    "name": "Lean Startup",
    "description": "The Lean Startup is a methodology for developing businesses and products that emphasizes rapid prototyping, validated learning, and iterative experimentation to efficiently discover what customers want and minimize waste, ultimately accelerating the product development process.",
    "seeAlso": [
      "MVP (Minimum Viable Product)",
    ]
  },
  {
    "name": "CMS (Content Management System)"
  },
  {
    "name": "CRM (Customer Relationship Management)"
  },
  {
    "name": "ERP (Enterprise Resource Planning)"
  },
  {
    "name": "SCM (Supply Chain Management)"
  },



  {
    "name": "BI (Business Intelligence)"
  },
  {
    "name": "EAI (Enterprise Application Integration)"
  },
  {
    "name": "EIP (Enterprise Integration Pattern)"
  },
  {
    "name": "ESB (Enterprise Service Bus)"
  },
  {
    "name": "Team Topologies"
  },



  {
    "name": "Conway's Law"
  },
  {
    "name": "Postel's Law"
  },
  {
    "name": "Brooks' Law"
  },
  {
    "name": "Parkinson's Law"
  },
  {
    "name": "Hofstadter's Law"
  },
  {
    "name": "Moore's Law"
  },
  {
    "name": "Metcalfe's Law"
  },
  {
    "name": "Amdahl's Law"
  },
  {
    "name": "Gall's Law"
  },
  {
    "name": "Ninety-Ninety Rule"
  },
  {
    "name": "Pareto Principle"
  },



  {
    "name": "DRY (Don't Repeat Yourself)"
  },
  {
    "name": "KISS (Keep It Simple, Stupid)"
  },
  {
    "name": "YAGNI (You Aren't Gonna Need It)"
  },
  {
    "name": "WET (Write Everything Twice)"
  },



  {
    "name": "Kolb's Learning Cycle"
  },
  {
    "name": "Dreyfus Model of Skill Acquisition"
  },



  {
    "name": "(Un)known (Un)knowns"
  },
  {
    "name": "n+1 Problem"
  },
  {
    "name": "off-by-one Error"
  },
  {
    "name": "Bikeshedding"
  },
  {
    "name": "Technical Debt"
  },
  {
    "name": "Legacy Code",
    "description": "Everything we've written is already legacy 🥲",
    "seeAlso": [
      "Technical Debt",
    ]
  }
]

module.exports = {
  entries
}
