# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
src/
├── app/                        # App-level setup
│   ├── App.jsx
│   ├── Router.jsx
│   └── Providers.jsx           # Context/theme/query providers
│
├── assets/                     # Static files
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── components/                 # Reusable UI components
│   ├── ui/                     # Primitives (Button, Input, Modal…)
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   └── …
│   └── shared/                 # Composed shared components (Navbar, Footer…)
│
├── features/                   # Feature slices (co-located)
│   └── auth/
│       ├── components/         # Feature-specific components
│       ├── hooks/
│       ├── api.js
│       ├── store.js
│       └── index.js
│
├── hooks/                      # Global custom hooks
│   ├── useMediaQuery.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
│
├── layouts/                    # Page shell layouts
│   ├── MainLayout.jsx
│   ├── AuthLayout.jsx
│   └── MobileLayout.jsx        # Mobile-specific shell
│
├── pages/                      # Route-level page components
│   ├── HomePage.jsx
│   └── ProfilePage.jsx
│
├── services/                   # API clients, external services
│   ├── api.js                  # Axios/fetch base instance
│   └── authService.js
│
├── store/                      # Global state (Zustand/Redux)
│   ├── index.js
│   └── uiSlice.js
│
├── styles/                     # Global styles & design tokens
│   ├── tokens.css              # --color-*, --space-*, --radius-*
│   ├── breakpoints.js          # JS-side breakpoint constants
│   ├── globals.css
│   └── reset.css
│
└── utils/                      # Pure helper functions
    ├── formatters.js
    ├── validators.js
    └── cn.js                   # classnames/clsx utility
```
