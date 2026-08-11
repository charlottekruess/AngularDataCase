# AngularDataCase Solution

A small Angular 19 + ASP.NET Core (.NET 9) app where a user picks **one dataset, one
grouping, and one or more analytics**. Pressing the calculate button retrieves the calculation result for the given selection and displays the calculated results per node in a table, showing only the node names (no IDs), and only for nodes where at least one analytic could be calculated.

## Approach

 To address each user requirement, I made the following choices:

- **One dataset, one grouping, ≥1 analytic** → **toggle buttons** (Angular Material), so
  every option and current selection is clearly visible, using single-select for dataset
  and grouping, multi-select for analytics, with validation requiring at least one analytic
- **Show names only, not IDs** → the API works in IDs, so I fetch the grouping's node names and join them onto the calculation results by ID, using a Map data structure,
  showing only `displayName`
- **Only nodes with ≥1 result** → the result table is built from the union of node IDs returned
  by any selected analytic, so nodes with no result never appear. No need for a separate filter step
- **Calculation latency** → Fetching node names + one `Calculate` per analytic all run in parallel
  (using the RxJS operator `forkJoin`), so the wait is the slowest single call, not the sum. While waiting for the results/Until the data is returned/available for display, the 
  user sees a spinner as loading indicator, and an empty table if an error occurred 

## Folder Structure

```
src/app/
  components/   presentational ("dumb") components
  services/     data access + orchestration
  models/       typed interfaces
```

### Components
- **Smart vs. dumb separation:** `AppComponent` is the smart container (owns the reactive form, orchestrates service calls and 'dumb' components). The selectors / toggle / results 
  table components are 
  presentational, meaning inputs & outputs
  only, no API logic
- **Reusable `SelectToggleComponent`** implements `ControlValueAccessor`, so it is linked to a
  reactive form via `formControlName`. One component handles both single- and multi-select (using
  `[multiple]` input), The inner control could be swapped for `mat-select` later behind the
  same API.
- **Standalone components** (current Angular convention)
- **Signals + RxJS:** HTTP stays as Observables (needed for `forkJoin`). View state is exposed
  as signals (bridging with `toSignal`), keeping the component declarative

### Services
- **`DataService`**: pure typed wrapper over the 5 endpoints. Caches the static lookups with
  `shareReplay`
- **`CalculationService`**: orchestrates the parallel requests, merges the results, and exposes
  `loading` / `error` / `rows` as signals, so the component just consumes them
- This makes `CalculationService` a small state service/provider. In a larger app I would use stateless services returning Observables and so that components handle 
  subscription/state for
  reusability. For this small app, the stateful service allows keeping the component simple. The service is a singleton with `providedIn: 'root'`, so the state is shared which 
  fits this single view app

## Out of scope (as per the requirements)
- **No routing / deep links**: nothing needs shareable URLs, selection is handled by form state.
- **No polling / websockets**: No fetch on demand, no live refresh needed
- **No client-side filtering**: `Calculate` already returns only calculable nodes, and the
  table is built from that union, so no need for extra filter

## Considerations for later / if I had more time
- Table sorting / filtering / pagination
- Implement accessibility standards (ARIA, screen-reader testing)
- More tests (component + an integration test of the calculate flow)
- Progressive loading: fill the table per analytic as each `Calculate` resolves, instead
  of waiting for all
- Replace hard-coded text in templates with constants
- Styling improvements
- Dynamic reactive forms (use re-usable typed `SelectorItem` to build form sections based on data, see feature branch `dynamic-form`)


## Running it

**Backend** (.NET 9):
```bash
cd AngularDataCase.Server
dotnet run --launch-profile http        # API on http://localhost:5001
```

**Frontend** (Angular 19):
```bash
cd angulardatacase.client
npm install
npm start                                # app on https://localhost:59734
```
The Angular dev server proxies `/api/*` to the backend.
