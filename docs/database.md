# Base de données — RMTS

## SGBD

- PostgreSQL (source de vérité)
- Prisma ORM

## Principes de modélisation

1. UUID comme clés primaires.
2. Intégrité référentielle stricte (FKs).
3. Index adaptés au multi-tenant.
4. Soft delete sur ressources éditoriales.
5. Historisation immuable des opérations financières et auditables.

## Tables cibles

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
