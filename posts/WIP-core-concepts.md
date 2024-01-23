# Core Concepts

In order to correctly understand Angular Query, let's build a **proper mental model**. The main and most fundamental concept is - no sh#t Sherlock! - **the Query** 😉.

<% TOC %>

## Query

First things first: **queries are declarative**. In other words, with Angular Query **you** are **not fetching the data**. Instead, you **declare a dependency**:

> *A component needs (depends on) some external data.*

Angular Query will fetch it for you, **when it decides to**. It's basically yet another form of [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control).

You can think of a query as if **an engine will supply your component with some server data**. The engine will **store** it, will **cache** it, will **maintain timers** to determine whether the data should be **refetched** or not. All this is engine's responsibility. Developers only declare the **`component -> data` dependency**.

### Query vs manual fetch vs redux

Now, how is that **different** from manual data fetching or redux-based architecture?
- with **manual fetching**, you're responsible for running the actual data fetch. You're responsible for **when** you do it, **how** you do it, also **whether** you do it (or not). That's purely **imperative**.
- with **redux architecture** (including NgRx; *of course it depends on certain setup and/or middlewares or metareducers applied*) - most often **an action has to be dispatched**, so that data fetching could start. This is **declarative**. But you're additionally responsible for **creating and binding the action** to whatever **reason** might cause data loading. All in all that's an improvement indeed, it found its place in the ecosystem and can be used to build complex applications which should do way more than just data loading. But if a certain part of your application **only needs to fetch and display the data**, the model can be **significantly simplified** (for the good and the bad). And that's actually the main usecase for Angular Query...

Angular Query is specialized in a very typical and common scenario: **a component needs to immediately load and display the data**. And the aim is to simplify this task as much as possible. For this reason:
- there's **no explicit unsubscribe**. Cleanup is done automatically when the component gets destroyed.
- **all low-level decisions** (when, how, whether, etc.) **are made and executed by *the engine***.

Technically, a component will include an `injectQuery` call for each query:

```ts
@Injectable(...)
export class PostsHTTPService {
  // just an HTTP method
  getPost = (postId: number) => {
    return this.httpClient.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    )
  }
}

@Component(...)
export class PostComponent {
  // HTTP service
  #postsHTTP = inject(PostsHTTPService)

  // query
  postQuery = injectQuery(() => ({
    queryKey: ['post', this.postId()],
    queryFn: async (): Promise<Post> => {
      return lastValueFrom(#postsHTTP.getPost(this.postId()))
    },
  }))
  //...
}
```

*The engine* I mentioned above is the `QueryClient` which will store the data within the `QueryCache`. The Query Key will be discussed later.

### Query Client & Query Cache

First of all, in order to effectively use Angular Query **it's ok to have no idea** what `QueryClient` and `QueryCache` is 😉. Vast majority of applications will never need to interact with `QueryCache` directly (it's handled by `QueryClient`). The only thing required is to provide the `QueryClient` (usually, donce once per entire application). **This section is intended only to explain the underlying concepts.**

Angular Query stores the data in **a cache** that is later exposed to components via `injectQuery`. Most often one cache per application is enough. The cache keys are, so called, Query Keys.

RYSUNEK

### Query Keys

A **Query Key** plays the role of an **identifier** of a **query**. Multiple components which require the same data from the same external data source will use **a query with the same query key**. Query Keys strictly correlate to resources exposed by the server.

Technically, Query Keys are *usually* arrays containing strings and objects. A couple of examples where REST resources are *mapped* to Query Keys:
- `GET /posts` - `["posts"]`
- `GET /posts/<id>` - `["posts", ID]`
- `GET /comments` - `["comments", { filters: {} }]`
- `GET /comments?reviewed` - `["comments", { filters: { status: "REVIEWED" } }]`

It's up to **your design** how precisely Query Keys will look. [A (better) alternative to the above](https://tkdodo.eu/blog/effective-react-query-keys#structure) might look like the following:
- `GET /posts` - `["posts", "list"]`
- `GET /posts/<id>` - `["posts", "detail", ID]`
- `GET /comments` - `["comments", "list", { filters: {} }]`
- `GET /comments?reviewed` - `["comments", "list", { filters: { status: "REVIEWED" } }]`

