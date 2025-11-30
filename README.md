# All Type Calculator

A collection of calculators in a single React + Vite web app. Basic, scientific, health, financial, converters and more — each calculator lives in its own folder, is registered in a central registry, and gets its own route automatically.

## Features

- **9 ready-to-use calculators** across 6 categories:
  - Basic and Scientific calculators
  - BMI (health) calculator
  - Age (date & time) calculator
  - Unit Converter (length, weight, temperature)
  - Financial calculators (percentage, tip, EMI)
  - Average & Stats (math)
- Central calculator registry — add a new calculator in minutes
- Dark "cosmic" theme with per-category accent colors, glass cards and smooth motion
- Fully responsive, no UI library required
- Client-side routing with React Router

## Tech Stack

- **React** 19
- **Vite** 8
- **react-router-dom** 7
- **react-icons** 5
- **oxlint** (linting)

## Project Structure

```text
public/                 static assets (favicon)
src/
├─ calculators/         one folder per category, one file per calculator
│  ├─ basic/            BasicCalculator, ScientificCalculator
│  ├─ datetime/         AgeCalculator
│  ├─ converters/       UnitConverter
│  ├─ financial/        PercentageCalculator, TipCalculator, EmiCalculator
│  ├─ health/           BmiCalculator
│  └─ math/             AverageCalculator
├─ components/          shared UI — NumberField, ResultCard, ResultRow, CalculatorShell, Layout
├─ data/calculators.jsx central registry: id, name, category, icon, component
├─ pages/               Home page and the /calculator/:id route
├─ utils/format.js      number and currency formatting helpers
├─ App.jsx              routes
├─ index.css            theme, layout and component styles
└─ main.jsx             app entry point
```

Every calculator is a small React component: it keeps its inputs in
`useState`, derives the result during render and shows it in a `ResultCard`,
so no calculator contains its own layout or routing code.

## Screenshots

_Add screenshots here, e.g.:_

```
screenshots/home.png
screenshots/calculator.png
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yeswanthreddy-hub/All_Type_Of_Calculator.git
cd All_Type_Of_Calculator

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open the URL printed in the terminal (http://localhost:5173 by default).

### Useful commands

```bash
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build locally
npm run lint     # lint with oxlint
```

## Adding a New Calculator

1. Create a component in `src/calculators/<category>/`, e.g. `src/calculators/financial/InterestCalculator.jsx`.
2. Import it in `src/data/calculators.jsx` and add an entry:

   ```js
   {
     id: 'interest',
     name: 'Compound Interest',
     category: 'Financial',
     icon: FaCoins,
     description: 'Compound interest on a deposit.',
     component: InterestCalculator,
   }
   ```

3. Done — it appears on the home page and is served at `/calculator/interest`.

## Deployment

The project is a Vercel-ready static Vite build with SPA rewrites configured in `vercel.json`, so deep links like `/calculator/emi` work on the deployed site.

- **Build command:** `npm run build`
- **Output directory:** `dist`

Deploy by connecting the GitHub repository to Vercel (or run `vercel --prod` from the CLI). Vercel automatically detects Vite and uses the settings above.