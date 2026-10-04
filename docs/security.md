# Sécurité — RMTS

## Principes

1. Le frontend n'est jamais source de vérité.
2. Toute décision d'accès est validée côté backend.
3. Toute opération sensible est auditée.

## Contrôles clés

- Auth JWT access + refresh.
- Hash mot de passe Argon2id.
- RBAC avec vérification restaurant + ressource.
- Protection IDOR/BOLA et élévation de privilèges.
- Validation stricte DTO.
- Rate limiting (Redis).
- Headers de sécurité HTTP.
- CORS contrôlé.
- Idempotence des paiements.

## Traçabilité

- Request ID pour corrélation logs/API/audit.
- Audit append-only sur actions critiques.