**Query keys are hierarchical**. This means, you can invalidate queries (just as you invalidate a cache entry) either individually or a whole group. When invalidating *post lists*:
```ts
queryClient.invalidateQueries({
  queryKey: ['posts', 'list']
})
```
only the *list* entries will be affacted. However, when invalidating posts:
```ts
queryClient.invalidateQueries({
  queryKey: ['posts']
})
```
both *lists* and *details* will be affected (and everything with the key starting with `posts`).

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yz0itqpo45af6biffn4s.png)

That's also what I meant in the very beginning, that Angular Query is highly **declarative**.

Query Keys design, their good practices etc. is yet a different topic - but you should have a solid understanding of the concept by now.

## Cleanups

All items within Angular Query make use of `DestroyRef` in order to clean up or unmount the resources. So it depends on [which injector does a certain `DestroyRef` come from](https://angular.io/guide/hierarchical-dependency-injection#types-of-injector-hierarchies).

In case of `QueryClient`, the `DestroyRef` used belongs to **Environemnt Injector**. In practice this means that Query Client would get destroyed (precisely: unmounted) when... when the entire application gets destroyed 😉.

In case of each query, injected `DestroyRef` comes from **Element Injectors**. When the component gets destroyed, so is the query (precisely: unsubscribed).

But what happens to a Query Key, along with is data, if there are no components which need that data (no active subscribers)?

### Query States


## Revalidation

Before we mentioned that *the engine* decides when, how and whether to refetch the data. Let's focus on when should the cached data get refetched.

In an **imperative** approach, the developer would just make the call, that's it. However, since Angular Query claims to be **declarative** ([IoC](https://en.wikipedia.org/wiki/Inversion_of_control)), this is:
1. handled by *the engine*, and
2. done under certain circumstances

So what would be the **reason to refetch the data**? Two main reasons are:
- **stale time** passed
- data has been changed (**mutations**)

Angular Query introduces:
- **Stale Time**: time after the cached data should be refetched (pessimistically, once we've loaded the data, it could have already changed on the server; we assume data to be "*fresh*" for some short time)
- **Cache Time**: time after the cached data **gets entirely removed** (it's so old that it's better to have it removed)

[Stale While Revalidate](https://web.dev/articles/stale-while-revalidate?hl=en) technique

## Mutations

If we bring all query-related concepts altogether and treat it as one big query concept, then Angular Query will has only one more new concept: a **Mutation**.

When considering typical CRUD operations, following is a proper match:
- READ - **queries**
- CREATE, UPDATE and DELETE - **mutations**

A Mutation, an **imperative** concept, is a wrapper over modifying server data. Apart from sending the request to the server, it provides functionalities for UI state management, handling optimistic updates, and retrying failed mutations. But first and foremost, **a mutation is often bound to certain query keys in order to invalidate them**.

Let's revisit our Query Keys hierarchy:
- `GET /posts` - `["posts", "list"]`
- `GET /posts?page=1` - `["posts", "list", { page: 1 }]`
- `GET /posts/123` - `["posts", "detail", 123]`
- `GET /posts/456` - `["posts", "detail", 456]`

If the user removes Post id:123 (`HTTP DELETE /posts/123`), then following keys will be affected:
- `["posts", "detail", 123]` - obviously
- `["posts", "list"]`, `["posts", "list", { page: 1 }]` (potentially) - as they might include the deleted item (note: whether we invalidate optimistically, pessimistically, or we make a check - that's a story for another post)

Following code illustrates usage of mutations:

```ts
export class PostComponent {
  #queryClient = injectQueryClient()
  mutation = injectMutation(() => ({
    mutationFn: () =>
      lastValueFrom(
        this.http.delete<Response>(`https://jsonplaceholder.typicode.com/posts/${id}`),
      ),
      onSuccess: () => {
        this.#queryClient.invalidateQueries({
          queryKey: ['posts', id, 'comments']
        })
      },
  }))

  //...
}
```

## Summary

We've learned the concepts of Queries and Mutations, their responsibilities, and how one affects the lifecycle of another.

The biggest strength of Angular Query (and [other Query-family adapters of Tanstack Query](https://tanstack.com/query/latest)) is the little amount of code required to implement synchronization of server state with client applications. Of course, including lots of features most applications need anyway, as well as handling various edge cases. There's still a lot to discuss about the features, the edge cases, and good practices.

Let me know if you appreciated this post either in comments or on [twitter/X](https://twitter.com/tomasz_ducin).