
## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Turborepo Monorepo                  │
│                                                         │
│   apps/web  (Next.js 15 dashboard)                      │
│   apps/widget  (embeddable React widget)                │
│   packages/ui · packages/convex · packages/types        │
└───────────────────┬─────────────────────────────────────┘
                    │
          ┌─────────▼──────────┐
          │   Convex Backend   │
          │  real-time DB +    │
          │  AI Agents +       │
          │  serverless fns    │
          └─────────┬──────────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   Clerk Auth    Vapi SDK    Next.js 15
   + Orgs        (voice)     App Router
```
___


