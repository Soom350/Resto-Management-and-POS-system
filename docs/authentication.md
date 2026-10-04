# Authentication — RMTS

## Schéma cible

- Access token JWT (durée courte).
- Refresh token JWT (durée plus longue, révocable).
- Hash mot de passe Argon2id.
- Rotation de refresh token.
- Architecture MFA activable pour comptes sensibles.

## Contrôles

1. Login rate-limité.
2. Session invalidée au logout.
3. Changement mot de passe avec vérification de l'ancien secret.
4. Audit de connexion/déconnexion/échec d'auth.
