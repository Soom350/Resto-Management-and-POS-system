# API — RMTS

## Versioning

- Base path: `/api/v1`
- Format réponse standard:
  - `success`
  - `data`
  - `error`
  - `requestId`

## Groupes d'endpoints (cibles)

- Auth
- Restaurants
- Tables + QR
- Menu
- Sessions
- Orders
- Payments
- Receipts
- Audit + Daily audit
- Analytics
- Notifications

## Règles structurantes

1. Auth + RBAC + tenant check sur tout endpoint privé.
2. Validation stricte des entrées.
3. Recalcul backend des prix et montants.
4. Transactions DB pour commandes/paiements.
5. Idempotence pour les paiements.
