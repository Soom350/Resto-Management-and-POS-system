# Architecture — RMTS

## Vue d'ensemble

- Monorepo `pnpm` + `turbo`.
- API NestJS modulaire.
- Frontends Next.js séparés par contexte métier.
- PostgreSQL comme source de vérité.
- Redis pour coordination temps réel et jobs.
- Nginx en reverse proxy.

## Bounded contexts

- Ordering (tables/sessions/orders)
- Financial (payments/receipts/cash register)
- Governance (audit/daily audit/anomalies)
- Identity (auth/rbac/tenant scope)

## Séparation des responsabilités

`Controller -> DTO/Validation -> Service -> Repository/Prisma -> PostgreSQL`
