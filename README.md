# Currency Converter — Study Notes

Purpose  
Short, beginner-friendly notes explaining the API, custom hook, React components, optimization ideas, and Tailwind usage used in this project.

## Project overview
This app fetches currency rates from a public JSON CDN and provides a simple UI to convert amounts between currencies. Key parts:
- Public currency API
- Custom hook to fetch rates
- Small reusable InputBox component
- App-level state for amount, from/to currencies, conversion
- Responsive UI styled with Tailwind

## API used
- Source: @fawazahmed0 currency-api via jsDelivr CDN  
- Example endpoint:
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{base}.json`  
- Response shape (simplified):
  {
    "usd": { "eur": 0.92, "inr": 82.7, ... },
    ...
  }
- Study points:
  - Each response contains rates keyed by currency code.
  - No API key required for this public JSON snapshot.
  - Consider caching or rate-limiting client requests.

## Custom hook: useCurrencyInfo
- Purpose: encapsulate fetching currency rates for a chosen base currency.
- What the hook does in this project:
  - Calls fetch in useEffect when base currency changes.
  - Stores rates in state and returns them (object of rates).
- How to use:
  ```js
  const rates = useCurrencyInfo('usd') // rates['inr'] gives USD→INR rate
  ```
- Improvements to learn:
  - Add loading and error state.
  - Use AbortController to cancel in-flight fetches.
  - Cache previous responses (in-memory) to avoid repeated network calls.

## React components (brief)
- App.jsx
  - Manages state: amount (string), from, to, convertedAmount.
  - Handles swap, convert, and quick-select pairs.
  - Renders layout (about + converter), responsive behavior, and creator contact.
- components/InputBox.jsx
  - Props: label, amount, onAmountChange, onCurrencyChange, currencyOptions, selectCurrency, amountDisabled, currencyDisabled, className
  - Handles numeric input and currency select.
  - Study: make InputBox pure (React.memo) to avoid rerenders when unrelated state updates.

## Optimization techniques (what to learn and apply)
- Memoization
  - useMemo for derived values (e.g., options = Object.keys(rates)).
  - React.memo for pure presentational components.
- Stable callbacks
  - useCallback for handlers passed to children to prevent re-creation on every render.
- Network
  - Debounce expensive operations (if live-converting on input).
  - Cache API responses to reduce network calls (simple object cache or IndexedDB).
  - Use AbortController to cancel stale fetches when base currency changes quickly.
- Rendering
  - Keep state minimal and colocate it where needed.
  - Avoid setting state redundantly (e.g., don’t set same value twice).
- Accessibility/performance
  - Use semantic elements and labels (InputBox already uses htmlFor).
  - Avoid uncontrolled long lists in selects; provide quick-select shortcuts.

## Tailwind usage (what to notice)
- Utility classes to create layout and styling quickly:
  - Layout: `flex`, `flex-col`, `md:flex-row`, `justify-center`, `items-center`
  - Sizing: `w-full`, `md:w-1/2`, `max-w-md`, `min-h-screen`
  - Spacing: `p-4`, `p-8`, `mb-4`
  - Visual effects: `bg-white/20` (transparency), `backdrop-blur-sm` (glass effect), `rounded-lg`, `border`
  - Responsive prefixes: `md:` to change behavior on larger screens
- Study tips:
  - Inspect classes in the component and try adjusting one at a time.
  - Learn to build responsive layouts with `flex` + `w-full md:w-1/2`.

## Small code examples / reminders
- Convert safely (handle empty input):
  ```js
  const converted = amount ? Number(amount) * rates[to] : 0
  ```
- Memoize options:
  ```js
  const options = useMemo(() => Object.keys(rates || {}), [rates])
  ```
- Basic hook pattern (improve this with loading/error):
  ```js
  function useCurrencyInfo(base) {
    const [data, setData] = useState({})
    useEffect(() => {
      fetch(...).then(r=>r.json()).then(j=>setData(j[base]||{}))
    }, [base])
    return data
  }
  ```

## Next steps for learning
- Add loading and error UI in the hook.
- Implement caching for API responses.
- Add unit tests for the custom hook and components.
- Improve UX: store last-used currencies in localStorage, format numbers, copy/share results.
- Explore production concerns: bundling, environment variables, and rate limits.

## References
- Tailwind docs: https://tailwindcss.com/docs
- React hooks: https://reactjs.org/docs/hooks-intro.html
- Fetch and AbortController MDN docs
- @fawazahmed0 currency-api repo / jsDelivr CDN docs

---
These notes are designed for quick study and practical extension. Use them as a checklist while refactoring or improving the app.
