# WhatsApp — RMTS

## Architecture

`Backend -> Notification Service -> Queue -> WhatsApp Provider -> Owner`

## Modes

1. **Mock provider** (développement local).
2. **Provider réel** (production) configuré via variables d'environnement.

## Événements prioritaires

- changement de prix,
- remboursement important,
- différence de caisse,
- anomalie détectée,
- daily audit finalisé.
