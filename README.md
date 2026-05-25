# kalza-web

Página web corporativa de **Kalza** — landing pública con i18n (ES/EN), light/dark mode y formularios de contacto/demo.

## Stack

- Next.js 16 · App Router · React 19 · TypeScript
- Tailwind CSS 4 (tokens vía `@theme` en `globals.css`)
- next-intl (rutas `/[locale]`, default `es`)
- next-themes (light por defecto)
- Geist Sans / Mono · Lucide icons

## Comandos

```bash
npm install
npm run dev       # http://localhost:3000  (redirige a /es)
npm run build
npm run start
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

- `NEXT_PUBLIC_APP_ENV` — `local` o `production`
- `NEXT_PUBLIC_API_BASE_URL` — base del backend monolítico (default local: `http://localhost:8080`)
- `NEXT_PUBLIC_TENANT_PORTAL_URL` — URL pública del Portal de Clientes (default local: `http://localhost:3001`)

## Estructura

```
src/
├─ app/[locale]/        # rutas i18n: /, productos, soluciones, clientes, precios, nosotros, contacto, demo, legal/*
├─ components/
│  ├─ layout/            # Navbar, Footer, ThemeToggle, LocaleSwitcher
│  ├─ sections/          # Hero, RetailProblem, ShopperProblem, Partners, FinalCTA, PricingTable, ContactForm, DemoForm
│  ├─ providers/         # ThemeProvider
│  └─ ui/                # Button, Container, Section, Logo
├─ i18n/                 # routing + messages (es/en)
└─ lib/                  # pricing, team, actions (server actions), config, utils
```

## Edición rápida

- **Planes y comparativa**: `src/lib/pricing.ts` (marcado `// PROPUESTA`, ajustar con cifras finales)
- **Equipo**: `src/lib/team.ts`
- **Copies**: `src/i18n/messages/es.json` y `en.json`
- **Tokens de color y tipografía**: `src/app/globals.css`
- **Logos**: `public/brand/`

## Formulario de contacto / demo

Server Actions en `src/lib/actions.ts` validan con Zod y hacen POST a `${NEXT_PUBLIC_API_BASE_URL}/contact`. El backend monolítico (`monolith-backend`) ya tiene Resend integrado.
