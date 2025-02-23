# Guide to Tanstack Router

This post is intended for front-end developers, especially those using React.

If you are comfortable with tools like `react-router` or `remix`, that's great! If not - that's great too, you'll learn a lot - but maybe have a coffee first :)

## What is Tanstack Router?

TanStack Router is another (among many) tool created by a group of developers under the brand [TanStack](https://tanstack.com/) ([Tanner Linsley](https://x.com/tannerlinsley), [Christopher Horobin](https://x.com/c_horobin), [Manuel Schiller](https://x.com/schanuelmiller) and others). The new Router provides significant improvements in the following areas:
- type safety
- data caching
- logical binding of dependencies (data) needed to render paths
- fancy devtools enabling lightning-fast debugging and orientation in the path hierarchy
and many, many more.

Type safety alone is reason enough to be interested in TanStack Router.

## Type-safety

Let's start with what "problems" remain unsolved using existing frontend routers. Let's take [`react-router`](https://reactrouter.com/) as an example:

```tsx
import React from 'react'
import { useParams, NavLink } from 'react-router'

// let's assume that this function retrieves data from an external. sources
function fetchStuff(id: string){
  //...
}

// component needs to use routing
function MyComponent(){
  //...
}
```

(see full code in [typescript playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wChRJY4BvOAVwGckAFFKFEBgGjgDkUAbgBlgAOwDWcAL5xsuAkXQwAtDjowkUMqUx1RGYBFGykMNAAsAyjDqZMACmAATAFxwGMKGIDmASmpSpDp6BkZwALIAngDCuJCiSKIw9v5BcHBoRh5wYGwcDHAAvPRMrOycKaTpueUMAHTOaRlZ8LRI4AA2EJFISACSTtJFJSx5nAA8bZ3dvQNuHl6i3tIAfJXpmKYW1rYO7WBdPf1OAIS+TcCYcPYn+4ezTqnp6TDmOADucAmfAKJQOFB7PgAJoQOhwbwQGAwFA5dRwV4oeCZcBGRLwPROTRwAD0KAARmgcS5nHA1BoTpSAIz4c7pQIbLZWGx2ex3GbHc5VXE47lEGxQYzjfjCMSSGAQQoAIhx73MSOUwAYyleSqlKzgcqRcCVCPMSoA-CdxjiRSIJCtSFIgA))

### Problem 1: path parameters are optional

When using the `useParams` hook without explicitly providing type parameters, path parameters are (unfortunately) optional.

```tsx
function MyComponent(){
  const params = useParams()
  params.id // string | undefined
}
```

What's the problem? If we don't want to screw TypeScript, we'll have to take care of it ourselves. Or we can force the compiler to assume that the value exists (is not `undefined`) via `!`:

```tsx
  const { employeeId } = useParams<{ employeeId: string }>()
  // employeeId: string | undefined
  fetchStuff(employeeId!) // string
```

or we'll go for explicit error throwing, like: "*this component requires this specific path parameter, so it should never be displayed outside the expected path*". The following code works like a [TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions). conditional error throwing "kills" code paths that we consider to be erroneous (path `string` continues to work, path `undefined` "dies" on `throw Error`):

```tsx
  // employeeId: string | undefined
  if (!employeeId){
    throw new Error('You gotta put that component under /abc/:id route!!!1')
  }
  // employeeId: string
  fetchStuff(employeeId)
```

On one hand, the solution does the job. On the other hand - it will start to swarm in the code of various components. But above all - it should not be our responsibility to ensure type safety, which could be ensured automatically.

### Problem 2: no gaurantee that a path exists at all

Finally, using routing, e.g. to create links, is also not checked in any way:

```tsx
function MyComponent(){
// ...
return <NavLink to="/what-is-this"> what is this?!</NavLink>
}
```

The target address is just some string, no one looks into it. It seems like no big deal. But why should we bother with typos, if - again - it could be checked automatically.

Exactly - could it be?

## Type safety in Tanstack Router

Yes, it could 🙂 and it is!

Key aspects:
- TanStack Router listens to folders and files (internal `routes`), closely monitors their content
- based on them, it automatically regenerates its "private" file `src/routeTree.gen.ts` which contains type definitions for each path separately (!) types
- using functions such as *redirect*, *navigate*, *link* etc. is verified for type correctness, in relation to the content of `src/routeTree.gen.ts`

Simple? Simple. You just need to have a working automaton. And here we have it 😉.

### Internal `routes` file structure

Example structure of an application based on tw. File-based Routing (which is all we're concerned with in this article) looks like this:

```
...
src/
  ...
  main.tsx
  routes/
    __root.tsx
    index.tsx
    contact.tsx
    employees.tsx
    employees/
      $employeesId.tsx
      // ...
    // ...
```

Files:
- `main.tsx` - starts the application
- `routes/__root.tsx` - root-path, always displayed. Contains `<Outlet />`
- `routes/index.tsx` - responsible for the static path `/`
- `routes/contact.tsx` - responsible for the static path `/contact`
- `routes/employees.tsx` - responsible for the static path `/employees`, e.g. a listing of some objects. Since it is supposed to have nested paths (`/employees/$employeeId`) it should also contain a nested `<Outlet />`
- `routes/employees/$employeesId.tsx` - is responsible for the **dynamic** path `/employees/$employeeId`.

Content monitoring consists of, among other things, that when we create a new `routes/projects.tsx` file:

1. it will be automatically filled with the path definition:
    ```tsx
    import { createFileRoute } from '@tanstack/react-router'

    export const Route = createFileRoute('/projects')({
      component: RouteComponent,
    })

    function RouteComponent() {
      return <div>Hello "/project"!</div>
    }
    ```
2. the "private" file `src/routeTree.gen.ts` will be adequately updated with the new path entry

### File `src/routeTree.gen.ts`

The "privacy" of the `src/routeTree.gen.ts` file comes down to the fact that:
- it is clearly marked as an automatically managed file, not intended for manual editing:
  ```
  // This file was automatically generated by TanStack Router.
  // You should NOT make any changes in this file as it will be overwritten.
  // Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.
  ```
- the `@tanstack/router` package, when installing the setup, asks us about the IDE used. Depending on this, it adds IDE-specific files to the repository, which will mark `src/routeTree.gen.ts` as readonly. Problem solved - we won't overwrite it by mistake (unless someone tries really hard to do so - then best regards 😉)

This file is used by TypeScript as a regular TypeScript file. Therefore, it should be normally committed to the repotyrozium. The only difference is that we don't edit it ourselves.

The `src/routeTree.gen.ts` file aggregates not only the definitions of all paths (used by dedicated devtools, among others), but also all type definitions

Example file content (scroll down):

```tsx
// This file was automatically generated by TanStack Router.
// ...

// Import Routes
import { Route as rootRoute } from './routes/__root'
// ... lots of other imports

// Create/Update Routes

const ProjectsRoute = ProjectsImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesRoute = EmployeesImport.update({
  id: '/employees',
  path: '/employees',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesEmployeeIdIndexRoute = EmployeesEmployeeIdIndexImport.update({
  id: '/$employeeId/',
  path: '/$employeeId/',
  getParentRoute: () => EmployeesRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/employees': {
      id: '/employees'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof EmployeesImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      id: '/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsImport
      parentRoute: typeof rootRoute
    }
    '/employees/$employeeId/': {
      id: '/employees/$employeeId/'
      path: '/$employeeId'
      fullPath: '/employees/$employeeId'
      preLoaderRoute: typeof EmployeesEmployeeIdIndexImport
      parentRoute: typeof EmployeesImport
    }
  }
}

// Create and export the route tree

interface EmployeesRouteChildren {
  EmployeesEmployeeIdIndexRoute: typeof EmployeesEmployeeIdIndexRoute
}

const EmployeesRouteChildren: EmployeesRouteChildren = {
  EmployeesEmployeeIdIndexRoute: EmployeesEmployeeIdIndexRoute,
}

const EmployeesRouteWithChildren = EmployeesRoute._addFileChildren(
  EmployeesRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/contact': typeof ContactRoute
  '/employees': typeof EmployeesRouteWithChildren
  '/projects': typeof ProjectsRoute
  '/employees/$employeeId': typeof EmployeesEmployeeIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/contact': typeof ContactRoute
  '/employees': typeof EmployeesRouteWithChildren
  '/projects': typeof ProjectsRoute
  '/employees/$employeeId': typeof EmployeesEmployeeIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/contact': typeof ContactRoute
  '/employees': typeof EmployeesRouteWithChildren
  '/projects': typeof ProjectsRoute
  '/employees/$employeeId/': typeof EmployeesEmployeeIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/contact'
    | '/employees'
    | '/projects'
    | '/employees/$employeeId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/contact' | '/employees' | '/projects' | '/employees/$employeeId'
  id:
    | '__root__'
    | '/'
    | '/contact'
    | '/employees'
    | '/projects'
    | '/employees/$employeeId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ContactRoute: typeof ContactRoute
  EmployeesRoute: typeof EmployeesRouteWithChildren
  ProjectsRoute: typeof ProjectsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContactRoute: ContactRoute,
  EmployeesRoute: EmployeesRouteWithChildren,
  ProjectsRoute: ProjectsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/contact",
        "/employees",
        "/projects"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/contact": {
      "filePath": "contact.tsx"
    },
    "/employees": {
      "filePath": "employees.tsx",
      "children": [
        "/employees/$employeeId/"
      ]
    },
    "/projects": {
      "filePath": "projects.tsx"
    },
    "/employees/$employeeId/": {
      "filePath": "employees/$employeeId/index.tsx",
      "parent": "/employees"
    }
  }
}
ROUTE_MANIFEST_END */
```

### Using navigate, redirect, link etc.

To create a `Link`, the `to` parameter must match the types defined in `src/routeTree.gen.ts`. **Accidental mistakes are eliminated**.

```tsx
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/employees/$employeeId"
      params={{ employeeId: 123 }}
    >
      Employee 124 details
    </Link>
  )
}
```

As we can see above, any dynamic path elements (e.g. `$employeeId`) are explicitly replaced with `params`. The internal definition of a dynamic path is simply `/employees/$employeeId`, so TypeScript is not burdened with "calculating" the correctness of [template literals](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) every time, which - from a compiler perspective - is not free.

## Additional improvements in TanStack Router

Among the most important improvements I would mention:

- devtools
- binding data loading to paths, resulting in slimming down components (reducing size/scope of responsibility)
- caching data for paths

### TanStackRouter Devtools

Devtools allow us to quickly analyze/view:
- what path was matched, including: what specific components of it
- what is the cache status (age, staleTime, gcTime)
- what is the path status (pending, fetching, active, inactive etc.)

[IMG]

### Binding data loading to paths

Let's start by taking a look: what problem are we solving?

Let's assume that our `Employees` component displays a list of employees (or anything else). First, however, it needs to load this data. There is a very often raised topic: state management, in this case: synchronization of the server state with the client (e.g. browser): should I use the (hated by some) combination of `useState` + `useEffect`? Or maybe `redux`? Or maybe a dedicated solution like `@tanstack/query` (formerly: react query)?

The question I would like us to ask ourselves first: do we have to burden the UI component with the responsibility for loading data? Answer: of course, "it depends":
1. Sometimes we want to have control over **what, when and how** is loaded and displayed in the component. Then the component can remain responsible for loading/synchronizing the state.

2. But there are also cases when the component **initially** needs to have this data to be able to display anything at all.

In the latter case, linking data loading with routing management is very convenient. It looks like this:

```tsx
export const Route = createFileRoute('/employees')({
  component: EmployeesComponent, // below
  loader: () => getEmployees(), // HTTP/promise/async function
})

function EmployeesComponent() {
  const employees = Route.useLoaderData();

  return (
    <div className="p-2">
      <ul>
        {employees.map(employee => (
          {/* display the list */}
        ))}
      </ul>
    </div>
  )
}
```

Step by step:
1. Path declaration contains `loader`:
    ```tsx
    loader: () => getEmployees()
    ```
It specifies the data that is "expected" by the component
2. Using the data comes down to "taking out" the data via `Route.useLoaderData()`. Everything is type-safe, you will most often want to use type inference, as long as the type returned from the `getEmployees` function is precisely defined
3. Basically, `EmployeesComponent` will be displayed only when the data is available
4. However, there are a lot of different options/flags configuring this behavior, including:
   - what to display in case of an error
   - what to display in case of a long wait for data loading
   - how exactly to define a "long" wait (`staleTime`, `gcTime`)
   - how long the data should be cached (separate `staleTime` and `gcTime`)
   - it may be worth loading the data beforehand (*preloading*)
   and many, many more
5. It is also possible to combine routing support with stateful tools, e.g. `@tanstack/query` (which I may discuss in another article)

### Data caching for paths

TanStack Router caches not so much the hierarchy FiberNodes (colloquially called "component content" or JSX), as the data that a given path requires. That is, the results returned by `loaders`.

It is important to remember that **data caching is within the path**. This is completely different than, for example, in `@tanstack/query`, where the foundation of caching (and the key to understanding this tool) are keys (*query keys*).

In Tanstack Query, **query keys are hierarchical**, allowing for convenient and intuitive pattern matching: matching the entire range of keys for update/delete/update/invalidation/etc. It is a completely correct situation when components have their own hierarchy, and query has its own. And one hierarchy is loosely (!!!) connected to the other, providing flexibility and easy changes in the future.

In TanStack Router, the situation is different: **data caching is within a specified path**. In other words, if a given HTTP function is used in multipath loaders - it will be launched for each of them separately. Here, the hierarchy is determined by the paths themselves. This of course has its pros and cons: on the one hand, it simplifies the matter and unifies caching issues. On the other - it limits flexibility. It is also possible to integrate with tools dedicated to state management (as I mentioned, I may devote a separate article to this).

[IMG, devtools]

## Summary

While the issues related to routing have been the same for years, the approach to solving these problems is already different. TanStack Router moves away from loose, unrelated *utilities* - in favor of a separate "layer". The new Router not only ensures type safety (which solves actual problems with path mismatches due to random errors), but also allows for slimming down components by attaching them to specific paths. This allows for rapid implementation of:
- loading data per path
- caching data per path
- managing the cache
for such components, where the handling of the above would be very, very similar. When a component needs loaded data to make sense of displaying anything, TanStack Router seems to be the optimal solution.

Personally, I see the future in the connection (cooperation) of TanStack Router and TanStack Query class tools.
