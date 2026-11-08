# Assignment 7 - Online Shop (React)

This is a small online shop I built with React, react-router, Context with useReducer, and Zustand. The products come from the DummyJSON API. You can browse and filter products, open a detail page, add items to a cart, and sign in to see the cart. The cart and the theme are remembered between visits.

## File Organization

```
src/
  api/         productsApi.js, authApi.js (plain fetch functions, no React)
  hooks/       useFetch.js, useLocalStorage.js
  context/     AuthContext.jsx (signed-in user, useReducer)
  store/       cartStore.js (Zustand cart store)
  components/  Layout, NavBar, ProductCard, ProtectedRoute
  pages/       Home, ProductList, ProductDetail, Cart, Login, NotFound
  App.jsx      the routes
  main.jsx     entry point (BrowserRouter and AuthProvider)
```

## Reasoning Questions

### 1. State choices

- **Signed-in user:** it lives in Context with `useReducer` (`AuthContext`). It rarely changes, but several far-apart components need it (the NavBar, ProtectedRoute and Login).
- **Cart:** it lives in a Zustand store. It changes all the time and many components read it, so I wanted each component to subscribe only to the part it needs.
- **Filter values:** they live in the URL query string. This way a filtered page survives a refresh and can be shared as a link.
- **Product list:** it lives inside `useFetch`, which uses a reducer local to the page. It is server data that only the page that loads it needs.
- **Theme:** it is saved with `useLocalStorage` in the `Layout` component, so it is still there after a reload.

### 2. Context versus store

With Context, every component that reads the context re-renders whenever the value changes. The user changes only on login and logout, so that cost is tiny. The cart changes on every click, so if it were in Context, everything reading it would re-render each time. With Zustand, a component picks a selector. For example, the NavBar only selects the item count, so it re-renders only when that number changes. If I swapped them, the cart would cause lots of extra re-renders. The user in Zustand would work, but I would lose the Provider and the `useAuth` error when it is used outside the provider.

### 3. Custom hooks

`useFetch` shares the logic: the reducer with loading, error and data, the AbortController, and the cleanup that cancels the request. It does not share any state. Each component that calls the hook gets its own `useReducer`, so ProductList and ProductDetail have separate loading and data. Calling the same hook in two places does not make them share anything.

### 4. Route parameters

The `id` from `useParams` is always a string, even when the URL is `/products/3`. It mattered in ProductDetail for the "Next product" link. If I wrote `id + 1`, I would get `"31"` instead of `4`, so I use `Number(id) + 1`.

### 5. Protected routes

Client-side protection is a user-experience feature, not security. `ProtectedRoute` only decides what the browser shows. All the code runs on the user's machine, so anyone can read or change it with the dev tools, and the data is not really protected. To make it secure, the server has to authenticate the user (with sessions or tokens) and check permissions on every request for protected data.

### 6. Deep links

On a plain static file server there is no real file for `/products/3`, so reloading that URL gives a 404. The Vite dev server falls back to `index.html` for unknown paths, and then react-router reads the URL and shows the right page. To deploy it, the server needs a rule that returns `index.html` for all routes.

## Self-Study Notes

- **Changing one query parameter:** I copy the current params with `new URLSearchParams(searchParams)`, then `set` or `delete` only the key I want, and call `setSearchParams(next, { replace: true })`. This keeps the search text when the category changes. I used `replace` so every keystroke does not add a new history entry.
- **Loading the cart safely:** reading `localStorage` is inside `try/catch`, and I check that the parsed value is an array. If it is missing or corrupted, the cart starts empty instead of crashing.
- **Saving the cart outside React:** I used `useCartStore.subscribe`, which runs whenever the store changes, and it writes `items` to `localStorage` only when `items` actually changed.
- **Light/dark theme:** I put a `light` or `dark` class on the wrapper div. CSS custom properties like `--bg` and `--text` get different values under each class, so the whole page changes without touching every component.

## Challenges

- **Git setup:** My local branch was called `master` after `git init`, and I had to rename it to `main` before the first push. I also opened my old assignment 1 repository on GitHub by mistake, and that browser tab was not signed in, so I had to sign in and create a separate repository for this assignment.
- **The dev server blocking the terminal:** I tried to run git commands in the same terminal where `npm run dev` was running, and nothing happened. I learned to stop the server with Ctrl + C before committing, or open a second terminal.
- **Unsaved files:** Some edits (for example in `main.jsx` and `App.jsx`) were not applied or not included in a commit because the file was not saved. I now check for the white dot on the editor tab and use Save All before testing and committing.
- **Understanding the login redirect:** After logging in, the app sent me to the home page and I thought it was a bug. It happened because I opened the login page directly, so there was no saved page to go back to. When I clicked Cart first and was redirected to the login page, it returned me to the cart correctly.
- **Small terminal problems:** My keyboard was on Arabic and typed a stray character in the terminal, and `git show` opened a pager that I had to leave by pressing `q`.