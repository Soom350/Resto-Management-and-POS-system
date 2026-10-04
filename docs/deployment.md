# Déploiement — RMTS

## Local / développement

- `docker compose up -d` lance:
  - PostgreSQL
  - Redis
  - Nginx

## Cible production (prévue)

- Nginx (reverse proxy + TLS)
- API NestJS
- Frontends Next.js
- PostgreSQL (service managé recommandé)
- Redis

## Exigences

- Variables sensibles via secrets manager / `.env` non versionné.
- Sauvegardes PostgreSQL quotidiennes testées.
- Pipeline CI: lint -> typecheck -> tests -> build -> deploy.
