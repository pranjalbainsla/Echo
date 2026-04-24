# Echo — B2B AI SaaS Support Platform

A multi-tenant AI customer support platform with real-time chat, voice AI, and an embeddable widget — built as a monorepo.

---

## What it does

Echo lets businesses embed an AI-powered support widget on their site. The AI handles conversations in real time, supports voice, and everything is managed from a central dashboard.

**For the business (dashboard):**
- Unified inbox — view and manage all incoming customer conversations
- Workspace and organization management with role-based team access
- Real-time conversation updates without page refreshes

**For the customer (widget):**
- AI chat embedded on any website
- Voice support via Vapi
- Persistent conversation history and widget inbox

---

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

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Monorepo tooling | Turborepo |
| Backend / real-time DB | Convex |
| AI chat | Convex Agents |
| Voice AI | Vapi |
| Auth + organizations | Clerk |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| AI models | OpenAI, Anthropic, Grok |
| PR reviews | CodeRabbit |

