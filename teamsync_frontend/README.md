# TeamSync Frontend (Next.js)

## Overview
TeamSync is an MVP frontend that helps HR managers, small business owners, and team leads discover personalized team‑building activities based on team personality, size, and work mode. The app covers onboarding, a five‑question team personality quiz, mock activity recommendations, and a simple dashboard. It uses a modern “Ocean Professional” theme with blue primary and amber accents, rounded surfaces, and subtle gradients and shadows for depth.

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm/bun)

### Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 to view the app.

### Build for production
```bash
npm run build
npm run start
```

## Available Routes

### “/” Home
Provides a hero card and quick overview of the application flow with links to onboarding and quiz.

Source:
- src/app/page.tsx

### “/onboard” Onboarding
Collects basic team context: team name, team size, and work mode (remote, hybrid, onsite). Completing onboarding updates global state, which downstream pages use for filtering and guarding.

Source:
- src/app/onboard/page.tsx
- src/components/onboarding/OnboardForm.tsx

### “/quiz” Team Personality Quiz
A five‑question, step‑by‑step quiz with progress and back/next navigation. User selections are stored in global state. Upon completion, the app computes a persona and moves to recommendations.

Source:
- src/app/quiz/page.tsx
- src/components/quiz/QuizCard.tsx
- src/components/quiz/QuizProgress.tsx
- src/lib/mock/questions.ts
- src/lib/utils/score.ts

### “/recommendations” Activity Recommendations
Generates mock recommendations based on persona and team context, with optional client‑side filters for duration, energy, and environment. Users can “save” activities to the dashboard. The page uses a lightweight routing guard and shows an inline notice if prerequisites are missing.

Source:
- src/app/recommendations/page.tsx
- src/components/recommendations/Filters.tsx
- src/components/recommendations/RecommendationCard.tsx
- src/lib/mock/recommendations.ts

### “/dashboard” Dashboard
Shows insights derived from persona and team context and lists saved items. Uses a guard that encourages completing onboarding.

Source:
- src/app/dashboard/page.tsx
- src/components/dashboard/Insights.tsx
- src/components/dashboard/SavedList.tsx

## Global State Model

The app uses a simple Context + useReducer store to keep the UI decoupled and testable. Selectors read from the state, and pages/components dispatch typed actions.

State shape (see src/state/types.ts and src/state/store.ts):

- onboarding
  - teamName: string
  - teamSize: number | null
  - workMode: "remote" | "hybrid" | "onsite" | null
  - completed: boolean
- quiz
  - answers: Record<questionId, choiceId>
- result
  - persona: "Connector" | "Challenger" | "Explorer" | "Balancer" | null
  - confidence: number (0..1)
- recommendations
  - items: Recommendation[]
  - savedIds: string[]

Common actions:
- onboarding/setTeamName, onboarding/setTeamSize, onboarding/setWorkMode, onboarding/complete
- quiz/setAnswer, quiz/setAnswers
- result/setPersona
- recs/setItems, recs/toggleSaved, recs/setSaved
- saved/add: convenience wrapper that maps to recs/toggleSaved

Selectors (src/state/selectors.ts) provide small, pure helpers such as:
- selectOnboarding, selectQuizAnswers, selectPersona
- selectRecommendations, selectSavedRecommendationIds, selectSavedRecommendations
- selectContextualRecommendations
- selectHasOnboarded, selectHasCompletedQuiz
- selectTeam, selectTeamStats

Provider and hooks:
- AppProvider wraps the app in src/app/layout.tsx
- useAppState, useAppSelector, useAppDispatch

## Mock Data Behavior

### Quiz Questions
The app serves five mock questions with weighted choices. Weights contribute to computing a persona. Questions are loaded via getMockQuestions().

Source:
- src/lib/mock/questions.ts

### Recommendation Generator
generateRecommendations(persona, teamSize, workMode) returns a list of mock items tailored to persona fit, team size constraints, and supported work modes. Items include extra UI fields for filters (duration, energyLevel, environment). A simple scoring heuristic ranks results and is capped between 0 and 100.

Source:
- src/lib/mock/recommendations.ts

## UI Theme Tokens: “Ocean Professional”

Design tokens are defined in CSS layers with Tailwind, providing consistent colors, radii, shadows, and components.

Key tokens (src/app/globals.css):
- Colors
  - --ts-color-primary: #2563EB (blue)
  - --ts-color-secondary: #F59E0B (amber)
  - --ts-color-error: #EF4444 (red)
  - --ts-color-bg: #f9fafb (background)
  - --ts-color-surface: #ffffff (surface)
  - --ts-color-text: #111827 (text)
- Radii
  - --ts-radius, --ts-radius-xl, --ts-radius-2xl for rounded cards and buttons
- Shadows
  - --ts-shadow, --ts-shadow-lg for depth
- Utility classes
  - .ts-card, .ts-card-hover, .ts-heading, .ts-subtle
  - .ts-btn, .ts-btn-primary, .ts-btn-ghost
  - .ts-badge, .ts-badge-info
  - .ts-input, .ts-select
  - .ts-progress, .ts-progress-bar

The app also defines an accessible baseline focus-visible ring and a subtle fade-in animation for polished interactions.

## Routing Guards and Empty States

### Client Guards
Pages can indicate requirements for onboarding or quiz completion using a small client guard hook. The hook provides:
- guardSatisfied: boolean flag to optionally dim content when prerequisites are missing
- guardNotice: inline alert JSX with contextual copy and actions linking to /onboard and/or /quiz

Usage examples:
- Recommendations: requireOnboard = true, requireQuiz = true
- Dashboard: requireOnboard = true, requireQuiz = false

Source:
- src/middleware/clientGuards.tsx

### Empty States
Recommendations page displays a friendly empty state when no items match the current filters. It encourages resetting filters or navigating to the dashboard.

Source:
- src/app/recommendations/page.tsx

## Project Structure

High‑level layout:
- src/app
  - layout.tsx: global layout, NavBar, AppProvider
  - globals.css: tokens and component styles for Ocean Professional
  - page.tsx: home route
  - onboard/page.tsx, quiz/page.tsx, recommendations/page.tsx, dashboard/page.tsx
  - not-found.tsx: 404 handling
- src/components
  - ui/: Button, Card, Badge, Input, Select, Progress primitives
  - onboarding/: OnboardForm
  - quiz/: QuizCard, QuizProgress
  - recommendations/: Filters, RecommendationCard
  - dashboard/: Insights, SavedList
  - Container.tsx, NavBar.tsx shared layout components
- src/state
  - store.ts: AppProvider, reducer, typed dispatch/action wrappers
  - selectors.ts: pure selector helpers
  - types.ts: shared types (AppState, actions, domain models)
- src/lib
  - mock/: questions.ts (quiz), recommendations.ts (generator)
  - utils/: score.ts (persona scoring)
- src/middleware
  - clientGuards.tsx: small client-side routing guard hook with inline alert

## Notes and Tips
- The app runs without a backend; quiz data and recommendations are mocks and all state lives in memory.
- Persona calculation uses answer weights; confidence is a simple ratio produced by the scoring util.
- Saved items appear in the dashboard; the app keeps savedIds in sync with loaded items.
- Theme tokens can be extended in globals.css to add more intents or variants if needed.

## License
This project is for demonstration purposes as part of the TeamSync MVP and may include third-party dependencies with their own licenses.
