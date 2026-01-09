# Loot Vault | Premium Digital Game Keys E-commerce

**Loot Vault** is a high-performance, full-stack E-commerce platform dedicated to digital game distribution. Built with **React 19** and **Supabase**, it features a secure payment flow via **Stripe and Supabase Edge Functions**, real-time stock verification, and an advanced filtering system.

### 🔴Live demo:

[![Deploy with Vercel](https://vercel.com/button)](https://loot-vault-store.vercel.app/)

![homepage](/public/og-image.jpg.png)

---

## Technical Stack

| Category          | Technology                                           |
| ----------------- | ---------------------------------------------------- |
| **Frontend**      | React 19, Redux Toolkit (State), Tailwind CSS v4     |
| **Data Fetching** | Tanstack React Query v5                              |
| **Backend/BaaS**  | Supabase (PostgreSQL, Auth, Storage, Edge Functions) |
| **Payments**      | Stripe API (Server-side via Deno/Edge Functions)     |
| **SEO & Meta**    | Native React 19 Metadata & React Helmet Async        |
| **Routing**       | React Router 7                                       |

---

## Key Engineering Challenges & Solutions

### 1. Secure Payment & Fulfillment Pipeline

**Problem:** Direct frontend-to-database order creation is insecure.
**Solution:** Implemented a robust **Stripe Webhook** system using Supabase Edge Functions. When a user initiates checkout, the app invokes a server-side "swift-processor" to create a Stripe Session. Fulfillment (key generation and database insertion) only occurs when the server validates the `checkout.session.completed` event from Stripe, preventing unauthorized key access.

### 2. Handling "Race Conditions" in Redirects

**Problem:** Stripe redirects users to the `OrderSuccessPage` faster than the Webhook can write to the database.
**Solution:** Optimized **Tanstack React Query** with a `retry` and `retryDelay` strategy. If the order isn't found immediately, the app gracefully polls the database for a few seconds before falling back to a "Verification Pending" state, ensuring a seamless user experience.

### 3. Guest Checkout & Database Integrity

**Problem:** Orders must support both registered users and anonymous guests while maintaining relational integrity.
**Solution:** Configured the `user_id` column in PostgreSQL as **Nullable** while maintaining a Foreign Key to `auth.users`. Integrated logic in the Edge Function to sanitize `user_id` metadata (converting "null" strings to actual SQL NULLs), allowing guests to track orders via unique Stripe Session IDs.

### 4. High-Performance Search & Filtering

**Problem:** Expensive database queries on every keystroke or filter change.
**Solution:** Implemented a custom **Debouncing Hook** for the search bar (500ms delay) to minimize API calls. Leveraged Supabase's `.contains()` and `.ilike()` filters combined with React Query's `keepPreviousData` to ensure UI remains responsive during background refetches.

---

## Architecture

The project follows a **Feature-Based Folder Structure**, promoting high modularity and extreme maintainability:

- **`/Features`**: Domain-specific logic (Auth, Cart, Orders, Products). Each feature is encapsulated with its own hooks, components, and Redux slices.
- **`/services`**: A clean API layer utilizing the **Repository Pattern**. It abstracts all Supabase and Stripe integration details from the UI, ensuring the components remain "pure" and decoupled from the backend implementation.
- **`/ui` (Advanced Compound Component Pattern)**: Instead of rigid, prop-heavy components, I implemented the **Compound Component Pattern** to create a declarative and flexible UI API.
- **Context-Driven UI**: Components like `Accordion`, `Select`, `FullBanner`, and `GamesGrid` use the **Context API** for internal state management, allowing for clean sub-component syntax (e.g., `<Select.Content />`).
- **Utility-First Styling**: Usage of a custom `cn` utility (combining `clsx` and `tailwind-merge`) to handle complex class merges and conditional styles without CSS conflicts.

- **`/hooks`**: Global utility hooks for side-effect management, including `useMediaQuery` for responsive logic, `useDebounce` for search optimization, and `useKeyDown` for enhanced accessibility (a11y).
- **Performance Optimization**: Extensive use of **React Lazy Loading** and `Suspense` for route-based code splitting to ensure minimal initial bundle size.

---

## Key Features

- **Real-time Stock Check**: Validates stock status via `addItemWithStockCheck` thunk before allowing items into the cart.
- **Digital Key Management**: Securely generates and stores 15-character license keys (e.g., `ABCDE-12345-FGHIJ`) upon purchase.
- **User Profiles**: Full CRUD for user data, including **Avatar uploads** to Supabase Storage.
- **Dynamic SEO**: Automated meta-tag generation for every game product to enhance social media sharing (Open Graph).

---
