# Architecture technique — RMTS

## Stack cible

### Backend
- Node.js + TypeScript
- NestJS
- Prisma
- PostgreSQL
- Socket.IO
- Redis (rate limiting, queue, coordination)

### Frontend
- Next.js + React + TypeScript
- Tailwind CSS

### Infrastructure
- Docker / Docker Compose
- Nginx

## Architecture logique

- Domaines backend modulaires: auth, users, restaurants, tables/QR, menu, sessions, orders, kitchen, payments, receipts, cash-register, audit, daily-audit, analytics, notifications, whatsapp, websocket.
- Frontends séparés: customer-web, restaurant-web, owner-web.

## Principes non négociables

1. PostgreSQL = source de vérité.
2. WebSocket = diffusion temps réel.
3. Recalcul backend des montants.
4. Transactions SQL pour opérations critiques.
5. Idempotence des paiements.
6. Audit append-only des actions sensibles.
7. Contrôle tenant + ressource sur chaque endpoint privé.

## Modèle de données cible

- users
- restaurants
- restaurant_users
- tables
- categories
- menu_items
- menu_item_options
- table_sessions
- orders
- order_items
- payments
- receipts
- cash_registers
- cash_movements
- audit_logs
- daily_audits
- notifications
