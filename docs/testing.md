# Testing — RMTS

## Niveaux de test

- **Unit tests**: logique métier (calculs, règles de statut, permissions).
- **Integration tests**: API + PostgreSQL.
- **E2E tests**: flux complet table QR -> commande -> paiement -> reçu -> audit.
- **Security tests**: IDOR/BOLA, manipulation prix, double paiement.

## Outils cibles

- Jest
- Supertest
- Playwright
