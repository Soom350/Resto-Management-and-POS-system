# RMTS — Restaurant Management & Traceability System

Monorepo full-stack pour la gestion opérationnelle et la traçabilité financière des restaurants.

## Statut

Ce dépôt est en **PHASE 0 (fondation)**:
- structure monorepo en place,
- base Docker/infra prête,
- documentation de planification établie.

Les fonctionnalités métier (DB complète, auth, RBAC, QR, commandes, paiements, audit) seront livrées par phases.

## Stack

- **Backend**: Node.js, TypeScript, NestJS, Prisma, PostgreSQL, Socket.IO
- **Frontend**: Next.js, React, TypeScript
- **Infra**: Docker Compose, Nginx, Redis
- **Tests (cible)**: Jest, Supertest, Playwright

## Structure du repo

```text
rmts/
├── apps/
│   ├── api/
│   ├── customer-web/
│   ├── restaurant-web/
│   └── owner-web/
├── packages/
│   ├── config/
│   ├── shared/
│   ├── types/
│   ├── ui/
│   └── validation/
├── prisma/
├── docs/
├── scripts/
├── docker/
├── tests/
├── DEVELOPMENT_PLAN.md
├── .env.example
├── docker-compose.yml
└── package.json
```

## Prérequis

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## Démarrage de la fondation

```bash
cp .env.example .env
docker compose up -d
```

Services lancés:
- PostgreSQL (5432)
- Redis (6379)
- Nginx (80)

## Démarrage applicatif (préparation phase suivante)

```bash
pnpm install
pnpm dev
```

## Variables d’environnement

Copier `.env.example` vers `.env`, puis adapter:
- accès DB (`POSTGRES_*`, `DATABASE_URL`)
- secrets JWT (`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`)
- URLs frontend/API
- paramètres WhatsApp (mock ou provider réel)

## Documentation

- Plan principal: [`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md)
- Dossier docs: [`docs/`](./docs)
