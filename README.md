# RMTS — Restaurant Management and POS System

Monorepo pour la gestion de restaurants et le point de vente (POS).

## Structure

```
rmts/
├── apps/
│   ├── api/              # Backend NestJS
│   ├── customer-web/     # Interface client (QR / table)
│   ├── restaurant-web/   # Interface restaurant (cuisine, caisse, etc.)
│   └── owner-web/        # Interface propriétaire
├── packages/
│   ├── ui/               # Composants UI partagés
│   ├── types/            # Types TypeScript partagés
│   ├── validation/       # Schemas Zod / validations
│   ├── shared/           # Utilitaires partagés
│   └── config/           # Configurations communes
├── prisma/               # Schéma DB, migrations, seed
├── docs/                 # Documentation projet
├── docker/               # Nginx, Postgres
├── scripts/              # Seed, backup, setup
└── tests/                # E2E, integration, security
```

## Prérequis

- Node.js 20+
- pnpm 9+
- Docker (PostgreSQL / Redis)

## Démarrage rapide

```bash
cp .env.example .env
pnpm install
docker compose up -d
pnpm db:migrate
pnpm dev
```

## Applications

| App | Port (dev) | Description |
|-----|------------|-------------|
| `apps/api` | 3001 | API NestJS |
| `apps/customer-web` | 3000 | Interface client |
| `apps/restaurant-web` | 3002 | Interface restaurant |
| `apps/owner-web` | 3003 | Interface propriétaire |

## Documentation

Voir le dossier [`docs/`](./docs/).
