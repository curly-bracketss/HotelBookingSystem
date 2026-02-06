# Hotel Booking System

A React + Vite single-page app for planning a multi-day hotel stay with board-type meal rules, daily selections, and transparent pricing.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Technology Choices and Justifications

- **React**: Component-based UI with clean state handling for form-driven workflows.
- **Vite**: Fast dev server and build pipeline with minimal configuration.
- **Plain CSS**: Lightweight styling without extra runtime libraries.

## Architecture Decisions

- **Single-page flow** in `src/App.jsx`: keeps the journey linear (configure → daily plan → summary).
- **Component separation**:
  - `src/components/Form.jsx`: trip setup inputs.
  - `src/components/Table.jsx`: per-day hotel + meal configuration.
  - `src/components/Summary.jsx`: summary + pricing breakdown.
  - `src/components/Navbar.jsx`: navigation UI.
- **Shared data + helpers** in `service/Data.jsx`:
  - Static datasets (destinations, hotels, meals).
  - Utility functions (date generation, pricing, rule enforcement).

This keeps core business logic reusable while `App.jsx` focuses on orchestration.

## Known Limitations / Future Improvements

- **Navbar links are placeholders**: the navigation items don’t open real pages yet.
- **Services are static**: the sidebar services are UI only and not connected to live data.
- **Single-page flow**: only the hotel booking flow is implemented right now.
